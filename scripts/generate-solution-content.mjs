import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const outputDir = path.join(root, 'content', 'zh', 'solutions');
const date = '2026-06-11';
const contact = '洪弟机械食品厂，电话/微信：13729374860，地址：广东省揭阳市揭东区曲溪港美村206国道旁。';
const boundary = '页面中的设备额定参数来自现有产品资料；实际处理效果会受原料规格、前处理、操作方式和现场条件影响，最终型号与配置应在下单前由厂家复核。';

const poultrySite = ['确认现场使用220V还是380V电源，并按设备功率配置独立线路和保护开关', '地面应平整、防滑并便于冲洗，脱毛和泡水区域预留排水沟或集水点', '按设备外形、开盖或翻料动作预留操作空间、检修空间和物料周转通道', '泡水工序需要确认热水或蒸汽来源，设备附近避免堆放怕水物品'];
const poultryInfo = ['计划处理的禽种及单只重量范围', '每日、每小时平均处理量和高峰处理量', '现有泡水、脱毛、清洗等前后工序', '现场长宽高、出入口尺寸、楼层和搬运条件', '可用电压、给排水和热源条件', '操作人数、预算范围以及希望解决的主要问题'];
const poultryAcceptance = ['空载检查电机、传动、控制和紧固件是否正常', '带少量原料试机，观察进出料、脱毛效果、禽体完整度和设备振动', '核对泡水温度与时间是否适合当前禽种，不能只用脱毛机结果判断设备', '确认清洗、排毛、排水和易损件更换是否方便', '由操作人员完成一次启停、投料、出料和清洗流程后再验收'];
const poultryMaintenance = ['每班结束后断电清除羽毛、油脂和残留物，保持排毛与排水通畅', '定期检查橡胶脱毛棒、链条、皮带、轴承和紧固件的磨损与松动', '控制箱、电机和线路避免直接高压冲水', '长期停机前清洁干燥，易锈部位按说明进行保养'];

const aquaticSite = ['设备附近需有稳定给水和顺畅排水，地面应防滑并便于冲洗', '根据设备外形预留进料、出料、接料、清洗和检修空间', '确认鱼类暂存、去鳞、清洗、采肉和成品冷藏之间的动线，避免生熟或洁污交叉', '确认电源、电压、插座防水和操作区域照明条件'];
const aquaticInfo = ['主要鱼种、单条重量和尺寸范围', '每日及高峰时段处理量', '目标成品是整鱼、鱼肉、鱼糜还是鱼丸原料', '原料的新鲜度、去头去内脏等前处理方式', '场地尺寸、电压、给排水和冷藏条件', '对去鳞完整度、鱼体完整度或采肉效果的具体要求'];
const aquaticAcceptance = ['先用客户常用鱼种和规格进行少量试机', '检查去鳞或采肉效果，同时观察鱼体完整度、骨皮分离和成品状态', '记录单批投料量、处理时间和清洗时间，判断是否匹配实际营业节奏', '确认接料、排渣、排水和拆洗过程是否顺畅', '核对操作和安全注意事项后再确定最终配置'];
const aquaticMaintenance = ['每批或每班结束后及时清除鱼鳞、鱼皮、鱼骨和油脂残留', '按说明拆洗可接触食品的部件，清洗后保持通风干燥', '定期检查传动、紧固件和易损件，出现异常声音时先停机排查', '电机和电控部位避免直接冲洗，防止水汽进入'];

const solutions = [
  {
    slug: 'small-slaughter-stall-dehairing-solution', title: '中小型屠宰档口家禽脱毛解决方案', category: '家禽加工',
    description: '面向鸡鸭鹅屠宰档口和个体加工点，按禽种、峰值处理量和场地条件组合泡水与脱毛设备。',
    suitableFor: ['农贸市场家禽档口', '社区屠宰加工点', '日处理量波动较大的个体商户', '希望减少人工拔毛的夫妻店'],
    decisionSummary: '小档口不应只按最低价格选机器，应先确认禽种、单只重量、高峰处理量和电压；常规小批量可从58型或滚筒式脱毛机起步，需要减少搬运时再考虑烫脱一体设备。',
    painPoints: ['人工拔毛速度慢，高峰时容易排队', '鸡鸭鹅混合处理，对泡水和脱毛要求不同', '场地紧凑，设备清洗和排毛容易互相干扰', '担心脱不净、伤皮、断翅或售后配件难找'],
    products: ['roller-poultry-dehairing-machine', '58-turbine-stainless-poultry-plucker', 'rubber-rod-scalding-mixer', 'pneumatic-discharge-scalding-dehairing-machine'],
    roles: [['58型或滚筒式脱毛机', '完成常规鸡鸭鹅脱毛', '适合中小批量，按禽种、重量、电压和高峰量确定型号'], ['胶棒搅拌泡水机', '脱毛前泡水与均匀翻动', '当人工泡水不均、脱毛效果波动时配置'], ['气动翻出泡水脱毛一体机', '减少泡水到脱毛之间的人工搬运', '适合希望整合工序、降低劳动强度的档口']],
    process: ['原料称重与分批', '按禽种控制泡水温度和时间', '沥水后均匀投入脱毛设备', '检查残毛并做必要修整', '冲洗、沥水并进入后续处理', '停机断电后清洗设备与场地'],
    capacities: [['基础档口配置', '处理量较小、以常规鸡鸭为主', '58型涡轮脱毛机或合适的滚筒式脱毛机', '58型资料额定约200只/小时，实际需结合禽种与操作确认'], ['泡水配套配置', '脱毛效果波动、人工翻料费力', '胶棒搅拌泡水机 + 脱毛机', '泡水机与脱毛机节拍应匹配，避免前后工序等待'], ['流程整合配置', '希望减少转运和操作人员', '气动翻出泡水脱毛一体机', '需确认气源、电源、场地和实际工艺要求']],
    articles: ['small-slaughter-stall-equipment-selection', 'how-to-choose-poultry-dehairing-machine', 'poultry-dehairing-machine-not-clean-reasons', 'site-preparation-for-poultry-plucker'],
    faqs: ['small-stall-which-plucker', 'why-plucker-not-clean', 'why-plucker-damages-skin', 'what-info-before-buying'],
    pageFaqs: [['小档口应该先买泡水机还是脱毛机？', '如果现有人工泡水能够稳定控制温度和时间，可以先配置脱毛机；如果脱毛效果长期波动且人工翻料费力，应同步考虑泡水搅拌设备。'], ['鸡鸭鹅可以用同一台脱毛机吗？', '部分机型可以处理多种家禽，但投料量、泡水条件和操作时间需要分别调整，选型前应提供主要禽种和重量范围。']],
    body: '档口设备配置的核心不是把设备数量堆多，而是让泡水、脱毛、修整和清洗节拍一致。洪弟机械建议先记录一天内的平均量和高峰量，再判断选择单机、泡水配套或一体化设备。\n\n如果出现脱不净或伤皮，不能直接归因于机器。泡水温度、泡水时间、单次投料量、橡胶棒磨损和禽种差异都会影响结果，因此交付时应使用客户常用原料进行试机。'
  },
  {
    slug: 'farm-poultry-processing-solution', title: '养殖场家禽批量处理解决方案', category: '家禽加工',
    description: '面向养鸡、养鸭、养鹅基地的自用处理与集中出货，重点解决批量作业、设备耐用和高峰产能匹配。',
    suitableFor: ['家禽养殖场', '合作社集中处理点', '周期性集中出栏客户', '需要从人工处理升级到机械处理的基地'],
    decisionSummary: '养殖场应按集中出栏时的高峰量配置，不宜只看日均量；中等批量可考虑6滚筒设备，处理量较大时再评估9滚筒及前端泡水配套。',
    painPoints: ['出栏期处理集中，普通小型设备容易形成瓶颈', '禽种和重量变化大，单一操作参数不稳定', '户外或半户外环境对耐用、排水和移动要求高', '设备闲置周期长，需要便于清洗和维护'],
    products: ['six-roller-stainless-poultry-plucker', 'nine-roller-stainless-poultry-plucker', 'double-lid-poultry-scalding-mixer', 'rubber-rod-scalding-mixer'],
    roles: [['6滚筒不锈钢脱毛机', '承担中等批量连续脱毛', '产品资料额定约600只/小时，可选220V或380V，需按实际工况核实'], ['9滚筒不锈钢脱毛机', '承担较大处理量集中脱毛', '产品资料额定约600只/小时、380V，更适合固定工位'], ['双面翻盖泡水搅拌机', '批量泡水和自动翻料', '资料额定约500只/小时，适合前端节拍较高的场景']],
    process: ['按禽种和重量分批', '放血及必要的前处理', '批量泡水并控制温度时间', '连续脱毛与出料检查', '修整、冲洗和分级', '设备清洗、巡检和停机保养'],
    capacities: [['中等批量配置', '集中处理但场地和预算有限', '胶棒泡水机 + 6滚筒脱毛机', '需核对两台设备实际节拍，额定值不能直接视为整线产量'], ['较大批量配置', '固定加工点、380V条件完善', '双面翻盖泡水机 + 9滚筒脱毛机', '应结合高峰量、操作人数和周转容器设计动线'], ['弹性配置', '禽种变化大、出栏周期明显', '泡水设备 + 6或9滚筒主机 + 人工修整位', '保留人工修整和备用周转空间，避免单点故障影响全部作业']],
    articles: ['farm-poultry-dehairing-equipment-configuration', 'large-volume-poultry-processing-equipment', '58-vs-6-roller-vs-9-roller-poultry-plucker', 'daily-maintenance-for-poultry-dehairing-machine'],
    faqs: ['farm-equipment-configuration', 'large-volume-poultry-line-configuration', 'difference-58-6-9-roller', 'motor-belt-bearing-check'],
    pageFaqs: [['养殖场应该按日处理量还是小时处理量选型？', '应重点看集中出栏期间的小时高峰量，同时考虑泡水、脱毛、修整和清洗能否同步完成。'], ['6滚筒和9滚筒如何选择？', '需要结合禽种、峰值处理量、380V电源、场地和预算判断，不能只依据滚筒数量。']],
    body: '养殖场的生产通常具有明显峰谷，设备配置应以集中出栏时段为依据。除了脱毛主机，还要检查泡水能力、人工上料、出料检查和场地排水是否形成瓶颈。\n\n洪弟机械在确认方案时会要求客户提供主要禽种、重量范围、出栏节奏和现场条件，再判断6滚筒、9滚筒以及泡水设备的组合。额定参数用于初筛，最终仍需按常用原料试机。'
  },
  {
    slug: 'canteen-restaurant-poultry-solution', title: '食堂餐饮家禽前处理解决方案', category: '家禽加工',
    description: '适合学校食堂、酒楼餐厅、中央厨房和餐饮门店的小批量家禽前处理，强调卫生、易清洗和操作节奏。',
    suitableFor: ['学校与企业食堂', '酒楼餐厅', '中央厨房前处理间', '有固定家禽加工需求的餐饮门店'],
    decisionSummary: '餐饮场景通常不追求最大额定产量，更应关注220V适配、占地、噪声、清洗时间和与备餐节奏的匹配；常规小批量可优先评估58型或移动式脱毛机。',
    painPoints: ['人工处理占用后厨人员', '加工时间集中在备餐前，设备需快速启停', '后厨空间有限且卫生要求高', '设备过大、清洗复杂会降低实际使用率'],
    products: ['58-turbine-stainless-poultry-plucker', '430-stainless-mobile-poultry-plucker', 'rubber-rod-scalding-mixer'],
    roles: [['58型涡轮不锈钢脱毛机', '完成常规小批量脱毛', '220V/380V可选，适合固定工位'], ['430不锈钢移动式脱毛机', '在不同工位之间灵活移动', '适合需要观察运行状态和调整位置的后厨'], ['胶棒搅拌泡水机', '提高批量泡水均匀性', '当处理量增加或人工泡水不稳定时配置']],
    process: ['按当天菜单和数量分批备料', '泡水烫毛并控制时间', '小批量投入脱毛机', '人工检查和局部修整', '清洗后进入厨房分割工序', '设备拆洗、场地消毒和干燥'],
    capacities: [['轻量配置', '偶尔处理、单批数量较少', '58型或430移动式脱毛机', '优先确认220V、电源位置和清洗空间'], ['固定备餐配置', '每天稳定处理且人工泡水可控', '58型脱毛机 + 固定泡水容器', '需建立标准泡水时间和单批投料量'], ['效率提升配置', '高峰备餐量增加', '胶棒泡水机 + 脱毛机', '确认后厨通风、热源、排水与设备动线']],
    articles: ['canteen-restaurant-poultry-equipment', '220v-vs-380v-poultry-plucker', '58-vs-430-mobile-poultry-plucker', 'daily-maintenance-for-poultry-dehairing-machine'],
    faqs: ['canteen-restaurant-equipment', '220v-or-380v-poultry-plucker', '58-vs-430-mobile-plucker', 'how-to-clean-poultry-plucker'],
    pageFaqs: [['餐饮门店一定需要泡水机吗？', '不一定。处理量较小时可先使用现有泡水容器，但需要稳定控制温度和时间；处理量增加后再评估搅拌泡水设备。'], ['后厨更适合220V还是380V？', '取决于现有供电、设备功率和持续作业时间。不能为了接线方便忽略线路负载，应由电工核实。']],
    body: '餐饮客户的目标通常是减少备餐前处理时间，而不是建设完整屠宰线。因此方案应保持紧凑，避免配置超过实际需求的大型设备。\n\n设备使用频率和清洗便利性同样重要。洪弟机械建议把设备放置、冲洗、排水、收纳和人员通行一起纳入方案，确保采购后能够持续使用。'
  },
  {
    slug: 'aquatic-store-processing-solution', title: '水产门店去鳞采肉解决方案', category: '水产加工',
    description: '适合水产店、农贸市场档口和初加工点，将鱼类去鳞、清洗、采肉与接料流程按营业节奏组织。',
    suitableFor: ['水产零售门店', '农贸市场水产档口', '餐饮水产配送点', '中小型鱼类初加工点'],
    decisionSummary: '只销售整鱼或净鱼的门店应优先解决去鳞效率；同时制作鱼丸、鱼糜原料时再配置采肉机。选型前必须提供鱼种、单条重量、目标成品和高峰处理量。',
    painPoints: ['人工刮鳞速度慢且高峰时排队', '不同鱼种和尺寸导致去鳞效果差异', '鱼肉与鱼骨鱼皮分离耗费人工', '水产环境潮湿，排水、清洗和防滑要求高'],
    products: ['fish-scaling-machine', 'fish-meat-separator'],
    roles: [['鱼类脱鳞机', '批量去除常见鱼类鱼鳞', '按鱼种、单条重量、鱼体完整度要求和处理量核实'], ['鱼类采肉机', '分离鱼肉与鱼骨鱼皮', '适合鱼糜、鱼丸原料加工，需确认前处理和目标成品']],
    process: ['按鱼种和尺寸分批', '去除不适合直接处理的杂物并预清洗', '按设备要求进行去鳞', '检查鱼体并冲洗残鳞', '需要鱼糜时完成去头、去内脏等前处理后采肉', '成品及时冷藏，设备与场地彻底清洗'],
    capacities: [['去鳞基础配置', '销售整鱼、净鱼为主', '鱼类脱鳞机 + 清洗接料位', '以常用鱼种试机确认去鳞和鱼体完整度'], ['去鳞采肉组合', '兼做鱼丸或鱼糜原料', '鱼类脱鳞机 + 前处理工位 + 鱼类采肉机', '两台设备之间应设置清洗、沥水和暂存环节'], ['初加工配置', '订单集中、品种较多', '分级台 + 脱鳞机 + 清洗台 + 采肉机 + 冷藏周转', '具体节拍需依据鱼种、人工和目标成品核算']],
    articles: ['aquatic-store-processing-equipment-configuration', 'how-to-choose-fish-scaling-machine', 'how-to-choose-fish-meat-separator', 'what-affects-fish-meat-separator-yield'],
    faqs: ['aquatic-store-needed-equipment', 'how-to-choose-fish-scaling-machine', 'how-to-choose-fish-meat-separator', 'what-affects-fish-meat-yield'],
    pageFaqs: [['水产门店需要同时购买脱鳞机和采肉机吗？', '不需要。主要销售整鱼或净鱼时优先考虑脱鳞机；只有制作鱼糜、鱼丸原料或需要骨肉分离时才需要采肉机。'], ['鱼类设备能否用统一参数适配所有鱼种？', '不能。鱼鳞类型、鱼体尺寸、原料状态和目标成品不同，必须用常用鱼种确认配置和操作方式。']],
    body: '水产门店最重要的是让设备服务营业高峰，而不是追求复杂生产线。去鳞设备应放在清洗和接料方便的位置，采肉设备则需要衔接前处理、成品接料和冷藏。\n\n洪弟机械会根据鱼种、单条重量、每日与高峰处理量、目标成品和场地给排水条件提供初步建议。对于无法确认的处理效果，建议先进行原料测试。'
  },
  {
    slug: 'meatball-processing-solution', title: '鱼丸鱼糜加工配套解决方案', category: '鱼糜丸类',
    description: '围绕鱼类原料去鳞、前处理、采肉和鱼糜接料组织设备，适合鱼丸作坊、餐饮供应和食品加工客户。',
    suitableFor: ['鱼丸手工作坊升级客户', '鱼糜原料加工点', '餐饮供应链加工客户', '计划增加鱼类产品的食品厂'],
    decisionSummary: '现有洪弟设备可覆盖鱼类去鳞与采肉环节；打浆、调味、成型、熟化和包装设备需要根据成品工艺另行配套，不能把去鳞机或采肉机描述为完整鱼丸生产线。',
    painPoints: ['人工取肉效率低且骨皮分离不稳定', '原料规格变化影响成品状态', '前处理、采肉和后续打浆节拍不一致', '容易把单台设备能力误认为整线产能'],
    products: ['fish-scaling-machine', 'fish-meat-separator'],
    roles: [['鱼类脱鳞机', '按需要完成原料去鳞', '是否配置取决于鱼种、产品工艺和原料是否已预处理'], ['鱼类采肉机', '完成鱼肉与鱼骨、鱼皮分离', '核心设备，需按鱼种、目标鱼糜状态和处理量确认'], ['后续打浆成型设备', '完成打浆、调味、成型与熟化', '当前网站未列具体型号，应按成品工艺另行确认配套']],
    process: ['原料验收、分级和低温暂存', '按工艺去鳞、去头、去内脏和清洗', '沥水后进入采肉工序', '检查鱼肉与骨皮分离状态', '鱼肉及时进入打浆、调味和成型工序', '成品冷却包装，设备拆洗消毒'],
    capacities: [['前处理单机配置', '已有后续鱼糜加工设备', '鱼类采肉机，必要时增加脱鳞机', '先核实原料前处理状态和采肉后接料方式'], ['小型鱼丸作坊配置', '从人工取肉升级', '脱鳞/清洗 + 采肉 + 现有打浆成型工序', '整线产量由最慢工序决定，不能只看采肉机'], ['配套加工配置', '计划建设完整鱼丸或鱼糜流程', '去鳞 + 前处理 + 采肉 + 打浆 + 成型 + 熟化 + 包装', '后段设备需根据产品配方和工艺另行选型']],
    articles: ['how-to-choose-fish-meat-separator', 'what-affects-fish-meat-separator-yield', 'how-to-choose-fish-scaling-machine'],
    faqs: ['how-to-choose-fish-meat-separator', 'what-affects-fish-meat-yield', 'how-to-choose-fish-scaling-machine'],
    pageFaqs: [['鱼类采肉机能直接生产鱼丸吗？', '不能。采肉机负责鱼肉与鱼骨鱼皮分离，后续还需要打浆、调味、成型和熟化等工序。'], ['采肉效果主要受什么影响？', '鱼种、原料新鲜度、前处理、设备调整和操作方式都会影响鱼肉状态与分离效果。']],
    body: '鱼丸和鱼糜方案必须先明确成品工艺。洪弟机械当前重点提供去鳞和采肉环节的设备建议，后续打浆、成型等设备需要结合配方和生产方式配套。\n\n采购前建议准备常用鱼种、原料照片或样品、目标成品、日处理量和现有设备信息，以便判断采肉环节是否能够与后续工序衔接。'
  },
  {
    slug: 'small-poultry-220v-equipment-solution', title: '小型家禽加工点220V设备解决方案', category: '家禽加工',
    description: '针对只有220V供电、场地紧凑和操作人员较少的小型家禽加工点，优先选择负载和占地可控的设备。',
    suitableFor: ['乡镇家禽加工点', '小型养殖户自用处理', '没有380V电源的档口', '单人或两人操作场景'],
    decisionSummary: '220V并不等于任何插座都能直接使用。应先由电工核实线路容量，再从58型、430移动式或支持220V的6滚筒设备中按实际处理量选择，避免线路过载。',
    painPoints: ['现场没有380V电源', '普通插座和线路可能无法承受设备持续负载', '场地小、人员少，不适合复杂设备组合', '希望后续扩产但不确定是否需要提前改电'],
    products: ['58-turbine-stainless-poultry-plucker', '430-stainless-mobile-poultry-plucker', 'six-roller-stainless-poultry-plucker', 'rubber-rod-scalding-mixer'],
    roles: [['58型涡轮脱毛机', '常规小批量脱毛', '1500W，资料标注220V/380V可选'], ['430移动式脱毛机', '灵活调整工位', '适合需要移动和观察运行状态的场景'], ['6滚筒脱毛机', '提高批量处理能力', '2200W，资料标注220V/380V可选，但必须核实线路负载']],
    process: ['核实线路、开关和接地', '按禽种进行泡水前处理', '控制单次投料量完成脱毛', '检查效果并及时修整', '分批清洗，避免电控进水', '记录高峰处理量，为后续升级提供依据'],
    capacities: [['轻量起步', '处理量不大、单人操作', '58型或430移动式脱毛机', '优先核实独立线路、插座和漏电保护'], ['效率提升', '现有小型设备已成瓶颈', '支持220V的6滚筒脱毛机', '不能仅看电压相同，应核实功率、线径和持续负载'], ['预留升级', '未来可能增加处理量', '先改造供电与排水，再确定设备', '当高峰量明显提升时，评估380V和泡水配套更合理']],
    articles: ['220v-vs-380v-poultry-plucker', '58-vs-430-mobile-poultry-plucker', 'parameters-before-buying-poultry-plucker'],
    faqs: ['220v-or-380v-poultry-plucker', '58-vs-430-mobile-plucker', 'what-info-before-buying'],
    pageFaqs: [['220V脱毛机可以直接插普通插座吗？', '不能一概而论。应根据设备功率、线路线径、开关容量、接地和持续作业时间，由合格电工确认。'], ['未来扩产是否应该直接买大设备？', '应先判断现有场地、电源和泡水环节能否支持。设备过大但前后工序跟不上，也无法形成有效产能。']],
    body: '小型加工点选220V设备，首先解决的是安全供电和实际作业节奏。电压相同不代表线路一定合适，尤其是老旧门店或临时加工点。\n\n洪弟机械建议客户提供配电箱、插座位置、线路条件和预计连续工作时间，再结合禽种与处理量选择设备。'
  },
  {
    slug: 'medium-capacity-poultry-scalding-plucking-solution', title: '中等产量家禽烫脱配套解决方案', category: '家禽加工',
    description: '通过泡水搅拌设备与6滚筒等脱毛设备配套，解决中等批量作业中泡水不均和前后工序等待。',
    suitableFor: ['中型屠宰档口', '稳定供货的养殖场', '餐饮配送加工点', '小型设备产能不足的客户'],
    decisionSummary: '中等产量配置的关键是泡水和脱毛节拍匹配。胶棒泡水机资料额定约200只/小时，而6滚筒脱毛机资料额定约600只/小时，不能直接按主机额定值认定整线产量。',
    painPoints: ['脱毛主机等待前端泡水', '人工翻料导致受热不均', '单次投料过多影响脱毛效果', '设备配置看似充足但整线效率仍低'],
    products: ['rubber-rod-scalding-mixer', 'double-lid-poultry-scalding-mixer', 'six-roller-stainless-poultry-plucker'],
    roles: [['胶棒搅拌泡水机', '中等批量泡水和翻料', '资料额定约200只/小时，适合紧凑配置'], ['双面翻盖泡水机', '提高前端泡水能力', '资料额定约500只/小时，适合更高节拍'], ['6滚筒脱毛机', '连续完成家禽脱毛', '资料额定约600只/小时，需与泡水、人工和出料配合']],
    process: ['按禽种重量分批并记录', '泡水设备预热与参数确认', '自动搅拌使受热更均匀', '沥水后按节拍进入6滚筒脱毛机', '出料检查、修整和冲洗', '清理羽毛、排水并巡检传动部件'],
    capacities: [['紧凑配套', '中等处理量、场地有限', '胶棒泡水机 + 6滚筒脱毛机', '整线能力通常受泡水和人工上料节拍影响'], ['高节拍配套', '前端泡水已成为瓶颈', '双面翻盖泡水机 + 6滚筒脱毛机', '需确认泡水机出料与脱毛机接料方式'], ['弹性作业', '禽种和订单变化明显', '泡水机 + 6滚筒 + 人工修整位', '通过分批和记录建立不同禽种的操作参数']],
    articles: ['how-to-match-scalding-machine-and-plucker', 'how-to-choose-poultry-scalding-mixer', 'scalding-temperature-for-poultry-dehairing', '58-vs-6-roller-vs-9-roller-poultry-plucker'],
    faqs: ['how-to-match-scalding-and-plucking', 'scalding-temperature-for-dehairing', 'difference-58-6-9-roller'],
    pageFaqs: [['泡水机和脱毛机额定产量不同怎么办？', '应按实际批次、泡水时间、转运时间和人工数量核算整线节拍，不能简单取更大的额定值。'], ['脱毛不净时应先调整哪一环？', '先检查泡水温度、时间和均匀性，再检查投料量、橡胶棒和设备操作。']],
    body: '烫脱配套不是简单把两台机器放在一起。设备之间需要留出沥水、转运和异常处理空间，并安排人员按固定批次操作。\n\n建议试机时同时记录泡水起止时间、单批数量、脱毛时间和修整比例，找到真正限制效率的环节后再调整配置。'
  },
  {
    slug: 'large-volume-poultry-processing-solution', title: '大批量家禽脱毛加工解决方案', category: '家禽加工',
    description: '面向集中屠宰、养殖基地和食品加工客户，围绕高峰处理量配置双面翻盖泡水机、6滚筒或9滚筒脱毛机。',
    suitableFor: ['集中家禽屠宰点', '大型养殖基地', '食品加工厂前处理区', '现有单桶设备长期满负荷的客户'],
    decisionSummary: '大批量方案必须按整线瓶颈设计。6滚筒与9滚筒产品资料均标注约600只/小时，但结构、电压、功率和适用工位不同，应通过原料测试和现场节拍确定，而不是只按滚筒数量判断。',
    painPoints: ['高峰订单下小型设备连续超负荷', '前端泡水能力不足导致脱毛机等待', '出料、修整和清洗区域拥堵', '停机维护会影响整批生产'],
    products: ['double-lid-poultry-scalding-mixer', 'six-roller-stainless-poultry-plucker', 'nine-roller-stainless-poultry-plucker'],
    roles: [['双面翻盖泡水搅拌机', '承担较高节拍泡水和翻料', '资料额定约500只/小时，需结合泡水时间确认'], ['6滚筒脱毛机', '中大型连续脱毛', '220V/380V可选，额定约600只/小时'], ['9滚筒脱毛机', '固定工位大批量脱毛', '380V、4000W，资料额定约600只/小时']],
    process: ['原料分级与批次编号', '连续泡水并监控温度时间', '沥水和节拍缓冲', '6或9滚筒设备脱毛', '出料检查、人工修整和冲洗', '成品转运与设备轮换清洗维护'],
    capacities: [['单班集中配置', '高峰集中但班次有限', '双面翻盖泡水机 + 6滚筒脱毛机', '需核对220V/380V条件和实际泡水节拍'], ['固定大批量配置', '380V、固定工位、连续作业', '双面翻盖泡水机 + 9滚筒脱毛机', '应预留维修、排毛、接料和人员安全通道'], ['连续生产配置', '停机损失较高', '泡水主机 + 脱毛主机 + 缓冲与人工修整位', '是否配置备用设备需结合订单稳定性与维护策略']],
    articles: ['large-volume-poultry-processing-equipment', '58-vs-6-roller-vs-9-roller-poultry-plucker', 'how-to-match-scalding-machine-and-plucker', 'poultry-machine-installation-commissioning-acceptance'],
    faqs: ['large-volume-poultry-line-configuration', 'difference-58-6-9-roller', 'how-to-match-scalding-and-plucking', 'poultry-machine-installation-acceptance'],
    pageFaqs: [['9滚筒一定比6滚筒产量高吗？', '不能只看滚筒数量。现有资料中两者额定值均约600只/小时，实际差异还要结合结构、禽种、投料和现场节拍判断。'], ['大批量方案最容易忽略什么？', '常被忽略的是泡水能力、出料修整、排毛排水、清洗停机和人员动线，这些都可能成为整线瓶颈。']],
    body: '大批量加工方案需要从原料进入到成品离开完整核算。只提升脱毛主机能力，前端泡水和后端修整不变，通常不会得到同等比例的产量提升。\n\n洪弟机械建议先提供连续三天或典型高峰日的数据，再进行设备和人员节拍匹配。'
  },
  {
    slug: 'integrated-scalding-dehairing-solution', title: '家禽泡水脱毛一体化解决方案', category: '家禽加工',
    description: '采用气动翻出泡水脱毛一体机整合泡水、脱毛和出料环节，减少设备间转运和重复搬运。',
    suitableFor: ['希望减少搬运的屠宰档口', '操作人员有限的加工点', '计划整合泡水与脱毛工序的客户', '需要固定流程和控制操作强度的现场'],
    decisionSummary: '一体机的价值在于减少转运，不代表任何场景都优于分体设备。采购前应核实气源、电源、热源、排水、禽种和清洗方式，确认一体化流程是否适合现有现场。',
    painPoints: ['泡水后人工捞取和搬运强度高', '分体设备之间转运造成等待和散落', '人员少时难以同时照看多台设备', '担心一体机清洗、维护和故障影响整条流程'],
    products: ['pneumatic-discharge-scalding-dehairing-machine'],
    roles: [['气动翻出泡水脱毛一体机', '集成泡水、脱毛与气动翻出', '适合减少搬运，需确认气源、电源、热源和实际工艺'], ['人工检查工位', '检查残毛、禽体状态并修整', '一体化设备后仍需保留检查和异常处理位置']],
    process: ['设备检查并准备热源与气源', '按批次投入家禽进行泡水', '完成设定流程后进入脱毛', '气动翻出并接料', '人工检查、修整与冲洗', '停机泄压、断电并完成清洗'],
    capacities: [['单机整合配置', '人员少、希望减少搬运', '气动翻出泡水脱毛一体机', '实际节拍需根据禽种、单批量和泡水时间确认'], ['配套作业配置', '订单波动或需处理多禽种', '一体机 + 独立检查修整位', '保留人工调整和异常批次处理能力'], ['升级评估配置', '现有分体流程准备改造', '先测算转运时间和人工，再决定替换范围', '若分体设备仍能满足节拍，不应只为设备数量少而盲目替换']],
    articles: ['pneumatic-scalding-dehairing-integrated-machine-application', 'site-preparation-for-poultry-plucker', 'poultry-machine-installation-commissioning-acceptance'],
    faqs: ['pneumatic-integrated-machine-suitable-users', 'site-preparation-before-installation', 'poultry-machine-installation-acceptance'],
    pageFaqs: [['一体机一定比泡水机加脱毛机效率高吗？', '不一定。一体机主要减少转运和人员操作，最终效率仍由泡水时间、单批量、禽种和出料修整决定。'], ['安装前除了电源还要准备什么？', '通常还需确认热源、气源、给排水、地面承重、操作空间和安全通道。']],
    body: '一体化方案适合希望降低搬运强度和固定操作流程的客户，但设备集成度越高，越需要在安装前把现场条件确认清楚。\n\n试机验收时应完整运行泡水、脱毛、翻出、接料和清洗流程，而不是只观察脱毛结果。'
  },
  {
    slug: 'batch-fish-scaling-solution', title: '鱼类批量脱鳞加工解决方案', category: '水产加工',
    description: '针对水产批发、配送和初加工客户，将鱼类分级、脱鳞、复检、冲洗与冷藏周转组织为连续流程。',
    suitableFor: ['水产批发市场', '生鲜配送中心', '餐饮供应链水产加工点', '需要替代人工刮鳞的初加工厂'],
    decisionSummary: '批量脱鳞选型首先看鱼种和规格分布，其次才是数量。不同鱼鳞结构和鱼体尺寸可能需要不同操作方式，必须使用常用原料验证去鳞效果与鱼体完整度。',
    painPoints: ['人工刮鳞效率低且人员难稳定', '鱼种尺寸混杂导致机器效果波动', '残鳞复检和冲洗成为后段瓶颈', '鱼鳞和污水影响场地卫生'],
    products: ['fish-scaling-machine'],
    roles: [['鱼类脱鳞机', '承担批量去鳞', '按鱼种、尺寸、鱼体完整度和高峰处理量确认'], ['分级与复检工位', '控制规格差异并检查残鳞', '设备前后均应保留人工判断和异常鱼处理位置'], ['冲洗接料区', '清除残鳞并转入冷藏', '需做好排水、防滑和洁污分区']],
    process: ['原料验收并按鱼种尺寸分级', '预清洗和必要的前处理', '按批次进入脱鳞设备', '人工复检鱼鳃、腹部等位置', '冲洗、沥水和称重', '低温周转并清洗设备与场地'],
    capacities: [['门店批量配置', '品种较少、营业高峰集中', '脱鳞机 + 复检清洗位', '重点核算高峰等待时间和每批清洗时间'], ['配送加工配置', '订单分批、规格相对稳定', '分级台 + 脱鳞机 + 冲洗沥水台', '按订单批次管理，减少规格混投'], ['初加工配置', '鱼种较多、连续作业', '多工位分级 + 脱鳞 + 复检 + 冷藏周转', '是否需要多台设备应通过试机节拍和订单数据确定']],
    articles: ['how-to-choose-fish-scaling-machine', 'why-fish-scaler-not-clean', 'will-fish-scaler-damage-fish', 'aquatic-store-processing-equipment-configuration'],
    faqs: ['how-to-choose-fish-scaling-machine', 'why-fish-scaler-not-clean', 'will-fish-scaler-damage-fish', 'aquatic-store-needed-equipment'],
    pageFaqs: [['鱼类脱鳞机能做到完全不复检吗？', '不同鱼种和部位的鱼鳞情况不同，实际生产通常仍需设置复检工位处理少量残鳞。'], ['鱼体受损一定是设备问题吗？', '不一定。鱼种、尺寸、原料状态、单批量和操作时间都会影响鱼体完整度，应通过常用原料试机判断。']],
    body: '批量脱鳞流程需要把分级放在设备之前。规格差异过大的鱼混合处理，容易出现小鱼过度处理或大鱼残鳞。\n\n场地设计还应重点处理鱼鳞收集、污水排放和防滑问题，以免设备效率提升后，清理工作反而成为新的负担。'
  },
  {
    slug: 'fish-meat-surimi-processing-solution', title: '鱼肉采集与鱼糜原料加工解决方案', category: '鱼糜丸类',
    description: '以鱼类采肉机为核心，组织原料前处理、骨肉分离、鱼肉接料和后续低温加工，适合鱼糜与鱼丸原料生产。',
    suitableFor: ['鱼糜原料加工点', '鱼丸食品厂', '水产副产物利用客户', '从人工刮肉升级的作坊'],
    decisionSummary: '采肉机解决的是骨肉分离，不负责完整鱼丸生产。方案应先明确原料前处理和采肉后用途，再评估接料、冷藏、打浆与成型等后续设备。',
    painPoints: ['人工刮肉慢且劳动强度高', '骨皮混入影响后续鱼糜品质', '原料温度和新鲜度波动', '采肉设备与打浆工序节拍不匹配'],
    products: ['fish-meat-separator', 'fish-scaling-machine'],
    roles: [['鱼类采肉机', '鱼肉与鱼骨、鱼皮分离', '按鱼种、原料状态、目标鱼肉和处理量试机'], ['鱼类脱鳞机', '按工艺需要完成前端去鳞', '并非所有采肉流程都必须配置，应依据原料和成品要求判断'], ['低温接料与周转', '控制采肉后原料状态', '接料容器、冷藏和后续加工时间需提前规划']],
    process: ['原料低温验收与分级', '去头、去内脏、清洗等前处理', '按工艺决定是否去鳞', '沥水后均匀进入采肉机', '检查鱼肉、骨皮分离状态', '鱼肉低温接料并及时进入后续加工'],
    capacities: [['人工升级配置', '原有人工刮肉、处理量较小', '鱼类采肉机 + 接料容器', '先确认原料前处理和清洗方式'], ['鱼糜原料配置', '稳定提供鱼糜原料', '前处理台 + 采肉机 + 低温周转', '建立原料批次和采肉效果记录'], ['鱼丸配套配置', '后续有打浆成型需求', '去鳞/前处理 + 采肉 + 打浆成型配套', '后段设备和产量需根据产品工艺另行核算']],
    articles: ['how-to-choose-fish-meat-separator', 'what-affects-fish-meat-separator-yield', 'how-to-choose-fish-scaling-machine'],
    faqs: ['how-to-choose-fish-meat-separator', 'what-affects-fish-meat-yield', 'how-to-choose-fish-scaling-machine'],
    pageFaqs: [['采肉率可以只看设备参数吗？', '不可以。鱼种、原料新鲜度、前处理、操作和目标成品都会影响采肉结果。'], ['采肉后的鱼肉应该怎样衔接？', '应及时接料并保持低温，根据产品工艺进入打浆、调味或其他加工，避免长时间常温停留。']],
    body: '鱼肉采集方案的重点是保持原料与后续工序连续。采肉前处理不充分、接料不及时或后段设备能力不足，都会影响实际生产。\n\n洪弟机械建议客户提供原料样品或清晰资料，通过试机观察鱼肉状态和骨皮分离情况，再确定设备与操作方式。'
  },
  {
    slug: 'food-machinery-site-installation-solution', title: '食品机械场地改造与安装解决方案', category: '场地与配套',
    description: '适用于购买家禽脱毛、泡水、水产去鳞和采肉设备前的场地核查，覆盖电源、给排水、动线、搬运和验收。',
    suitableFor: ['新建食品加工场地', '旧门店增加机械设备', '准备从单机升级为配套流程的客户', '异地采购且需要提前准备现场的客户'],
    decisionSummary: '设备进场前应完成尺寸、电源、给排水、热源或气源和搬运通道核查。先买设备再改场地，容易出现无法进门、线路不足、排水不畅或操作空间被占用。',
    painPoints: ['设备到场后发现门宽或通道不足', '220V/380V线路与设备功率不匹配', '冲洗污水和羽毛鱼鳞堵塞排水', '设备摆放后缺少开盖、出料或检修空间', '只验收空载运行，没有用真实原料测试'],
    products: ['58-turbine-stainless-poultry-plucker', 'six-roller-stainless-poultry-plucker', 'nine-roller-stainless-poultry-plucker', 'double-lid-poultry-scalding-mixer', 'pneumatic-discharge-scalding-dehairing-machine', 'fish-scaling-machine', 'fish-meat-separator'],
    roles: [['厂家设备资料', '提供外形、电压、功率和操作要求', '下单前索取对应型号资料并确认是否有配置变化'], ['客户现场资料', '用于判断搬运、安装和使用条件', '提供尺寸、照片、视频、配电和给排水信息'], ['安装调试记录', '确认设备到场后的状态和试机结果', '记录空载、带料、清洗和人员培训过程']],
    process: ['收集场地尺寸、照片和设备清单', '核对门洞、通道、楼层和搬运方式', '确认电源、热源、气源和给排水', '按原料流向规划设备与人员动线', '设备到场定位、接线和空载检查', '使用真实原料试机并完成验收培训'],
    capacities: [['单机安装', '新增一台脱毛、去鳞或采肉设备', '核对设备尺寸、电源、排水和清洗空间', '保留检修与出料方向空间'], ['两机配套', '泡水+脱毛或去鳞+采肉', '增加中间缓冲、沥水、接料和转运位置', '按较慢工序设计等待区，避免相互堵塞'], ['流程改造', '多台设备或场地重新布局', '按原料、加工、成品和废弃物流向分区', '必要时由电工、给排水和食品生产专业人员共同确认']],
    articles: ['site-preparation-for-poultry-plucker', 'poultry-machine-installation-commissioning-acceptance', 'how-to-evaluate-food-machinery-manufacturer', 'parameters-before-buying-poultry-plucker'],
    faqs: ['site-preparation-before-installation', 'poultry-machine-installation-acceptance', 'how-to-evaluate-food-machinery-manufacturer', 'what-info-before-buying'],
    pageFaqs: [['设备下单前最少需要提供哪些现场资料？', '建议提供场地长宽高、门洞和通道尺寸、配电箱与电压、给排水位置、设备摆放照片或视频，以及前后工序信息。'], ['验收只看机器能否启动可以吗？', '不够。还应使用真实原料检查效果、节拍、振动、出料、清洗和人员操作，并记录需要调整的问题。']],
    body: '场地准备是设备方案的一部分。对家禽设备，要重点考虑羽毛、热水、排水和地面防滑；对水产设备，要重点考虑鱼鳞、油脂、污水和低温周转。\n\n洪弟机械可根据客户提供的现场资料给出初步摆放和配置建议，但电气、建筑、消防、环保和食品生产合规事项应由当地具备资质的专业人员确认。'
  }
];

function q(value) {
  return JSON.stringify(value);
}

function render(solution) {
  const isAquatic = solution.category === '水产加工' || solution.category === '鱼糜丸类';
  const siteRequirements = isAquatic ? aquaticSite : poultrySite;
  const requiredInfo = isAquatic ? aquaticInfo : poultryInfo;
  const acceptancePoints = isAquatic ? aquaticAcceptance : poultryAcceptance;
  const maintenanceTips = isAquatic ? aquaticMaintenance : poultryMaintenance;
  const keywords = [solution.title.replace('解决方案', ''), solution.category, '食品机械解决方案', '洪弟机械食品厂'];
  const frontmatter = [
    '---',
    `title: ${q(solution.title)}`,
    `slug: ${q(solution.slug)}`,
    `solutionCategory: ${q(solution.category)}`,
    `description: ${q(solution.description)}`,
    `geoSummary: ${q(solution.decisionSummary)}`,
    `keywords: ${q(keywords)}`,
    `suitableFor: ${q(solution.suitableFor)}`,
    `decisionSummary: ${q(solution.decisionSummary)}`,
    `painPoints: ${q(solution.painPoints)}`,
    `recommendedProducts: ${q(solution.products)}`,
    `equipmentRoles: ${q(solution.roles.map(([product, role, selection]) => ({ product, role, selection })))}`,
    `process: ${q(solution.process)}`,
    `configuration: ${q(siteRequirements)}`,
    `capacity: ${q(solution.capacities.map(([level]) => level).join(' / '))}`,
    `capacityOptions: ${q(solution.capacities.map(([level, suitableFor, configuration, note]) => ({ level, suitableFor, configuration, note })))}`,
    `siteRequirements: ${q(siteRequirements)}`,
    `requiredInfo: ${q(requiredInfo)}`,
    `acceptancePoints: ${q(acceptancePoints)}`,
    `maintenanceTips: ${q(maintenanceTips)}`,
    `faqs: ${q(solution.pageFaqs.map(([question, answer]) => ({ question, answer })))}`,
    `relatedProducts: ${q(solution.products)}`,
    `relatedArticles: ${q(solution.articles)}`,
    `relatedFaqs: ${q(solution.faqs)}`,
    `date: ${q(date)}`,
    `updated: ${q(date)}`,
    `sourceNote: ${q(boundary)}`,
    'seo:',
    `  title: ${q(`${solution.title}｜洪弟机械食品厂`)}`,
    `  description: ${q(solution.description)}`,
    `  keywords: ${q(keywords)}`,
    '---',
    '',
    '### 场景说明',
    solution.body,
    '',
    '### 洪弟机械如何协助选型',
    `${contact}提供主要原料、处理量、现场尺寸、电压和前后工序后，可先进行设备方向与配置核对。`,
    ''
  ];
  return frontmatter.join('\n');
}

fs.mkdirSync(outputDir, { recursive: true });
for (const solution of solutions) {
  fs.writeFileSync(path.join(outputDir, `${solution.slug}.md`), render(solution), 'utf8');
}

const expected = new Set(solutions.map((item) => `${item.slug}.md`));
for (const file of fs.readdirSync(outputDir).filter((name) => name.endsWith('.md'))) {
  if (!expected.has(file)) fs.rmSync(path.join(outputDir, file));
}

console.log(`Generated ${solutions.length} Chinese solution pages.`);

const contentSets = Object.fromEntries(['products', 'articles', 'faqs'].map((kind) => [kind, new Set(
  fs.readdirSync(path.join(root, 'content', 'zh', kind)).filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''))
)]));
const referenceFields = { relatedProducts: 'products', recommendedProducts: 'products', relatedArticles: 'articles', relatedFaqs: 'faqs' };
const errors = [];
for (const file of fs.readdirSync(outputDir).filter((name) => name.endsWith('.md'))) {
  const parsed = matter(fs.readFileSync(path.join(outputDir, file), 'utf8')).data;
  for (const [field, kind] of Object.entries(referenceFields)) {
    for (const slug of parsed[field] ?? []) {
      if (!contentSets[kind].has(slug)) errors.push(`${file}: ${field} references missing ${kind}/${slug}`);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('All solution references are valid.');
}
