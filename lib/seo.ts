import type { Metadata } from 'next';
import type { ContentItem, ContentKind, Locale } from './types';
import { absoluteUrl, getCanonicalContentSlug, getSiteConfig, pagePath } from './content';

export function localizedMetadata({
  locale,
  path,
  title,
  description,
  keywords
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const site = getSiteConfig(locale);
  const other = site.alternateLocale;
  const samePath = path.replace(/^\/(zh|en)/, '');

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(locale, samePath),
      languages: {
        [locale === 'zh' ? 'zh-CN' : 'en']: absoluteUrl(locale, samePath),
        [other === 'zh' ? 'zh-CN' : 'en']: absoluteUrl(other, samePath),
        'x-default': `${site.baseUrl}/zh/`
      }
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, samePath),
      siteName: site.name,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website'
    }
  };
}

export function itemMetadata(locale: Locale, section: ContentKind, item: ContentItem): Metadata {
  const site = getSiteConfig(locale);
  const canonicalSlug = getCanonicalContentSlug(locale, section, item.slug);
  const path = pagePath(locale, `/${section}/${canonicalSlug}`);
  const metadata = localizedMetadata({
    locale,
    path,
    title: item.seo?.title ?? `${item.title} | ${site.name}`,
    description: item.seo?.description ?? item.description,
    keywords: item.seo?.keywords ?? item.keywords ?? site.keywords
  });

  return canonicalSlug === item.slug
    ? metadata
    : { ...metadata, robots: { index: false, follow: true } };
}
