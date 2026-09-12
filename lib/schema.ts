import type { ContentItem, Locale } from './types';
import { absoluteUrl, getSiteConfig } from './content';

export function organizationSchema(locale: Locale) {
  const site = getSiteConfig(locale);
  const organizationId = `${site.baseUrl}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: site.name,
    url: site.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${site.baseUrl}/images/factory/hongdi-logo-header.png`
    },
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: locale === 'zh' ? '揭东区曲溪港美村206国道旁' : 'Beside National Road 206, Gangmei Village, Quxi, Jiedong District',
      addressLocality: locale === 'zh' ? '揭阳市' : 'Jieyang',
      addressRegion: locale === 'zh' ? '广东省' : 'Guangdong',
      addressCountry: 'CN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone,
      contactType: 'customer service',
      availableLanguage: ['zh-CN', 'en']
    },
    areaServed: site.serviceArea
  };
}

export function websiteSchema(locale: Locale) {
  const site = getSiteConfig(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.baseUrl}/#website`,
    name: site.name,
    alternateName: locale === 'zh' ? 'Hongdi Food Machinery' : '洪弟食品机械',
    url: `${site.baseUrl}/`,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    publisher: {
      '@id': `${site.baseUrl}/#organization`
    }
  };
}

export function aboutPageSchema(locale: Locale) {
  const site = getSiteConfig(locale);
  const url = absoluteUrl(locale, '/about');
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#about`,
    url,
    name: site.nav.about,
    description: site.companyPositioning,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    about: { '@id': `${site.baseUrl}/#organization` },
    isPartOf: { '@id': `${site.baseUrl}/#website` }
  };
}

export function contactPageSchema(locale: Locale) {
  const site = getSiteConfig(locale);
  const url = absoluteUrl(locale, '/contact');
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contact`,
    url,
    name: site.nav.contact,
    description: locale === 'zh' ? '洪弟食品机械联系方式与设备选型咨询准备说明。' : 'Hongdi Food Machinery contact details and consultation checklist.',
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    mainEntity: { '@id': `${site.baseUrl}/#organization` },
    isPartOf: { '@id': `${site.baseUrl}/#website` }
  };
}

export function collectionPageSchema(
  locale: Locale,
  path: string,
  name: string,
  description: string,
  items: ContentItem[] = []
) {
  const site = getSiteConfig(locale);
  const url = absoluteUrl(locale, path);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name,
    description,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    publisher: { '@id': `${site.baseUrl}/#organization` },
    isPartOf: { '@id': `${site.baseUrl}/#website` },
    ...(items.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: items.length,
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.title,
              url: absoluteUrl(locale, `${path}/${item.slug}`)
            }))
          }
        }
      : {})
  };
}

export function productSchema(locale: Locale, product: ContentItem) {
  const site = getSiteConfig(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    name: product.title,
    description: product.description,
    image: product.images?.map((image) => `${site.baseUrl}${image}`),
    brand: {
      '@type': 'Brand',
      name: site.name
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': `${site.baseUrl}/#organization`,
      name: site.name,
      url: site.baseUrl
    },
    url: absoluteUrl(locale, `/products/${product.slug}`)
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[],
  context?: { locale: Locale; path: string; item?: ContentItem }
) {
  const site = context ? getSiteConfig(context.locale) : null;
  const url = context ? absoluteUrl(context.locale, context.path) : null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(context && site && url
      ? {
          '@id': `${url}#faq`,
          url,
          inLanguage: context.locale === 'zh' ? 'zh-CN' : 'en',
          datePublished: context.item?.date,
          dateModified: context.item?.updated ?? context.item?.date,
          citation: context.item?.sources?.map((source) => source.url),
          author: { '@id': `${site.baseUrl}/#organization` },
          publisher: { '@id': `${site.baseUrl}/#organization` },
          isPartOf: { '@id': `${site.baseUrl}/#website` }
        }
      : {}),
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function articleSchema(locale: Locale, article: ContentItem) {
  const site = getSiteConfig(locale);
  const articleUrl = absoluteUrl(locale, `/articles/${article.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    headline: article.title,
    description: article.description,
    image: article.images?.length
      ? article.images.map((image) => `${site.baseUrl}${image}`)
      : [`${site.baseUrl}/images/home-redesign/hero-banner.png`],
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      '@type': 'Organization',
      '@id': `${site.baseUrl}/#organization`,
      name: site.name,
      url: `${site.baseUrl}/${locale}/about/`
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${site.baseUrl}/#organization`,
      name: site.name,
      url: site.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${site.baseUrl}/images/factory/hongdi-logo-header.png`
      }
    },
    mainEntityOfPage: articleUrl,
    citation: article.sources?.map((source) => source.url),
    isPartOf: {
      '@id': `${site.baseUrl}/#website`
    },
    url: articleUrl
  };
}

export function solutionSchema(locale: Locale, solution: ContentItem) {
  const site = getSiteConfig(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    name: solution.title,
    description: solution.description,
    provider: {
      '@type': 'Organization',
      '@id': `${site.baseUrl}/#organization`,
      name: site.name,
      telephone: site.phone,
      address: site.address
    },
    areaServed: site.serviceArea,
    serviceType: solution.solutionCategory ?? (locale === 'zh' ? '食品机械设备解决方案' : 'Food machinery solution'),
    audience: solution.suitableFor?.map((name) => ({ '@type': 'Audience', audienceType: name })),
    dateCreated: solution.date,
    dateModified: solution.updated ?? solution.date,
    citation: solution.sources?.map((source) => source.url),
    url: absoluteUrl(locale, `/solutions/${solution.slug}`)
  };
}

export function breadcrumbSchema(locale: Locale, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path)
    }))
  };
}
