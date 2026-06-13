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
  const processSteps = isZh
    ? ['需求确认', '原料预处理', '浸烫清洗', '脱毛脱鳞', '分离加工', '检验交付']
    : ['Requirement', 'Pre-processing', 'Scalding & Washing', 'Dehairing & Scaling', 'Separation', 'Delivery'];
  const strengths = isZh
    ? [
        ['先进设备', '围绕家禽、水产和肉类加工场景配置设备。'],
        ['严格质控', '关注材料结构、装配稳定性和出厂调试。'],
        ['研发创新', '根据真实生产痛点持续优化设备结构。'],
        ['快速交付', '按物料、产能、场地和电压条件确认配置。']
      ]
    : [
        ['Equipment', 'Equipment configured for poultry, aquatic, and meat processing workflows.'],
        ['Quality Control', 'Material structure, assembly stability, and commissioning checks.'],
        ['Improvement', 'Equipment structure optimized around practical production pain points.'],
        ['Delivery', 'Configuration based on material, capacity, site size, and voltage.']
      ];

  return (
    <PageShell locale={locale} path={`/${locale}`}>
      <SchemaJsonLd data={organizationSchema(locale)} />
      <HeroSection locale={locale} site={site} />

      <section className="bg-[#e8f0f5]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <p className="max-w-4xl text-2xl font-black leading-10 text-industrial-navy">{site.companyPositioning}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {categories.slice(0, 6).map((category) => (
              <div key={category.slug} className="border border-[#08233d]/10 bg-white/45 px-4 py-3 text-sm font-bold text-industrial-navy">
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeSection
        eyebrow={isZh ? 'Core Equipment' : 'Core Equipment'}
        title={isZh ? '主推设备矩阵' : 'Featured Equipment Matrix'}
        description={isZh ? '围绕家禽脱毛、泡水浸烫、水产处理和前处理配套，突出可采购、可对比、可落地的核心设备。' : 'Core equipment for poultry dehairing, scalding, aquatic processing, and pre-processing workflows.'}
        href={`/${locale}/products`}
        linkText={isZh ? '查看全部产品' : 'View all products'}
      >
        <div className="border border-[#08233d]/10 bg-white/45 p-4 md:p-7">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((item) => (
              <ProductCard key={item.slug} locale={locale} item={item} />
            ))}
          </div>
        </div>
      </HomeSection>

      <section className="bg-[#e8f0f5] px-4 md:px-6">
        <div className="mx-auto max-w-7xl bg-[linear-gradient(135deg,rgba(8,35,61,0.98),rgba(18,52,82,0.94))] px-6 py-14 text-white md:px-10">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-industrial-orange">{isZh ? 'Process' : 'Process'}</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">{isZh ? '加工流程与解决方案' : 'Processing Workflow'}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
            {isZh ? '从物料、产能、场地、电压到交付的完整路径，让采购判断更清晰。' : 'A clear path from material and capacity to site conditions and delivery.'}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-6">
            {processSteps.map((step, index) => (
              <div key={step} className="border-t border-white/20 pt-5">
                <p className="text-2xl font-black text-industrial-orange">{String(index + 1).padStart(2, '0')}</p>
                <p className="mt-3 text-sm font-black md:text-base">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeSection
        eyebrow={isZh ? 'Solutions' : 'Solutions'}
        title={isZh ? '按真实生产场景配置设备' : 'Configure Equipment by Production Scenario'}
        description={isZh ? '不是堆产品，而是按客户的物料、产量、场地和前后工序，形成可执行的设备组合。' : 'Equipment combinations based on materials, capacity, site size, and workflow.'}
        href={`/${locale}/solutions`}
        linkText={isZh ? '查看全部方案' : 'View all solutions'}
        panel="dark"
      >
        <div className="grid border-y border-white/15 md:grid-cols-2 lg:grid-cols-4">
          {solutions.slice(0, 4).map((item, index) => (
            <HomeSolutionCell key={item.slug} locale={locale} item={item} index={index} />
          ))}
        </div>
      </HomeSection>

      <section className="bg-[#e8f0f5]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-industrial-orange">{isZh ? 'Factory Capability' : 'Factory Capability'}</p>
            <h2 className="mt-3 text-3xl font-black text-industrial-navy md:text-4xl">{isZh ? '工厂实力' : 'Manufacturing Capability'}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {isZh
                ? '以真实加工场景为依据，围绕设备结构、产能配置、安装调试和后续维护提供配套支持。'
                : 'Support based on real processing scenarios, equipment structure, capacity configuration, commissioning, and maintenance.'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map(([title, description]) => (
              <div key={title} className="border border-[#08233d]/10 bg-white/55 p-5">
                <h3 className="text-lg font-black text-industrial-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeSection
        eyebrow={isZh ? 'GEO Content' : 'GEO Content'}
        title={isZh ? '采购知识与常见问题' : 'Buyer Knowledge and FAQ'}
        description={isZh ? '用问答和选型文章解释真实采购问题，让搜索引擎和 AI 助手更容易理解洪弟食品机械的设备能力与服务场景。' : 'Buyer questions and selection guides for search engines and AI assistants.'}
        href={`/${locale}/faqs`}
        linkText={isZh ? '查看全部内容' : 'View all content'}
      >
        <div className="grid gap-7 border border-[#08233d]/10 bg-white/45 p-4 md:grid-cols-[0.9fr_1.1fr] md:p-7">
          {faqs[0] ? <FAQFeatureCard locale={locale} item={faqs[0]} /> : null}
          <div className="border border-slate-200 bg-white">
            {faqs.slice(1, 4).map((item, index) => (
              <FAQListRow key={item.slug} locale={locale} item={item} index={index} />
            ))}
          </div>
        </div>
      </HomeSection>

      <HomeSection
        eyebrow={isZh ? 'Articles' : 'Articles'}
        title={isZh ? '最新文章' : 'Latest Articles'}
        description={isZh ? '围绕选型、维护、场景和采购问题持续补充内容。' : 'Selection, maintenance, scenario, and procurement content.'}
        href={`/${locale}/articles`}
        linkText={isZh ? '查看全部文章' : 'View all articles'}
      >
        <div className="grid gap-6 border border-[#08233d]/10 bg-white/45 p-4 md:grid-cols-2 md:p-7 lg:grid-cols-4">
          {articles.slice(0, 4).map((item) => (
            <ArticleCard key={item.slug} locale={locale} item={item} />
          ))}
        </div>
      </HomeSection>

      <HomeContact
        locale={locale}
        phone={site.phone}
        wechat={site.wechat}
        douyinAccounts={site.douyinAccounts}
        videoAccounts={site.videoAccounts}
      />
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
  panel = 'light',
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkText: string;
  dark?: boolean;
  panel?: 'light' | 'dark';
  children: React.ReactNode;
}) {
  const isDarkPanel = dark || panel === 'dark';
  return (
    <section className="bg-[#e8f0f5] px-4 py-8 md:px-6">
      <div className={`mx-auto max-w-7xl ${isDarkPanel ? 'bg-[linear-gradient(135deg,rgba(8,35,61,0.98),rgba(18,52,82,0.94))] px-6 py-14 text-white md:px-10' : 'py-8'}`}>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-industrial-orange">{eyebrow}</p>
            <h2 className={`mt-3 text-3xl font-black md:text-4xl ${isDarkPanel ? 'text-white' : 'text-industrial-navy'}`}>{title}</h2>
            <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${isDarkPanel ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
          </div>
          <Link href={href} className={`text-sm font-black ${isDarkPanel ? 'text-industrial-orange' : 'text-industrial-blue'}`}>
            {linkText} →
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}

function FAQFeatureCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  return (
    <article className="border-l-4 border-industrial-orange bg-white p-7">
      <h3 className="text-2xl font-black leading-tight text-industrial-navy">{item.title}</h3>
      <p className="mt-5 line-clamp-6 text-base leading-8 text-slate-600">{item.description}</p>
      <Link href={`/${locale}/faqs/${item.slug}`} className="mt-6 inline-block text-sm font-black text-industrial-blue">
        {locale === 'zh' ? '查看答案 →' : 'View Answer →'}
      </Link>
    </article>
  );
}

function HomeSolutionCell({ locale, item, index }: { locale: Locale; item: ContentItem; index: number }) {
  return (
    <article className="border-t border-white/15 p-6 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0">
      <p className="text-3xl font-black text-industrial-orange">{String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-300">{item.description}</p>
      <Link href={`/${locale}/solutions/${item.slug}`} className="mt-5 inline-block text-sm font-black text-industrial-orange">
        {locale === 'zh' ? '查看方案 →' : 'View Solution →'}
      </Link>
    </article>
  );
}

function FAQListRow({ locale, item, index }: { locale: Locale; item: ContentItem; index: number }) {
  return (
    <article className="grid gap-4 border-t border-slate-200 p-5 first:border-t-0 md:grid-cols-[7rem_1fr]">
      <p className="text-xs font-black uppercase tracking-[0.08em] text-industrial-orange">{index === 2 ? 'Article' : `FAQ ${String(index + 1).padStart(2, '0')}`}</p>
      <div>
        <h3 className="line-clamp-2 text-lg font-black text-industrial-navy">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.description}</p>
        <Link href={`/${locale}/faqs/${item.slug}`} className="mt-3 inline-block text-sm font-black text-industrial-blue">
          {locale === 'zh' ? '查看答案 →' : 'View Answer →'}
        </Link>
      </div>
    </article>
  );
}

function HomeContact({
  locale,
  phone,
  wechat,
  douyinAccounts = [],
  videoAccounts = []
}: {
  locale: Locale;
  phone: string;
  wechat: string;
  douyinAccounts?: string[];
  videoAccounts?: string[];
}) {
  const isZh = locale === 'zh';

  return (
    <section className="bg-[#e8f0f5] px-4 pb-12 pt-8 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 bg-[#123452] px-6 py-11 text-white md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-industrial-orange">{isZh ? '设备选型咨询' : 'Equipment Consultation'}</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            {isZh ? '提交加工需求，获取设备配置建议' : 'Share requirements and get equipment advice'}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/90 md:text-base">
            {isZh
              ? '提供加工物料、单日产量、现场电压、场地尺寸和前后工序信息，我们可以先给出适合的设备型号与配置建议。'
              : 'Share material type, daily capacity, voltage, site size, and workflow requirements for an initial equipment recommendation.'}
          </p>
        </div>
        <div className="grid gap-3 border border-white/15 bg-white/5 p-6 text-sm">
          <div className="grid grid-cols-[4em_1fr] gap-3">
            <span className="text-slate-300">{isZh ? '电话' : 'Phone'}</span>
            <strong>{phone}</strong>
          </div>
          <div className="grid grid-cols-[4em_1fr] gap-3">
            <span className="text-slate-300">{isZh ? '微信' : 'WeChat'}</span>
            <strong>{wechat}</strong>
          </div>
          {douyinAccounts.length ? (
            <div className="grid grid-cols-[4em_1fr] gap-3">
              <span className="text-slate-300">{isZh ? '抖音' : 'Douyin'}</span>
              <strong>{douyinAccounts.join('、')}</strong>
            </div>
          ) : null}
          {videoAccounts.length ? (
            <div className="grid grid-cols-[4em_1fr] gap-3">
              <span className="text-slate-300">{isZh ? '视频号' : 'WeChat Channels'}</span>
              <strong>{videoAccounts.join('、')}</strong>
            </div>
          ) : null}
          <div className="grid grid-cols-[4em_1fr] gap-3">
            <span className="text-slate-300">{isZh ? '地址' : 'Address'}</span>
            <strong>{isZh ? '广东省揭阳市揭东区曲溪港美村206国道旁' : 'Near National Road 206, Quxi Gangmei Village, Jiedong District, Jieyang, Guangdong'}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
