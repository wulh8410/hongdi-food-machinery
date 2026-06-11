import type { ContentItem, Locale } from './types';
import { absoluteUrl, getSiteConfig } from './content';

export function organizationSchema(locale: Locale) {
  const site = getSiteConfig(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.baseUrl,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: site.address,
    areaServed: site.serviceArea
  };
}

export function productSchema(locale: Locale, product: ContentItem) {
  const site = getSiteConfig(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images?.map((image) => `${site.baseUrl}${image}`),
    brand: {
      '@type': 'Brand',
      name: site.name
    },
    manufacturer: {
      '@type': 'Organization',
      name: site.name
    },
    url: absoluteUrl(locale, `/products/${product.slug}`)
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      '@type': 'Organization',
      name: site.name
    },
    publisher: {
      '@type': 'Organization',
      name: site.name
    },
    url: absoluteUrl(locale, `/articles/${article.slug}`)
  };
}

export function solutionSchema(locale: Locale, solution: ContentItem) {
  const site = getSiteConfig(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: solution.title,
    description: solution.description,
    provider: {
      '@type': 'Organization',
      name: site.name,
      telephone: site.phone,
      address: site.address
    },
    areaServed: site.serviceArea,
    serviceType: solution.solutionCategory ?? (locale === 'zh' ? '食品机械设备解决方案' : 'Food machinery solution'),
    audience: solution.suitableFor?.map((name) => ({ '@type': 'Audience', audienceType: name })),
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
