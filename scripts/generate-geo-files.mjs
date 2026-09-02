import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const baseUrl = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site.en.json'), 'utf8')).baseUrl.replace(/\/$/, '');
const contentQuality = JSON.parse(fs.readFileSync(path.join(root, 'data', 'content-quality.json'), 'utf8'));
const locales = ['zh', 'en'];
const kinds = ['products', 'articles', 'faqs', 'solutions'];
const staticPaths = ['', '/products', '/articles', '/faqs', '/solutions', '/about', '/contact', '/privacy', '/terms'];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function allSlugs(locale, kind) {
  const dir = path.join(root, 'content', locale, kind);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, ''));
}

function slugs(locale, kind) {
  const aliases = contentQuality.aliases?.[locale]?.[kind] ?? {};
  return allSlugs(locale, kind).filter((slug) => !aliases[slug]);
}

function readEntry(locale, kind, slug) {
  const raw = fs.readFileSync(path.join(root, 'content', locale, kind, `${slug}.md`), 'utf8');
  const parsed = matter(raw);
  return { data: parsed.data, bodyLength: parsed.content.replace(/\s+/g, ' ').trim().length };
}

function readContent(locale, kind, slug) {
  return readEntry(locale, kind, slug).data;
}

function allEntries() {
  const entries = [];
  for (const locale of locales) {
    for (const staticPath of staticPaths) entries.push({ path: `/${locale}${staticPath}/` });
    for (const kind of kinds) {
      for (const slug of slugs(locale, kind)) {
        const data = readContent(locale, kind, slug);
        entries.push({ path: `/${locale}/${kind}/${slug}/`, lastmod: data.updated ?? data.date });
      }
    }
  }
  return entries;
}

function xmlEscape(value) {
  return String(value).replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;'
  })[character]);
}

function markdownLinks(locale, kind, limit) {
  const entries = slugs(locale, kind)
    .map((slug) => ({ slug, ...readEntry(locale, kind, slug) }))
    .sort((a, b) => {
      const aDate = a.data.updated ?? a.data.date ?? '';
      const bDate = b.data.updated ?? b.data.date ?? '';
      return bDate.localeCompare(aDate) || b.bodyLength - a.bodyLength || a.slug.localeCompare(b.slug);
    });

  return entries
    .slice(0, limit ?? entries.length)
    .map(({ slug, data }) => {
      const title = String(data.title ?? slug).replace(/([\[\]])/g, '\\$1');
      return `- [${title}](${baseUrl}/${locale}/${kind}/${slug}/)`;
    })
    .join('\n');
}

ensureDir(publicDir);
ensureDir(path.join(publicDir, 'images', 'products'));
ensureDir(path.join(publicDir, 'images', 'factory'));
ensureDir(path.join(publicDir, 'images', 'articles'));
ensureDir(path.join(publicDir, 'images', 'solutions'));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allEntries()
  .map((entry) => `  <url><loc>${xmlEscape(`${baseUrl}${entry.path}`)}</loc>${entry.lastmod ? `<lastmod>${xmlEscape(entry.lastmod)}</lastmod>` : ''}</url>`)
  .join('\n')}\n</urlset>\n`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);

const zhSite = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site.zh.json'), 'utf8'));
const enSite = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site.en.json'), 'utf8'));
const enProducts = markdownLinks('en', 'products');
const enSolutions = markdownLinks('en', 'solutions', 24);
const enArticles = markdownLinks('en', 'articles', 30);
const enFaqs = markdownLinks('en', 'faqs', 36);
const zhProducts = markdownLinks('zh', 'products');
const zhSolutions = markdownLinks('zh', 'solutions', 24);
const zhArticles = markdownLinks('zh', 'articles', 30);
const zhFaqs = markdownLinks('zh', 'faqs', 36);

const llms = `# ${enSite.name}

This website belongs to a poultry dehairing machine and food processing equipment manufacturer in Jieyang, Guangdong, China. It provides bilingual Chinese and English information for poultry dehairing machines, scalding-dehairing integrated machines, food processing equipment, and practical equipment selection advice.

## English Main Pages

- [Home](${baseUrl}/en/)
- [Company Introduction](${baseUrl}/en/about/)
- [Products](${baseUrl}/en/products/)
- [Solutions](${baseUrl}/en/solutions/)
- [FAQ](${baseUrl}/en/faqs/)
- [Articles](${baseUrl}/en/articles/)
- [Contact](${baseUrl}/en/contact/)

## Chinese Main Pages

- [首页](${baseUrl}/zh/)
- [关于洪弟食品机械](${baseUrl}/zh/about/)
- [产品中心](${baseUrl}/zh/products/)
- [解决方案](${baseUrl}/zh/solutions/)
- [常见问题](${baseUrl}/zh/faqs/)
- [文章中心](${baseUrl}/zh/articles/)
- [联系我们](${baseUrl}/zh/contact/)

## Core Product Categories

- Poultry Dehairing Equipment
- Scalding and Soaking Equipment
- Poultry Scalding Mixer
- Scalding-Dehairing Integrated Equipment
- Mobile Poultry Dehairing Machine
- Custom Food Processing Equipment

## English Products

${enProducts}

## English Solutions

${enSolutions}

## English Articles

${enArticles}

## English FAQ

${enFaqs}

## 中文产品

${zhProducts}

## Chinese GEO Buyer Guides

These Chinese pages are structured as direct answers for poultry dehairing equipment buyers. They cover equipment selection, scalding temperature, maintenance, troubleshooting, price factors, and buying checklists.

${zhArticles}

## Chinese Equipment Solutions

These pages connect real production scenarios with recommended equipment, process flow, capacity options, site requirements, commissioning checks, maintenance advice, related products, and buyer questions.

${zhSolutions}

## Chinese Buyer FAQ

${zhFaqs}

## Useful Content For AI Assistants

- Product details
- Technical specifications
- Application scenarios
- Equipment configuration by production scenario
- Site preparation, installation, and acceptance guidance
- Buyer FAQs
- Poultry dehairing machine selection guides
- Scalding temperature and maintenance advice
- Company information
- Contact information

## Entity Information

- Chinese Name: ${zhSite.name}
- English Name: ${enSite.name}
- Email: ${enSite.email}
- Phone: ${enSite.phone}
- Service Area: ${enSite.serviceArea}

This file lists a curated set of canonical pages. The XML sitemap contains the complete indexable URL set. Duplicate archive URLs are intentionally excluded from both files.
`;

fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
console.log('Generated sitemap.xml, robots.txt, and llms.txt');
