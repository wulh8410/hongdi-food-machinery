import csv
import glob
import re
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_CSV = ROOT / "douyin-comments-all-history-dedup-summary.csv"
OUT_MD = ROOT / "douyin-comments-all-history-analysis.md"

TAG_NAMES = {
    "price_purchase": "价格/购买咨询",
    "species_scope": "适用品类边界",
    "meat_quality_damage": "肉质/破皮/断骨担忧",
    "sanitation_smell": "卫生/异味/排水担忧",
    "scalding_dehairing": "水温/浸烫/脱毛效果",
    "manual_vs_machine": "效率/人工/成本",
    "animal_welfare_risk": "活体误解/残忍争议",
    "equipment_quality_after_sales": "设备质量/耗材/售后安全",
    "capacity_line_config": "产能/流水线配置",
    "site_power_install": "场地/电压/安装",
    "slaughter_process_compliance": "宰杀放血流程合规",
    "low_value_noise": "低价值情绪/玩笑互动",
}

TAG_ALIAS = {
    "species_boundary": "species_scope",
    "scalding_process": "scalding_dehairing",
    "efficiency_cost": "manual_vs_machine",
    "equipment_quality_maintenance": "equipment_quality_after_sales",
    "low_value_emotion": "low_value_noise",
}

PATTERNS = {
    "price_purchase": [
        "多少钱",
        "多少一台",
        "多少米",
        "价格",
        "报价",
        "怎么买",
        "怎么卖",
        "哪里买",
        "在哪里买",
        "发链接",
        "小黄车",
        "买一台",
        "买一个",
        "一套",
        "一台",
    ],
    "species_scope": [
        "鸡",
        "鸭",
        "鹅",
        "鸽",
        "羊",
        "猪",
        "牛",
        "狗",
        "猫",
        "老鼠",
        "兔",
        "马",
        "驴",
        "小毛",
        "细毛",
        "鸭毛",
        "鹅毛",
        "能用",
        "可以用",
        "共用",
        "一机多用",
    ],
    "meat_quality_damage": [
        "肉不好",
        "不好吃",
        "肉质",
        "口感",
        "打烂",
        "打坏",
        "破皮",
        "脱皮",
        "断骨",
        "骨折",
        "内脏",
        "散架",
        "肉松",
        "烫熟",
        "熟了",
    ],
    "sanitation_smell": [
        "臭",
        "腥",
        "味道",
        "恶心",
        "卫生",
        "干净",
        "细菌",
        "传染",
        "粪",
        "屎",
        "排水",
        "污水",
        "毛渣",
        "鸡毛",
        "鸭毛",
    ],
    "scalding_dehairing": [
        "水温",
        "开水",
        "热水",
        "烫",
        "浸烫",
        "泡水",
        "脱毛",
        "拔毛",
        "褪毛",
        "去毛",
        "毛孔",
        "胶棒",
        "胶条",
        "火碱",
        "药水",
        "松香",
    ],
    "manual_vs_machine": [
        "人工",
        "手工",
        "师傅",
        "快",
        "效率",
        "省人工",
        "劳动力",
        "成本",
        "划算",
        "不费电",
        "工资",
    ],
    "animal_welfare_risk": [
        "残忍",
        "活",
        "报应",
        "杀生",
        "罪过",
        "可怜",
        "不忍心",
        "福报",
        "虐待",
        "人性",
        "生命",
        "恶魔",
    ],
    "equipment_quality_after_sales": [
        "容易坏",
        "垃圾",
        "质量",
        "售后",
        "安全机制",
        "不安全",
        "配件",
        "胶条",
        "胶棒",
        "轴承",
        "皮带",
        "防护",
    ],
    "capacity_line_config": [
        "流水线",
        "产量",
        "处理量",
        "一天",
        "每小时",
        "小时",
        "批量",
        "配置",
        "成套",
        "规模",
    ],
    "site_power_install": [
        "三相电",
        "380",
        "220",
        "电压",
        "功率",
        "安装",
        "场地",
        "多大",
        "地方",
        "排水",
    ],
    "slaughter_process_compliance": [
        "宰杀",
        "放血",
        "沥血",
        "断气",
        "屠宰",
        "活禽",
        "合规",
        "食品加工",
    ],
    "low_value_noise": [
        "哈哈",
        "笑死",
        "丈母娘",
        "老婆",
        "洗澡",
        "表情",
        "[赞]",
        "[玫瑰]",
        "从这儿来的",
    ],
}

QUESTION_WORDS = ["吗", "么", "？", "?", "多少", "怎么", "哪里", "能不能", "会不会", "有没有", "可以", "什么价"]
HIGH_INTENT_WORDS = ["多少钱", "多少一台", "价格", "报价", "怎么买", "哪里买", "买一台", "买一个", "发链接", "地址"]
RISK_WORDS = ["残忍", "报应", "恶心", "不敢吃", "虐待", "活", "罪过", "不安全", "坏", "垃圾"]


def norm(value):
    return re.sub(r"\s+", " ", str(value or "").strip())


def to_int(value):
    try:
        return int(float(value or 0))
    except (TypeError, ValueError):
        return 0


def split_tags(value):
    tags = set()
    for tag in re.split(r"[;,|]", str(value or "")):
        tag = tag.strip()
        if not tag:
            continue
        tags.add(TAG_ALIAS.get(tag, tag))
    return tags


def infer_tags(text):
    return {tag for tag, words in PATTERNS.items() if any(word in text for word in words)}


def source_label(path):
    name = Path(path).name
    if name.startswith("首批评论汇总"):
        return "首批评论汇总"
    if name.startswith("douyin-search-"):
        keyword = name.replace("douyin-search-", "").split("-top50")[0]
        return f"搜索：{keyword}"
    if name.startswith("douyin-comments-"):
        video_id = name.replace("douyin-comments-", "").split(".")[0]
        return f"单视频：{video_id}"
    if name.startswith("douyin-user-"):
        user_id = name.replace("douyin-user-", "").split("-all-comments")[0]
        return f"账号：{user_id[:18]}..."
    return name


def collect_files():
    files = []
    patterns = [
        "首批评论汇总*.csv",
        "douyin-comments-*.csv",
        "douyin-user-*-all-comments.csv",
        "douyin-search-*-top50-comment-analysis.csv",
    ]
    for pattern in patterns:
        files.extend(glob.glob(str(ROOT / pattern)))
    excluded = {OUT_CSV.name}
    unique = []
    seen = set()
    for path in files:
        p = Path(path)
        if p.name in excluded:
            continue
        if p.name not in seen:
            unique.append(p)
            seen.add(p.name)
    return sorted(unique, key=lambda p: p.name)


def merge_rows(files):
    merged = {}
    cid_text_index = {}
    source_counts = Counter()
    raw_rows = 0
    for path in files:
        label = source_label(path)
        with path.open("r", encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                raw_rows += 1
                if norm(row.get("video_is_relevant")) == "0":
                    continue
                text = norm(row.get("comment_text") or row.get("text"))
                if not text:
                    continue
                aweme_id = norm(row.get("aweme_id"))
                cid = norm(row.get("cid"))
                key = (aweme_id, cid, text)
                cid_text_key = (cid, text)
                tags = split_tags(row.get("tags")) | infer_tags(text)
                existing_key = key
                if cid and text and cid_text_key in cid_text_index:
                    existing_key = cid_text_index[cid_text_key]
                item = merged.get(existing_key)
                if not item:
                    item = {
                        "aweme_id": aweme_id,
                        "cid": cid,
                        "comment_text": text,
                        "comment_digg_count": to_int(row.get("comment_digg_count") or row.get("digg_count")),
                        "reply_comment_total": to_int(row.get("reply_comment_total")),
                        "create_time": norm(row.get("comment_create_time") or row.get("create_time") or row.get("create_time_iso")),
                        "user_nickname": norm(row.get("user_nickname") or row.get("nickname")),
                        "ip_label": norm(row.get("ip_label")),
                        "video_desc": norm(row.get("video_desc")),
                        "video_comment_count": to_int(row.get("video_comment_count")),
                        "video_digg_count": to_int(row.get("video_digg_count")),
                        "sources": set(),
                        "source_files": set(),
                        "tags": set(),
                    }
                    merged[key] = item
                    if cid and text:
                        cid_text_index[cid_text_key] = key
                elif not item["aweme_id"] and aweme_id:
                    item["aweme_id"] = aweme_id
                item["comment_digg_count"] = max(item["comment_digg_count"], to_int(row.get("comment_digg_count") or row.get("digg_count")))
                item["reply_comment_total"] = max(item["reply_comment_total"], to_int(row.get("reply_comment_total")))
                item["video_comment_count"] = max(item["video_comment_count"], to_int(row.get("video_comment_count")))
                item["video_digg_count"] = max(item["video_digg_count"], to_int(row.get("video_digg_count")))
                if not item["video_desc"] and row.get("video_desc"):
                    item["video_desc"] = norm(row.get("video_desc"))
                if not item["user_nickname"] and (row.get("user_nickname") or row.get("nickname")):
                    item["user_nickname"] = norm(row.get("user_nickname") or row.get("nickname"))
                if not item["ip_label"] and row.get("ip_label"):
                    item["ip_label"] = norm(row.get("ip_label"))
                item["sources"].add(label)
                item["source_files"].add(path.name)
                item["tags"].update(tags)
                source_counts[label] += 1
    return merged, raw_rows, source_counts


def enrich_and_write(rows):
    output_rows = []
    for item in rows:
        tags = sorted(item["tags"])
        tag_names = [TAG_NAMES.get(tag, tag) for tag in tags]
        text = item["comment_text"]
        output_rows.append(
            {
                "aweme_id": item["aweme_id"],
                "cid": item["cid"],
                "comment_text": text,
                "comment_digg_count": item["comment_digg_count"],
                "reply_comment_total": item["reply_comment_total"],
                "create_time": item["create_time"],
                "user_nickname": item["user_nickname"],
                "ip_label": item["ip_label"],
                "video_desc": item["video_desc"],
                "video_comment_count": item["video_comment_count"],
                "video_digg_count": item["video_digg_count"],
                "tags": "|".join(tags),
                "tag_names": "|".join(tag_names),
                "tag_count": len(tags),
                "is_question_like": int(any(word in text for word in QUESTION_WORDS)),
                "is_high_intent": int(any(word in text for word in HIGH_INTENT_WORDS) or "price_purchase" in tags),
                "is_risk": int(any(word in text for word in RISK_WORDS) or "animal_welfare_risk" in tags),
                "sources": "|".join(sorted(item["sources"])),
                "source_files": "|".join(sorted(item["source_files"])),
            }
        )
    output_rows.sort(key=lambda r: (r["comment_digg_count"], r["reply_comment_total"]), reverse=True)
    fieldnames = list(output_rows[0].keys()) if output_rows else []
    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(output_rows)
    return output_rows


def pct(num, den):
    return f"{num / den * 100:.1f}%" if den else "0.0%"


def top_examples(rows, tag, limit=8):
    matched = [r for r in rows if tag in r["tags"].split("|")]
    matched.sort(key=lambda r: (r["comment_digg_count"], r["reply_comment_total"]), reverse=True)
    return matched[:limit]


def write_markdown(rows, raw_rows, source_counts, files):
    total = len(rows)
    duplicate_removed = raw_rows - total
    tag_counts = Counter()
    tag_likes = Counter()
    source_unique = Counter()
    for row in rows:
        for source in row["sources"].split("|"):
            if source:
                source_unique[source] += 1
        for tag in row["tags"].split("|"):
            if not tag:
                continue
            tag_counts[tag] += 1
            tag_likes[tag] += row["comment_digg_count"]

    business_tags = [tag for tag, _ in tag_counts.most_common() if tag != "low_value_noise"]
    top_three = business_tags[:3]
    high_intent = sum(int(r["is_high_intent"]) for r in rows)
    question_like = sum(int(r["is_question_like"]) for r in rows)
    risk = sum(int(r["is_risk"]) for r in rows)

    lines = [
        "# 过往抖音评论去重汇总与统计分析",
        "",
        f"- 生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"- 评论总表：`{OUT_CSV.name}`",
        f"- 分析文档：`{OUT_MD.name}`",
        f"- 纳入源文件：{len(files)} 个 CSV",
        f"- 原始读取行数：{raw_rows}",
        f"- 去重后评论：{total}",
        f"- 合并重复评论：{duplicate_removed}",
        f"- 去重规则：`aweme_id + cid + comment_text`；同一评论重复出现时合并来源、标签和最高点赞数。",
        "",
        "## 结论先行",
        "",
        "过往评论里，真正需要厂家优先处理的不是单一价格问题，而是客户在购买前无法自行判断的三件事：设备适用边界、价格配置口径、脱毛效果控制。",
        "",
        "| 排名 | 真实问题 | 提及次数 | 占去重评论 | 累计点赞 | 厂家应对重点 |",
        "|---:|---|---:|---:|---:|---|",
    ]
    responses = {
        "species_scope": "明确鸡鸭鹅鸽、鸭鹅细毛、羊猪等边界，避免客户误买或误解一机多用。",
        "price_purchase": "用标准询盘表承接报价：品类、重量、日处理量、小时高峰、场地、电压、热源。",
        "scalding_dehairing": "把水温、浸烫时间、投放量、胶棒状态和试机效果讲清楚。",
    }
    for idx, tag in enumerate(top_three, 1):
        lines.append(
            f"| {idx} | {TAG_NAMES.get(tag, tag)} | {tag_counts[tag]} | {pct(tag_counts[tag], total)} | {tag_likes[tag]} | {responses.get(tag, '作为内容和销售承接重点。')} |"
        )

    lines.extend(
        [
            "",
            "## 数据来源汇总",
            "",
            "| 来源 | 原始读取行数 | 去重后涉及评论 |",
            "|---|---:|---:|",
        ]
    )
    for source, count in source_counts.most_common():
        lines.append(f"| {source} | {count} | {source_unique[source]} |")

    lines.extend(
        [
            "",
            "## 主题分布",
            "",
            "| 主题 | 提及次数 | 占去重评论 | 累计点赞 | 解读 |",
            "|---|---:|---:|---:|---|",
        ]
    )
    interpretations = {
        "species_scope": "客户不知道设备到底适合哪些禽畜、哪些毛型和哪些处理量，是选型最大的认知缺口。",
        "price_purchase": "价格咨询量很大，但必须转成配置咨询，否则只报单价会造成误判。",
        "scalding_dehairing": "客户关心能不能脱净，本质上要讲水温、时间、投放量和胶棒状态。",
        "manual_vs_machine": "客户在算人工账，需要用小时产量、返工修毛量和高峰期节拍解释价值。",
        "animal_welfare_risk": "这类评论会影响品牌信任，视频和官网必须明确规范宰杀后再浸烫脱毛。",
        "meat_quality_damage": "成品卖相和肉质是成交阻力，需要用试机、近景和参数控制证明。",
        "sanitation_smell": "异味、排水和清洗关系到现场体验，适合做 SOP 和现场布局说明。",
        "capacity_line_config": "说明客户开始从单机进入成套/流水线配置判断。",
        "equipment_quality_after_sales": "设备耐用、胶棒耗材、安全防护和售后是复购与信任点。",
        "slaughter_process_compliance": "要把宰杀、放血、沥血、浸烫、脱毛的流程边界讲清楚。",
        "site_power_install": "场地、电压和安装问题不高频但很影响落地，应在报价前收集。",
        "low_value_noise": "有传播价值，但不适合作为官网内容主线。",
    }
    for tag, count in tag_counts.most_common():
        lines.append(
            f"| {TAG_NAMES.get(tag, tag)} | {count} | {pct(count, total)} | {tag_likes[tag]} | {interpretations.get(tag, '')} |"
        )

    lines.extend(
        [
            "",
            "## 评论类型概览",
            "",
            f"- 疑似问题/咨询：{question_like} 条，占 {pct(question_like, total)}。",
            f"- 高意向/采购相关：{high_intent} 条，占 {pct(high_intent, total)}。",
            f"- 舆情/信任风险：{risk} 条，占 {pct(risk, total)}。",
            "",
            "## 最需要关注的重点和问题",
            "",
            "### 1. 适用品类边界不清，是最大问题",
            "",
            "用户频繁用鸡、鸭、鹅、鸽、羊、猪等不同对象来追问或争论，说明他们不知道一台设备能处理什么、不能处理什么，也不知道鸭鹅细毛、禽体大小、胶棒状态和浸烫条件会改变效果。",
            "",
            "厂家动作：产品页和视频都要直接说清楚适用品类、边界品类、需要试机的情况，以及鸡鸭鹅共用时要调整的参数。",
            "",
            "### 2. 价格咨询多，但本质是配置不确定",
            "",
            "大量评论是“多少钱一台”“这机器多少米”“怎么买”。这不是简单报低价能解决的问题，客户真正缺的是按小档口、养殖场、集中加工等场景判断配置。",
            "",
            "厂家动作：建立标准询盘模板，固定收集品类、单只重量、每天数量、小时高峰、场地、电压、热源和排水，再给单机/组合/流水线三档建议。",
            "",
            "### 3. 脱毛效果、水温和肉质担忧会直接影响成交",
            "",
            "用户反复提到脱不干净、鸭鹅细毛、破皮、肉松、烫熟、臭味。这里的核心不是机器单点能力，而是宰杀放血沥血、浸烫水温、浸烫时间、投放量、胶棒软硬和清洗排水的组合控制。",
            "",
            "厂家动作：多展示试机前后对比、皮面近景、鸭鹅细毛处理、胶棒维护、水温时间建议和收工清洗流程。",
            "",
            "### 4. 舆情风险不一定转化，但会影响信任",
            "",
            "残忍、活体、报应、恶心、不敢吃等评论数量不低。它们不一定是采购问题，但会影响品牌评论区氛围和客户对食品安全的第一印象。",
            "",
            "厂家动作：视频字幕和官网说明统一使用“规范宰杀、放血、沥血后进入浸烫脱毛环节”，不要让画面被理解为活体直接处理。",
            "",
            "## 代表评论",
        ]
    )
    for tag in top_three + ["meat_quality_damage", "sanitation_smell", "animal_welfare_risk", "equipment_quality_after_sales"]:
        lines.extend(["", f"### {TAG_NAMES.get(tag, tag)}"])
        lines.append("")
        for row in top_examples(rows, tag):
            text = row["comment_text"].replace("\n", " ")
            lines.append(f"- {row['comment_digg_count']}赞｜{text}")

    lines.extend(
        [
            "",
            "## 接下来建议优化的操作",
            "",
            "1. 把产品和方案页的第一屏改成“适用品类 + 处理量 + 关键配置 + 询价所需信息”，减少客户只问多少钱。",
            "2. 给每款核心设备补一张“能处理/需确认/不建议”的品类边界表。",
            "3. 拍摄或整理脱前、浸烫后、脱毛后、皮面细毛、清洗排水、胶棒磨损 6 类近景素材。",
            "4. 建立评论区回复模板：价格、品类、脱毛效果、破皮肉质、水温、异味、活体误解、胶棒耗材。",
            "5. 销售接线时先问参数再报价，把散乱评论需求转成可成交询盘。",
        ]
    )
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main():
    files = collect_files()
    merged, raw_rows, source_counts = merge_rows(files)
    rows = enrich_and_write(list(merged.values()))
    write_markdown(rows, raw_rows, source_counts, files)
    print(
        {
            "source_files": len(files),
            "raw_rows": raw_rows,
            "dedup_comments": len(rows),
            "duplicates_merged": raw_rows - len(rows),
            "csv": str(OUT_CSV),
            "md": str(OUT_MD),
        }
    )


if __name__ == "__main__":
    main()
