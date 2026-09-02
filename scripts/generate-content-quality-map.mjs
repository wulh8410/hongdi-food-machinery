import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const locales = ['zh', 'en'];
const kinds = ['products', 'articles', 'faqs', 'solutions'];
const preferredCanonicalByTitle = {
  zh: {
    articles: {
      '家禽加工现场如何配置脱毛与泡水设备？': 'custom-site-poultry-layout-solution',
      '家禽脱毛设备安装验收要注意什么？': 'before-acceptance-checklist',
      '选择源头厂家时要看哪些服务能力？': 'factory-direct-service-process'
    }
  }
};

function normalize(value) {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, normalize(value[key])]));
  }
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value ?? '';
}

function contentFingerprint(kind, data, body) {
  const normalizedBody = normalize(body);
  const normalizedTitle = String(normalize(data.title)).replace(/（(?:二次确认|现场判断|配置建议|使用建议)）$/, '');

  if (kind === 'articles') {
    return JSON.stringify(normalize({ title: normalizedTitle, description: data.description, body: normalizedBody }));
  }

  if (kind === 'faqs') {
    return JSON.stringify(normalize({ title: normalizedTitle, description: data.description, answer: data.answer, body: normalizedBody }));
  }

  if (kind === 'solutions') {
    return JSON.stringify(normalize({
      title: normalizedTitle,
      description: data.description,
      decisionSummary: data.decisionSummary,
      suitableFor: data.suitableFor,
      painPoints: data.painPoints,
      equipmentRoles: data.equipmentRoles,
      process: data.process,
      capacityOptions: data.capacityOptions,
      siteRequirements: data.siteRequirements,
      requiredInfo: data.requiredInfo,
      acceptancePoints: data.acceptancePoints,
      maintenanceTips: data.maintenanceTips,
      faqs: data.faqs,
      body: normalizedBody
    }));
  }

  return '';
}

function canonicalScore(item) {
  let score = item.slug.length;
  if (/-\d+$/.test(item.slug)) score += 1000;
  if (/（(?:二次确认|现场判断|配置建议|使用建议)）/.test(item.title)) score += 1000;
  if (/评论区|短视频|视频|询盘/.test(item.title)) score += 80;
  if (item.slug.includes('selection-guide')) score -= 40;
  return score;
}

function chooseCanonical(items, locale, kind) {
  const preferredSlug = preferredCanonicalByTitle[locale]?.[kind]?.[items[0].title];
  const preferred = preferredSlug ? items.find((item) => item.slug === preferredSlug) : undefined;
  if (preferred) return preferred;
  return [...items].sort((a, b) => canonicalScore(a) - canonicalScore(b) || a.slug.localeCompare(b.slug))[0];
}

const result = {};
const summary = {};

for (const locale of locales) {
  result[locale] = {};
  summary[locale] = {};

  for (const kind of kinds) {
    const directory = path.join(root, 'content', locale, kind);
    const items = fs.existsSync(directory)
      ? fs.readdirSync(directory)
          .filter((file) => file.endsWith('.md'))
          .map((file) => {
            const slug = file.replace(/\.md$/, '');
            const parsed = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
            return {
              slug,
              title: String(parsed.data.title ?? slug),
              fingerprint: contentFingerprint(kind, parsed.data, parsed.content)
            };
          })
      : [];

    const groups = new Map();
    for (const item of items) {
      if (!item.fingerprint || item.fingerprint.length < 160) continue;
      const group = groups.get(item.fingerprint) ?? [];
      group.push(item);
      groups.set(item.fingerprint, group);
    }

    const aliases = {};
    let duplicateGroups = 0;
    for (const group of groups.values()) {
      if (group.length < 2) continue;
      duplicateGroups += 1;
      const canonical = chooseCanonical(group, locale, kind);
      for (const item of group) {
        if (item.slug !== canonical.slug) aliases[item.slug] = canonical.slug;
      }
    }

    result[locale][kind] = Object.fromEntries(Object.entries(aliases).sort(([a], [b]) => a.localeCompare(b)));
    summary[locale][kind] = {
      total: items.length,
      canonical: items.length - Object.keys(aliases).length,
      duplicateGroups,
      excludedDuplicates: Object.keys(aliases).length
    };
  }
}

const output = { version: 1, summary, aliases: result };
fs.writeFileSync(path.join(root, 'data', 'content-quality.json'), `${JSON.stringify(output, null, 2)}\n`);

console.log('Generated data/content-quality.json');
console.table(Object.fromEntries(
  locales.flatMap((locale) => kinds.map((kind) => [`${locale}/${kind}`, summary[locale][kind]]))
));
