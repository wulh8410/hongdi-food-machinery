export type Locale = 'zh' | 'en';

export type SiteConfig = {
  name: string;
  shortName: string;
  baseUrl: string;
  locale: Locale;
  alternateLocale: Locale;
  companyPositioning: string;
  description: string;
  keywords: string[];
  phone: string;
  wechat: string;
  email: string;
  address: string;
  serviceArea: string;
  nav: Record<string, string>;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type ContentKind = 'products' | 'articles' | 'faqs' | 'solutions';

export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  category?: string;
  geoSummary?: string;
  keywords?: string[];
  images?: string[];
  applications?: string[];
  features?: string[];
  specs?: Record<string, string>;
  faqs?: { question: string; answer: string }[];
  question?: string;
  answer?: string;
  painPoints?: string[];
  recommendedProducts?: string[];
  process?: string[];
  configuration?: string[];
  capacity?: string;
  relatedProducts?: string[];
  relatedArticles?: string[];
  relatedFaqs?: string[];
  relatedSolutions?: string[];
  date?: string;
  updated?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  bodyHtml: string;
  bodyRaw: string;
};
