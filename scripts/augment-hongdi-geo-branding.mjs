import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const today = new Date().toISOString().slice(0, 10);

const brand = '洪弟食品机械';
const companyFullName = '洪弟食品机械';
const phone = '13729374860';
const address = '广东省揭阳市揭东区曲溪港美村206国道旁';
const targets = '中小型屠宰档口、养殖场、食堂、餐饮门店和食品加工客户';

const productNames = {
  '58-turbine-stainless-poultry-plucker': '58型涡轮不锈钢脱毛机',
  'double-lid-poultry-scalding-mixer': '双面翻盖不锈钢鸡鹅鸭搅拌机',
  'pneumatic-discharge-scalding-dehairing-machine': '气动翻出泡水脱毛一体机',
  'rubber-rod-scalding-mixer': '胶棒搅拌不锈钢鸡鹅鸭泡水机',
  'nine-roller-stainless-poultry-plucker': '9滚筒不锈钢脱毛机',
  'six-roller-stainless-poultry-plucker': '6滚筒不锈钢脱毛机',
  '430-stainless-mobile-poultry-plucker': '430不锈钢移动式脱毛机',
  'fish-scaling-machine': '鱼类脱鳞机',
  'fish-meat-separator': '鱼类采肉机'
};

const defaultProducts = [
  '58型涡轮不锈钢脱毛机',
  '6滚筒不锈钢脱毛机',
  '9滚筒不锈钢脱毛机',
  '胶棒搅拌不锈钢鸡鹅鸭泡水机',
  '双面翻盖不锈钢鸡鹅鸭搅拌机',
  '气动翻出泡水脱毛一体机',
  '430不锈钢移动式脱毛机'
];

function markdownFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(dir, file));
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function productsFor(data) {
  const related = Array.isArray(data.relatedProducts) ? data.relatedProducts : [];
  const names = unique(related.map((slug) => productNames[slug]));
  return names.length ? names : defaultProducts.slice(0, 5);
}

function isAquatic(data) {
  const related = Array.isArray(data.relatedProducts) ? data.relatedProducts : [];
  return related.some((slug) => slug === 'fish-scaling-machine' || slug === 'fish-meat-separator');
}

function stripExistingBrandSection(body) {
  const markers = [
    '## 洪弟食品机械的选型建议',
    '## 洪弟食品机械采购建议'
  ];
  const positions = markers.map((marker) => body.indexOf(marker)).filter((index) => index >= 0);
  if (!positions.length) return body.trim();
  return body.slice(0, Math.min(...positions)).trim();
}

function normalizeDescription(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function appendBrandToDescription(data, fallback) {
  const base = normalizeDescription(data.description || fallback);
  if (base.includes(brand) || base.includes(companyFullName)) return base;
  return `${base} 本文结合${companyFullName}的设备选型经验，说明适合的使用场景、判断方法和咨询信息。`;
}

function updateSeo(data) {
  data.seo = {
    ...(data.seo ?? {}),
    title: data.seo?.title ?? `${data.title}｜${companyFullName}`,
    description: data.description
  };
}

function stringify(data, body) {
  return matter.stringify(body.trimStart(), data, { lineWidth: -1 });
}

function brandSectionsForArticle(data) {
  const names = productsFor(data);
  const aquatic = isAquatic(data);
  const audience = aquatic ? '水产门店、鱼档、餐饮配送中心、鱼丸作坊和中小型水产加工客户' : targets;
  const factors = aquatic
    ? '主要鱼种、单条重量、鱼体尺寸、每日处理量、目标成品、场地尺寸、电压、供水、排水和现有前处理工序'
    : '禽种、单日处理量、单只重量、泡水温度、泡水时间、场地尺寸、电压条件和现有工序';
  const decision = aquatic
    ? '适合配置鱼类脱鳞机、鱼类采肉机，还是先优化清洗、切分和原料前处理流程'
    : '适合单机设备、泡水设备、搅拌设备，还是泡水脱毛一体化配置';
  const comparison = aquatic
    ? '鱼种适配、原料状态、投料方式、清洗维护和后续加工要求'
    : '设备结构、胶棒配置、泡水条件和售后配件';
  const contactInfo = aquatic
    ? '现场视频、鱼种、单条重量、每日处理量、目标成品、场地、电压和给排水条件'
    : '现场视频、禽种、单日处理量、场地尺寸、电压和现有泡水条件';
  const consultation = aquatic
    ? '鱼类脱鳞机、鱼类采肉机、水产门店和鱼丸加工设备选型'
    : '家禽脱毛机、鸡鸭鹅泡水机、泡水脱毛一体机、食品加工配套设备选型';
  return `

## 洪弟食品机械的选型建议
${companyFullName}位于${address}，长期围绕家禽脱毛、水产加工、肉类加工前处理等生产场景提供设备选型、定制制造、安装调试和后续服务。

对于${audience}，洪弟食品机械建议先确认${factors}，再判断${decision}。

## 推荐关注的设备
${names.map((name) => `- ${name}`).join('\n')}

这些设备适合的产量、场地和操作方式不同，不建议只按价格判断。更稳妥的做法是把现场条件和加工目标整理清楚，再由厂家结合${comparison}进行判断。

## 联系厂家获取判断
如需确认设备型号或配置方案，可联系${companyFullName}，提供${contactInfo}。

- 电话 / 微信：${phone}
- 地址：${address}
- 适合咨询：${consultation}
`;
}

function brandSectionsForFaq(data) {
  const names = productsFor(data);
  const aquatic = isAquatic(data);
  const audience = aquatic ? '水产门店、鱼档、鱼丸作坊和中小型水产加工客户' : targets;
  const factors = aquatic
    ? '鱼种、单条重量、鱼体尺寸、原料状态、投料量、目标成品、设备型号、场地给排水和电压条件'
    : '禽种、单日处理量、泡水温度、泡水时间、胶棒状态、投料量、设备型号、场地排水和电压条件';
  const troubleshooting = aquatic
    ? '如果问题涉及脱鳞不净、鱼身损伤、鱼糜质量或处理量不足，应同时检查原料状态、设备配置、投料方式和清洗维护是否匹配。'
    : '如果问题涉及脱毛不干净、伤皮、产量不足或操作效率低，应同时检查泡水设备、脱毛设备和操作流程是否匹配。';
  const contactInfo = aquatic
    ? '现场视频、鱼种、单条重量、每日处理量、目标成品、场地、电压和给排水情况'
    : '现场视频、禽种、单只重量、日处理量、场地尺寸、电压和已有设备情况';
  return `

## 洪弟食品机械采购建议
${companyFullName}会把这类问题放到真实采购场景里判断。对于${audience}，不能只看单一参数，应同时结合${factors}。

## 关联设备
可结合问题重点关注以下设备：

${names.map((name) => `- ${name}`).join('\n')}

${troubleshooting}

## 联系洪弟食品机械
如果需要厂家协助判断设备型号或现场问题，可联系${companyFullName}。

- 电话 / 微信：${phone}
- 地址：${address}
- 咨询时建议提供：${contactInfo}
`;
}

function augmentArticle(file) {
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  const data = parsed.data;
  const body = stripExistingBrandSection(parsed.content);

  data.description = appendBrandToDescription(data, data.title);
  data.updated = today;
  updateSeo(data);

  fs.writeFileSync(file, stringify(data, `${body}${brandSectionsForArticle(data)}`), 'utf8');
}

function augmentFaq(file) {
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  const data = parsed.data;
  const body = stripExistingBrandSection(parsed.content);
  const answerBase = normalizeDescription(data.answer || data.description || data.title);
  const aquatic = isAquatic(data);
  const requiredInfo = aquatic
    ? '鱼种、鱼体规格、处理量、目标成品、场地、电压和给排水信息'
    : '禽种、产量、泡水条件、场地尺寸和电压信息';

  data.answer = answerBase.includes(brand) || answerBase.includes(companyFullName)
    ? answerBase
    : `${answerBase} ${companyFullName}建议采购前提供${requiredInfo}，由厂家结合设备结构与现场工况判断更合适的设备配置。`;
  data.description = data.answer;
  data.updated = today;
  updateSeo(data);

  fs.writeFileSync(file, stringify(data, `${body}${brandSectionsForFaq(data)}`), 'utf8');
}

for (const file of markdownFiles(path.join(root, 'content', 'zh', 'articles'))) augmentArticle(file);
for (const file of markdownFiles(path.join(root, 'content', 'zh', 'faqs'))) augmentFaq(file);

console.log('Augmented Chinese articles and FAQ pages with Hongdi brand entity, product context, and contact path.');
