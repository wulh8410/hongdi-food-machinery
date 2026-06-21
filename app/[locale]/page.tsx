import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard, ProductCard } from '@/components/Cards';
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
  const isZh = locale === 'zh';
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

  return (
    <PageShell locale={locale} path={`/${locale}`}>
      <SchemaJsonLd data={organizationSchema(locale)} />
      <HeroSection locale={locale} site={site} />

      <section className="bg-[#f4f8fa]">
        <div className="mx-auto grid max-w-[1440px] gap-10 bg-[linear-gradient(90deg,rgba(244,248,250,0.98),rgba(244,248,250,0.92))] px-4 py-12 md:grid-cols-[minmax(0,520px)_minmax(0,1fr)] md:px-8 md:py-16 lg:px-16">
          <h2 className="text-3xl font-black leading-tight text-industrial-navy md:text-4xl">
            {isZh ? '让采购者在首页快速判断：设备是否适配自己的产量、场地和工序。' : 'Help buyers judge fit by capacity, site conditions, and workflow.'}
          </h2>
          <div>
            <p className="text-base font-semibold leading-8 text-slate-600 md:text-lg">
              {isZh
                ? '新版首页不以装饰为主，而是把工厂能力、主推设备、解决方案和采购问题放进同一套工业视觉系统里。深色区域承载品牌气势，浅色区域承载清晰阅读，避免页面割裂。'
                : 'The homepage groups factory capability, core equipment, solutions, and buyer questions into one industrial visual system.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {categories.slice(0, 6).map((category) => (
                <span key={category.slug} className="border border-[#ccd9e2] bg-white px-4 py-2 text-sm font-black text-[#143854]">
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeSection
        eyebrow="Core Products"
        title={isZh ? '主推设备矩阵' : 'Featured Equipment Matrix'}
        description={isZh ? '优先展示前 4 款高价值设备，卡片统一规格、图片完整呈现，方便采购者横向对比。' : 'Four core machines with consistent cards for quick comparison.'}
        href={`/${locale}/products`}
        linkText={isZh ? '查看全部' : 'View all'}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((item) => (
            <ProductCard key={item.slug} locale={locale} item={item} />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Scenario Solutions"
        title={isZh ? '按真实生产场景配置方案' : 'Configure by Production Scenario'}
        description={isZh ? '从物料、产量、场地、电压和前后工序判断设备组合，让页面像采购顾问一样回答问题。' : 'Equipment combinations based on material, output, site, voltage, and workflow.'}
        href={`/${locale}/solutions`}
        linkText={isZh ? '查看全部' : 'View all'}
        dark
      >
        <div className="grid border border-white/15 md:grid-cols-2 lg:grid-cols-4">
          {solutions.slice(0, 4).map((item, index) => (
            <SolutionCell key={item.slug} locale={locale} item={item} index={index} />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="GEO Content"
        title={isZh ? '采购知识与常见问题' : 'Buyer Knowledge and FAQ'}
        description={isZh ? 'FAQ 和文章区采用同一套信息面板语言，减少零散感，同时保留 GEO 内容入口。' : 'FAQ and articles use one consistent information panel for GEO-focused content.'}
        href={`/${locale}/faqs`}
        linkText={isZh ? '查看全部内容' : 'View all content'}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <KnowledgePanel title={isZh ? '热门 FAQ' : 'Popular FAQ'} linkText={isZh ? '查看全部' : 'View all'} href={`/${locale}/faqs`}>
            {faqs.slice(0, 4).map((item, index) => (
              <KnowledgeRow key={item.slug} label={`FAQ ${String(index + 1).padStart(2, '0')}`} title={item.title} description={item.description} href={`/${locale}/faqs/${item.slug}`} />
            ))}
          </KnowledgePanel>
          <KnowledgePanel title={isZh ? '最新文章' : 'Latest Articles'} linkText={isZh ? '查看全部' : 'View all'} href={`/${locale}/articles`}>
            {articles.slice(0, 4).map((item) => (
              <KnowledgeRow key={item.slug} label="ARTICLE" title={item.title} description={item.description} href={`/${locale}/articles/${item.slug}`} />
            ))}
          </KnowledgePanel>
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Articles"
        title={isZh ? '最新选型文章' : 'Latest Selection Articles'}
        description={isZh ? '围绕选型、维护、场景和采购问题持续补充内容，增强 AI 搜索和传统搜索可理解性。' : 'Selection, maintenance, scenario, and procurement content for search and AI assistants.'}
        href={`/${locale}/articles`}
        linkText={isZh ? '查看全部文章' : 'View all articles'}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.slice(0, 4).map((item) => (
            <ArticleCard key={item.slug} locale={locale} item={item} />
          ))}
        </div>
      </HomeSection>
    </PageShell>
  );
}

function HomeSection({
  eyebrow,
  title,
  description,
  href,
  linkText,
  dark = false,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkText: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={dark ? 'bg-[#061725] text-white' : 'bg-[#e7eef3] text-industrial-navy'}>
      <div
        className={
          dark
            ? 'mx-auto max-w-[1440px] bg-[linear-gradient(90deg,rgba(6,23,37,0.96),rgba(8,32,56,0.9))] px-4 py-14 md:px-8 lg:px-16'
            : 'mx-auto max-w-[1440px] px-4 py-14 md:px-8 lg:px-16'
        }
      >
        <div className={`mb-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-end ${dark ? 'border-b border-white/15 pb-8' : ''}`}>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-industrial-orange">{eyebrow}</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">{title}</h2>
            <p className={`mt-3 max-w-3xl text-sm font-semibold leading-7 md:text-base ${dark ? 'text-white/75' : 'text-slate-600'}`}>{description}</p>
          </div>
          <Link href={href} className={`inline-flex border px-4 py-3 text-sm font-black ${dark ? 'border-white/25 text-white hover:bg-white/10' : 'border-[#b9cad7] text-industrial-blue hover:bg-white'}`}>
            {linkText}
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}

function SolutionCell({ locale, item, index }: { locale: Locale; item: ContentItem; index: number }) {
  return (
    <article className="min-h-[250px] border-t border-white/15 bg-[#082038]/70 p-6 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0">
      <p className="text-4xl font-black text-industrial-orange">{String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-5 text-xl font-black leading-snug text-white">{item.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm font-semibold leading-7 text-white/75">{item.description}</p>
      <Link href={`/${locale}/solutions/${item.slug}`} className="mt-5 inline-block text-sm font-black text-industrial-orange">
        {locale === 'zh' ? '查看方案 →' : 'View Solution →'}
      </Link>
    </article>
  );
}

function KnowledgePanel({ title, href, linkText, children }: { title: string; href: string; linkText: string; children: React.ReactNode }) {
  return (
    <article className="border border-[#cfdae2] bg-white shadow-soft">
      <header className="flex items-center justify-between border-b border-[#e1e8ee] px-6 py-5">
        <h3 className="text-2xl font-black text-industrial-navy">{title}</h3>
        <Link href={href} className="text-sm font-black text-industrial-orange">
          {linkText}
        </Link>
      </header>
      <div>{children}</div>
    </article>
  );
}

function KnowledgeRow({ label, title, description, href }: { label: string; title: string; description: string; href: string }) {
  return (
    <Link href={href} className="grid gap-4 border-b border-[#e1e8ee] px-6 py-5 last:border-b-0 md:grid-cols-[84px_1fr]">
      <span className="text-xs font-black uppercase tracking-[0.08em] text-slate-400">{label}</span>
      <span>
        <span className="block text-lg font-black leading-snug text-industrial-navy">{title}</span>
        <span className="mt-2 line-clamp-2 block text-sm font-semibold leading-6 text-slate-600">{description}</span>
      </span>
    </Link>
  );
}
