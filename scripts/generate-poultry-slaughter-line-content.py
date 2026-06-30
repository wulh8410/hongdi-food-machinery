from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-06-29"

PRODUCTS = [
    "new-generation-pneumatic-scalding-dehairing-machine",
    "pneumatic-turnover-scalding-dehairing-machine",
    "double-lid-poultry-scalding-mixer",
    "rubber-rod-scalding-mixer",
    "small-double-side-scalding-tank-80x100",
    "58-type-poultry-plucker",
    "64-type-bird-plucker",
    "three-roller-stainless-poultry-plucker",
    "six-roller-stainless-poultry-plucker",
    "stainless-nine-drum-poultry-plucker",
    "nine-roller-stainless-poultry-plucker",
]


SOLUTIONS = [
    ("small-stall-live-poultry-slaughter-line", "小型档口活禽宰杀流水线配置方案", "小型档口", "每天几十只到二三百只鸡鸭鹅，重点解决高峰排队、浸烫脱毛不稳、排水清洗和人工劳动强度。"),
    ("wet-market-poultry-slaughter-drainage-layout", "农贸市场家禽宰杀档口排水清洗布置方案", "小型档口", "适合市场档口和临街加工点，重点规划宰杀、沥血、浸烫、脱毛、冲洗和毛渣收集的动线。"),
    ("small-stall-220v-poultry-processing-line", "只有220V电的小型家禽加工点配置方案", "小型档口", "面向无法接三相电的小档口，优先配置可落地的小型泡水和脱毛设备，避免买回去不能运行。"),
    ("festival-peak-poultry-slaughter-stall-solution", "节假日高峰鸡鸭鹅宰杀档口处理方案", "小型档口", "适合春节、中秋和周末高峰明显的档口，重点解决短时间订单集中、人工跟不上和清洗收尾压力。"),
    ("small-stall-scalding-plucking-core-workstation", "小档口浸烫脱毛核心工位方案", "小型档口", "不追求完整大线，先把热水浸烫、脱毛、修毛和排水四个核心环节做顺。"),
    ("farm-self-use-poultry-slaughter-line", "养殖场自用鸡鸭鹅宰杀流水线方案", "养殖场自用", "适合养殖场集中出栏、自用加工或本地配送，重点解决批量处理、成品稳定和现场卫生。"),
    ("farm-batch-poultry-scalding-dehairing-line", "养殖场批量浸烫脱毛加工线方案", "养殖场自用", "按批次处理鸡鸭鹅，配置泡水、脱毛、冲洗和周转工位，减少人工翻料与搬运。"),
    ("farm-direct-sale-poultry-processing-line", "养殖场自产直销家禽处理线方案", "养殖场自用", "面向自产直销、团购和本地配送客户，强调卖相、卫生、包装前清洗和处理节拍。"),
    ("farm-poultry-slaughter-line-water-power-site", "养殖场家禽宰杀线水电场地准备方案", "养殖场自用", "帮助客户在设备到场前确认电压、热源、排水、地面坡度、通风和清洗条件。"),
    ("farm-poultry-line-labor-saving-solution", "养殖场减少人工的家禽宰杀线升级方案", "养殖场自用", "从人工宰杀拔毛升级为泡水脱毛组合工位，重点减少高峰用工和长时间弯腰操作。"),
    ("centralized-small-poultry-slaughter-line", "集中屠宰点小型家禽宰杀流水线方案", "集中屠宰加工", "适合乡镇集中屠宰点和食品加工点，按处理量配置上挂、放血、浸烫、脱毛、清洗和周转。"),
    ("medium-poultry-slaughter-processing-line", "中等产量鸡鸭鹅屠宰加工流水线方案", "集中屠宰加工", "面向日处理量稳定、需要连续加工的客户，重点匹配泡水、脱毛、清洗和人员节拍。"),
    ("poultry-slaughter-line-quote-before-info", "家禽宰杀流水线报价前信息准备方案", "集中屠宰加工", "把评论区反复出现的多少钱问题转化为品类、产量、场地、水电、热源和工序范围确认。"),
    ("poultry-slaughter-line-compliance-process", "规范宰杀放血后进入浸烫脱毛的流程方案", "集中屠宰加工", "明确设备使用边界，强调宰杀、放血、沥血后再进入浸烫脱毛，降低活禽误解和食品安全疑虑。"),
    ("poultry-slaughter-line-wastewater-feather-handling", "家禽宰杀流水线污水羽毛收集方案", "集中屠宰加工", "围绕血水、羽毛、油脂和地面冲洗，规划毛渣拦截、排水坡度和清洗收尾。"),
    ("poultry-slaughter-line-pretreatment-chilling", "家禽宰杀后清洗预冷前处理衔接方案", "集中屠宰加工", "适合需要进入配送或冷藏环节的客户，强调脱毛后冲洗、沥水、暂存和预冷前衔接。"),
    ("poultry-slaughter-line-installation-acceptance", "家禽宰杀流水线到货安装验收方案", "集中屠宰加工", "帮助客户按空载、带料、排水、清洗、安全防护和人员操作完成验收。"),
    ("poultry-slaughter-line-food-shop-supply", "餐饮食堂供应用家禽宰杀小线方案", "集中屠宰加工", "面向饭店、食堂和配送点，强调稳定供货、卫生清洗、处理时间和成品卖相。"),
    ("poultry-slaughter-line-mixed-chicken-duck-goose", "鸡鸭鹅混合处理宰杀流水线方案", "集中屠宰加工", "解决鸡鸭鹅混合订单中水温、浸烫时间、脱毛节拍和修毛要求不同的问题。"),
    ("poultry-slaughter-line-upgrade-from-single-machine", "从单台脱毛机升级家禽宰杀流水线方案", "集中屠宰加工", "适合已有脱毛机但高峰处理跟不上的客户，按瓶颈补泡水、排水、清洗和周转设备。"),
]

FAQS = [
    ("poultry-slaughter-line-price-info", "家禽宰杀流水线多少钱一套？", "价格取决于处理品类、日处理量、自动化程度、是否包含上挂、放血、浸烫、脱毛、清洗、预冷和安装调试。报价前建议先提供品类、重量、产量、场地、电压、热源和排水条件。"),
    ("small-stall-poultry-line-minimum-config", "小档口家禽宰杀线最低要配哪些设备？", "小档口通常先配置浸烫设备、脱毛机、接料台、排水和清洗工具。处理量稳定后，再考虑翻出式一体机、周转台和更完整的清洗分拣工位。"),
    ("farm-poultry-slaughter-line-daily-capacity", "养殖场自用家禽宰杀线一天能处理多少只？", "要看单只重量、操作人数、浸烫节拍、脱毛设备型号和后端清洗速度。建议按平均量和高峰量分别核算，不要只看单台设备标称产能。"),
    ("poultry-slaughter-line-220v-or-380v", "家禽宰杀流水线必须用380V吗？", "小型单机或部分小型组合可以按220V配置，但连续加工、加热和多设备联动通常建议确认380V条件。具体要看设备功率和现场线路承载。"),
    ("poultry-slaughter-line-need-boiler-steam", "家禽宰杀线一定要锅炉或蒸汽吗？", "不一定。小型档口可用电加热或燃气热水方案；处理量较大时，蒸汽或锅炉更容易保持水温稳定。选择热源要结合产量、成本和现场条件。"),
    ("poultry-slaughter-line-drainage-requirement", "家禽宰杀流水线排水要怎么做？", "建议地面有坡度，浸烫、脱毛和冲洗区设置排水沟或集水点，并增加毛渣拦截，避免羽毛和油脂直接堵住排水口。"),
    ("poultry-slaughter-line-live-bird-warning", "活禽能不能直接进入浸烫脱毛设备？", "不能。设备用于规范宰杀、放血、沥血后的食品加工流程，不能替代宰杀和前处理环节。这样做既不安全，也会影响卫生和成品质量。"),
    ("poultry-slaughter-line-blood-draining-time", "家禽进入浸烫前为什么要放血沥血？", "放血沥血能减少血水、红身、异味和水质污染，也能让后续浸烫脱毛更稳定。前处理不到位，客户容易误以为是设备效果不好。"),
    ("poultry-slaughter-line-cleaning-disinfection", "家禽宰杀线每天怎么清洗消毒？", "每班结束后应断电停机，清除羽毛、血水和油脂，冲洗浸烫槽、脱毛桶、接料台和地面，再按现场食品加工要求做消毒和干燥。"),
    ("poultry-slaughter-line-smell-control", "家禽宰杀流水线异味怎么控制？", "异味主要来自血水、羽毛、内脏残留和热水长时间使用。要控制放血沥血、换水频率、排水速度、毛渣收集和每日清洗。"),
    ("poultry-slaughter-line-chicken-duck-goose-same-line", "鸡鸭鹅可以共用一条宰杀流水线吗？", "可以按兼顾方案配置，但水温、浸烫时间、脱毛设备和修毛要求不同。鸭鹅细毛更多，长期主做鸭鹅时要单独确认浸烫和胶棒配置。"),
    ("poultry-slaughter-line-duck-goose-fine-feather", "鸭鹅细毛在流水线上怎么处理？", "鸭鹅细毛要先保证浸烫温度和时间稳定，再看胶棒软硬、投料量和后端修毛。对卖相要求高的客户，仍需预留人工修毛工位。"),
    ("poultry-slaughter-line-meat-quality", "流水线处理会不会影响鸡鸭鹅肉质？", "规范操作下可以控制影响。关键是宰杀放血、浸烫温度、时间、投放量、脱毛强度和后端冷却。采购前可带常用原料试机。"),
    ("poultry-slaughter-line-skin-damage", "宰杀流水线脱毛会不会破皮？", "破皮通常与水温过高、浸烫过头、胶棒状态、投料量和禽体规格有关。要按品类调参数，不能只追求转速和处理速度。"),
    ("poultry-slaughter-line-manual-vs-machine", "小型流水线比人工宰杀划算吗？", "要看日处理量、高峰量、人工成本、卫生要求和场地条件。量很少时不一定划算；固定高峰明显时，设备能减少用工压力和成品波动。"),
    ("poultry-slaughter-line-workers-needed", "一条小型家禽宰杀线需要几个人操作？", "小型组合通常需要人员负责前处理、浸烫脱毛、修毛清洗和收尾。人数取决于自动化程度和处理量，不能只按设备数量判断。"),
    ("poultry-slaughter-line-site-size", "家禽宰杀流水线需要多大场地？", "要看配置范围。小型核心工位只需要浸烫、脱毛、清洗和周转空间；集中加工线还要考虑上挂、沥血、排水、预冷、人员通道和检修空间。"),
    ("poultry-slaughter-line-floor-requirement", "家禽宰杀线地面有什么要求？", "建议地面防滑、耐冲洗、有排水坡度，设备周围预留清洗和检修空间。地面长期积水会影响安全、卫生和设备寿命。"),
    ("poultry-slaughter-line-before-quote-info", "咨询家禽宰杀线报价前要准备什么？", "准备处理品类、单只重量、日处理量、小时峰值、场地尺寸、电压、热源、排水、是否需要预冷分割和预算区间，报价会更接近真实需求。"),
    ("poultry-slaughter-line-installation-service", "家禽宰杀流水线包含安装调试吗？", "是否包含安装调试要在报价前确认。客户应提前准备水电、排水、场地和搬运条件，到货后再按空载、带料、清洗和安全防护验收。"),
    ("poultry-slaughter-line-food-safety-permit", "做家禽宰杀加工需要注意哪些合规问题？", "设备厂家可以提供设备和流程建议，但实际经营应按当地食品加工、环保、检疫和市场监管要求办理。官网内容不替代当地审批。"),
    ("poultry-slaughter-line-waste-feather", "流水线产生的羽毛和毛渣怎么处理？", "建议在脱毛和排水位置设置毛渣拦截，定时清理羽毛，避免进入排水沟。处理量大时，要单独规划羽毛暂存和清运。"),
    ("poultry-slaughter-line-water-change", "家禽宰杀线浸烫水多久换一次？", "没有固定时间，要看处理量、血水和羽毛污染情况。水质变浑、异味加重或脱毛效果波动时，应及时换水并清洗槽体。"),
    ("poultry-slaughter-line-pre-cooling", "小型家禽宰杀线需要预冷吗？", "如果产品要配送、冷藏或进入后续包装，建议考虑清洗沥水和预冷衔接。只是现场现杀现卖的档口，可先做好冲洗和沥水。"),
    ("poultry-slaughter-line-old-equipment-upgrade", "已有脱毛机还能升级成小型流水线吗？", "可以先评估现有脱毛机产能和状态，再补浸烫、接料、排水、清洗和周转工位。升级不一定要整套重买。"),
    ("poultry-slaughter-line-safety-protection", "家禽宰杀流水线有哪些安全防护要注意？", "电机、传动、翻料、热水和地面防滑都要注意。操作人员要熟悉启停、断电清洗和异常停机流程，不能带手伸入运行部位。"),
    ("poultry-slaughter-line-after-sales-parts", "家禽宰杀线后期需要哪些易损件？", "常见易损件包括胶棒、皮带、轴承、开关、电器元件和密封件。采购前要确认厂家是否能提供配件和维护指导。"),
    ("poultry-slaughter-line-video-misunderstanding", "为什么视频里看起来很残忍，实际流程怎么判断？", "短视频容易截取强刺激画面。判断设备是否规范，要看是否完成宰杀放血沥血、是否控制水温、是否有清洗排水和食品加工管理。"),
    ("poultry-slaughter-line-small-factory-config", "小型食品加工厂该选单机还是流水线？", "如果每天固定批量处理并有配送或供餐要求，应考虑小型流水线；如果只是偶尔加工，单机组合更灵活。核心是产量和场地匹配。"),
    ("poultry-slaughter-line-comment-price-reply", "评论区问多少钱，厂家应该怎么回复？", "建议先回复需要确认品类、重量、日处理量、场地、电压和热源，再给单机、小型组合、成套流水线三个方向，避免一个低价误导客户。"),
]

ARTICLES = [
    ("poultry-slaughter-line-three-level-selection", "家禽宰杀流水线怎么按小档口、养殖场、集中加工三档选？"),
    ("poultry-slaughter-line-quote-form", "家禽宰杀流水线报价前，这张信息表要先填清楚"),
    ("poultry-slaughter-line-process-boundary", "为什么要把宰杀放血和浸烫脱毛流程边界讲清楚？"),
    ("poultry-slaughter-line-site-layout", "小型家禽宰杀流水线场地怎么布置更顺手？"),
    ("poultry-slaughter-line-water-electric-heat", "家禽宰杀流水线水、电、热源条件怎么提前确认？"),
    ("poultry-slaughter-line-comment-risk", "从评论看家禽宰杀视频最容易引发哪些误解？"),
    ("poultry-slaughter-line-small-farm-upgrade", "养殖场从人工处理升级小型宰杀线，要先补哪几个工位？"),
    ("poultry-slaughter-line-cleaning-sop", "家禽宰杀流水线每日清洗和毛渣处理怎么做？"),
    ("poultry-slaughter-line-video-content", "厂家拍家禽宰杀流水线视频，应该重点拍哪些画面？"),
    ("poultry-slaughter-line-sales-reply-template", "家禽宰杀流水线评论区询盘，厂家可以怎么承接？"),
]


def yaml_list(items):
    return "\n".join(f"  - {item}" for item in items)


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.strip() + "\n", encoding="utf-8")


def solution_body(slug, title, tier, desc, index):
    if tier == "小型档口":
        products = ["58-type-poultry-plucker", "small-double-side-scalding-tank-80x100", "rubber-rod-scalding-mixer"]
        capacity = "基础单机 / 泡水脱毛组合 / 高峰补强"
        suitable = ["农贸市场家禽档口", "社区现杀现卖加工点", "日处理量几十只到二三百只的小店"]
    elif tier == "养殖场自用":
        products = ["rubber-rod-scalding-mixer", "six-roller-stainless-poultry-plucker", "new-generation-pneumatic-scalding-dehairing-machine"]
        capacity = "自用小批量 / 集中出栏批量 / 本地配送批量"
        suitable = ["家禽养殖场", "自产直销客户", "集中出栏后需要自处理的农场"]
    else:
        products = ["new-generation-pneumatic-scalding-dehairing-machine", "pneumatic-turnover-scalding-dehairing-machine", "stainless-nine-drum-poultry-plucker"]
        capacity = "小型集中点 / 连续加工线 / 配送加工线"
        suitable = ["乡镇集中屠宰点", "食品加工小厂", "餐饮食堂配送加工点"]
    related_articles = ["poultry-slaughter-line-three-level-selection", "poultry-slaughter-line-quote-form", "poultry-slaughter-line-site-layout"]
    related_faqs = ["poultry-slaughter-line-price-info", "poultry-slaughter-line-before-quote-info", "poultry-slaughter-line-live-bird-warning"]
    return f"""---
title: {title}
slug: {slug}
solutionCategory: 家禽加工
description: {desc}
geoSummary: {desc}
keywords:
  - 家禽宰杀流水线设备
  - 鸡鸭鹅屠宰设备
  - 家禽加工方案
  - 洪弟食品机械
suitableFor:
{yaml_list(suitable)}
decisionSummary: {desc}
painPoints:
  - 客户只问一套多少钱，但现场品类、产量和场地条件差异很大
  - 活禽、放血、浸烫、脱毛、清洗几个环节容易被混在一起理解
  - 高峰期人工跟不上，成品卖相和卫生清洗容易波动
  - 排水、热源和电压没有提前确认，到货后容易影响使用
recommendedProducts:
{yaml_list(products)}
equipmentRoles:
  - product: 浸烫或泡水设备
    role: 控制进入脱毛前的水温和浸烫均匀度
    selection: 按鸡鸭鹅品类、单只重量和高峰投放量确定
  - product: 家禽脱毛设备
    role: 完成鸡鸭鹅脱毛和初步清理
    selection: 按处理量、羽毛难度和是否连续加工确定型号
  - product: 接料清洗与排水工位
    role: 承接脱毛后冲洗、修毛、沥水和毛渣处理
    selection: 按场地、排水沟和人员动线布置
process:
  - 规范宰杀、放血和沥血
  - 按品类分批进入浸烫或泡水工位
  - 沥水后进入脱毛设备
  - 检查皮面、细毛和成品卖相
  - 冲洗、沥水并进入后续清洗或预冷
  - 收工后清理羽毛、血水、油脂和地面
configuration:
  - 按日处理量和小时峰值确定单机、组合工位或连续线
  - 按220V或380V电源条件选择设备功率和线路保护
  - 按热水、电加热、燃气、蒸汽或锅炉条件确认浸烫方式
  - 按排水口、毛渣拦截和清洗通道布置设备位置
capacity: {capacity}
capacityOptions:
  - level: 入门配置
    suitableFor: 处理量较小、先解决脱毛和清洗
    configuration: 小型浸烫设备 + 家禽脱毛机 + 接料清洗台
    note: 适合先把核心工位做顺，后续按高峰量升级
  - level: 标准配置
    suitableFor: 每天固定处理、有高峰订单
    configuration: 泡水浸烫设备 + 脱毛设备 + 排水毛渣收集 + 周转台
    note: 重点匹配前后工序节拍，减少等待和返工
  - level: 加强配置
    suitableFor: 连续加工或配送供货
    configuration: 一体机或多台脱毛设备 + 清洗沥水 + 预冷前衔接
    note: 需要提前确认场地、水电、热源和人员分工
siteRequirements:
  - 地面防滑、可冲洗，并预留排水坡度
  - 热源和电源要与设备功率匹配，避免临时接线
  - 宰杀、沥血、浸烫、脱毛、清洗区域尽量顺向布置
  - 羽毛和毛渣要有拦截和收集位置，减少堵塞和异味
requiredInfo:
  - 主要处理鸡、鸭、鹅还是混合品类
  - 单只重量范围、日处理量和小时高峰量
  - 是否需要上挂、放血、开膛、预冷或分割
  - 场地长宽、出入口、排水位置和地面条件
  - 可用电压、热源方式、操作人数和预算区间
acceptancePoints:
  - 空载检查电机、传动、翻料和控制是否正常
  - 用客户常处理的禽种带料试机
  - 检查脱毛效果、皮面完整度、细毛残留和清洗便利性
  - 检查排水、毛渣拦截和收工清洗是否顺手
  - 操作人员完成一次启停、投料、出料和断电清洗
maintenanceTips:
  - 每班结束后清理羽毛、血水、油脂和胶棒残留
  - 定期检查胶棒、皮带、轴承、电机和紧固件
  - 控制箱和电机避免直接高压冲水
  - 长期停机前保持设备清洁干燥
faqs:
  - question: {title}报价前要先确认什么？
    answer: 先确认品类、重量、日处理量、小时峰值、场地、电压、热源、排水和是否需要后续清洗预冷。
  - question: 这类设备能不能直接处理活禽？
    answer: 不能。设备用于规范宰杀、放血、沥血后的浸烫脱毛和后续清洗工序。
relatedProducts:
{yaml_list(products)}
relatedArticles:
{yaml_list(related_articles)}
relatedFaqs:
{yaml_list(related_faqs)}
date: '{DATE}'
updated: '{DATE}'
sourceNote: 以上为初步配置方向，实际型号和设备数量需结合处理量、场地、水电和当地食品加工要求确认。
seo:
  title: {title}｜洪弟食品机械
  description: {desc}
  keywords:
    - 家禽宰杀流水线设备
    - 鸡鸭鹅屠宰设备
    - 家禽加工方案
---

## 方案定位

{title}的核心不是把设备堆成一条很长的线，而是让宰杀、放血、浸烫、脱毛、清洗和排水几个环节顺起来。{tier}客户更要先看真实处理量、场地条件和用工情况，再决定设备组合。

## 为什么这样配置

评论里客户最常问的是多少钱、能不能做、是不是合规、现场会不会脏臭。真正影响使用体验的是水温稳定、放血沥血、脱毛节拍、毛渣排水和收工清洗。

洪弟食品机械建议，先用小批量原料试机，再按高峰量补齐设备。这样不会为了追求完整流水线而买到现场放不下、用不顺的配置。

## 咨询前建议

请准备处理品类、单只重量、日处理量、小时峰值、场地视频、电压热源和排水位置。电话：13729374860（微信同号），可先按现场条件判断适合单机、组合工位还是小型流水线。
"""


def faq_body(slug, question, answer):
    related_articles = ["poultry-slaughter-line-three-level-selection", "poultry-slaughter-line-quote-form"]
    related_solutions = ["small-stall-live-poultry-slaughter-line", "farm-self-use-poultry-slaughter-line", "centralized-small-poultry-slaughter-line"]
    return f"""---
title: {question}
slug: {slug}
question: {question}
answer: {answer}
description: 围绕家禽宰杀流水线设备的采购、配置、合规、场地水电和现场使用问题进行解答。
date: '{DATE}'
updated: '{DATE}'
relatedProducts:
  - new-generation-pneumatic-scalding-dehairing-machine
  - rubber-rod-scalding-mixer
  - 58-type-poultry-plucker
relatedArticles:
{yaml_list(related_articles)}
relatedSolutions:
{yaml_list(related_solutions)}
seo:
  title: {question}｜洪弟食品机械
  description: {answer}
---
## 先看使用场景

家禽宰杀流水线不能只按设备名称判断，要先看处理品类、产量、场地、电压、热源、排水和是否需要后续清洗预冷。

## 再确认配置

洪弟食品机械建议，咨询前把现场视频、日处理量和高峰量发给厂家，再判断适合单机、组合工位还是小型流水线。
"""


def article_body(slug, title, index):
    related_faqs = ["poultry-slaughter-line-price-info", "poultry-slaughter-line-before-quote-info", "poultry-slaughter-line-live-bird-warning"]
    related_products = ["new-generation-pneumatic-scalding-dehairing-machine", "rubber-rod-scalding-mixer", "58-type-poultry-plucker"]
    return f"""---
title: {title}
slug: {slug}
category: buyer-guide
description: 从家禽宰杀流水线设备的采购、场地、流程、报价和视频评论问题出发，说明厂家和客户应该如何判断配置。
date: '{DATE}'
updated: '{DATE}'
relatedProducts:
{yaml_list(related_products)}
relatedFaqs:
{yaml_list(related_faqs)}
seo:
  title: {title}｜洪弟食品机械
  description: 家禽宰杀流水线设备采购前，应先确认品类、产量、流程边界、场地水电、排水清洗和安装验收。
---
## 先把需求拆开

很多客户看到家禽宰杀流水线视频后，会直接问一套多少钱。但流水线不是单台设备，里面可能包含宰杀放血、浸烫、脱毛、清洗、预冷、分割、排水和毛渣处理。

如果只看视频里的机器转动，很容易忽略现场落地条件。

## 三类客户判断方式不同

小型档口重点看高峰时段、人工数量、排水和清洗空间。养殖场自用重点看集中出栏、批量处理和成品卖相。集中屠宰加工点则要看连续生产、场地水电、合规流程和安装调试。

同样是鸡鸭鹅设备，三类客户的配置不应该完全一样。

## 报价前先确认关键参数

建议先准备处理品类、单只重量、日处理量、小时峰值、场地尺寸、电压、热源、排水和是否需要预冷分割。厂家拿到这些信息后，才能判断是单机、组合工位还是小型流水线。

## 视频内容也要讲流程边界

家禽宰杀设备相关视频容易引发活禽、残忍、卫生和食品安全质疑。厂家在视频和官网中应明确：设备用于规范宰杀、放血、沥血后的浸烫脱毛和清洗环节，不用于活禽直接处理。

洪弟食品机械建议，把设备销售讲成完整加工流程，而不是只展示机器运转。这样客户更容易理解，也更容易形成有效询盘。
"""


def main():
    for index, (slug, title, tier, desc) in enumerate(SOLUTIONS, 1):
        write(ROOT / "content" / "zh" / "solutions" / f"{slug}.md", solution_body(slug, title, tier, desc, index))
    for slug, question, answer in FAQS:
        write(ROOT / "content" / "zh" / "faqs" / f"{slug}.md", faq_body(slug, question, answer))
    for index, (slug, title) in enumerate(ARTICLES, 1):
        write(ROOT / "content" / "zh" / "articles" / f"{slug}.md", article_body(slug, title, index))
    print({"solutions": len(SOLUTIONS), "faqs": len(FAQS), "articles": len(ARTICLES)})


if __name__ == "__main__":
    main()
