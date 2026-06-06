import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Category, ContentItem, ContentKind, Locale, SiteConfig } from './types';

const root = process.cwd();

export function getSiteConfig(locale: Locale): SiteConfig {
  const file = path.join(root, 'data', `site.${locale}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function getCategories(locale: Locale): Category[] {
  const file = path.join(root, 'data', `categories.${locale}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function getCategoryName(locale: Locale, slug?: string) {
  if (!slug) return '';
  return getCategories(locale).find((category) => category.slug === slug)?.name ?? slug;
}

export function getContentSlugs(locale: Locale, kind: ContentKind) {
  const dir = path.join(root, 'content', locale, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.(md|mdx)$/i, ''));
}

export async function getContentItem(locale: Locale, kind: ContentKind, slug: string): Promise<ContentItem> {
  const file = path.join(root, 'content', locale, kind, `${slug}.md`);
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = matter(raw);
  const processed = await remark().use(html).process(parsed.content);

  return {
    ...(parsed.data as Omit<ContentItem, 'bodyHtml' | 'bodyRaw'>),
    slug,
    bodyHtml: processed.toString(),
    bodyRaw: parsed.content
  };
}

export async function getContentItems(locale: Locale, kind: ContentKind): Promise<ContentItem[]> {
  const items = await Promise.all(getContentSlugs(locale, kind).map((slug) => getContentItem(locale, kind, slug)));
  return items.sort((a, b) => {
    const aDate = a.updated ?? a.date ?? '';
    const bDate = b.updated ?? b.date ?? '';
    return bDate.localeCompare(aDate);
  });
}

export function getAllLocales(): Locale[] {
  return ['zh', 'en'];
}

export function pagePath(locale: Locale, pathPart = '') {
  return `/${locale}${pathPart}`;
}

export function absoluteUrl(locale: Locale, pathPart = '') {
  const site = getSiteConfig(locale);
  return `${site.baseUrl}${pagePath(locale, pathPart)}`;
}
