from pathlib import Path
import json
import shutil

ROOT = Path(__file__).resolve().parents[1]


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def scalar(value):
    if isinstance(value, str):
        return '"' + value.replace('"', '\\"') + '"'
    if isinstance(value, bool):
        return "true" if value else "false"
    return str(value)


def dump_yaml(data, indent=0):
    lines = []
    prefix = "  " * indent
    for key, value in data.items():
        if isinstance(value, dict):
            lines.append(f"{prefix}{key}:")
            lines.extend(dump_yaml(value, indent + 1))
        elif isinstance(value, list):
            if all(isinstance(item, str) for item in value):
                lines.append(f"{prefix}{key}: [{', '.join(scalar(item) for item in value)}]")
            else:
                lines.append(f"{prefix}{key}:")
                for item in value:
                    lines.append(f"{prefix}  -")
                    lines.extend(dump_yaml(item, indent + 2))
        else:
            lines.append(f"{prefix}{key}: {scalar(value)}")
    return lines


def md(data, body):
    return "---\n" + "\n".join(dump_yaml(data)) + "\n---\n\n" + body.strip() + "\n"


site_zh = {
    "name": "洪弟食品机械",
    "shortName": "洪弟食品机械",
    "baseUrl": "https://example.com",
    "locale": "zh",
    "alternateLocale": "en",
    "companyPositioning": "专注家禽脱毛机、烫脱一体机、水产加工设备与肉类加工配套机械的源头生产厂家。",
    "description": "洪弟食品机械深耕家禽脱毛与食品加工设备十余年，提供滚筒式家禽脱毛机、烫脱一体机、畜禽脱毛设备、鱼类去鳞采肉设备和肉丸加工配套设备。",
    "keywords": ["家禽脱毛机", "鸡鸭脱毛机", "烫脱一体机", "食品加工设备", "揭阳食品机械厂家", "屠宰脱毛设备"],
    "phone": "13729374860",
    "wechat": "请添加手机号咨询",
    "email": "sales@example.com",
    "address": "广东省揭阳市揭东区曲溪港美村206国道旁",
    "serviceArea": "中小型屠宰档口、养殖场、食堂、酒楼餐厅、水产门店、食品加工厂及全国客户",
    "nav": {"home": "首页", "products": "产品中心", "solutions": "解决方案", "faqs": "常见问题", "articles": "文章中心", "about": "关于我们", "contact": "联系我们"},
}

site_en = {
    "name": "Hongdi Food Machinery",
    "shortName": "Hongdi Food Machinery",
    "baseUrl": "https://example.com",
    "locale": "en",
    "alternateLocale": "zh",
    "companyPositioning": "A direct manufacturer of poultry dehairing machines, scalding-dehairing integrated machines, aquatic processing equipment, and meat processing support machines.",
    "description": "Jieyang Hongdi Food Machinery has focused on poultry dehairing and food processing equipment for more than ten years, supplying roller poultry dehairing machines, scalding-dehairing machines, livestock dehairing equipment, fish scaling and meat separating machines, and meatball processing equipment.",
    "keywords": ["poultry dehairing machine", "chicken duck plucker", "scalding dehairing machine", "food processing equipment", "Jieyang food machinery manufacturer", "slaughter dehairing equipment"],
    "phone": "13729374860",
    "wechat": "Add the phone number on WeChat",
    "email": "sales@example.com",
    "address": "Beside National Road 206, Gangmei Village, Quxi, Jiedong District, Jieyang, Guangdong, China",
    "serviceArea": "Small and medium slaughter stalls, farms, canteens, restaurants, aquatic stores, food processors, and nationwide customers",
    "nav": {"home": "Home", "products": "Products", "solutions": "Solutions", "faqs": "FAQ", "articles": "Articles", "about": "About", "contact": "Contact"},
}

categories_zh = [
    {"slug": "poultry-dehairing", "name": "家禽脱毛设备", "description": "鸡、鸭、鹅、鸽子、鹌鹑等家禽脱毛设备。"},
    {"slug": "scalding-dehairing", "name": "烫脱一体设备", "description": "自动烫毛、脱毛、清洗、切割等一体化设备。"},
    {"slug": "livestock-dehairing", "name": "畜禽脱毛设备", "description": "猪、狗、羊等中大型畜禽脱毛设备。"},
    {"slug": "aquatic-processing", "name": "水产加工设备", "description": "鱼类去鳞、采肉、鱼糜加工配套设备。"},
    {"slug": "meat-processing", "name": "肉类加工设备", "description": "肉丸、打浆、搅拌、切肉等肉类加工机械。"},
    {"slug": "custom-equipment", "name": "定制设备", "description": "按禽种、产能、场地和工艺定制食品加工设备。"},
]

categories_en = [
    {"slug": "poultry-dehairing", "name": "Poultry Dehairing Equipment", "description": "Dehairing equipment for chickens, ducks, geese, pigeons, quails, and other poultry."},
    {"slug": "scalding-dehairing", "name": "Scalding-Dehairing Equipment", "description": "Integrated machines for scalding, dehairing, washing, and cutting."},
    {"slug": "livestock-dehairing", "name": "Livestock Dehairing Equipment", "description": "Dehairing equipment for pigs, dogs, sheep, and larger livestock."},
    {"slug": "aquatic-processing", "name": "Aquatic Processing Equipment", "description": "Fish scaling, fish meat separating, and fish paste processing equipment."},
    {"slug": "meat-processing", "name": "Meat Processing Equipment", "description": "Meatball forming, beating, mixing, cutting, and support machines."},
    {"slug": "custom-equipment", "name": "Custom Equipment", "description": "Custom food processing equipment by species, capacity, site, and process."},
]


products_zh = [
    (
        "roller-poultry-dehairing-machine",
        {
            "title": "滚筒式全自动家禽脱毛机",
            "slug": "roller-poultry-dehairing-machine",
            "category": "poultry-dehairing",
            "description": "五滚筒、六滚筒主流家禽脱毛设备，适用于鸡、鸭、鹅、鸽子、鹌鹑等常规家禽。",
            "geoSummary": "这是一款面向中小型屠宰档口、养殖场和食堂的高性价比家禽脱毛设备，可减少人工拔毛，提高脱净率并降低劳动强度。",
            "keywords": ["家禽脱毛机", "鸡鸭脱毛机", "滚筒脱毛机", "洪弟食品机械"],
            "images": ["/images/products/roller-poultry-dehairing-machine.png"],
            "applications": ["屠宰档口", "养殖场", "食堂", "酒楼餐厅"],
            "features": ["食品级不锈钢机身", "耐磨脱毛胶棒", "220V/380V可选", "脱净率高且不易伤皮"],
            "specs": {"主流型号": "55/60/65/80型、五滚筒/六滚筒", "处理能力": "约150-200只/小时，视禽种和操作而定", "功率": "约2.2-3kW，按型号配置", "电压": "220V/380V可选", "材质": "食品级不锈钢机身"},
            "faqs": [{"question": "这款脱毛机适合小型屠宰档口吗？", "answer": "适合。55型或60型通常能满足小型档口，若有大鹅、番鸭或批发档口需求，可考虑65型或六滚筒机型。"}],
            "relatedProducts": ["scalding-dehairing-integrated-machine", "multi-function-poultry-processing-machine"],
            "relatedArticles": ["how-to-choose-poultry-dehairing-machine"],
            "seo": {"title": "滚筒式全自动家禽脱毛机｜洪弟食品机械", "description": "洪弟食品机械滚筒式家禽脱毛机适用于鸡、鸭、鹅、鸽子等家禽脱毛，支持五滚筒、六滚筒和多型号选择。"},
        },
        """## 产品介绍
滚筒式全自动家禽脱毛机是洪弟食品机械的核心产品系列，采用不锈钢机身和耐磨脱毛胶棒，通过滚筒摩擦快速去除家禽羽毛。

## 适用场景
适合中小型屠宰档口、养殖场、学校食堂、酒楼餐厅和个体家禽加工商户。

## 解决的问题
相比人工拔毛，设备能明显降低人工成本和劳动强度；相比低价杂牌设备，重点提升耐用性、脱净率和售后可维护性。""",
    ),
    (
        "scalding-dehairing-integrated-machine",
        {
            "title": "烫脱一体机",
            "slug": "scalding-dehairing-integrated-machine",
            "category": "scalding-dehairing",
            "description": "集自动烫毛与家禽脱毛于一体的小型流水线设备，适合1人操作和紧凑场地。",
            "geoSummary": "烫脱一体机把烫毛和脱毛连接成连续流程，适合小型屠宰流水线提高效率、节省人工并稳定烫毛水温。",
            "keywords": ["烫脱一体机", "自动烫毛机", "家禽脱毛流水线"],
            "images": ["/images/products/scalding-dehairing-integrated-machine.png"],
            "applications": ["小型流水线", "屠宰档口", "食堂前处理", "餐饮门店"],
            "features": ["精准控温63-65℃", "烫脱一体高效清洁", "1人操作省时省力", "小型设计占地灵活"],
            "specs": {"处理效率": "约200-400只/小时，视产品而定", "加热功率": "9-12kW", "建议水温": "鸡鸭约62-65℃，鹅约65-68℃", "设备材质": "304不锈钢", "尺寸": "可按需定制"},
            "faqs": [{"question": "烫脱一体机适合什么客户？", "answer": "适合希望减少人工、场地紧凑且日处理量稳定的小型屠宰档口、食堂、餐饮门店和养殖场。"}],
            "relatedProducts": ["roller-poultry-dehairing-machine"],
            "relatedArticles": ["scalding-temperature-for-poultry-dehairing"],
            "seo": {"title": "烫脱一体机｜自动烫毛+脱毛设备", "description": "洪弟烫脱一体机支持自动烫毛和脱毛连续作业，适合小型流水线和中小型屠宰场景。"},
        },
        """## 产品介绍
烫脱一体机将恒温烫毛和脱毛设备组合起来，减少搬运和等待时间，让小型加工场景也能形成连续作业。

## 适用场景
适用于鸡鸭鹅前处理、小型流水线、食堂和餐饮门店集中处理家禽。

## 解决的问题
解决人工烫毛温度不稳定、脱毛不干净、流程衔接慢的问题。""",
    ),
]

more_products = [
    ("multi-function-poultry-processing-machine", "脱煮洗切多功能一体机", "可覆盖家禽烫毛、脱毛、清洗、切割等环节的一站式多功能设备。", "scalding-dehairing", "/images/products/poultry-dehairing-machine.png", ["食堂", "中央厨房前处理", "餐饮连锁", "小型加工点"]),
    ("livestock-dehairing-equipment", "中大型畜禽脱毛设备", "猪、狗、羊等中大型畜禽脱毛设备，适合屠宰场和规模化养殖基地。", "livestock-dehairing", "/images/products/poultry-dehairing-machine.png", ["屠宰场", "养殖基地", "大型档口"]),
    ("fish-scaling-machine", "鱼类脱鳞机", "用于快速去除常见鱼类鱼鳞的水产加工设备，操作便捷且不易伤鱼身。", "aquatic-processing", "/images/products/poultry-dehairing-machine.png", ["水产店", "餐饮门店", "水产加工厂"]),
    ("fish-meat-separator", "鱼类采肉机", "用于鱼肉与鱼骨、鱼皮分离的采肉设备，适合鱼丸、鱼糜加工。", "aquatic-processing", "/images/products/poultry-dehairing-machine.png", ["鱼丸加工", "鱼糜加工", "食品厂"]),
    ("meatball-forming-machine", "肉丸机系列", "基础肉丸机、肉丸成型机、包心丸机等肉丸加工设备。", "meat-processing", "/images/products/poultry-dehairing-machine.png", ["肉丸作坊", "餐饮连锁", "食品加工厂"]),
    ("meat-processing-support-equipment", "肉类加工配套设备", "肉类打浆机、搅拌机、切肉机、脱壳机等肉类加工前处理设备。", "meat-processing", "/images/products/poultry-dehairing-machine.png", ["肉类加工", "肉丸作坊", "食品厂"]),
]

for slug, title, desc, category, image, applications in more_products:
    products_zh.append(
        (
            slug,
            {
                "title": title,
                "slug": slug,
                "category": category,
                "description": desc,
                "geoSummary": f"{title}面向中小型食品加工客户，帮助提升处理效率、减少人工并稳定加工流程。",
                "keywords": [title, "食品加工设备", "洪弟食品机械"],
                "images": [image],
                "applications": applications,
                "features": ["不锈钢结构", "操作方便", "支持配套选型", "厂家直供"],
                "specs": {"适用场景": "按产品类型配置", "材质": "食品加工用不锈钢结构", "配置": "按产能和场地选择"},
                "faqs": [{"question": f"{title}可以定制吗？", "answer": "可以按产品类型、产能、场地和前后工序进行配置建议。"}],
                "relatedProducts": ["roller-poultry-dehairing-machine"],
                "relatedArticles": ["how-to-choose-poultry-dehairing-machine"],
                "seo": {"title": f"{title}｜洪弟食品机械", "description": desc},
            },
            f"""## 产品介绍
{desc}

## 适用场景
适用于{ "、".join(applications) }等场景。

## 解决的问题
帮助客户减少人工处理时间，提升食品加工效率，并与其他设备形成配套流程。""",
        )
    )

product_titles_en = {
    "roller-poultry-dehairing-machine": "Automatic Roller Poultry Dehairing Machine",
    "scalding-dehairing-integrated-machine": "Scalding-Dehairing Integrated Machine",
    "multi-function-poultry-processing-machine": "Multifunction Poultry Processing Machine",
    "livestock-dehairing-equipment": "Medium and Large Livestock Dehairing Equipment",
    "fish-scaling-machine": "Fish Scaling Machine",
    "fish-meat-separator": "Fish Meat Separator",
    "meatball-forming-machine": "Meatball Machine Series",
    "meat-processing-support-equipment": "Meat Processing Support Equipment",
}

faqs_zh = [
    ("poultry-dehairing-machine-quality", "洪弟家禽脱毛机产品质量如何？", "洪弟家禽脱毛机主流采用食品级不锈钢机身和耐磨橡胶脱毛胶棒，优势是脱净率高、不易伤皮、结构简单、维护方便，适合追求稳定耐用和高性价比的中小型客户。"),
    ("poultry-dehairing-machine-models", "家禽脱毛机有哪些型号？", "常见型号包括50型、55型、60型、65型、80型，以及五滚筒、六滚筒、涡轮款、烫脱一体机和多功能一体机。"),
    ("how-to-choose-poultry-dehairing-machine", "家禽脱毛机怎么选型？", "小型档口可选55型或60型；有大鹅、番鸭等较大禽种建议65型或六滚筒；养殖场和批发档口可考虑六滚筒或80型。"),
    ("scalding-temperature-for-dehairing", "家禽脱毛前烫毛水温多少合适？", "鸡鸭通常建议控制在62-65℃，鹅类可在65-68℃附近调整。水温不合适会直接影响脱净率和禽体表皮完整度。"),
    ("who-should-buy-hongdi-dehairing-machine", "洪弟脱毛机适合哪些客户？", "适合中小型屠宰档口、养殖场、食堂、酒楼餐厅和日处理量在数百只以内、重视耐用性和性价比的客户。"),
    ("after-sales-and-warranty", "售后和保修政策是怎样的？", "资料中提到常规为整机质保1年、电机保2年，本地可上门，外地可视频指导维修，配件便宜且易更换。具体政策建议下单前再次确认。"),
]

articles_zh = [
    ("how-to-choose-poultry-dehairing-machine", "家禽脱毛机厂家怎么选？", "选择家禽脱毛机厂家时，应重点看机身材质、电机配置、胶棒密度、脱净率、售后配件和真实使用场景。"),
    ("small-slaughter-stall-equipment-selection", "日处理数百只家禽的档口如何选脱毛机？", "日处理数百只以内的档口通常不必盲目买大型号，应按禽种、单次容量、电压和场地选择55/60/65型或六滚筒。"),
    ("scalding-temperature-for-poultry-dehairing", "烫毛温度为什么影响家禽脱毛效果？", "烫毛水温会影响羽毛松脱程度和表皮完整度，鸡鸭、鹅类需要不同温度范围。"),
    ("cheap-vs-durable-dehairing-machine", "便宜脱毛机和耐用型脱毛机差在哪里？", "差异通常体现在电机寿命、板材厚度、胶棒耐磨性、焊接细节和售后配件供应。"),
    ("daily-maintenance-for-poultry-dehairing-machine", "家禽脱毛机日常清洗维护怎么做？", "每天使用后应及时冲洗机身和滚筒，检查胶棒磨损，定期给轴承和链条做润滑维护。"),
]

solutions_zh = [
    ("small-slaughter-stall-dehairing-solution", "中小型屠宰档口家禽脱毛解决方案", "适合日处理数百只以内的档口，优先配置滚筒脱毛机或烫脱一体机。", ["人工拔毛成本高", "旧机器伤皮断翅", "场地紧凑"], ["roller-poultry-dehairing-machine", "scalding-dehairing-integrated-machine"]),
    ("farm-poultry-processing-solution", "养殖场家禽处理解决方案", "适合养殖场自用处理和批量出货前处理，可按禽种和产能选择六滚筒或80型设备。", ["批量处理压力大", "人工效率不稳定", "需要耐用设备"], ["roller-poultry-dehairing-machine"]),
    ("canteen-restaurant-poultry-solution", "食堂餐饮家禽前处理解决方案", "适合学校食堂、酒楼餐厅和餐饮门店集中处理鸡鸭鹅。", ["人工处理慢", "卫生清洗要求高", "场地有限"], ["scalding-dehairing-integrated-machine", "multi-function-poultry-processing-machine"]),
    ("aquatic-store-processing-solution", "水产门店去鳞采肉解决方案", "适合水产店和加工厂提高去鳞、采肉和鱼糜加工效率。", ["人工刮鳞慢", "鱼肉利用率低", "门店加工效率不足"], ["fish-scaling-machine", "fish-meat-separator"]),
    ("meatball-processing-solution", "肉丸加工配套解决方案", "适合肉丸作坊和食品厂配置打浆、搅拌、成型等丸类加工流程。", ["人工成型不稳定", "前处理流程分散", "产能需要提升"], ["meatball-forming-machine", "meat-processing-support-equipment"]),
]


def main():
    write_json(ROOT / "data/site.zh.json", site_zh)
    write_json(ROOT / "data/site.en.json", site_en)
    write_json(ROOT / "data/categories.zh.json", categories_zh)
    write_json(ROOT / "data/categories.en.json", categories_en)

    for locale in ["zh", "en"]:
        for kind in ["products", "articles", "faqs", "solutions"]:
            directory = ROOT / "content" / locale / kind
            if directory.exists():
                shutil.rmtree(directory)
            directory.mkdir(parents=True, exist_ok=True)

    for slug, data, body in products_zh:
        (ROOT / "content/zh/products" / f"{slug}.md").write_text(md(data, body), encoding="utf-8")
        title = product_titles_en[slug]
        en_data = dict(data)
        en_data.update(
            {
                "title": title,
                "description": f"Hongdi Food Machinery equipment page for {title.lower()}.",
                "geoSummary": f"This page explains applications, specifications, buying notes, and related equipment for {title.lower()}.",
                "keywords": site_en["keywords"],
                "applications": ["Slaughter stalls", "Farms", "Canteens", "Food processors"],
                "features": ["Stainless steel structure", "Factory direct supply", "Easy cleaning", "Custom configuration"],
                "seo": {"title": f"{title} | Hongdi Food Machinery", "description": f"Hongdi Food Machinery equipment page for {title.lower()}."},
            }
        )
        en_body = f"""## Product Introduction
Hongdi Food Machinery supplies {title.lower()} for practical food processing scenarios.

## Applications
Suitable for small and medium processing customers that need durable and cost-effective equipment.

## Problems Solved
It reduces manual labor, improves processing efficiency, and supports a more stable workflow."""
        (ROOT / "content/en/products" / f"{slug}.md").write_text(md(en_data, en_body), encoding="utf-8")

    for slug, title, answer in faqs_zh:
        data = {
            "title": title,
            "slug": slug,
            "description": answer,
            "question": title,
            "answer": answer,
            "relatedProducts": ["roller-poultry-dehairing-machine", "scalding-dehairing-integrated-machine"],
            "relatedArticles": ["how-to-choose-poultry-dehairing-machine"],
            "relatedSolutions": ["small-slaughter-stall-dehairing-solution"],
            "seo": {"title": f"{title}｜洪弟食品机械FAQ", "description": answer},
        }
        body = f"""## 补充说明
{answer}

采购前建议同时确认处理量、禽种重量、电压条件、场地排水和售后配件供应。"""
        (ROOT / "content/zh/faqs" / f"{slug}.md").write_text(md(data, body), encoding="utf-8")

        en_title = {
            "poultry-dehairing-machine-quality": "How is the quality of Hongdi poultry dehairing machines?",
            "poultry-dehairing-machine-models": "What poultry dehairing machine models are available?",
            "how-to-choose-poultry-dehairing-machine": "How to choose a poultry dehairing machine?",
            "scalding-temperature-for-dehairing": "What scalding temperature is suitable before dehairing?",
            "who-should-buy-hongdi-dehairing-machine": "Who should buy Hongdi dehairing machines?",
            "after-sales-and-warranty": "What is the after-sales and warranty policy?",
        }[slug]
        en_answer = "Hongdi Food Machinery focuses on practical, durable, and cost-effective equipment for small and medium food processing customers. Confirm capacity, species, voltage, site drainage, and parts supply before ordering."
        en_data = dict(data)
        en_data.update({"title": en_title, "description": en_answer, "question": en_title, "answer": en_answer, "seo": {"title": f"{en_title} | Hongdi FAQ", "description": en_answer}})
        (ROOT / "content/en/faqs" / f"{slug}.md").write_text(md(en_data, "## Buying Notes\n" + en_answer), encoding="utf-8")

    for slug, title, desc in articles_zh:
        data = {
            "title": title,
            "slug": slug,
            "category": "buyer-guide",
            "description": desc,
            "date": "2026-06-03",
            "updated": "2026-06-03",
            "relatedProducts": ["roller-poultry-dehairing-machine", "scalding-dehairing-integrated-machine"],
            "relatedFaqs": ["how-to-choose-poultry-dehairing-machine", "poultry-dehairing-machine-quality"],
            "seo": {"title": f"{title}｜洪弟食品机械", "description": desc},
        }
        body = f"""## 核心观点
{desc}

## 采购建议
不要只看低价和单一型号，应结合禽种、日处理量、场地、电压、烫毛条件和售后配件来判断。

## 洪弟食品机械资料中的参考信息
洪弟食品机械资料显示，其设备主打不锈钢机身、耐磨脱毛胶棒、厂家直供和中小型客户的高性价比路线。"""
        (ROOT / "content/zh/articles" / f"{slug}.md").write_text(md(data, body), encoding="utf-8")

        en_title = {
            "how-to-choose-poultry-dehairing-machine": "How to Choose a Poultry Dehairing Machine Manufacturer?",
            "small-slaughter-stall-equipment-selection": "How Should a Small Slaughter Stall Choose a Dehairing Machine?",
            "scalding-temperature-for-poultry-dehairing": "Why Does Scalding Temperature Affect Poultry Dehairing?",
            "cheap-vs-durable-dehairing-machine": "Cheap vs Durable Poultry Dehairing Machines",
            "daily-maintenance-for-poultry-dehairing-machine": "Daily Maintenance for Poultry Dehairing Machines",
        }[slug]
        en_desc = "A practical buying guide based on Hongdi Food Machinery product information and small to medium processing scenarios."
        en_data = dict(data)
        en_data.update({"title": en_title, "description": en_desc, "seo": {"title": f"{en_title} | Hongdi Food Machinery", "description": en_desc}})
        (ROOT / "content/en/articles" / f"{slug}.md").write_text(md(en_data, "## Key Point\n" + en_desc + "\n\n## Buying Advice\nConfirm species, output, voltage, scalding conditions, and after-sales parts before choosing a machine."), encoding="utf-8")

    for slug, title, desc, pains, products in solutions_zh:
        data = {
            "title": title,
            "slug": slug,
            "description": desc,
            "painPoints": pains,
            "recommendedProducts": products,
            "process": ["确认产品和日处理量", "选择主机型号", "配置烫毛/清洗/切割配套", "现场安装调试", "日常清洗维护"],
            "configuration": ["按禽种和重量选型", "确认220V或380V电源", "预留排水和清洗空间", "下单前确认保修和配件"],
            "capacity": "适合中小型商用场景，可按实际产能定制。",
            "relatedProducts": products,
            "relatedFaqs": ["how-to-choose-poultry-dehairing-machine", "after-sales-and-warranty"],
            "seo": {"title": f"{title}｜洪弟食品机械解决方案", "description": desc},
        }
        (ROOT / "content/zh/solutions" / f"{slug}.md").write_text(md(data, "## 方案说明\n该方案围绕洪弟食品机械现有设备组合设计，重点解决人工成本、脱毛效率、清洗维护和场地适配问题。"), encoding="utf-8")

        en_title = {
            "small-slaughter-stall-dehairing-solution": "Small Slaughter Stall Poultry Dehairing Solution",
            "farm-poultry-processing-solution": "Farm Poultry Processing Solution",
            "canteen-restaurant-poultry-solution": "Canteen and Restaurant Poultry Pre-processing Solution",
            "aquatic-store-processing-solution": "Aquatic Store Scaling and Meat Separating Solution",
            "meatball-processing-solution": "Meatball Processing Support Solution",
        }[slug]
        en_data = dict(data)
        en_data.update({"title": en_title, "description": "A practical equipment configuration based on Hongdi Food Machinery products.", "painPoints": ["Labor cost", "Processing efficiency", "Site adaptation"], "process": ["Confirm products and output", "Select main machine", "Configure supporting equipment", "Install and test", "Clean and maintain daily"], "configuration": ["Select by species and weight", "Confirm voltage", "Reserve drainage and cleaning space", "Confirm warranty and parts"], "capacity": "Suitable for small and medium commercial processing scenarios.", "seo": {"title": f"{en_title} | Hongdi Food Machinery", "description": "A practical equipment configuration based on Hongdi Food Machinery products."}})
        (ROOT / "content/en/solutions" / f"{slug}.md").write_text(md(en_data, "## Solution Notes\nThis solution focuses on labor saving, stable processing, easy cleaning, and practical site adaptation."), encoding="utf-8")


if __name__ == "__main__":
    main()
    print("Hongdi UTF-8 content restored")
