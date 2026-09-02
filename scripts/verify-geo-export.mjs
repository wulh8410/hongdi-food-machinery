import fs from 'fs';
import path from 'path';

const root = process.cwd();
const output = path.join(root, 'out');
const site = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site.zh.json'), 'utf8'));
const quality = JSON.parse(fs.readFileSync(path.join(root, 'data', 'content-quality.json'), 'utf8'));
const baseUrl = site.baseUrl.replace(/\/$/, '');
const issues = [];
const totals = { pages: 0, jsonLd: 0, noindex: 0, sitemapUrls: 0, llmsLinks: 0 };

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];
}

function schemasIn(html, label) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
    try {
      totals.jsonLd += 1;
      return [JSON.parse(match[1])];
    } catch {
      issues.push(`${label}: invalid JSON-LD`);
      return [];
    }
  });
}

for (const locale of ['zh', 'en']) {
  const directory = path.join(output, locale);
  if (!fs.existsSync(directory)) throw new Error(`Missing export: ${directory}. Run npm run build first.`);

  for (const file of filesIn(directory).filter((file) => file.endsWith(`${path.sep}index.html`))) {
    totals.pages += 1;
    const html = fs.readFileSync(file, 'utf8');
    const relative = path.relative(output, file).split(path.sep);
    const label = `/${relative.slice(0, -1).join('/')}/`;
    const lang = attribute(html.match(/<html\b[^>]*>/i)?.[0] ?? '', 'lang');
    if (lang !== (locale === 'zh' ? 'zh-CN' : 'en')) issues.push(`${label}: incorrect html lang`);

    const links = html.match(/<link\b[^>]*>/gi) ?? [];
    const canonical = links.find((tag) => attribute(tag, 'rel') === 'canonical');
    const canonicalUrl = attribute(canonical ?? '', 'href');
    if (!canonicalUrl?.startsWith(`${baseUrl}/`) || !canonicalUrl.endsWith('/')) issues.push(`${label}: incorrect canonical`);

    const alternates = links.filter((tag) => attribute(tag, 'rel') === 'alternate' && attribute(tag, 'hreflang'));
    for (const language of ['zh-CN', 'en', 'x-default']) {
      const alternate = alternates.find((tag) => attribute(tag, 'hreflang') === language);
      if (!attribute(alternate ?? '', 'href')?.startsWith(`${baseUrl}/`)) issues.push(`${label}: missing or incorrect ${language} alternate`);
    }

    const robots = (html.match(/<meta\b[^>]*>/gi) ?? []).find((tag) => attribute(tag, 'name') === 'robots');
    const isNoindex = attribute(robots ?? '', 'content')?.includes('noindex') ?? false;
    if (isNoindex) totals.noindex += 1;
    const [language, kind, slug] = relative;
    const target = relative.length === 4 ? quality.aliases?.[language]?.[kind]?.[slug] : undefined;
    if (target && (!isNoindex || canonicalUrl !== `${baseUrl}/${language}/${kind}/${target}/`)) issues.push(`${label}: duplicate policy mismatch`);
    if (!target && isNoindex) issues.push(`${label}: canonical page unexpectedly noindex`);

    if (html.includes('hongdi-food-machinery.vercel.app')) issues.push(`${label}: old Vercel domain found`);
    const schemas = schemasIn(html, label);
    if (relative.length === 2) {
      for (const type of ['Organization', 'WebSite']) {
        if (!schemas.some((schema) => schema['@type'] === type)) issues.push(`${label}: missing ${type}`);
      }
    }
  }

  for (const page of ['privacy', 'terms']) {
    if (!fs.existsSync(path.join(output, locale, page, 'index.html'))) issues.push(`/${locale}/${page}/: missing trust page`);
  }
}

const sitemap = fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
totals.sitemapUrls = locations.length;
for (const url of locations) {
  if (!url.startsWith(`${baseUrl}/`)) issues.push(`sitemap: noncanonical host ${url}`);
  const pathname = new URL(url).pathname;
  const segments = pathname.split('/').filter(Boolean);
  if (quality.aliases?.[segments[0]]?.[segments[1]]?.[segments[2]]) issues.push(`sitemap: duplicate URL ${url}`);
  if (!fs.existsSync(path.join(output, ...segments, 'index.html'))) issues.push(`sitemap: missing page ${url}`);
}

const llms = fs.readFileSync(path.join(output, 'llms.txt'), 'utf8');
totals.llmsLinks = (llms.match(/^- \[/gm) ?? []).length;
for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
  if (fs.readFileSync(path.join(output, file), 'utf8').includes('hongdi-food-machinery.vercel.app')) issues.push(`${file}: old Vercel domain found`);
}

console.log(JSON.stringify({ ...totals, issueCount: issues.length, issues }, null, 2));
if (issues.length) process.exitCode = 1;
