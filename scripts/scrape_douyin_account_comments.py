import argparse
import asyncio
import csv
import json
import os
import shutil
import subprocess
import time
from pathlib import Path
from urllib.parse import quote, urlencode, urlparse

import requests
from playwright.async_api import async_playwright


ROOT = Path(__file__).resolve().parents[1]
CHROME_PORT = 9333


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


def wait_cdp(port: int, timeout: int = 20) -> None:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            requests.get(f"http://127.0.0.1:{port}/json/version", timeout=1).raise_for_status()
            return
        except Exception:
            time.sleep(0.3)
    raise RuntimeError("Chrome CDP endpoint did not become ready")


def sec_user_id_from_url(url: str) -> str:
    parsed = urlparse(url)
    parts = [part for part in parsed.path.split("/") if part]
    if not parts or parts[0] != "user" or len(parts) < 2:
        raise ValueError("Expected douyin user URL")
    return parts[1]


def clean_proxy_env() -> None:
    for key in list(os.environ):
        if "proxy" in key.lower():
            os.environ.pop(key, None)


async def browser_fetch_json(page, url: str):
    return await page.evaluate(
        """async (url) => {
            const res = await fetch(url, {
              credentials: 'include',
              headers: {
                accept: 'application/json, text/plain, */*',
              },
            });
            const text = await res.text();
            let data = null;
            try { data = JSON.parse(text); } catch (e) {}
            return { ok: res.ok, status: res.status, url: res.url, text: text.slice(0, 500), data };
        }""",
        url,
    )


def flatten_video(item):
    stats = item.get("statistics") or {}
    author = item.get("author") or {}
    return {
        "aweme_id": item.get("aweme_id"),
        "desc": item.get("desc") or "",
        "create_time": item.get("create_time"),
        "comment_count": stats.get("comment_count"),
        "digg_count": stats.get("digg_count"),
        "collect_count": stats.get("collect_count"),
        "share_count": stats.get("share_count"),
        "author_uid": author.get("uid"),
        "author_nickname": author.get("nickname"),
        "share_url": (item.get("share_info") or {}).get("share_url") or f"https://www.douyin.com/video/{item.get('aweme_id')}",
    }


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


async def fetch_videos(page, sec_user_id: str, seen_from_network: dict):
    videos = dict(seen_from_network)
    cursor = 0
    failed_once = False
    for _ in range(300):
        params = {
            "device_platform": "webapp",
            "aid": "6383",
            "channel": "channel_pc_web",
            "sec_user_id": sec_user_id,
            "max_cursor": str(cursor),
            "count": "18",
            "publish_video_strategy_type": "2",
            "pc_client_type": "1",
            "version_code": "170400",
            "version_name": "17.4.0",
            "cookie_enabled": "true",
            "platform": "PC",
        }
        url = "https://www.douyin.com/aweme/v1/web/aweme/post/?" + urlencode(params, quote_via=quote)
        result = await browser_fetch_json(page, url)
        data = result.get("data")
        if not result.get("ok") or not isinstance(data, dict):
            if failed_once:
                break
            failed_once = True
            await page.mouse.wheel(0, 2500)
            await page.wait_for_timeout(1500)
            continue
        for item in data.get("aweme_list") or []:
            aweme_id = item.get("aweme_id")
            if aweme_id:
                videos[aweme_id] = item
        if not data.get("has_more"):
            break
        next_cursor = data.get("max_cursor")
        if next_cursor in (None, cursor):
            break
        cursor = next_cursor
        await page.wait_for_timeout(450)
    return videos


async def fetch_comments(page, aweme_id: str, expected_count=None):
    comments = {}
    cursor = 0
    pages = 0
    for _ in range(500):
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
        batch = data.get("comments") or []
        for comment in batch:
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
        await page.wait_for_timeout(350)
    return comments, {"status": "page_limit", "pages": pages}


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("url")
    parser.add_argument("--port", type=int, default=CHROME_PORT)
    parser.add_argument("--prepare", action="store_true", help="Only open the account page and report whether manual verification is needed")
    parser.add_argument("--reuse", action="store_true", help="Reuse an existing CDP Chrome on the given port")
    args = parser.parse_args()

    clean_proxy_env()
    sec_user_id = sec_user_id_from_url(args.url)
    profile_dir = ROOT / ".codex" / f"douyin-cdp-{sec_user_id[-10:]}"
    profile_dir.mkdir(parents=True, exist_ok=True)

    chrome = find_chrome()
    proc = None
    if args.reuse:
        wait_cdp(args.port, timeout=5)
    else:
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
            page = None
            for existing in context.pages:
                try:
                    current_url = existing.url
                except Exception:
                    continue
                if "douyin.com/user/" in current_url:
                    page = existing
                    break
            if page is None:
                page = context.pages[0] if context.pages else await context.new_page()

            network_videos = {}

            async def on_response(response):
                url = response.url
                if "/aweme/v1/web/aweme/post/" not in url:
                    return
                try:
                    data = await response.json()
                except Exception:
                    return
                for item in data.get("aweme_list") or []:
                    aweme_id = item.get("aweme_id")
                    if aweme_id:
                        network_videos[aweme_id] = item

            page.on("response", on_response)
            if args.url not in page.url:
                await page.goto(args.url, wait_until="domcontentloaded", timeout=60000)
            await page.wait_for_timeout(3000)

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
                    ),
                    flush=True,
                )
                return

            for _ in range(28):
                await page.mouse.wheel(0, 2500)
                await page.wait_for_timeout(900)
                if len(network_videos) >= 200:
                    break

            videos_raw = await fetch_videos(page, sec_user_id, network_videos)
            videos = [flatten_video(item) for item in videos_raw.values() if item.get("aweme_id")]
            videos.sort(key=lambda row: row.get("create_time") or 0, reverse=True)

            all_comments = []
            failures = []
            total = len(videos)
            for idx, video in enumerate(videos, 1):
                aweme_id = video["aweme_id"]
                expected = video.get("comment_count")
                print(f"[{idx}/{total}] comments {aweme_id} expected={expected}", flush=True)
                comments, meta = await fetch_comments(page, aweme_id, expected)
                if meta.get("status") not in ("done", "expected_reached"):
                    failures.append({"aweme_id": aweme_id, **meta})
                all_comments.extend(comments.values())

            prefix = ROOT / f"douyin-user-{sec_user_id}"
            videos_json = prefix.with_name(prefix.name + "-videos.json")
            videos_csv = prefix.with_name(prefix.name + "-videos.csv")
            comments_json = prefix.with_name(prefix.name + "-all-comments.json")
            comments_csv = prefix.with_name(prefix.name + "-all-comments.csv")
            failures_json = prefix.with_name(prefix.name + "-comment-failures.json")

            videos_json.write_text(json.dumps(videos, ensure_ascii=False, indent=2), encoding="utf-8")
            comments_json.write_text(json.dumps(all_comments, ensure_ascii=False, indent=2), encoding="utf-8")
            failures_json.write_text(json.dumps(failures, ensure_ascii=False, indent=2), encoding="utf-8")

            with videos_csv.open("w", encoding="utf-8-sig", newline="") as f:
                writer = csv.DictWriter(f, fieldnames=list(videos[0].keys()) if videos else ["aweme_id"])
                writer.writeheader()
                writer.writerows(videos)
            with comments_csv.open("w", encoding="utf-8-sig", newline="") as f:
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
                writer = csv.DictWriter(f, fieldnames=fields)
                writer.writeheader()
                writer.writerows(all_comments)

            print(
                json.dumps(
                    {
                        "sec_user_id": sec_user_id,
                        "videos": len(videos),
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
