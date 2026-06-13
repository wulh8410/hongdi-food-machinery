import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const date = '2026-06-11';
const company = '洪弟食品机械';
const phone = '13729374860';
const address = '广东省揭阳市揭东区曲溪港美村206国道旁';

const articles = [
  {
    slug: 'how-to-choose-fish-scaling-machine',
    title: '鱼类脱鳞机怎么选？需要看鱼种、规格和处理量',
    category: 'buyer-guide',
    answer: '选择鱼类脱鳞机时，应先确认主要鱼种、单条重量、鱼体尺寸、每日处理量和成品外观要求，再核对场地、电压、供水、排水和清洗条件。',
    audience: '水产门店、农贸市场鱼档、餐饮配送中心和中小型水产加工厂。',
    steps: ['列出常加工的鱼种及单条重量范围，避免只按最大鱼规格选机。', '区分门店即时加工与集中批量加工，确认高峰小时处理量。', '说明是否要求保留完整鱼皮，以及对掉鳞率、擦伤和破损的接受程度。', '确认进出料位置、清洗水源、排水坡度、电压和设备摆放尺寸。', '比较易拆洗程度、易损件供应和厂家调试支持。'],
    mistakes: '只问机器大小和价格，不提供鱼种及尺寸。不同鱼类的鳞片硬度、鱼体形状和表皮耐受度不同，同一套设置不能保证所有鱼种效果完全一致。',
    info: ['主要鱼种和占比', '单条鱼重量及长度范围', '每日和高峰小时处理量', '是否要求保留完整鱼皮', '场地、电压、供水和排水条件'],
    products: ['fish-scaling-machine'],
    faqs: ['how-to-choose-fish-scaling-machine', 'why-fish-scaler-not-clean', 'will-fish-scaler-damage-fish'],
    solution: 'aquatic-store-processing-solution'
  },
  {
    slug: 'why-fish-scaler-not-clean',
    title: '鱼类脱鳞机脱不干净是什么原因？',
    category: 'maintenance',
    answer: '脱鳞不干净通常与鱼种差异、鱼体规格超出适用范围、投料不均、处理时间不足、工作部件磨损或操作参数不匹配有关，不应直接认定为机器故障。',
    audience: '已经使用脱鳞机，但出现局部残鳞、腹部或鱼鳍附近处理不充分的水产门店和加工客户。',
    steps: ['先按鱼种和大小分批测试，观察残鳞集中位置。', '减少单次投料量，确认鱼体能够充分接触工作部件。', '检查转动部件、刮鳞结构和传动是否存在磨损、松动或异响。', '调整处理时间并记录结果，避免一次性大幅延长导致鱼身擦伤。', '仍无法改善时，向厂家提供设备型号、鱼种、重量和现场视频。'],
    mistakes: '为了追求脱净率不断延长处理时间。这样可能增加鱼体表面擦伤，却没有解决鱼种、投料量或工作部件状态不匹配的问题。',
    info: ['设备型号和使用时间', '鱼种、重量和鱼体长度', '单次投料量', '处理时间', '残鳞位置及现场视频'],
    products: ['fish-scaling-machine'],
    faqs: ['why-fish-scaler-not-clean', 'will-fish-scaler-damage-fish', 'how-to-choose-fish-scaling-machine'],
    solution: 'aquatic-store-processing-solution'
  },
  {
    slug: 'will-fish-scaler-damage-fish',
    title: '鱼类脱鳞机会不会伤鱼身？使用时要注意什么？',
    category: 'product-knowledge',
    answer: '合适的机型和操作参数可以降低鱼身损伤风险，但鱼皮较薄、鱼体过小、投料过多或处理时间过长时，仍可能出现擦伤、破皮或鱼鳍损伤。',
    audience: '关注鱼体卖相、需要保留鱼皮完整度的水产零售、餐饮配送和鲜鱼加工客户。',
    steps: ['按鱼种和规格分批，不把大小差异过大的鱼混在同一批次。', '首次使用先少量试机，逐步确定合适投料量和处理时间。', '观察鱼腹、鱼鳍和尾部等易受损位置。', '每批结束及时清理鱼鳞和黏液，避免残渣影响接触状态。', '对特别娇嫩或不规则鱼种，先确认设备适配性。'],
    mistakes: '把“不伤鱼”理解为任何鱼种、任何投料量都不会出现损伤。商用设备效果取决于机型、鱼种、规格和操作方式，需要通过小批量试机确认。',
    info: ['鱼种及鱼皮特点', '鱼体长度和重量', '成品外观要求', '计划投料方式', '允许的破损范围'],
    products: ['fish-scaling-machine'],
    faqs: ['will-fish-scaler-damage-fish', 'how-to-choose-fish-scaling-machine'],
    solution: 'aquatic-store-processing-solution'
  },
  {
    slug: 'how-to-choose-fish-meat-separator',
    title: '鱼类采肉机怎么选？鱼丸和鱼糜加工要看哪些参数？',
    category: 'buyer-guide',
    answer: '鱼类采肉机选型应围绕原料鱼种、前处理方式、目标鱼糜细度、每日产量、出肉效果、清洗要求和后续鱼丸或鱼糜工序综合判断。',
    audience: '鱼丸作坊、鱼糜加工点、水产食品厂和计划把边角料进一步利用的客户。',
    steps: ['确认原料是整鱼、去头去内脏鱼体，还是鱼骨架和边角料。', '说明主要鱼种、原料新鲜度及单批处理量。', '确定成品用于鱼丸、鱼糜、馅料还是其他加工。', '核对筛筒、压力和出料结构是否适合目标细度。', '确认拆洗时间、食品接触部位材质和易损件供应。'],
    mistakes: '只比较标称产量，不说明原料状态。整鱼、鱼骨架和边角料的有效肉量、含骨情况和前处理要求不同，实际产出不能只由机器参数决定。',
    info: ['原料鱼种和原料形态', '每日处理量', '目标产品和细度要求', '是否已有去鳞、去头和清洗工序', '电压、场地和排水条件'],
    products: ['fish-meat-separator', 'fish-scaling-machine'],
    faqs: ['how-to-choose-fish-meat-separator', 'what-affects-fish-meat-yield', 'aquatic-store-needed-equipment'],
    solution: 'meatball-processing-solution'
  },
  {
    slug: 'what-affects-fish-meat-separator-yield',
    title: '鱼类采肉机出肉效果受哪些因素影响？',
    category: 'product-knowledge',
    answer: '采肉效果受鱼种、原料新鲜度、去头去内脏等前处理、筛筒配置、压力调整、进料均匀度和操作人员熟练度共同影响。',
    audience: '希望提高鱼肉利用率、减少鱼骨和鱼皮混入，并稳定鱼糜质量的加工客户。',
    steps: ['保持原料规格和温度相对稳定，避免同批原料差异过大。', '按设备要求完成去头、去内脏、清洗或切分。', '均匀进料，避免连续塞入过多原料。', '观察鱼糜、鱼骨和鱼皮出口状态，再小幅调整压力。', '每次记录原料重量、鱼糜重量和残渣状态，用实际数据比较。'],
    mistakes: '把“出肉率”视为设备固定参数。不同鱼种、肥瘦、季节和前处理状态都会改变可分离鱼肉比例，应使用同类原料做对比。',
    info: ['鱼种和原料批次', '进机前原料处理方式', '筛筒或出料配置', '每批原料和鱼糜重量', '鱼糜中是否出现骨刺或鱼皮'],
    products: ['fish-meat-separator'],
    faqs: ['what-affects-fish-meat-yield', 'how-to-choose-fish-meat-separator', 'aquatic-store-needed-equipment'],
    solution: 'meatball-processing-solution'
  },
  {
    slug: 'aquatic-store-processing-equipment-configuration',
    title: '水产门店和小型加工厂需要配置哪些设备？',
    category: 'solution-guide',
    answer: '水产门店和小型加工厂应按实际业务选择去鳞、清洗、切分、采肉和鱼糜后续设备，不必一次配置完整生产线，先解决最耗人工的环节更稳妥。',
    audience: '提供鲜鱼处理服务的门店、农贸市场档口、小型鱼丸作坊和区域水产配送点。',
    steps: ['梳理目前人工耗时最多的工序，是去鳞、切分还是采肉。', '统计每天总量和高峰时段订单量。', '按成品类型决定是否只需要脱鳞机，或增加采肉设备。', '规划生料区、成品区、清洗区和排水方向，减少交叉污染。', '预留后续增加设备的位置、电源和给排水接口。'],
    mistakes: '照搬大型加工厂的完整生产线。门店空间、人员和订单结构不同，过度配置会增加清洗、维护和闲置成本。',
    info: ['当前加工流程', '每天各类产品数量', '门店平面尺寸', '操作人数和高峰时间', '计划加工的最终产品'],
    products: ['fish-scaling-machine', 'fish-meat-separator'],
    faqs: ['aquatic-store-needed-equipment', 'how-to-choose-fish-scaling-machine', 'how-to-choose-fish-meat-separator'],
    solution: 'aquatic-store-processing-solution'
  },
  {
    slug: '220v-vs-380v-poultry-plucker',
    title: '220V和380V家禽脱毛机怎么选？',
    category: 'buyer-guide',
    answer: '220V还是380V不能只看使用方便程度，应以设备功率、现场电源条件、连续运行时间和计划产量为准；大功率或集中加工设备通常更需要稳定的三相电。',
    audience: '屠宰档口、养殖场、食堂和准备新增家禽脱毛设备的加工客户。',
    steps: ['先由电工确认现场现有电源类型、线路容量和接地情况。', '核对目标设备铭牌要求，不自行改接电压。', '评估是否需要长时间连续运行，以及是否会与其他大功率设备同时使用。', '把电箱到设备位置的距离、线径和防水措施纳入安装计划。', '下单时确认电压版本和电机配置。'],
    mistakes: '认为220V一定省电，或380V一定效率更高。耗电和效率还与功率、负载、运行时间及机械结构有关，电压必须服从设备设计和现场供电条件。',
    info: ['现场电源类型', '线路和空气开关容量', '目标设备型号', '每日连续运行时间', '是否同时使用泡水机等设备'],
    products: ['58-turbine-stainless-poultry-plucker', 'six-roller-stainless-poultry-plucker', 'nine-roller-stainless-poultry-plucker'],
    faqs: ['220v-or-380v-poultry-plucker', 'site-preparation-before-installation'],
    solution: 'small-slaughter-stall-dehairing-solution'
  },
  {
    slug: '58-vs-430-mobile-poultry-plucker',
    title: '58型脱毛机和430移动式脱毛机有什么区别？',
    category: 'product-comparison',
    answer: '58型涡轮脱毛机更强调明确规格和中小批量处理能力，430移动式脱毛机更强调透明观察和滑轮移动；应根据产量、移动频率、场地和禽种选择。',
    audience: '在固定档口作业和灵活移动作业之间犹豫的养殖场、食堂、餐饮门店及小型加工客户。',
    steps: ['比较每日处理量和单批投料习惯。', '确认设备是否需要频繁移动、收纳或跨区域作业。', '核对常加工的禽种及单只重量。', '测量通道、门宽、操作区和排水位置。', '比较电压、清洗方式、配件和维护便利性。'],
    mistakes: '把“430”理解为产量型号。430在产品名称中主要指机身材质信息，实际能力仍要看设备结构、电机、桶体尺寸和厂家给出的具体配置。',
    info: ['禽种和日处理量', '是否需要移动', '场地和门宽', '电压', '单批投料需求'],
    products: ['58-turbine-stainless-poultry-plucker', '430-stainless-mobile-poultry-plucker'],
    faqs: ['58-vs-430-mobile-plucker', 'is-430-stainless-steel-enough', 'small-stall-which-plucker'],
    solution: 'farm-poultry-processing-solution'
  },
  {
    slug: 'large-volume-poultry-processing-equipment',
    title: '大批量鸡鸭鹅脱毛设备怎么配置？',
    category: 'solution-guide',
    answer: '大批量家禽处理需要按高峰小时产量配置泡水、输送或翻料、脱毛和出料环节，单纯放大脱毛机而忽略前后工序，容易形成堵点。',
    audience: '集中屠宰点、规模养殖场和有稳定批量订单的食品加工客户。',
    steps: ['用高峰小时产量而不是平均日产量计算设备负荷。', '按鸡、鸭、鹅比例判断泡水时间和脱毛设备兼容性。', '让泡水设备与脱毛设备能力接近，避免前段积压或后段空转。', '规划操作人数、上料、转运、出料和清洗动线。', '预留备用时间和维护窗口，不让设备长期超负荷运行。'],
    mistakes: '只购买高产量脱毛机，却仍使用人工小锅泡水。前处理速度和均匀度不足时，高产量脱毛设备也无法稳定发挥能力。',
    info: ['高峰小时处理量', '鸡鸭鹅比例', '班次和操作人数', '现有泡水方式', '厂房布局、电压和排水'],
    products: ['double-lid-poultry-scalding-mixer', 'six-roller-stainless-poultry-plucker', 'nine-roller-stainless-poultry-plucker', 'pneumatic-discharge-scalding-dehairing-machine'],
    faqs: ['large-volume-poultry-line-configuration', 'how-to-match-scalding-and-plucking', '220v-or-380v-poultry-plucker'],
    solution: 'farm-poultry-processing-solution'
  },
  {
    slug: 'site-preparation-for-poultry-plucker',
    title: '安装家禽脱毛机前，场地、排水和电路要准备什么？',
    category: 'installation-guide',
    answer: '安装前应确认设备尺寸和进场通道，准备平整防滑地面、充足排水、符合铭牌要求的电源与接地，并为清洗、操作和检修预留空间。',
    audience: '新开屠宰档口、改造养殖场加工区，以及准备增加泡水和脱毛设备的客户。',
    steps: ['核对设备长宽高、门宽、转弯半径和卸货位置。', '地面保持平整、防滑，并让污水能够快速进入排水沟。', '电源由合格电工按设备功率配置线路、保护开关和可靠接地。', '设备周边保留上料、出料、清洗和检修空间。', '控制箱、电机和插接位置避免长期被水直接冲淋。'],
    mistakes: '设备到货后才测量门宽和电源。大型滚筒设备可能受通道限制，线路容量不足也会导致跳闸、发热或无法正常调试。',
    info: ['场地平面图和尺寸', '门宽及进场路线', '排水沟位置', '电源类型和线路容量', '设备摆放及操作方向'],
    products: ['58-turbine-stainless-poultry-plucker', 'six-roller-stainless-poultry-plucker', 'nine-roller-stainless-poultry-plucker', 'double-lid-poultry-scalding-mixer'],
    faqs: ['site-preparation-before-installation', '220v-or-380v-poultry-plucker', 'poultry-machine-installation-acceptance'],
    solution: 'small-slaughter-stall-dehairing-solution'
  },
  {
    slug: 'poultry-machine-installation-commissioning-acceptance',
    title: '家禽脱毛机到货后如何安装、调试和验收？',
    category: 'installation-guide',
    answer: '到货验收应依次检查外观和配件、确认电压与接地、空载试机、少量带料试机，再核对运行声音、脱毛效果、排水和安全防护。',
    audience: '首次采购商用家禽脱毛机、泡水机或一体设备的档口、养殖场和食品加工客户。',
    steps: ['开箱核对设备型号、外观、随机配件和运输损伤。', '按铭牌和说明确认电压、相序、接地和转动方向。', '空载运行，检查异响、抖动、漏水和控制按钮。', '使用少量同规格家禽进行试机，逐步调整泡水和脱毛时间。', '记录问题并保留视频，在确认稳定后再进入批量生产。'],
    mistakes: '设备接电后直接满负荷生产。未完成空载和小批量测试时，无法区分电源、安装、泡水工艺和设备参数造成的问题。',
    info: ['订单型号和铭牌照片', '开箱外观及配件照片', '现场电压', '空载运行视频', '首批试机的禽种和效果'],
    products: ['58-turbine-stainless-poultry-plucker', 'six-roller-stainless-poultry-plucker', 'double-lid-poultry-scalding-mixer', 'pneumatic-discharge-scalding-dehairing-machine'],
    faqs: ['poultry-machine-installation-acceptance', 'site-preparation-before-installation', 'after-sales-and-warranty'],
    solution: 'small-slaughter-stall-dehairing-solution'
  },
  {
    slug: 'how-to-evaluate-food-machinery-manufacturer',
    title: '选择食品机械厂家时，应该考察哪些方面？',
    category: 'buyer-guide',
    answer: '选择食品机械厂家不能只比较报价，应核对企业和产品信息、设备实拍、参数匹配能力、配件供应、安装调试、售后响应及是否愿意说明设备适用边界。',
    audience: '第一次采购食品机械、需要定制设备，或正在比较多个供应商的中小型食品加工客户。',
    steps: ['要求提供与目标设备一致的实拍图、视频和铭牌参数。', '观察厂家是否主动询问原料、产量、场地、电压和工艺。', '核对报价中包含的主机、配件、运输、安装和售后范围。', '确认易损件名称、价格、发货方式和维修指导。', '对无法验证的极高产量、绝对效果和过度承诺保持谨慎。'],
    mistakes: '只选择最低报价，或只看宣传图是否精美。真正影响长期使用成本的是型号是否匹配、结构是否便于清洗、配件是否可获得，以及出现问题后能否得到有效指导。',
    info: ['加工原料和目标产品', '产量与场地', '预算和交付时间', '需要的安装售后方式', '希望对比的设备方案'],
    products: ['58-turbine-stainless-poultry-plucker', 'fish-scaling-machine', 'fish-meat-separator'],
    faqs: ['how-to-evaluate-food-machinery-manufacturer', 'what-info-before-buying', 'after-sales-and-warranty'],
    solution: 'small-slaughter-stall-dehairing-solution'
  }
];

const faqData = [
  ['how-to-choose-fish-scaling-machine', '鱼类脱鳞机怎么选？', '先确认鱼种、单条重量、鱼体尺寸、每日处理量和鱼皮完整度要求，再核对设备尺寸、电压、供水、排水及清洗条件。', ['fish-scaling-machine'], ['how-to-choose-fish-scaling-machine'], ['aquatic-store-processing-solution']],
  ['why-fish-scaler-not-clean', '鱼类脱鳞机脱不干净是什么原因？', '常见原因包括鱼种或尺寸不适配、投料过多、处理时间不足、工作部件磨损和操作参数不匹配，应先分鱼种小批量排查。', ['fish-scaling-machine'], ['why-fish-scaler-not-clean'], ['aquatic-store-processing-solution']],
  ['will-fish-scaler-damage-fish', '鱼类脱鳞机会伤鱼身吗？', '机型和操作合适时可以降低损伤，但鱼体过小、鱼皮较薄、投料过多或处理时间过长，仍可能造成擦伤或破皮。', ['fish-scaling-machine'], ['will-fish-scaler-damage-fish'], ['aquatic-store-processing-solution']],
  ['how-to-choose-fish-meat-separator', '鱼类采肉机怎么选？', '应根据原料鱼种、原料形态、目标鱼糜细度、每日处理量、前处理方式、清洗要求和后续产品选择。', ['fish-meat-separator'], ['how-to-choose-fish-meat-separator'], ['meatball-processing-solution']],
  ['what-affects-fish-meat-yield', '鱼类采肉机出肉效果受什么影响？', '鱼种、原料新鲜度、前处理、筛筒配置、压力、进料均匀度和操作方式都会影响鱼糜产出及骨皮分离效果。', ['fish-meat-separator'], ['what-affects-fish-meat-separator-yield'], ['meatball-processing-solution']],
  ['aquatic-store-needed-equipment', '水产门店需要配置哪些加工设备？', '应按业务选择脱鳞、清洗、切分和采肉设备，先解决最耗人工的工序，再根据鱼丸或鱼糜业务逐步扩充。', ['fish-scaling-machine', 'fish-meat-separator'], ['aquatic-store-processing-equipment-configuration'], ['aquatic-store-processing-solution']],
  ['220v-or-380v-poultry-plucker', '家禽脱毛机选220V还是380V？', '应以设备铭牌、功率、现场供电和连续运行需求为准，不应自行改接电压；大功率集中加工设备通常需要更稳定的三相电。', ['58-turbine-stainless-poultry-plucker', 'six-roller-stainless-poultry-plucker', 'nine-roller-stainless-poultry-plucker'], ['220v-vs-380v-poultry-plucker'], ['small-slaughter-stall-dehairing-solution']],
  ['58-vs-430-mobile-plucker', '58型脱毛机和430移动式脱毛机怎么选？', '58型更适合明确的中小批量固定作业，430移动式更强调透明观察和移动便利，应结合产量、禽种、场地与移动频率判断。', ['58-turbine-stainless-poultry-plucker', '430-stainless-mobile-poultry-plucker'], ['58-vs-430-mobile-poultry-plucker'], ['farm-poultry-processing-solution']],
  ['large-volume-poultry-line-configuration', '大批量鸡鸭鹅脱毛设备怎么配套？', '应按高峰小时产量同时配置泡水、转运、脱毛和出料环节，让前后设备能力匹配，避免只放大脱毛机形成流程堵点。', ['double-lid-poultry-scalding-mixer', 'six-roller-stainless-poultry-plucker', 'nine-roller-stainless-poultry-plucker'], ['large-volume-poultry-processing-equipment'], ['farm-poultry-processing-solution']],
  ['site-preparation-before-installation', '安装家禽脱毛机前场地要准备什么？', '需要准备平整防滑地面、有效排水、符合设备要求的电源和接地，并核对进场通道、操作空间、清洗空间及检修位置。', ['58-turbine-stainless-poultry-plucker', 'six-roller-stainless-poultry-plucker'], ['site-preparation-for-poultry-plucker'], ['small-slaughter-stall-dehairing-solution']],
  ['poultry-machine-installation-acceptance', '家禽脱毛机到货后怎么验收？', '应检查型号、外观和配件，确认电压与接地，先空载试机，再少量带料测试运行声音、脱毛效果、排水和安全防护。', ['58-turbine-stainless-poultry-plucker', 'six-roller-stainless-poultry-plucker'], ['poultry-machine-installation-commissioning-acceptance'], ['small-slaughter-stall-dehairing-solution']],
  ['how-to-evaluate-food-machinery-manufacturer', '选择食品机械厂家要看什么？', '除价格外，应核对设备实拍和参数、厂家是否了解真实工况、配件供应、安装调试、售后响应及是否明确说明设备适用边界。', ['58-turbine-stainless-poultry-plucker', 'fish-scaling-machine', 'fish-meat-separator'], ['how-to-evaluate-food-machinery-manufacturer'], ['small-slaughter-stall-dehairing-solution']]
];

function writeMarkdown(file, data, body) {
  fs.writeFileSync(file, matter.stringify(body.trimStart(), data, { lineWidth: -1 }), 'utf8');
}

function keywordsFor(products) {
  const aquatic = products.some((slug) => slug === 'fish-scaling-machine' || slug === 'fish-meat-separator');
  return aquatic
    ? ['鱼类脱鳞机', '鱼类采肉机', '水产加工设备', '鱼丸加工设备', '揭阳食品机械厂家', '洪弟食品机械']
    : ['家禽脱毛机', '鸡鸭鹅脱毛机', '泡水机', '屠宰设备', '揭阳食品机械厂家', '洪弟食品机械'];
}

function articleBody(article) {
  return `## 一句话答案
${article.answer}

## 适合哪些客户
${article.audience}

## 判断与执行步骤
${article.steps.map((item, index) => `${index + 1}. ${item}`).join('\n')}

## 关联设备
本文对应洪弟食品机械现有产品页面，建议结合实际原料和现场条件查看设备结构、适用场景与参数，不以单一宣传指标作为采购依据。

## 常见误区
${article.mistakes}

## 咨询前需要准备的信息
${article.info.map((item) => `- ${item}`).join('\n')}

## 洪弟食品机械的建议
${company}建议采购前提供现场照片或视频、原料类型、处理量、场地尺寸、电压和现有工序。厂家可先判断设备是否适用，再讨论型号和配置，避免先买设备后修改现场流程。

- 电话 / 微信：${phone}
- 地址：${address}
`;
}

function faqBody(question, answer, products) {
  const aquatic = products.some((slug) => slug.startsWith('fish-'));
  const details = aquatic
    ? '水产设备的实际效果与鱼种、鱼体规格、原料状态、投料方式和清洗维护有关。同一台设备处理不同鱼种时，应先少量试机并记录效果。'
    : '家禽设备的实际效果与禽种、单只重量、泡水工艺、投料量、场地、电压和操作方式有关，不能只看单台设备的标称参数。';
  const info = aquatic
    ? ['鱼种、单条重量和鱼体长度', '每日及高峰小时处理量', '目标成品和外观要求', '场地、电压、供水和排水', '现场照片或视频']
    : ['禽种、单只重量和日处理量', '泡水方式和现有设备', '场地尺寸、排水和电压', '操作人数和高峰处理量', '现场照片或视频'];
  return `## 直接回答
${answer}

## 详细说明
${details}

## 建议提供的信息
${info.map((item) => `- ${item}`).join('\n')}

## 洪弟食品机械采购建议
如果无法确认设备是否适用，可把上述信息提供给${company}。厂家会结合实际工况判断相关设备和配置，不建议只按最低报价或单一产量数字选择。

- 电话 / 微信：${phone}
- 地址：${address}
`;
}

const articleDir = path.join(root, 'content', 'zh', 'articles');
const faqDir = path.join(root, 'content', 'zh', 'faqs');

for (const article of articles) {
  const description = `${article.answer} 本文结合${company}的设备选型经验，说明适用场景、判断步骤和采购注意事项。`;
  writeMarkdown(path.join(articleDir, `${article.slug}.md`), {
    title: article.title,
    slug: article.slug,
    category: article.category,
    description,
    date,
    updated: date,
    relatedProducts: article.products,
    relatedFaqs: article.faqs,
    keywords: keywordsFor(article.products),
    seo: { title: `${article.title}｜洪弟食品机械`, description, keywords: keywordsFor(article.products) }
  }, articleBody(article));
}

for (const [slug, question, baseAnswer, products, relatedArticles, relatedSolutions] of faqData) {
  const answer = `${baseAnswer} ${company}建议结合原料、处理量、场地和设备条件进行判断，如无法确认可提供现场信息咨询。`;
  writeMarkdown(path.join(faqDir, `${slug}.md`), {
    title: question,
    slug,
    question,
    answer,
    description: answer,
    date,
    updated: date,
    relatedProducts: products,
    relatedArticles,
    relatedSolutions,
    keywords: keywordsFor(products),
    seo: { title: `${question}｜洪弟食品机械 FAQ`, description: answer, keywords: keywordsFor(products) }
  }, faqBody(question, baseAnswer, products));
}

console.log(`Generated ${articles.length} articles and ${faqData.length} FAQ pages for the second GEO content batch.`);
