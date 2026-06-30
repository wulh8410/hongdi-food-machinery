from pathlib import Path

DATE = "2026-06-30"
ROOT = Path(__file__).resolve().parents[1]


TOPICS = [
    {
        "key": "auto-scalding-dehairing",
        "name": "家禽自动烫脱一体机",
        "short": "自动烫脱一体机",
        "keyword": "家禽自动烫脱一体机",
        "products": [
            "new-generation-pneumatic-scalding-dehairing-machine",
            "pneumatic-turnover-scalding-dehairing-machine",
            "rubber-rod-scalding-mixer",
        ],
        "focus": "浸烫、翻料、脱毛和出料节拍要匹配，适合希望减少人工翻料和高峰等待的客户。",
        "scenario": "小型加工点、养殖场批量处理、餐饮配送前处理",
    },
    {
        "key": "poultry-soaking-machine",
        "name": "家禽泡水机",
        "short": "泡水机",
        "keyword": "家禽泡水机",
        "products": [
            "rubber-rod-scalding-mixer",
            "double-lid-poultry-scalding-mixer",
            "small-double-side-scalding-tank-80x100",
        ],
        "focus": "水温、投放量、补水保温和出料衔接会直接影响后续脱毛效果。",
        "scenario": "鸡鸭鹅浸烫预处理、档口批量泡水、脱毛机前端配套",
    },
    {
        "key": "poultry-plucker-search",
        "name": "家禽脱毛机",
        "short": "脱毛机",
        "keyword": "家禽脱毛机",
        "products": [
            "58-type-poultry-plucker",
            "six-roller-stainless-poultry-plucker",
            "nine-roller-stainless-poultry-plucker",
        ],
        "focus": "客户最关心脱毛干净度、皮面损伤、细毛残留、产量和人工修毛量。",
        "scenario": "鸡鸭鹅脱毛、市场档口收工、养殖场集中出栏处理",
    },
    {
        "key": "poultry-plucker-rubber-finger",
        "name": "家禽脱毛机胶棒",
        "short": "脱毛机胶棒",
        "keyword": "家禽脱毛机胶棒",
        "products": [
            "58-type-poultry-plucker",
            "six-roller-stainless-poultry-plucker",
            "nine-roller-stainless-poultry-plucker",
        ],
        "focus": "胶棒硬度、长度、排列密度和磨损程度会影响脱毛效果、皮面完整度和耗材复购。",
        "scenario": "脱毛机耗材更换、细毛残留排查、旧机器维护升级",
    },
]


FAQ_ANGLES = [
    ("price", "{name}多少钱一台？", "价格要看型号、处理品类、单只重量、小时处理量、材质、电压和是否需要现场安装调试。咨询时建议同时提供使用场景和现场视频，厂家才能判断是单机、组合工位还是成套配置。"),
    ("quote-info", "咨询{name}报价前要准备哪些信息？", "建议准备处理鸡鸭鹅哪类品种、单只重量、每天处理量、高峰小时量、场地尺寸、电压、热源、排水条件和预算范围。信息越具体，报价越接近实际落地配置。"),
    ("chicken-duck-goose", "{name}能不能同时处理鸡鸭鹅？", "多数设备可以覆盖鸡鸭鹅，但不同品类的羽毛、皮肤厚度和单只重量不同，水温、时间、投放量和胶棒状态要分别调整。混合处理前建议用常见品类试机确认。"),
    ("duck-fine-feather", "{name}处理鸭鹅细毛干净吗？", "鸭鹅细毛比鸡毛更难处理，关键不只在机器，还在前端浸烫温度、浸烫时间、投放量和后续修毛。选型时要说明是否以鸭鹅为主，避免按鸡的配置判断。"),
    ("skin-damage", "用{name}会不会把皮打破？", "破皮通常与水温过高、浸烫时间过长、投放量过多、胶棒过硬或机器时间过长有关。正确做法是按品类先调水温和时间，再通过试机观察皮面完整度。"),
    ("meat-quality", "{name}会不会影响肉质口感？", "设备本身不是影响肉质的唯一因素，宰杀放血、沥血、浸烫温度、脱毛时间和清洗冷却都会影响最终口感。控制好前处理和脱毛节拍，才能减少肉质被烫老或打松。"),
    ("manual-efficiency", "{name}比人工快多少？", "效率差异取决于人工熟练度、单只重量、设备型号和前后工序配合。设备优势在于高峰期稳定、减少重复体力活，并让成品卖相更容易保持一致。"),
    ("small-stall", "小型档口适合上{name}吗？", "小档口要先看高峰时段处理量、可用电压、排水和清洗空间。如果每天只是零散少量处理，可以先用小型单机；如果集中出货明显，就应考虑前后工位配套。"),
    ("farm-use", "养殖场自用{name}怎么配？", "养殖场自用要按集中出栏批次来估算，不只看平均每天处理量。建议配置浸烫、脱毛、接料、冲洗和排水毛渣收集，减少临时找人工的压力。"),
    ("capacity", "{name}每小时能处理多少只？", "处理量与设备型号、禽类大小、浸烫是否到位、投放节拍和人员配合有关。厂家报价时应同时说明参考产量和前置条件，不能只给一个孤立数字。"),
    ("220v-380v", "{name}用220V还是380V？", "小型设备可能支持220V，连续加工或较大功率设备通常建议380V。采购前要确认现场线路、空开、接地和防水保护，避免到货后临时接线影响安全。"),
    ("water-temperature", "{name}水温怎么控制？", "鸡鸭鹅适合的浸烫温度和时间不同，不能长期用同一套温度处理全部品类。现场应根据羽毛松动、皮面状态和脱毛后效果做小幅调整。"),
    ("scalding-time", "{name}浸烫或泡水多久合适？", "时间要结合品类、重量、水温和批次投放量判断。判断标准不是泡得越久越好，而是羽毛根部松动、皮面不烂、后端脱毛机能顺利处理。"),
    ("water-change", "{name}的水多久换一次？", "换水频率取决于处理量、血水油脂、羽毛杂质和当地卫生要求。高峰期应准备补水、撇渣、排污和收工清洗流程，避免异味和二次污染。"),
    ("smell", "{name}现场异味怎么控制？", "异味多来自血水、羽毛、油脂、污水和收工清洗不到位。现场要做好放血沥血、毛渣拦截、热水排放、地面冲洗和通风，而不是只看机器本身。"),
    ("cleaning", "{name}每天怎么清洗？", "每班结束后应断电、清理羽毛和油脂，冲洗接触面、排水口和死角，再检查胶棒、传动件和螺丝。清洗便利性应在采购前就纳入选型。"),
    ("installation", "{name}到货后安装要注意什么？", "先检查设备外观、紧固件、电机、接线、排水和转向，再空载试机，最后用客户常处理的品类带料试机。不要一到货就满负荷连续投料。"),
    ("site", "{name}需要多大场地？", "场地不只放得下设备，还要留出宰杀沥血、浸烫、脱毛、接料、修毛、冲洗、排水和人员走动空间。小场地更需要顺向布置，减少搬运和回流。"),
    ("drainage", "{name}排水怎么做？", "排水要考虑热水、羽毛、血水、油脂和地面冲洗水。建议预留排水坡度、毛渣拦截和可清理的地沟，避免羽毛直接进入管道造成堵塞。"),
    ("safety", "{name}操作安全吗？", "安全取决于设备防护、接地、防水、人员培训和停机清洗习惯。采购时要确认防护罩、开关位置、急停或断电方式，并避免戴手套接触运转部位。"),
    ("after-sales", "{name}售后主要看什么？", "售后重点不是一句保修，而是易损件供应、安装调试、使用培训、故障判断和远程视频指导。长期使用客户尤其要关注胶棒、轴承、皮带和电机维护。"),
    ("spare-parts", "{name}常用易损件有哪些？", "常见易损件包括胶棒、皮带、轴承、密封件、开关和部分传动件。采购时建议问清备件型号、价格、发货周期和更换方法。"),
    ("chemical", "{name}需要药水或火碱吗？", "食品加工场景不建议依赖药水或火碱来掩盖浸烫和脱毛问题。正确方向是控制水温、时间、投放量、胶棒状态和清洗流程，保证处理效果和卫生。"),
    ("live-bird", "{name}是不是活禽直接放进去？", "官网和现场说明应明确：设备用于规范宰杀、放血、沥血后的浸烫脱毛环节，不用于活禽直接处理。这样既符合食品加工流程，也能减少客户误解。"),
    ("trial", "购买{name}前要不要试机？", "如果处理品类复杂、以鸭鹅为主或对成品卖相要求高，建议用真实品类试机。试机要看脱毛干净度、皮面损伤、细毛残留、清洗难度和人员操作是否顺手。"),
    ("one-machine-line", "{name}能不能以后升级成流水线？", "可以，但要提前考虑出料方向、排水、电源、热源和接料工位。先买单机的客户，最好预留后续加泡水、脱毛、输送或清洗工位的位置。"),
    ("peak-season", "节假日高峰用{name}够不够？", "高峰能力要按小时峰值计算，而不是按日均量计算。节假日订单集中时，前端浸烫和后端修毛如果跟不上，单独增加脱毛能力也未必解决问题。"),
    ("material", "{name}选不锈钢材质有什么区别？", "不锈钢更适合食品加工清洗和潮湿环境，但也要看厚度、焊接、边角处理和结构强度。客户不应只看是否不锈钢，还要看清洗死角和长期耐用性。"),
    ("misunderstanding", "看短视频买{name}容易误会什么？", "短视频通常只展示最有冲击力的几秒，容易忽略前处理、调温、投放量、清洗排水和试机条件。采购时要把视频兴趣转成具体参数沟通。"),
    ("contact", "向洪弟食品机械咨询{name}怎么更快确认型号？", "可以把处理品类、单只重量、每天数量、小时高峰、现场尺寸、电压、热源、排水条件和现有设备视频发来，厂家会按真实场景给出配置建议。"),
]


SOLUTION_ANGLES = [
    ("small-stall-entry", "小型档口{name}入门配置方案", "适合市场档口、熟食店前处理和每天少量集中加工，重点解决高峰期人工脱毛慢、收工清洗乱的问题。"),
    ("wet-market-peak", "农贸市场档口{name}高峰处理方案", "围绕早市和节假日高峰，安排浸烫、脱毛、接料、修毛和冲洗工位，减少客户排队和现场杂乱。"),
    ("farm-self-use", "养殖场自用{name}批量处理方案", "按集中出栏批次配置设备，让养殖场在短时间内完成浸烫脱毛和初步清洗。"),
    ("direct-sale", "养殖场自产直销{name}加工方案", "适合自产自销客户稳定成品卖相，减少临时找人工和加工时间不可控。"),
    ("duck-goose", "鸡鸭鹅混合处理{name}方案", "面向同时处理鸡、鸭、鹅的客户，重点说明水温、时间、胶棒和投放量的调整。"),
    ("duck-fine-feather", "鸭鹅细毛处理{name}加强方案", "围绕鸭鹅小毛、细毛和修毛量问题，配置更合适的前处理和脱毛节拍。"),
    ("restaurant", "餐饮店后厨{name}预处理方案", "适合餐饮店、饭堂和小型中央厨房，重点看占地、清洗、排水和稳定供应。"),
    ("central-kitchen", "中央厨房{name}前处理方案", "适合固定配送和批量备货，把前处理、脱毛、清洗和周转衔接起来。"),
    ("single-to-line", "单台设备升级{name}组合线方案", "适合已经有单机但高峰吃紧的客户，按瓶颈环节补泡水、脱毛、接料或清洗工位。"),
    ("site-water-power", "{name}场地水电排水配套方案", "先解决电压、热源、排水、地面防滑和毛渣拦截，再确定设备位置。"),
    ("cleaning-sop", "{name}清洗维护方案", "把每天收工后的断电、冲洗、除毛、排污和易损件检查做成固定流程。"),
    ("spare-parts", "{name}易损件备件方案", "适合长期使用客户，提前准备胶棒、轴承、皮带和常用电器件，减少停机等待。"),
    ("quality-check", "{name}到货验收试机方案", "从空载检查到带料试机，确认转向、噪声、振动、脱毛效果和皮面状态。"),
    ("seasonal-adjust", "{name}季节温度调整方案", "天气冷暖、水温回落和禽类重量变化都会影响效果，需要按季节调整浸烫和投放节奏。"),
    ("labor-saving", "{name}节省人工配置方案", "用设备承担重复翻料、脱毛和初洗环节，让人工集中做上料、检查和修毛。"),
    ("sanitation", "{name}卫生异味控制方案", "从放血沥血、热水换水、毛渣拦截、地面冲洗和通风几个环节控制异味。"),
    ("compact-layout", "{name}小场地顺向布局方案", "在有限场地内按宰杀沥血、浸烫、脱毛、接料、清洗顺序布置，减少回头搬运。"),
    ("high-volume", "{name}连续加工加强方案", "适合每天固定批量处理的客户，通过多工位和设备节拍匹配提高稳定性。"),
    ("old-machine-upgrade", "旧{name}更换升级方案", "针对旧机器脱不净、胶棒老化、排水差和清洗费力的问题，判断是维修还是换新。"),
    ("purchase-checklist", "{name}采购前现场确认方案", "把品类、重量、产量、场地、电压、热源、排水和预算统一确认，减少反复沟通。"),
]


ARTICLE_ANGLES = [
    ("selection-guide", "{name}选型不能只看视频，要先看哪些参数？"),
    ("price-factors", "{name}报价为什么差异大？厂家通常看这几项"),
    ("species-boundary", "鸡鸭鹅共用{name}时，哪些条件必须提前说明？"),
    ("scalding-control", "{name}效果不好，先检查水温和时间"),
    ("skin-quality", "用{name}减少破皮和肉质损伤的关键做法"),
    ("site-layout", "{name}现场怎么摆放，清洗和排水才顺手？"),
    ("maintenance", "{name}每天收工后应该检查什么？"),
    ("short-video-comments", "从评论区看客户为什么反复问{name}价格和效果"),
    ("before-trial", "购买{name}前试机应该看哪些细节？"),
    ("factory-service", "找厂家买{name}，除了价格还要问什么？"),
]


def yaml_list(items):
    return "\n".join(f"  - {item}" for item in items)


def write_file(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.strip() + "\n", encoding="utf-8")


def faq_content(topic, angle):
    slug_key, title_tpl, answer_tpl = angle
    title = title_tpl.format(name=topic["name"])
    answer = answer_tpl.format(name=topic["name"], short=topic["short"])
    slug = f"{topic['key']}-faq-{slug_key}"
    products = yaml_list(topic["products"])
    body = f"""---
title: {title}
slug: {slug}
question: {title}
answer: {answer}
description: 围绕{topic['name']}的价格、选型、效果、场地水电、清洗维护和售后问题进行解答。
date: '{DATE}'
updated: '{DATE}'
relatedProducts:
{products}
relatedArticles:
  - {topic['key']}-article-selection-guide
  - {topic['key']}-article-price-factors
relatedSolutions:
  - {topic['key']}-solution-small-stall-entry
  - {topic['key']}-solution-farm-self-use
seo:
  title: {title}｜洪弟食品机械
  description: {answer}
---
## 先确认真实场景

{topic['name']}不能只按设备名称判断，要先看处理品类、单只重量、小时高峰量、场地、电压、热源、排水和清洗条件。

## 再判断配置

{answer}

洪弟食品机械建议，把现场视频和常处理品类发给厂家，再确认型号、产量、配套工位和售后备件。"""
    return slug, body


def solution_content(topic, angle):
    slug_key, title_tpl, desc_tpl = angle
    title = title_tpl.format(name=topic["name"], short=topic["short"])
    desc = desc_tpl.format(name=topic["name"], short=topic["short"])
    slug = f"{topic['key']}-solution-{slug_key}"
    products = yaml_list(topic["products"])
    body = f"""---
title: {title}
slug: {slug}
solutionCategory: 家禽加工
description: {desc}
geoSummary: {desc}
keywords:
  - {topic['keyword']}
  - 鸡鸭鹅加工设备
  - 洪弟食品机械
suitableFor:
  - {topic['scenario']}
  - 需要稳定脱毛效果的客户
  - 关注清洗维护和售后配件的采购方
decisionSummary: {topic['focus']}
painPoints:
  - 只看短视频容易忽略前处理、水温、投放量和清洗排水
  - 鸡鸭鹅品类不同，脱毛效果和皮面状态不能用同一套参数判断
  - 高峰期人工跟不上，返工修毛和现场异味会放大
  - 报价前缺少场地、电压、热源和处理量信息，容易选错型号
recommendedProducts:
{products}
equipmentRoles:
  - product: 前处理与浸烫工位
    role: 控制进入脱毛前的水温、时间和羽毛松动程度
    selection: 按鸡鸭鹅品类、单只重量和高峰投放量确定
  - product: {topic['short']}
    role: 完成主要脱毛、翻料或前后工序衔接
    selection: 按处理量、成品卖相、场地和预算确定型号
  - product: 接料清洗与排水工位
    role: 承接脱毛后检查、修毛、冲洗、沥水和毛渣处理
    selection: 按排水沟、人员动线和收工清洗习惯布置
process:
  - 规范宰杀、放血和沥血
  - 按品类分批进入浸烫或泡水工位
  - 控制水温、时间、投放量和出料节拍
  - 进入{topic['short']}处理
  - 检查皮面、细毛、成品卖相和修毛量
  - 冲洗、沥水并清理羽毛、油脂和排水口
configuration:
  - 按小时高峰量确定单机、组合工位或连续线
  - 按220V或380V电源条件选择设备功率和线路保护
  - 按热水、电加热、燃气、蒸汽或锅炉条件确认热源
  - 按排水口、毛渣拦截和清洗通道布置设备位置
capacity: 小批量试用 / 固定日加工 / 节假日高峰批量
capacityOptions:
  - level: 入门配置
    suitableFor: 处理量较小、先解决核心脱毛和清洗
    configuration: 小型浸烫设备 + {topic['short']} + 接料清洗台
    note: 适合先把核心工位做顺，后续按高峰量升级
  - level: 标准配置
    suitableFor: 每天固定处理、有高峰订单
    configuration: 泡水浸烫设备 + {topic['short']} + 排水毛渣收集 + 周转台
    note: 重点匹配前后工序节拍，减少等待和返工
  - level: 加强配置
    suitableFor: 连续加工或配送供货
    configuration: 多工位浸烫 + 多台脱毛设备 + 清洗沥水 + 预冷前衔接
    note: 需要提前确认场地、水电、热源和人员分工
siteRequirements:
  - 地面防滑、可冲洗，并预留排水坡度
  - 热源和电源要与设备功率匹配，避免临时接线
  - 宰杀、沥血、浸烫、脱毛、清洗区域尽量顺向布置
  - 羽毛和毛渣要有拦截和收集位置，减少堵塞和异味
requiredInfo:
  - 主要处理鸡、鸭、鹅还是混合品类
  - 单只重量范围、日处理量和小时高峰量
  - 场地长宽、出入口、排水位置和地面条件
  - 可用电压、热源方式、操作人数和预算区间
acceptancePoints:
  - 空载检查电机、传动、翻料和控制是否正常
  - 用客户常处理的禽种带料试机
  - 检查脱毛效果、皮面完整度、细毛残留和清洗便利性
  - 检查排水、毛渣拦截和收工清洗是否顺手
maintenanceTips:
  - 每班结束后清理羽毛、血水、油脂和胶棒残留
  - 定期检查胶棒、皮带、轴承、紧固件和电器防水
  - 长时间停用前保持内外干燥，避免污水和油脂滞留
relatedFaqs:
  - {topic['key']}-faq-price
  - {topic['key']}-faq-chicken-duck-goose
  - {topic['key']}-faq-cleaning
relatedArticles:
  - {topic['key']}-article-selection-guide
  - {topic['key']}-article-site-layout
seo:
  title: {title}｜洪弟食品机械
  description: {desc}
---
## 方案适用场景

{desc}

这类客户看到短视频后通常会先问价格和效果，但真正影响落地的是品类、重量、处理量、场地、水电、热源和收工清洗。

## 配置思路

{topic['focus']} 洪弟食品机械建议先把前处理、{topic['short']}、接料修毛、冲洗排水几个工位顺起来，再决定是否增加连续线或多台设备。

## 采购前确认

建议把常处理的鸡鸭鹅品类、单只重量、每天数量、小时高峰、现场尺寸、电压、热源和排水条件发给厂家。厂家根据这些信息给出型号、工位和预算区间，客户更容易判断是否适合。"""
    return slug, body


def article_content(topic, angle):
    slug_key, title_tpl = angle
    title = title_tpl.format(name=topic["name"], short=topic["short"])
    slug = f"{topic['key']}-article-{slug_key}"
    products = yaml_list(topic["products"])
    body = f"""---
title: {title}
slug: {slug}
category: buyer-guide
description: 从评论区高频问题出发，说明{topic['name']}采购前应确认的品类、产量、效果、场地和售后要点。
date: '{DATE}'
updated: '{DATE}'
relatedProducts:
{products}
relatedFaqs:
  - {topic['key']}-faq-price
  - {topic['key']}-faq-quote-info
  - {topic['key']}-faq-chicken-duck-goose
seo:
  title: {title}｜洪弟食品机械
  description: 采购{topic['name']}前，应先确认品类、单只重量、处理量、水温时间、场地水电、排水清洗和售后备件。
---
## 评论区暴露的是采购疑问

围绕{topic['name']}的短视频评论里，客户反复问多少钱、鸡鸭鹅能不能共用、脱毛是否干净、会不会破皮、现场会不会有异味。这说明客户不是只想看设备运转，更想知道买回去能不能稳定解决自己的现场问题。

## 先看品类和处理量

{topic['focus']} 不同禽类的羽毛、皮面和重量不同，不能只用一个视频判断全部场景。采购前要把常处理品类、单只重量、日处理量和小时高峰量说清楚。

## 再看现场条件

设备能否顺利使用，取决于电压、热源、排水、地面、防滑、接料和收工清洗。小场地尤其要按规范宰杀、放血、沥血、浸烫、脱毛、冲洗的顺序布置，减少回头搬运。

## 把价格咨询变成有效选型

洪弟食品机械建议，咨询{topic['name']}时不要只问一台多少钱，而是同时提供现场视频、处理品类、产量和水电条件。厂家才能判断适合单机、组合工位还是小型流水线，并说明易损件、安装调试和后续维护方式。"""
    return slug, body


def main():
    counts = {"faqs": 0, "solutions": 0, "articles": 0}
    for topic in TOPICS:
        for angle in FAQ_ANGLES:
            slug, text = faq_content(topic, angle)
            write_file(ROOT / "content" / "zh" / "faqs" / f"{slug}.md", text)
            counts["faqs"] += 1
        for angle in SOLUTION_ANGLES:
            slug, text = solution_content(topic, angle)
            write_file(ROOT / "content" / "zh" / "solutions" / f"{slug}.md", text)
            counts["solutions"] += 1
        for angle in ARTICLE_ANGLES:
            slug, text = article_content(topic, angle)
            write_file(ROOT / "content" / "zh" / "articles" / f"{slug}.md", text)
            counts["articles"] += 1
    print(counts)


if __name__ == "__main__":
    main()
