import argparse
import asyncio
import csv
import json
import os
import re
import shutil
import subprocess
import time
from pathlib import Path
from urllib.parse import quote, urlencode, unquote, urlparse

import requests
from playwright.async_api import async_playwright


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PORT = 9666


def find_chrome() -> str:
    candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        shutil.which("chrome"),
        shutil.which("chrome.exe"),
        shutil.which("msedge"),
        shutil.which("msedge.exe"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return str(candidate)
    raise RuntimeError("Chrome/Edge executable not found")


def clean_proxy_env() -> None:
    for key in list(os.environ):
        if "proxy" in key.lower():
            os.environ.pop(key, None)


def wait_cdp(port: int, timeout: int = 20) -> None:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            requests.get(f"http://127.0.0.1:{port}/json/version", timeout=1).raise_for_status()
            return
        except Exception:
            time.sleep(0.3)
    raise RuntimeError("Chrome CDP endpoint did not become ready")


def slug_from_url(url: str) -> str:
    parsed = urlparse(url)
    keyword = ""
    parts = [part for part in parsed.path.split("/") if part]
    if parts:
        keyword = unquote(parts[-1])
    slug = re.sub(r"[^\w\u4e00-\u9fff-]+", "-", keyword).strip("-")
    return slug or "douyin-search"


def flatten_video(item):
    stats = item.get("statistics") or {}
    author = item.get("author") or {}
    aweme_id = item.get("aweme_id")
    return {
        "aweme_id": str(aweme_id) if aweme_id else "",
        "desc": item.get("desc") or "",
        "create_time": item.get("create_time"),
        "comment_count": stats.get("comment_count"),
        "digg_count": stats.get("digg_count"),
        "collect_count": stats.get("collect_count"),
        "share_count": stats.get("share_count"),
        "author_uid": author.get("uid"),
        "author_nickname": author.get("nickname"),
        "author_sec_uid": author.get("sec_uid"),
        "share_url": (item.get("share_info") or {}).get("share_url") or f"https://www.douyin.com/video/{aweme_id}",
    }


def looks_like_aweme(item):
    return isinstance(item, dict) and item.get("aweme_id") and isinstance(item.get("statistics"), dict)


def extract_awemes(data, found):
    if looks_like_aweme(data):
        found[str(data["aweme_id"])] = data
        return
    if isinstance(data, dict):
        for value in data.values():
            extract_awemes(value, found)
    elif isinstance(data, list):
        for value in data:
            extract_awemes(value, found)


async def browser_fetch_json(page, url: str):
    return await page.evaluate(
        """async (url) => {
            const res = await fetch(url, {
              credentials: 'include',
              headers: { accept: 'application/json, text/plain, */*' },
            });
            const text = await res.text();
            let data = null;
            try { data = JSON.parse(text); } catch (e) {}
            return { ok: res.ok, status: res.status, url: res.url, text: text.slice(0, 500), data };
        }""",
        url,
    )


def flatten_comment(comment, aweme_id):
    user = comment.get("user") or {}
    return {
        "aweme_id": aweme_id,
        "cid": comment.get("cid"),
        "text": comment.get("text") or "",
        "create_time": comment.get("create_time"),
        "digg_count": comment.get("digg_count"),
        "reply_comment_total": comment.get("reply_comment_total"),
        "user_uid": user.get("uid"),
        "user_nickname": user.get("nickname"),
        "user_sec_uid": user.get("sec_uid"),
        "ip_label": comment.get("ip_label"),
    }


async def fetch_comments(page, aweme_id: str, expected_count=None, page_limit=500):
    comments = {}
    cursor = 0
    pages = 0
    for _ in range(page_limit):
        params = {
            "device_platform": "webapp",
            "aid": "6383",
            "channel": "channel_pc_web",
            "aweme_id": aweme_id,
            "cursor": str(cursor),
            "count": "50",
            "item_type": "0",
            "insert_ids": "",
            "whale_cut_token": "",
            "cut_version": "1",
            "rcFT": "",
            "pc_client_type": "1",
            "version_code": "170400",
            "version_name": "17.4.0",
            "cookie_enabled": "true",
            "platform": "PC",
        }
        url = "https://www.douyin.com/aweme/v1/web/comment/list/?" + urlencode(params, quote_via=quote)
        result = await browser_fetch_json(page, url)
        data = result.get("data")
        if not result.get("ok") or not isinstance(data, dict):
            return comments, {"status": result.get("status"), "error": result.get("text"), "pages": pages}
        for comment in data.get("comments") or []:
            cid = comment.get("cid")
            if cid:
                comments[cid] = flatten_comment(comment, aweme_id)
        pages += 1
        if not data.get("has_more"):
            return comments, {"status": "done", "pages": pages}
        next_cursor = data.get("cursor")
        if next_cursor in (None, cursor):
            return comments, {"status": "stuck_cursor", "pages": pages}
        cursor = next_cursor
        if expected_count and len(comments) >= expected_count:
            return comments, {"status": "expected_reached", "pages": pages}
        await page.wait_for_timeout(320)
    return comments, {"status": "page_limit", "pages": pages}


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("url")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT)
    parser.add_argument("--prepare", action="store_true")
    parser.add_argument("--reuse", action="store_true")
    parser.add_argument("--top", type=int, default=50)
    parser.add_argument("--target-candidates", type=int, default=180)
    parser.add_argument("--max-scrolls", type=int, default=90)
    args = parser.parse_args()

    clean_proxy_env()
    slug = slug_from_url(args.url)
    profile_dir = ROOT / ".codex" / f"douyin-search-cdp-{slug[-16:]}"
    profile_dir.mkdir(parents=True, exist_ok=True)

    proc = None
    if args.reuse:
        wait_cdp(args.port, timeout=5)
    else:
        chrome = find_chrome()
        proc = subprocess.Popen(
            [
                chrome,
                f"--remote-debugging-port={args.port}",
                f"--user-data-dir={profile_dir}",
                "--no-first-run",
                "--no-default-browser-check",
                "--disable-background-networking",
                "--disable-features=Translate,OptimizationHints,MediaRouter",
                "--disable-sync",
                "--disable-component-update",
                "--disable-extensions",
                "--autoplay-policy=user-gesture-required",
                "about:blank",
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        wait_cdp(args.port)

    try:
        async with async_playwright() as p:
            browser = await p.chromium.connect_over_cdp(f"http://127.0.0.1:{args.port}")
            context = browser.contexts[0]
            page = context.pages[0] if context.pages else await context.new_page()

            videos_raw = {}
            response_urls = set()

            async def on_response(response):
                url = response.url
                if "douyin.com" not in url:
                    return
                ctype = (response.headers or {}).get("content-type", "")
                if "json" not in ctype and "/aweme/" not in url and "/search/" not in url:
                    return
                try:
                    data = await response.json()
                except Exception:
                    return
                before = len(videos_raw)
                extract_awemes(data, videos_raw)
                if len(videos_raw) > before:
                    response_urls.add(url.split("?")[0])

            page.on("response", on_response)
            await page.goto(args.url, wait_until="domcontentloaded", timeout=60000)
            await page.wait_for_timeout(4000)

            verify_frames = [frame.url for frame in page.frames if "verify" in frame.url or "captcha" in frame.url]
            if args.prepare:
                print(
                    json.dumps(
                        {
                            "mode": "prepare",
                            "title": await page.title(),
                            "url": page.url,
                            "verify_frames": verify_frames,
                            "needs_manual_verification": bool(verify_frames),
                        },
                        ensure_ascii=False,
                        indent=2,
                    )
                )
                return

            stagnant = 0
            last_count = 0
            for scroll_index in range(args.max_scrolls):
                await page.mouse.wheel(0, 2800)
                await page.wait_for_timeout(1100)
                count = len(videos_raw)
                print(f"[scroll {scroll_index + 1}/{args.max_scrolls}] candidates={count}", flush=True)
                if count >= args.target_candidates:
                    break
                if count == last_count:
                    stagnant += 1
                else:
                    stagnant = 0
                last_count = count
                if stagnant >= 10 and count >= args.top:
                    break

            videos = [flatten_video(item) for item in videos_raw.values() if item.get("aweme_id")]
            videos.sort(key=lambda row: int(row.get("digg_count") or 0), reverse=True)
            top_videos = videos[: args.top]

            if not top_videos:
                raise RuntimeError("No videos captured from search page")

            all_comments = []
            comments_by_aweme = {}
            failures = []
            for idx, video in enumerate(top_videos, 1):
                aweme_id = video["aweme_id"]
                expected = video.get("comment_count")
                print(
                    f"[{idx}/{len(top_videos)}] comments aweme_id={aweme_id} digg={video.get('digg_count')} expected={expected}",
                    flush=True,
                )
                comments, meta = await fetch_comments(page, aweme_id, expected_count=expected)
                comments_list = list(comments.values())
                comments_by_aweme[aweme_id] = {
                    "complete": meta.get("status") in ("done", "expected_reached"),
                    "comments": comments_list,
                    "expected_comment_count": expected,
                    "meta": meta,
                }
                if meta.get("status") not in ("done", "expected_reached"):
                    failures.append({"aweme_id": aweme_id, **meta})
                all_comments.extend(comments_list)

            prefix = ROOT / f"douyin-search-{slug}-top{args.top}"
            videos_json = prefix.with_name(prefix.name + "-videos.json")
            videos_csv = prefix.with_name(prefix.name + "-videos.csv")
            comments_json = prefix.with_name(prefix.name + "-comments.json")
            comments_csv = prefix.with_name(prefix.name + "-comments.csv")
            failures_json = prefix.with_name(prefix.name + "-failures.json")

            payload = {
                "source_url": args.url,
                "captured_at": time.strftime("%Y-%m-%d %H:%M:%S"),
                "candidate_videos_count": len(videos),
                "top": args.top,
                "response_urls": sorted(response_urls),
                "videos": top_videos,
                "comments_by_aweme": comments_by_aweme,
                "summary": {
                    "commented_videos": len({row["aweme_id"] for row in all_comments}),
                    "comments": len(all_comments),
                    "failures": len(failures),
                },
            }
            videos_json.write_text(json.dumps(top_videos, ensure_ascii=False, indent=2), encoding="utf-8")
            comments_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
            failures_json.write_text(json.dumps(failures, ensure_ascii=False, indent=2), encoding="utf-8")

            with videos_csv.open("w", encoding="utf-8-sig", newline="") as f:
                writer = csv.DictWriter(f, fieldnames=list(top_videos[0].keys()))
                writer.writeheader()
                writer.writerows(top_videos)

            fields = [
                "aweme_id",
                "cid",
                "text",
                "create_time",
                "digg_count",
                "reply_comment_total",
                "user_uid",
                "user_nickname",
                "user_sec_uid",
                "ip_label",
            ]
            with comments_csv.open("w", encoding="utf-8-sig", newline="") as f:
                writer = csv.DictWriter(f, fieldnames=fields)
                writer.writeheader()
                writer.writerows(all_comments)

            print(
                json.dumps(
                    {
                        "keyword_slug": slug,
                        "candidate_videos": len(videos),
                        "top_videos": len(top_videos),
                        "commented_videos": len({row["aweme_id"] for row in all_comments}),
                        "comments": len(all_comments),
                        "failures": len(failures),
                        "files": [str(videos_json), str(videos_csv), str(comments_json), str(comments_csv), str(failures_json)],
                    },
                    ensure_ascii=False,
                    indent=2,
                )
            )
            await browser.close()
    finally:
        if proc and not args.prepare:
            proc.terminate()
            try:
                proc.wait(timeout=8)
            except subprocess.TimeoutExpired:
                proc.kill()


if __name__ == "__main__":
    asyncio.run(main())
