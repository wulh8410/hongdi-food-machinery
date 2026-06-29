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
    'new-generation-pneumatic-scalding-dehairing-machine',
    'double-lid-poultry-scalding-mixer',
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

      <div className="-mt-6 bg-[linear-gradient(180deg,#e9f1f6_0%,#f5f8fb_42%,#e9f1f6_100%)]">
      <section className="px-4 pb-10 pt-8 md:px-6">
        <div className="mx-auto max-w-7xl border-l-4 border-industrial-orange bg-white/60 px-6 py-8 shadow-soft backdrop-blur md:px-8">
          <p className="max-w-5xl text-2xl font-black leading-10 text-industrial-navy md:text-3xl">{site.companyPositioning}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {categories.slice(0, 6).map((category) => (
              <div key={category.slug} className="border border-[#08233d]/10 bg-white px-4 py-3 text-sm font-bold text-industrial-navy shadow-[0_10px_22px_rgba(15,39,66,0.04)]">
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeSection
        eyebrow={isZh ? '核心设备' : 'Core Equipment'}
        title={isZh ? '主推食品机械设备' : 'Featured Food Machinery'}
        description={isZh ? '提供家禽脱毛、泡水浸烫、水产处理和食品前处理设备，适合屠宰档口、养殖场、食堂和食品加工客户选用。' : 'Equipment for poultry dehairing, scalding, aquatic processing, and food pre-processing applications.'}
        href={`/${locale}/products`}
        linkText={isZh ? '查看全部产品' : 'View all products'}
      >
        <div className="p-0">
          <div className="grid gap-7 md:grid-cols-3">
            {featuredProducts.map((item) => (
              <ProductCard key={item.slug} locale={locale} item={item} />
            ))}
          </div>
        </div>
      </HomeSection>

      <section className="px-4 py-6 md:px-6">
        <div className="mx-auto max-w-7xl rounded-sm bg-[linear-gradient(135deg,rgba(8,35,61,0.98),rgba(18,52,82,0.94))] px-6 py-14 text-white shadow-soft md:px-10">
          <p className="text-sm font-black tracking-[0.18em] text-industrial-orange">{isZh ? '加工流程' : 'Process'}</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">{isZh ? '加工流程与解决方案' : 'Processing Workflow'}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
            {isZh ? '从原料处理、浸烫清洗到脱毛脱鳞和交付调试，帮助客户了解设备在生产中的使用流程。' : 'From material preparation and scalding to dehairing, scaling, commissioning, and delivery.'}
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
        eyebrow={isZh ? '解决方案' : 'Solutions'}
        title={isZh ? '按真实生产场景配置设备' : 'Configure Equipment by Production Scenario'}
        description={isZh ? '根据客户加工物料、单日产量、场地尺寸和前后工序，推荐适合的单机设备或配套组合。' : 'Equipment recommendations based on materials, daily capacity, site size, and workflow.'}
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

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 border border-[#08233d]/10 bg-white/70 p-6 shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-industrial-orange">{isZh ? '工厂能力' : 'Factory Capability'}</p>
            <h2 className="mt-3 text-3xl font-black text-industrial-navy md:text-4xl">{isZh ? '工厂实力' : 'Manufacturing Capability'}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {isZh
                ? '以真实加工场景为依据，围绕设备结构、产能配置、安装调试和后续维护提供配套支持。'
                : 'Support based on real processing scenarios, equipment structure, capacity configuration, commissioning, and maintenance.'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map(([title, description]) => (
              <div key={title} className="border border-[#08233d]/10 bg-white p-5 shadow-[0_10px_22px_rgba(15,39,66,0.04)]">
                <h3 className="text-lg font-black text-industrial-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeSection
        eyebrow={isZh ? '采购知识' : 'Buyer Knowledge'}
        title={isZh ? '采购知识与常见问题' : 'Buyer Knowledge and FAQ'}
        description={isZh ? '整理客户在选设备前常问的问题，包括型号选择、用电条件、清洗维护、价格因素和售后服务。' : 'Common questions about model selection, voltage, cleaning, maintenance, pricing, and after-sales support.'}
        href={`/${locale}/faqs`}
        linkText={isZh ? '查看全部内容' : 'View all content'}
      >
        <div className="grid gap-7 md:grid-cols-[0.9fr_1.1fr]">
          {faqs[0] ? <FAQFeatureCard locale={locale} item={faqs[0]} /> : null}
          <div className="overflow-hidden rounded-sm border border-[#08233d]/10 bg-white shadow-[0_14px_30px_rgba(15,39,66,0.06)]">
            {faqs.slice(1, 4).map((item, index) => (
              <FAQListRow key={item.slug} locale={locale} item={item} index={index} />
            ))}
          </div>
        </div>
      </HomeSection>

      <HomeSection
        eyebrow={isZh ? '选型文章' : 'Articles'}
        title={isZh ? '最新文章' : 'Latest Articles'}
        description={isZh ? '提供食品机械选型、设备维护、使用场景和加工配置方面的实用参考。' : 'Practical references for equipment selection, maintenance, applications, and processing configuration.'}
        href={`/${locale}/articles`}
        linkText={isZh ? '查看全部文章' : 'View all articles'}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      </div>
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
    <section className="px-4 py-8 md:px-6">
      <div
        className={`mx-auto max-w-7xl ${
          isDarkPanel
            ? 'rounded-sm bg-[linear-gradient(135deg,rgba(8,35,61,0.98),rgba(18,52,82,0.94))] px-6 py-14 text-white shadow-soft md:px-10'
            : 'rounded-sm border border-[#08233d]/10 bg-white/70 p-6 shadow-soft backdrop-blur md:p-8'
        }`}
      >
        <div className={`mb-8 flex flex-col gap-4 border-b pb-7 md:flex-row md:items-end md:justify-between ${isDarkPanel ? 'border-white/15' : 'border-[#08233d]/10'}`}>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-industrial-orange">{eyebrow}</p>
            <h2 className={`mt-3 text-3xl font-black md:text-4xl ${isDarkPanel ? 'text-white' : 'text-industrial-navy'}`}>{title}</h2>
            <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${isDarkPanel ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
          </div>
          <Link href={href} className={`shrink-0 text-sm font-black ${isDarkPanel ? 'text-industrial-orange' : 'text-industrial-blue'}`}>
            {linkText} →
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}

function FAQFeatureCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  const points = locale === 'zh'
    ? ['每天处理多少只，最高峰每小时多少只', '主要加工鸡、鸭、鹅、鸽子还是混合品类', '现场是 220V 还是 380V，排水和水源在哪里', '是否已有泡水设备，是否需要配套一体流程']
    : ['Daily and peak hourly processing quantity', 'Main materials: chicken, duck, goose, pigeon, or mixed use', 'Available voltage, drainage, and water supply', 'Existing scalding equipment or integrated workflow needs'];
  return (
    <article className="h-full rounded-sm border border-[#08233d]/10 border-l-4 border-l-industrial-orange bg-white p-7 shadow-[0_14px_30px_rgba(15,39,66,0.06)]">
      <h3 className="text-2xl font-black leading-tight text-industrial-navy">{item.title}</h3>
      <p className="mt-5 line-clamp-6 text-base leading-8 text-slate-600">{item.description}</p>
      <div className="mt-6 rounded-sm bg-[#f1f6fa] p-4">
        <p className="text-sm font-black text-industrial-navy">{locale === 'zh' ? '咨询前建议先准备' : 'Prepare before inquiry'}</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
          {points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-orange" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
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
    <article className="grid gap-4 border-t border-[#08233d]/10 p-5 first:border-t-0 md:grid-cols-[7rem_1fr]">
      <p className="text-xs font-black uppercase tracking-[0.08em] text-industrial-orange">{`FAQ ${String(index + 1).padStart(2, '0')}`}</p>
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
    <section className="px-4 pb-14 pt-8 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-sm bg-[#123452] px-6 py-11 text-white shadow-soft md:grid-cols-[1.1fr_0.9fr] md:px-10">
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
            <strong>{isZh ? `${phone}\uff08\u5fae\u4fe1\u540c\u53f7\uff09` : `${phone} (same number on WeChat)`}</strong>
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
