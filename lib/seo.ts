import type { Metadata } from 'next';
import type { ContentItem, Locale } from './types';
import { absoluteUrl, getSiteConfig, pagePath } from './content';

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
        [other === 'zh' ? 'zh-CN' : 'en']: absoluteUrl(other, samePath)
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

export function itemMetadata(locale: Locale, section: string, item: ContentItem): Metadata {
  const site = getSiteConfig(locale);
  const path = pagePath(locale, `/${section}/${item.slug}`);
  return localizedMetadata({
    locale,
    path,
    title: item.seo?.title ?? `${item.title} | ${site.name}`,
    description: item.seo?.description ?? item.description,
    keywords: item.seo?.keywords ?? item.keywords ?? site.keywords
  });
}
