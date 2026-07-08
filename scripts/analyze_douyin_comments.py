import json
import sys
from collections import Counter
from pathlib import Path


def hit(text, words):
    return any(word in text for word in words)


def main():
    sec = sys.argv[1]
    comments = json.loads(Path(f"douyin-user-{sec}-all-comments.json").read_text(encoding="utf-8"))
    videos = json.loads(Path(f"douyin-user-{sec}-videos.json").read_text(encoding="utf-8"))
    video_by_id = {v["aweme_id"]: v for v in videos}

    keywords = {
        "price_buy": ["多少钱", "多少米", "价格", "报价", "几钱", "钱", "怎么买", "购买", "哪里买", "卖吗", "有卖", "私信", "联系", "地址", "微信", "电话", "厂家", "发货", "运费", "包邮", "链接"],
        "species_scope": ["鸡", "鸭", "鹅", "鸽", "羊", "猪", "兔", "鱼", "牛", "狗", "猫", "驴", "鼠", "狐狸", "鸟", "鸵鸟", "家禽", "牲畜", "活禽", "活体", "毛"],
        "sheep_pig_large": ["羊", "猪", "乳猪", "带皮", "猪皮", "羊皮", "山羊", "绵羊"],
        "poultry": ["鸡", "鸭", "鹅", "鸽", "家禽", "活禽", "鸵鸟", "鸟"],
        "controversy_ethics": ["残忍", "报应", "杀生", "可怜", "造孽", "心疼", "痛苦", "虐", "不忍", "畜生", "生命", "功德", "罪过", "活的", "活活", "阿弥陀佛"],
        "food_safety_disgust": ["恶心", "不敢吃", "吃不下", "干净", "卫生", "脏", "味", "臭", "屎", "尿", "细菌", "病毒", "寄生", "安全", "毒", "药水", "火碱", "化学", "洗得干净", "疾病", "变质"],
        "meat_quality_process": ["肉质", "口感", "不好吃", "柴", "松", "嫩", "熟了", "烫熟", "水温", "开水", "温度", "浸烫", "泡水", "脱皮", "破皮", "断骨", "骨折", "内伤", "淤血", "打烂", "损伤", "摔伤", "打松", "松散", "烂了"],
        "config_power_capacity": ["三相", "电", "电压", "功率", "多大", "型号", "产量", "一小时", "效率", "流水线", "配置", "设备", "机器", "多重", "尺寸", "场地", "占地", "自动", "半自动", "小型"],
        "quality_after_sales": ["质量", "售后", "保修", "维修", "坏", "耐用", "不耐用", "好用", "不好用", "卡", "堵", "故障", "厂家", "师傅"],
        "manual_vs_machine": ["人工", "手工", "省人工", "快", "慢", "划算", "效率", "成本", "省事", "省力", "方便"],
        "safety_operation": ["安全", "危险", "安全机制", "防护", "手", "伤", "铁屑", "粉碎"],
        "noise_praise": ["哈哈", "笑死", "666", "牛逼", "厉害", "卧槽", "绝了", "[赞]", "[比心]", "[玫瑰]", "神评", "评论区", "生意兴隆", "拍得真好"],
    }

    cats = {k: [] for k in keywords}
    for comment in comments:
        text = comment.get("text") or ""
        for key, words in keywords.items():
            if hit(text, words):
                cats[key].append(comment)

    print(json.dumps({
        "total_comments": len(comments),
        "videos": len(videos),
        "commented_videos": len({c["aweme_id"] for c in comments}),
        "categories": {
            k: {
                "count": len(rows),
                "videos": len({r["aweme_id"] for r in rows}),
                "likes": sum(int(r.get("digg_count") or 0) for r in rows),
            }
            for k, rows in cats.items()
        },
    }, ensure_ascii=False, indent=2))

    print("\nTOP_VIDEOS")
    counts = Counter(c["aweme_id"] for c in comments)
    for aweme_id, count in counts.most_common(20):
        video = video_by_id.get(aweme_id, {})
        print(json.dumps({
            "comments": count,
            "aweme_id": aweme_id,
            "desc": (video.get("desc") or "")[:120],
            "expected": video.get("comment_count"),
            "digg": video.get("digg_count"),
        }, ensure_ascii=False))

    print("\nTOP_COMMENTS")
    for comment in sorted(comments, key=lambda item: int(item.get("digg_count") or 0), reverse=True)[:70]:
        video = video_by_id.get(comment["aweme_id"], {})
        print(json.dumps({
            "likes": comment.get("digg_count") or 0,
            "aweme_id": comment["aweme_id"],
            "video": (video.get("desc") or "")[:60],
            "text": (comment.get("text") or "")[:160],
        }, ensure_ascii=False))

    print("\nCATEGORY_EXAMPLES")
    for key, rows in sorted(cats.items(), key=lambda item: len(item[1]), reverse=True):
        print("##", key, len(rows))
        for comment in sorted(rows, key=lambda item: int(item.get("digg_count") or 0), reverse=True)[:15]:
            video = video_by_id.get(comment["aweme_id"], {})
            print(json.dumps({
                "likes": comment.get("digg_count") or 0,
                "video": (video.get("desc") or "")[:50],
                "text": (comment.get("text") or "")[:120],
            }, ensure_ascii=False))


if __name__ == "__main__":
    main()
