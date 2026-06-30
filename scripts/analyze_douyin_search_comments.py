import csv
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

PATTERNS = {
    "price_purchase": [
        "多少钱",
        "价格",
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
        "厂家",
        "购买",
        "买",
        "卖吗",
        "有卖",
    ],
    "capacity_line_config": [
        "流水线",
        "生产线",
        "自动化",
        "全自动",
        "半自动",
        "产量",
        "效率",
        "一小时",
        "一天",
        "多少只",
        "速度",
        "配置",
        "设备",
        "工位",
        "传送",
        "输送",
    ],
    "species_scope": [
        "鸡",
        "鸭",
        "鹅",
        "鸽",
        "鹌鹑",
        "兔",
        "羊",
        "猪",
        "牛",
        "家禽",
        "活禽",
        "白条",
        "土鸡",
        "肉鸡",
        "蛋鸡",
    ],
    "slaughter_process_compliance": [
        "宰杀",
        "屠宰",
        "放血",
        "沥血",
        "麻电",
        "电麻",
        "击晕",
        "断气",
        "活杀",
        "检疫",
        "合规",
        "食品安全",
        "许可证",
        "标准",
    ],
    "animal_welfare_risk": [
        "残忍",
        "虐待",
        "可怜",
        "心疼",
        "作恶",
        "报应",
        "杀生",
        "活的",
        "活着",
        "禁止",
        "不忍",
        "遭罪",
        "太残忍",
        "人性",
        "福报",
    ],
    "sanitation_smell": [
        "臭",
        "味",
        "异味",
        "脏",
        "卫生",
        "干净",
        "不干净",
        "血水",
        "污水",
        "排水",
        "清洗",
        "消毒",
        "细菌",
        "粪",
        "屎",
        "内脏",
        "污",
    ],
    "meat_quality_damage": [
        "肉质",
        "不好吃",
        "口感",
        "破皮",
        "脱皮",
        "打烂",
        "打松",
        "骨折",
        "断骨",
        "淤血",
        "红身",
        "卖相",
        "熟了",
        "烫熟",
        "变质",
    ],
    "scalding_dehairing": [
        "脱毛",
        "拔毛",
        "褪毛",
        "烫毛",
        "浸烫",
        "泡水",
        "水温",
        "温度",
        "胶棒",
        "小毛",
        "细毛",
        "鸭毛",
        "鹅毛",
        "火碱",
        "药水",
    ],
    "manual_vs_machine": [
        "人工",
        "手工",
        "老师傅",
        "师傅",
        "省人工",
        "省事",
        "省力",
        "划算",
        "成本",
        "工资",
        "招工",
        "快",
        "慢",
        "淘汰",
    ],
    "site_power_install": [
        "场地",
        "占地",
        "电压",
        "三相电",
        "380",
        "220",
        "功率",
        "用电",
        "水电",
        "安装",
        "排水沟",
        "地面",
        "通风",
        "蒸汽",
        "锅炉",
    ],
    "equipment_quality_after_sales": [
        "质量",
        "售后",
        "保修",
        "维修",
        "耐用",
        "坏",
        "不好用",
        "垃圾",
        "故障",
        "安全",
        "防护",
        "卡",
        "皮带",
        "轴承",
        "配件",
    ],
    "low_value_noise": [
        "哈哈",
        "笑",
        "666",
        "牛",
        "厉害",
        "赞",
        "捂脸",
        "老婆",
        "丈母娘",
        "投胎",
        "评论区",
    ],
}

CN_TAG = {
    "price_purchase": "价格/购买咨询",
    "capacity_line_config": "产能/流水线配置",
    "species_scope": "适用品类边界",
    "slaughter_process_compliance": "屠宰流程/合规前处理",
    "animal_welfare_risk": "活禽/伦理舆情风险",
    "sanitation_smell": "卫生/异味/排水",
    "meat_quality_damage": "肉质/卖相/损伤",
    "scalding_dehairing": "浸烫脱毛效果",
    "manual_vs_machine": "人工与机器成本效率",
    "site_power_install": "场地水电安装",
    "equipment_quality_after_sales": "设备质量/售后安全",
    "low_value_noise": "玩笑/低价值互动",
}

QUESTION_WORDS = ["吗", "么", "？", "?", "多少", "怎么", "哪里", "能不能", "会不会", "有没有", "可以", "什么价"]

RELEVANT_VIDEO_WORDS = [
    "家禽",
    "鸡",
    "鸭",
    "鹅",
    "屠宰",
    "宰杀",
    "杀鸡",
    "杀鸭",
    "流水线",
    "生产线",
    "设备",
    "脱毛",
    "脱毛机",
    "拔毛",
    "浸烫",
    "烫脱",
    "烫毛",
    "泡水",
    "泡水机",
    "一体机",
    "胶棒",
    "胶棍",
    "食品",
    "肉鸡",
    "白羽",
    "养鸡",
    "鸡肉",
    "猪屠宰",
    "生猪",
    "宰牛",
    "分割",
    "加工",
    "烧鸡",
    "烤鸭",
]


def norm_text(value):
    return re.sub(r"\s+", " ", str(value or "").strip())


def safe_int(value):
    try:
        return int(value or 0)
    except Exception:
        return 0


def tags_for(text):
    return [name for name, words in PATTERNS.items() if any(word in text for word in words)]


def is_question(text):
    return any(word in text for word in QUESTION_WORDS)


def is_relevant_video(video):
    text = norm_text(f"{video.get('desc', '')} {video.get('author_nickname', '')}")
    return any(word in text for word in RELEVANT_VIDEO_WORDS)


def pct(num, den):
    return f"{num / den * 100:.1f}%" if den else "0.0%"


def load_payload(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def flatten(payload):
    videos = {str(item["aweme_id"]): item for item in payload.get("videos", []) if item.get("aweme_id")}
    rows = []
    seen = set()
    for aweme_id, bucket in (payload.get("comments_by_aweme") or {}).items():
        video = videos.get(str(aweme_id), {})
        relevant = is_relevant_video(video)
        for comment in bucket.get("comments", []):
            text = norm_text(comment.get("text"))
            cid = str(comment.get("cid") or "")
            key = (str(aweme_id), cid, text)
            if key in seen:
                continue
            seen.add(key)
            tags = tags_for(text)
            rows.append(
                {
                    "aweme_id": str(aweme_id),
                    "video_digg_count": video.get("digg_count", ""),
                    "video_comment_count": video.get("comment_count", ""),
                    "video_desc": norm_text(video.get("desc")),
                    "author_nickname": video.get("author_nickname", ""),
                    "video_is_relevant": int(relevant),
                    "cid": cid,
                    "comment_text": text,
                    "comment_digg_count": comment.get("digg_count", ""),
                    "reply_comment_total": comment.get("reply_comment_total", ""),
                    "user_nickname": comment.get("user_nickname", ""),
                    "ip_label": comment.get("ip_label", ""),
                    "tags": "|".join(tags),
                    "tag_count": len(tags),
                    "is_question_like": int(is_question(text)),
                    "is_high_intent": int(
                        any(
                            tag in tags
                            for tag in [
                                "price_purchase",
                                "capacity_line_config",
                                "species_scope",
                                "slaughter_process_compliance",
                                "sanitation_smell",
                                "scalding_dehairing",
                                "manual_vs_machine",
                                "site_power_install",
                                "equipment_quality_after_sales",
                            ]
                        )
                    ),
                    "is_risk": int(
                        "animal_welfare_risk" in tags
                        or any(word in text for word in ["残忍", "虐待", "禁止", "垃圾", "不好用", "不敢吃"])
                    ),
                }
            )
    return videos, rows


def write_outputs(payload_path):
    payload = load_payload(payload_path)
    videos, rows = flatten(payload)
    stem = Path(payload_path).stem.replace("-comments", "")
    csv_path = ROOT / f"{stem}-comment-analysis.csv"
    md_path = ROOT / f"{stem}-factory-analysis.md"

    rows.sort(key=lambda item: safe_int(item["comment_digg_count"]), reverse=True)
    with csv_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    video_rows = list(videos.values())
    top_videos = sorted(video_rows, key=lambda item: safe_int(item.get("digg_count")), reverse=True)
    relevant_video_ids = {str(video["aweme_id"]) for video in top_videos if is_relevant_video(video)}
    irrelevant_videos = [video for video in top_videos if str(video["aweme_id"]) not in relevant_video_ids]
    relevant_rows = [row for row in rows if row["aweme_id"] in relevant_video_ids]

    tag_counter = Counter()
    tag_likes = Counter()
    examples = defaultdict(list)
    for row in relevant_rows:
        for tag in filter(None, row["tags"].split("|")):
            tag_counter[tag] += 1
            tag_likes[tag] += safe_int(row["comment_digg_count"])
            if len(examples[tag]) < 10:
                examples[tag].append(row)

    total = len(rows)
    relevant_total = len(relevant_rows)
    question_count = sum(row["is_question_like"] for row in rows)
    high_intent_count = sum(row["is_high_intent"] for row in rows)
    risk_count = sum(row["is_risk"] for row in rows)
    relevant_question_count = sum(row["is_question_like"] for row in relevant_rows)
    relevant_high_intent_count = sum(row["is_high_intent"] for row in relevant_rows)
    relevant_risk_count = sum(row["is_risk"] for row in relevant_rows)

    lines = [
        "# 家禽宰杀流水线设备搜索评论分析",
        "",
        f"- 来源链接：{payload.get('source_url')}",
        f"- 候选视频：{payload.get('candidate_videos_count')}",
        f"- 抓取范围：点赞数最高前 {payload.get('top')} 个视频",
        f"- 抓取评论：{total}",
        f"- 抓取失败视频：{payload.get('summary', {}).get('failures')}",
        f"- 明显相关视频：{len(relevant_video_ids)} 个；相关视频评论：{relevant_total}",
        f"- 明显无关视频：{len(irrelevant_videos)} 个；厂家分析已剔除",
        f"- 全量疑似问题/咨询：{question_count}（{pct(question_count, total)}）",
        f"- 相关评论疑似问题/咨询：{relevant_question_count}（{pct(relevant_question_count, relevant_total)}）",
        f"- 相关评论高意向/高价值：{relevant_high_intent_count}（{pct(relevant_high_intent_count, relevant_total)}）",
        f"- 相关评论舆情/信任风险：{relevant_risk_count}（{pct(relevant_risk_count, relevant_total)}）",
        f"- 评论分析表：`{csv_path.name}`",
        "",
        "> 说明：原始 CSV 保留全部 50 个高赞视频评论；下面厂家分析剔除了篮球、情感等明显无关视频，避免搜索结果污染判断。",
        "",
        "## 点赞最高视频 Top 15",
        "",
        "| 排名 | 视频ID | 点赞 | 评论数 | 作者 | 相关 | 描述 |",
        "|---:|---|---:|---:|---|---|---|",
    ]
    for index, video in enumerate(top_videos[:15], 1):
        lines.append(
            f"| {index} | {video.get('aweme_id')} | {video.get('digg_count')} | {video.get('comment_count')} | {video.get('author_nickname') or ''} | {'是' if is_relevant_video(video) else '否'} | {norm_text(video.get('desc'))[:80]} |"
        )

    lines.extend(
        [
            "",
            "## 主题分布",
            "",
            "| 主题 | 评论数 | 占比 | 累计点赞 | 厂家解读 |",
            "|---|---:|---:|---:|---|",
        ]
    )
    interpretations = {
        "price_purchase": "明确询盘，需要标准报价资料承接。",
        "capacity_line_config": "用户在判断是否真能形成流水线和产能闭环。",
        "species_scope": "客户会把鸡鸭鹅鸽、活禽、白条等场景混在一起问，需要拆清边界。",
        "slaughter_process_compliance": "涉及宰杀、放血、检疫和食品加工规范，是信任基础。",
        "animal_welfare_risk": "高热视频容易引发活禽处理、残忍等舆情，需主动澄清流程。",
        "sanitation_smell": "屠宰线比单机更容易被问血水、异味、排水和消毒。",
        "meat_quality_damage": "影响成品卖相和口感，是采购客户的隐性阻力。",
        "scalding_dehairing": "说明客户仍把流水线结果归因到浸烫脱毛效果。",
        "manual_vs_machine": "适合用人工节省和高峰产能解释设备价值。",
        "site_power_install": "说明客户担心设备落地，不只是买机器。",
        "equipment_quality_after_sales": "可转化为售后、备件、安全防护和调试承诺。",
        "low_value_noise": "有传播作用，但不要作为销售主线。",
    }
    for tag, count in tag_counter.most_common():
        lines.append(
            f"| {CN_TAG.get(tag, tag)} | {count} | {pct(count, relevant_total)} | {tag_likes[tag]} | {interpretations.get(tag, '')} |"
        )

    lines.extend(["", "## 代表评论", ""])
    for tag in tag_counter:
        lines.extend([f"### {CN_TAG.get(tag, tag)}", ""])
        for row in examples[tag][:8]:
            lines.append(f"- {row['comment_digg_count'] or 0}赞｜{row['comment_text'][:100]}")
        lines.append("")

    lines.extend(
        [
            "## 厂家需要关注的重点",
            "",
            "1. **搜索结果里的高热视频不等于高转化内容。** 点赞最高的视频多半靠强刺激画面、动物反应或大型流水线场景传播，但采购客户真正会追问价格、产能、流程合规、现场水电和售后。",
            "2. **“宰杀流水线”比“脱毛机”更需要讲流程。** 用户关注的不只是脱毛，而是上挂、麻电/击晕、放血、浸烫、脱毛、开膛、清洗、预冷、排污这些环节能否连起来。",
            "3. **活禽画面会放大伦理风险。** 如果视频让用户误解为活体直接处理，评论会转向残忍、禁止、报应、食品安全，影响品牌长期信任。",
            "4. **客户在判断自己能不能落地。** 场地、电压、排水、锅炉/蒸汽、用工、检疫和清洗消毒，是流水线成交前必须回答的问题。",
            "5. **机会在“小型合规流水线”。** 很多需求不是大型屠宰厂，而是养殖场、档口、食堂、配送点想把人工宰杀升级成规范小线。",
            "",
            "## 问题与机会",
            "",
            "- **问题：报价无法直接报准。** 流水线价格取决于日处理量、自动化程度、是否含预冷、开膛、分割、污水处理和安装调试。",
            "- **问题：视频演示缺少流程边界。** 只看机器转动，用户不知道是否规范放血、是否活体误用、是否符合食品加工要求。",
            "- **问题：现场落地成本容易被低估。** 排水沟、地面防滑、通风、热源、电压、清洗消毒和人员动线都会影响能不能用。",
            "- **机会：把“设备销售”升级成“屠宰加工小线方案”。** 用处理量分档：每日几十只、几百只、上千只，对应不同配置。",
            "- **机会：沉淀标准询盘表和短视频脚本。** 搜索来的用户问题集中，适合用固定内容批量承接。",
            "",
            "## 接下来要优化的操作",
            "",
            "### 销售承接",
            "- 建立《家禽宰杀流水线报价信息表》：品类、单只重量、日处理量、小时峰值、是否需要麻电/放血/浸烫/脱毛/开膛/预冷/分割、场地尺寸、电压、热源、排水、预算区间。",
            "- 评论区固定回复分三类：问价格、问流程、问能不能做。不要只回复“私信”，先引导对方给处理量和场地条件。",
            "- 把报价话术分成小型档口线、养殖场自用线、集中屠宰加工线三档。",
            "",
            "### 视频内容",
            "- 做一条完整流程视频：上挂、放血沥血、浸烫、脱毛、清洗、排污，字幕明确“规范宰杀放血后进入设备”。",
            "- 做一条“多少钱不能直接报”的视频，用 6 个参数解释价格差异。",
            "- 做一条“小型家禽屠宰流水线需要多大场地”的视频，给出平面布局示意。",
            "- 做一条“鸡鸭鹅流水线和单台脱毛机有什么区别”的视频，避免客户误选。",
            "",
            "### 官网内容",
            "- 新增或强化“家禽宰杀流水线设备方案”页面，按处理量和场地分档。",
            "- FAQ 增加：是否需要三相电、是否需要锅炉/蒸汽、排水怎么做、一天能处理多少只、报价前要提供什么、是否包含安装调试。",
            "- 产品页增加“可组成流水线的设备分工”，让客户知道每台机器在流程里的位置。",
            "",
            "### 风险控制",
            "- 视频和官网统一不用“活禽直接进机器”的表达，改为“规范宰杀、放血、沥血后进入浸烫脱毛环节”。",
            "- 避免把争议画面作为品牌主素材；高热视频可以引流，但承接页必须回到合规食品加工。",
            "- 准备一套评论区解释模板，应对“残忍、能不能吃、卫生不卫生、是不是违法”等高频质疑。",
        ]
    )

    md_path.write_text("\n".join(lines), encoding="utf-8")
    return csv_path, md_path, {
        "videos": len(videos),
        "comments": total,
        "relevant_videos": len(relevant_video_ids),
        "relevant_comments": relevant_total,
        "irrelevant_videos": len(irrelevant_videos),
        "question_like": question_count,
        "high_intent": high_intent_count,
        "risk": risk_count,
        "relevant_question_like": relevant_question_count,
        "relevant_high_intent": relevant_high_intent_count,
        "relevant_risk": relevant_risk_count,
        "tag_counts": dict(tag_counter),
    }


def main():
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python analyze_douyin_search_comments.py <comments-json>")
    csv_path, md_path, stats = write_outputs(sys.argv[1])
    print(json.dumps({"csv": str(csv_path), "analysis": str(md_path), **stats}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
