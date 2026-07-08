import csv
import json
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

SOURCES = [
    {
        "batch": "single_video_7247480287616093497",
        "type": "single_video",
        "comments": "douyin-comments-7247480287616093497.dedup.json",
        "video_id": "7247480287616093497",
        "label": "家禽泡水脱毛一体机单视频",
    },
    {
        "batch": "single_video_7032200387092368648",
        "type": "single_video",
        "comments": "douyin-comments-7032200387092368648.dedup.json",
        "video_id": "7032200387092368648",
        "label": "羊/猪大牲畜脱毛单视频",
    },
    {
        "batch": "account_MS4w_YBG0I",
        "type": "account",
        "comments": "douyin-user-MS4wLjABAAAAY2_XP92YN5tx8rYKd01koKUANNq3ZNfgZChP8V_fdxRkKi3ASSBlw43G6XbYBG0I-all-comments.json",
        "videos": "douyin-user-MS4wLjABAAAAY2_XP92YN5tx8rYKd01koKUANNq3ZNfgZChP8V_fdxRkKi3ASSBlw43G6XbYBG0I-videos.json",
        "label": "账号一：大批量多品类脱毛视频",
    },
    {
        "batch": "account_MS4w_iiQOg",
        "type": "account",
        "comments": "douyin-user-MS4wLjABAAAAVw7y4P3RzilgpSooJ7V6nmbghkih8uqcw6gQwXGwXcWM5CrHOe1WA1uOV98iiQOg-all-comments.json",
        "videos": "douyin-user-MS4wLjABAAAAVw7y4P3RzilgpSooJ7V6nmbghkih8uqcw6gQwXGwXcWM5CrHOe1WA1uOV98iiQOg-videos.json",
        "label": "账号二：羊狗家禽脱毛与切块设备",
    },
    {
        "batch": "account_MS4w_hYA",
        "type": "account",
        "comments": "douyin-user-MS4wLjABAAAAtrVkwb4-VDqCdaxS_SJCkbM5o1A6C3y-7FHj0rfDJrHH5L6wAVQfZ7tJ1V1COhYA-all-comments.json",
        "videos": "douyin-user-MS4wLjABAAAAtrVkwb4-VDqCdaxS_SJCkbM5o1A6C3y-7FHj0rfDJrHH5L6wAVQfZ7tJ1V1COhYA-videos.json",
        "label": "账号三：家禽烫脱一体机与羊脱毛机",
    },
]

PATTERNS = {
    "price_purchase": [
        "多少钱",
        "价格",
        "价钱",
        "报价",
        "一套",
        "一台",
        "怎么买",
        "怎么卖",
        "哪里买",
        "地址",
        "联系",
        "电话",
        "微信",
        "有卖",
        "我要买",
        "老板在哪里",
        "加你",
        "多少米",
        "什么价",
    ],
    "species_boundary": [
        "鸡",
        "鸭",
        "鹅",
        "鸽",
        "羊",
        "猪",
        "牛",
        "兔",
        "狗",
        "猫",
        "驴",
        "马",
        "鼠",
        "老鼠",
        "鱼",
        "黄鳝",
        "乳猪",
        "羊头",
        "家禽",
        "牲畜",
        "白条",
    ],
    "meat_quality_damage": [
        "肉不好吃",
        "不好吃",
        "肉质",
        "内伤",
        "骨折",
        "断骨",
        "打坏",
        "打烂",
        "打松",
        "烂",
        "碎",
        "破皮",
        "伤皮",
        "皮破",
        "肉都",
        "变质",
        "口感",
        "卖相",
        "红身",
        "脱皮",
        "酥",
        "摔",
    ],
    "sanitation_smell": [
        "臭",
        "异味",
        "屎",
        "大便",
        "粪",
        "脏",
        "卫生",
        "细菌",
        "干净",
        "不干净",
        "换水",
        "排水",
        "污水",
        "血水",
        "内脏",
        "肚子",
        "肠子",
    ],
    "scalding_process": [
        "水温",
        "温度",
        "烫",
        "泡",
        "浸",
        "热水",
        "开水",
        "时间",
        "火碱",
        "药水",
        "化学",
        "放血",
        "沥血",
        "宰杀",
        "汤",
    ],
    "efficiency_cost": [
        "效率",
        "人工",
        "划算",
        "费电",
        "电费",
        "成本",
        "速度",
        "慢",
        "快",
        "程序复杂",
        "大材小用",
        "占地方",
        "家用",
        "档口",
        "淘汰",
    ],
    "equipment_quality_maintenance": [
        "垃圾",
        "坏",
        "不好用",
        "转速",
        "噪音",
        "震动",
        "三相电",
        "功率",
        "胶条",
        "胶棒",
        "皮带",
        "轴承",
        "维修",
        "售后",
        "防护",
        "安全",
        "卡",
        "容易坏",
    ],
    "animal_welfare_risk": [
        "残忍",
        "虐待",
        "可怜",
        "作恶",
        "报应",
        "福报",
        "杀生",
        "活的",
        "活着",
        "放生",
        "禁止",
        "不忍",
        "遭罪",
        "老板扔",
        "地狱",
        "死了还",
    ],
    "low_value_emotion": [
        "赞",
        "666",
        "哈哈",
        "捂脸",
        "笑哭",
        "牛",
        "不错",
        "厉害",
        "漂亮",
        "好玩",
        "按摩",
        "闯关",
        "投胎",
        "丈母娘",
        "老婆",
    ],
}

CN_TAG = {
    "price_purchase": "价格/购买咨询",
    "species_boundary": "适用品类边界",
    "meat_quality_damage": "肉质/破皮/断骨担忧",
    "sanitation_smell": "卫生/异味/排水担忧",
    "scalding_process": "水温/浸烫/前处理",
    "efficiency_cost": "效率/人工/成本",
    "equipment_quality_maintenance": "设备质量/耗材/安全",
    "animal_welfare_risk": "伦理/活体误解风险",
    "low_value_emotion": "低价值情绪/玩笑互动",
}

INTERPRETATION = {
    "price_purchase": "有明确购买/报价意向，需要用标准询盘表承接。",
    "species_boundary": "客户不知道一台机能处理哪些品类，容易误买或误解。",
    "meat_quality_damage": "最大信任阻力之一，直接影响购买决策和食品成品价值。",
    "sanitation_smell": "关系到食品安全和现场体验，适合做流程说明和现场规范。",
    "scalding_process": "说明客户对水温、浸烫、放血沥血有大量认知缺口。",
    "efficiency_cost": "客户在算账，需用产量/人工/场地来解释设备价值。",
    "equipment_quality_maintenance": "涉及售后、耗材、安全，能转化为配件和服务承诺。",
    "animal_welfare_risk": "不一定是采购意向，但会影响品牌和平台评论氛围。",
    "low_value_emotion": "有传播价值但采购价值低，不宜作为官网内容主线。",
}

QUESTION_WORDS = [
    "吗",
    "么",
    "嘛",
    "？",
    "?",
    "多少",
    "能不能",
    "会不会",
    "有没有",
    "怎么",
    "哪里",
    "什么价",
    "可以吗",
    "行吗",
]


def load_json(path: str):
    file = ROOT / path
    if not file.exists():
        return None
    return json.loads(file.read_text(encoding="utf-8"))


def flatten_comments(path: str):
    data = load_json(path)
    if data is None:
        return []
    if isinstance(data, list):
        return [item for item in data if isinstance(item, dict)]
    if isinstance(data, dict):
        if isinstance(data.get("comments"), list):
            return [item for item in data["comments"] if isinstance(item, dict)]
        if isinstance(data.get("comments_by_aweme"), dict):
            rows = []
            for aweme_id, bucket in data["comments_by_aweme"].items():
                comments = bucket.get("comments", []) if isinstance(bucket, dict) else bucket
                for comment in comments or []:
                    if isinstance(comment, dict):
                        item = dict(comment)
                        item.setdefault("aweme_id", aweme_id)
                        rows.append(item)
            return rows
    return []


def norm_text(value) -> str:
    return re.sub(r"\s+", " ", str(value or "").strip())


def first(*values):
    for value in values:
        if value not in (None, ""):
            return value
    return ""


def to_time(value):
    try:
        if not value:
            return ""
        return datetime.fromtimestamp(int(value), tz=timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return ""


def tags_for(text: str):
    return [name for name, words in PATTERNS.items() if any(word in text for word in words)]


def is_question_like(text: str):
    return any(word in text for word in QUESTION_WORDS)


def pct(num: int, den: int):
    return f"{num / den * 100:.1f}%" if den else "0.0%"


def safe_int(value):
    try:
        return int(value or 0)
    except Exception:
        return 0


def build_rows():
    rows = []
    source_stats = []
    seen = set()
    duplicates = 0

    for source in SOURCES:
        comments = flatten_comments(source["comments"])
        videos = {}
        if source.get("videos"):
            data = load_json(source["videos"])
            video_rows = data.get("videos", data) if isinstance(data, dict) else data
            for video in video_rows or []:
                if isinstance(video, dict):
                    videos[str(video.get("aweme_id") or "")] = video

        kept = 0
        for comment in comments:
            text = norm_text(first(comment.get("text"), comment.get("content"), comment.get("comment_text")))
            aweme_id = str(first(comment.get("aweme_id"), source.get("video_id")))
            cid = str(first(comment.get("cid"), comment.get("comment_id")))
            if not text and not cid:
                continue

            key = (aweme_id, cid, text)
            if key in seen:
                duplicates += 1
                continue
            seen.add(key)
            kept += 1

            video = videos.get(aweme_id, {})
            tags = tags_for(text)
            row = {
                "source_batch": source["batch"],
                "source_label": source["label"],
                "source_type": source["type"],
                "aweme_id": aweme_id,
                "video_desc": norm_text(video.get("desc") or ""),
                "video_comment_count": video.get("comment_count", ""),
                "video_digg_count": video.get("digg_count", ""),
                "cid": cid,
                "comment_text": text,
                "comment_create_time": first(comment.get("create_time"), comment.get("create_time_unix")),
                "comment_create_time_utc": first(comment.get("create_time_iso"), to_time(comment.get("create_time"))),
                "comment_digg_count": first(comment.get("digg_count"), comment.get("digg")),
                "reply_comment_total": first(comment.get("reply_comment_total"), comment.get("reply_count")),
                "user_nickname": first(comment.get("user_nickname"), comment.get("nickname")),
                "ip_label": comment.get("ip_label", ""),
                "tags": "|".join(tags),
                "tag_count": len(tags),
                "is_question_like": int(is_question_like(text)),
                "is_high_intent": int(
                    any(
                        tag in tags
                        for tag in [
                            "price_purchase",
                            "species_boundary",
                            "meat_quality_damage",
                            "sanitation_smell",
                            "scalding_process",
                            "efficiency_cost",
                            "equipment_quality_maintenance",
                        ]
                    )
                ),
                "is_risk": int(
                    "animal_welfare_risk" in tags
                    or any(word in text for word in ["垃圾", "千万别买", "不好用", "虐待", "残忍", "禁止"])
                ),
            }
            rows.append(row)

        source_stats.append(
            {
                "batch": source["batch"],
                "label": source["label"],
                "raw_comments": len(comments),
                "dedup_comments": kept,
            }
        )

    rows.sort(key=lambda item: (item["source_batch"], item["aweme_id"], item["cid"]))
    return rows, source_stats, duplicates


def write_csv(rows):
    out = ROOT / "douyin-comments-all-batches-summary.csv"
    with out.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
    return out


def write_analysis(rows, source_stats, duplicates, csv_path):
    tag_counter = Counter()
    tag_likes = Counter()
    examples = defaultdict(list)
    video_counter = Counter(row["aweme_id"] for row in rows if row["aweme_id"])
    video_desc = {}

    for row in rows:
        if row["video_desc"] and row["aweme_id"] not in video_desc:
            video_desc[row["aweme_id"]] = row["video_desc"]
        for tag in filter(None, row["tags"].split("|")):
            tag_counter[tag] += 1
            tag_likes[tag] += safe_int(row["comment_digg_count"])

    for row in sorted(rows, key=lambda item: safe_int(item["comment_digg_count"]), reverse=True):
        for tag in filter(None, row["tags"].split("|")):
            if len(examples[tag]) < 12:
                examples[tag].append(row)

    question_count = sum(row["is_question_like"] for row in rows)
    high_intent_count = sum(row["is_high_intent"] for row in rows)
    risk_count = sum(row["is_risk"] for row in rows)

    lines = [
        "# 抖音评论全批次汇总分析",
        "",
        "- 生成时间：2026-06-26",
        f"- 汇总总表：`{csv_path.name}`",
        f"- 原始来源：{len(SOURCES)} 批",
        f"- 原始评论合计：{sum(item['raw_comments'] for item in source_stats)}",
        f"- 去重后评论：{len(rows)}",
        f"- 去重删除重复：{duplicates}",
        f"- 疑似问题/咨询评论：{question_count}（{pct(question_count, len(rows))}）",
        f"- 高意向/高价值评论：{high_intent_count}（{pct(high_intent_count, len(rows))}）",
        f"- 舆情/信任风险评论：{risk_count}（{pct(risk_count, len(rows))}）",
        "",
        "## 批次汇总",
        "",
        "| 批次 | 原始评论 | 去重保留 | 说明 |",
        "|---|---:|---:|---|",
    ]
    for item in source_stats:
        lines.append(f"| {item['batch']} | {item['raw_comments']} | {item['dedup_comments']} | {item['label']} |")

    lines.extend(
        [
            "",
            "## 主题分布",
            "",
            "| 主题 | 评论数 | 占比 | 累计点赞 | 厂家解读 |",
            "|---|---:|---:|---:|---|",
        ]
    )
    for tag, count in tag_counter.most_common():
        lines.append(
            f"| {CN_TAG.get(tag, tag)} | {count} | {pct(count, len(rows))} | {tag_likes[tag]} | {INTERPRETATION.get(tag, '')} |"
        )

    lines.extend(
        [
            "",
            "## 高互动视频/来源",
            "",
            "| 视频ID | 评论数 | 视频描述 |",
            "|---|---:|---|",
        ]
    )
    for aweme_id, count in video_counter.most_common(12):
        lines.append(f"| {aweme_id} | {count} | {video_desc.get(aweme_id, '')[:80]} |")

    lines.extend(["", "## 各主题代表评论", ""])
    for tag in tag_counter:
        lines.extend([f"### {CN_TAG.get(tag, tag)}", ""])
        for row in examples[tag][:8]:
            lines.append(f"- {row['comment_digg_count'] or 0}赞｜{row['comment_text'][:90]}")
        lines.append("")

    lines.extend(
        [
            "## 厂家视角重点结论",
            "",
            "1. **最强购买阻力不是价格，而是信任。** 用户反复担心机器会把肉打烂、打松、骨折、破皮，说明演示视频只证明“能脱毛”不够，还必须证明“成品还能卖、还能吃、口感不受明显影响”。",
            "2. **适用品类边界必须讲清楚。** 鸡鸭鹅鸽、羊猪兔、羊头乳猪等评论频繁出现，客户实际在问“一台机能不能多用”。厂家需要明确哪些能共用、哪些要换配置、哪些不建议做。",
            "3. **水温和前处理是内容与成交的核心变量。** 大量问题指向水温、浸烫时间、放血沥血、药水火碱、卫生排水。厂家应把设备销售从“机器参数”升级为“完整加工流程”。",
            "4. **小客户在算投入产出。** 很多评论质疑机器大、慢、占地方、不如人工。应按家庭/档口/养殖场/小加工厂分层，不要用一套话术讲所有客户。",
            "5. **争议品类和疑似活体画面会带来流量，但不是长期品牌资产。** 这类评论容易放大残忍、恶心、不敢吃、禁止等情绪。厂家应在视频和文案中明确合规宰杀放血后再处理。",
            "",
            "## 建议的下一步操作",
            "",
            "### 1. 销售承接",
            "- 建一个固定询盘表：处理品类、单只重量、日处理量、场地尺寸、电压、热源、排水、成品要求、是否需要成套。",
            "- 评论区固定回复不要只说“私信”，先用 1 句话筛选需求：例如“主要做鸡鸭鹅还是羊猪？每天大概多少只？220V 还是 380V？”",
            "- 对价格问题做分层报价口径：单机、小型烫脱组合、小型流水线、定制线，不直接给一个误导性低价。",
            "",
            "### 2. 产品与演示",
            "- 每个主推设备补一组“脱前、脱后、皮面、细毛、内腔、清洗后”的近景素材。",
            "- 增加鸭鹅细毛、老鸭老鹅、羊头、乳猪等难处理样品的真实试机记录。",
            "- 对胶棒、转速、水温、投放量做可视化说明，让客户知道效果不是靠硬打。",
            "",
            "### 3. 内容优化",
            "- 官网继续扩展“水温、浸烫时间、投放量、胶棒、排水清洗”系列，少写泛泛产品介绍。",
            "- 短视频标题和字幕要补流程边界：规范宰杀、放血、沥血后再浸烫脱毛。",
            "- 针对高频问题做 10 条短视频脚本：多少钱、能不能脱鸭鹅细毛、会不会影响肉质、多久换水、胶棒多久换、220V/380V、档口划不划算、羊为什么不剥皮、是否用药水、怎么清洗。",
            "",
            "### 4. 风险控制",
            "- 少用狗、猫、老鼠等争议品类做官网主线；如果短视频为了流量使用，也要避免落到品牌官网采购内容。",
            "- 不发布容易被误解为活体处理的片段；必须出现时，用字幕明确“宰杀放血后处理”。",
            "- 对“机器垃圾、容易坏、不好用”等评论，整理售后排查 SOP：水温、投放量、胶棒、电机皮带、轴承、排水堵塞。",
            "",
            "### 5. 经营机会",
            "- 耗材机会：胶棒、皮带、轴承、配件包，可以作为复购产品。",
            "- 成套机会：烫池 + 脱毛机 + 排水毛渣拦截 + 清洗工位，适合档口和小型加工点。",
            "- 服务机会：提供带样试机、远程场地布置建议、到货调试清单，提高成交信任。",
        ]
    )

    out = ROOT / "douyin-comments-all-batches-analysis.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    return out, {
        "total_raw_comments": sum(item["raw_comments"] for item in source_stats),
        "total_dedup_comments": len(rows),
        "duplicates_removed": duplicates,
        "question_like": question_count,
        "high_intent": high_intent_count,
        "risk": risk_count,
        "tag_counts": dict(tag_counter),
        "source_stats": source_stats,
    }


def main():
    rows, source_stats, duplicates = build_rows()
    csv_path = write_csv(rows)
    analysis_path, stats = write_analysis(rows, source_stats, duplicates, csv_path)
    print(
        json.dumps(
            {
                "csv": str(csv_path),
                "analysis": str(analysis_path),
                **stats,
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
