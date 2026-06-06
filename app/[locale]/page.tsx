import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard, FAQCard, ProductCard, SolutionCard } from '@/components/Cards';
import { CategoryFilter, ContactBlock } from '@/components/DetailBlocks';
import { HeroSection } from '@/components/HeroSection';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getCategories, getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import { organizationSchema } from '@/lib/schema';
import type { ContentItem, Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({
    locale: params.locale,
    path: `/${params.locale}`,
    title: `${site.name} | ${params.locale === 'zh' ? '家禽脱毛机与食品加工设备厂家' : 'Poultry Dehairing and Food Processing Equipment Manufacturer'}`,
    description: site.description,
    keywords: site.keywords
  });
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const site = getSiteConfig(locale);
  const [products, articles, faqs, solutions] = await Promise.all([
    getContentItems(locale, 'products'),
    getContentItems(locale, 'articles'),
    getContentItems(locale, 'faqs'),
    getContentItems(locale, 'solutions')
  ]);
  const categories = getCategories(locale);
  const featuredProductSlugs = [
    '58-turbine-stainless-poultry-plucker',
    'double-lid-poultry-scalding-mixer',
    'pneumatic-discharge-scalding-dehairing-machine',
    'rubber-rod-scalding-mixer'
  ];
  const featuredProducts = featuredProductSlugs
    .map((slug) => products.find((item) => item.slug === slug))
    .filter((item): item is ContentItem => item !== undefined);
  const strengths =
    locale === 'zh'
      ? [
          { number: '01', title: '生产能力', description: '自有食品机械生产场地，围绕脱毛、脱鳞、采肉等常用加工环节配置设备。' },
          { number: '02', title: '选型经验', description: '根据禽类品种、水产类型、单日处理量和场地条件，给出更贴近实际使用的设备组合。' },
          { number: '03', title: '定制配套', description: '支持按电压、规格、前后工序和产能需求调整配置，适合档口、养殖场和加工厂。' },
          { number: '04', title: '售后服务', description: '提供设备使用指导、维护建议和配件支持，帮助客户降低后续使用与维护成本。' }
        ]
      : [
          { number: '01', title: 'Production', description: 'In-house food machinery production for poultry dehairing, fish scaling, and fish meat separation equipment.' },
          { number: '02', title: 'Selection Advice', description: 'Equipment recommendations based on product type, daily capacity, workshop layout, and operating conditions.' },
          { number: '03', title: 'Customization', description: 'Configurations can be adjusted for voltage, size, process flow, and required output capacity.' },
          { number: '04', title: 'Service', description: 'Operation guidance, maintenance advice, and spare parts support for long-term equipment use.' }
        ];

  return (
    <PageShell locale={locale} path={`/${locale}`}>
      <SchemaJsonLd data={organizationSchema(locale)} />
      <HeroSection locale={locale} site={site} />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <p className="text-xl font-bold text-industrial-navy">{site.companyPositioning}</p>
        <div className="mt-6">
          <CategoryFilter categories={categories} />
        </div>
      </section>
      <SectionHeader locale={locale} title={locale === 'zh' ? '主推产品' : 'Featured Products'} href={`/${locale}/products`} />
      <CardGrid>{featuredProducts.map((item) => <ProductCard key={item.slug} locale={locale} item={item} />)}</CardGrid>
      <SectionHeader locale={locale} title={locale === 'zh' ? '解决方案入口' : 'Solutions'} href={`/${locale}/solutions`} />
      <CardGrid>{solutions.slice(0, 3).map((item) => <SolutionCard key={item.slug} locale={locale} item={item} />)}</CardGrid>
      <SectionHeader locale={locale} title={locale === 'zh' ? '热门 FAQ' : 'Popular FAQ'} href={`/${locale}/faqs`} />
      <CardGrid>{faqs.slice(0, 3).map((item) => <FAQCard key={item.slug} locale={locale} item={item} />)}</CardGrid>
      <SectionHeader locale={locale} title={locale === 'zh' ? '最新文章' : 'Latest Articles'} href={`/${locale}/articles`} />
      <CardGrid>{articles.slice(0, 3).map((item) => <ArticleCard key={item.slug} locale={locale} item={item} />)}</CardGrid>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {strengths.map((item) => (
            <div key={item.number} className="rounded border border-slate-200 bg-white p-5">
              <p className="text-2xl font-bold text-industrial-orange">{item.number}</p>
              <p className="mt-2 font-bold text-industrial-navy">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactBlock locale={locale} phone={site.phone} email={site.email} wechat={site.wechat} />
    </PageShell>
  );
}

function SectionHeader({ locale, title, href }: { locale: Locale; title: string; href: string }) {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-8 md:px-6">
      <h2 className="text-2xl font-bold text-industrial-navy">{title}</h2>
      <Link href={href} className="text-sm font-bold text-industrial-blue">
        {locale === 'zh' ? '查看全部' : 'View all'}
      </Link>
    </div>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 md:grid-cols-3 lg:grid-cols-4 md:px-6">{children}</section>;
}
