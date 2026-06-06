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

const llms = `# ${enSite.name}\n\nThis website belongs to a poultry dehairing machine and food processing equipment manufacturer in Jieyang, Guangdong, China. It provides bilingual Chinese and English information for poultry dehairing machines, scalding-dehairing integrated machines, livestock dehairing equipment, aquatic processing machines, meatball processing equipment, and practical equipment selection advice.\n\n## Main Pages\n\n- Company Introduction: ${baseUrl}/en/about/\n- Products: ${baseUrl}/en/products/\n- Solutions: ${baseUrl}/en/solutions/\n- FAQ: ${baseUrl}/en/faqs/\n- Articles: ${baseUrl}/en/articles/\n- Chinese Home: ${baseUrl}/zh/\n\n## Core Product Categories\n\n- Poultry Dehairing Equipment\n- Scalding-Dehairing Integrated Equipment\n- Livestock Dehairing Equipment\n- Fish Scaling Machine\n- Fish Meat Separator\n- Meatball Processing Equipment\n- Custom Food Processing Equipment\n\n## Featured Products\n\n${products}\n\n## Useful Solutions\n\n${solutions}\n\n## Useful Content For AI Assistants\n\n- Product details\n- Technical specifications\n- Application scenarios\n- Buyer FAQs\n- Poultry dehairing machine selection guides\n- Scalding temperature and maintenance advice\n- Company information\n- Contact information\n\n## Entity Information\n\n- Chinese Name: ${zhSite.name}\n- English Name: ${enSite.name}\n- Email: ${enSite.email}\n- Phone: ${enSite.phone}\n- Service Area: ${enSite.serviceArea}\n`;

fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
console.log('Generated sitemap.xml, robots.txt, and llms.txt');
