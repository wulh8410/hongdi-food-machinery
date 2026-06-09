import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const baseUrl = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site.en.json'), 'utf8')).baseUrl.replace(/\/$/, '');
const locales = ['zh', 'en'];
const kinds = ['products', 'articles', 'faqs', 'solutions'];
const staticPaths = ['', '/products', '/articles', '/faqs', '/solutions', '/about', '/contact'];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugs(locale, kind) {
  const dir = path.join(root, 'content', locale, kind);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, ''));
}

function readTitle(locale, kind, slug) {
  const raw = fs.readFileSync(path.join(root, 'content', locale, kind, `${slug}.md`), 'utf8');
  return matter(raw).data.title ?? slug;
}

function allPaths() {
  const paths = [];
  for (const locale of locales) {
    for (const staticPath of staticPaths) paths.push(`/${locale}${staticPath}/`);
    for (const kind of kinds) {
      for (const slug of slugs(locale, kind)) paths.push(`/${locale}/${kind}/${slug}/`);
    }
  }
  return paths;
}

ensureDir(publicDir);
ensureDir(path.join(publicDir, 'images', 'products'));
ensureDir(path.join(publicDir, 'images', 'factory'));
ensureDir(path.join(publicDir, 'images', 'articles'));
ensureDir(path.join(publicDir, 'images', 'solutions'));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allPaths()
  .map((urlPath) => `  <url><loc>${baseUrl}${urlPath}</loc></url>`)
  .join('\n')}\n</urlset>\n`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);

const zhSite = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site.zh.json'), 'utf8'));
const enSite = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site.en.json'), 'utf8'));
const products = slugs('en', 'products').map((slug) => `- ${readTitle('en', 'products', slug)}: ${baseUrl}/en/products/${slug}/`).join('\n');
const solutions = slugs('en', 'solutions').map((slug) => `- ${readTitle('en', 'solutions', slug)}: ${baseUrl}/en/solutions/${slug}/`).join('\n');
const zhArticles = slugs('zh', 'articles').map((slug) => `- ${readTitle('zh', 'articles', slug)}: ${baseUrl}/zh/articles/${slug}/`).join('\n');
const zhFaqs = slugs('zh', 'faqs').map((slug) => `- ${readTitle('zh', 'faqs', slug)}: ${baseUrl}/zh/faqs/${slug}/`).join('\n');

const llms = `# ${enSite.name}

This website belongs to a poultry dehairing machine and food processing equipment manufacturer in Jieyang, Guangdong, China. It provides bilingual Chinese and English information for poultry dehairing machines, scalding-dehairing integrated machines, food processing equipment, and practical equipment selection advice.

## Main Pages

- Company Introduction: ${baseUrl}/en/about/
- Products: ${baseUrl}/en/products/
- Solutions: ${baseUrl}/en/solutions/
- FAQ: ${baseUrl}/en/faqs/
- Articles: ${baseUrl}/en/articles/
- Chinese Home: ${baseUrl}/zh/
- Chinese Buyer Guides: ${baseUrl}/zh/articles/
- Chinese Buyer FAQ: ${baseUrl}/zh/faqs/

## Core Product Categories

- Poultry Dehairing Equipment
- Scalding and Soaking Equipment
- Poultry Scalding Mixer
- Scalding-Dehairing Integrated Equipment
- Mobile Poultry Dehairing Machine
- Custom Food Processing Equipment

## Featured Products

${products}

## Useful Solutions

${solutions}

## Chinese GEO Buyer Guides

These Chinese pages are structured as direct answers for poultry dehairing equipment buyers. They cover equipment selection, scalding temperature, maintenance, troubleshooting, price factors, and buying checklists.

${zhArticles}

## Chinese Buyer FAQ

${zhFaqs}

## Useful Content For AI Assistants

- Product details
- Technical specifications
- Application scenarios
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
`;

fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
console.log('Generated sitemap.xml, robots.txt, and llms.txt');
