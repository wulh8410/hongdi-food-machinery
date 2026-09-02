import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { assetPath } from '@/lib/asset';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { localizedMetadata } from '@/lib/seo';
import type { ContentItem, Locale } from '@/lib/types';

const images = {
  hero: '/images/home-redesign/hero-banner.png',
  integrated: '/images/home-redesign/product-integrated.png',
  mixer: '/images/home-redesign/product-mixer.png',
  scalding: '/images/home-redesign/product-scalding.png',
  bearing: '/images/home-redesign/detail-bearing.jpg',
  motor: '/images/home-redesign/detail-motor.jpg',
  rubberStick: '/images/home-redesign/detail-rubber-stick.jpg',
  outlet: '/images/home-redesign/detail-outlet.jpg',
  parts: '/images/home-redesign/detail-parts.jpg',
  chain: '/images/home-redesign/detail-chain.jpg',
  controlBox: '/images/home-redesign/detail-control-box.jpg',
  plucker: '/images/home-redesign/detail-plucker.jpg'
};

const featuredSlugs = [
  'new-generation-pneumatic-scalding-dehairing-machine',
  'double-lid-poultry-scalding-mixer',
  'rubber-rod-scalding-mixer'
];

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({
    locale: params.locale,
    path: `/${params.locale}`,
    title: `${site.name} | ${
      params.locale === 'zh'
        ? '家禽脱毛机与食品加工设备厂家'
        : 'Poultry Dehairing and Food Processing Equipment Manufacturer'
    }`,
    description: site.description,
    keywords: site.keywords
  });
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const site = getSiteConfig(locale);
  const [products, solutions, faqs, articles] = await Promise.all([
    getContentItems(locale, 'products'),
    getContentItems(locale, 'solutions'),
    getContentItems(locale, 'faqs'),
    getContentItems(locale, 'articles')
  ]);
  const featured = featuredSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is ContentItem => Boolean(product));

  return (
    <PageShell locale={locale} path={`/${locale}`}>
      <SchemaJsonLd data={organizationSchema(locale)} />
      <SchemaJsonLd data={websiteSchema(locale)} />
      <div className="bg-[#f3f1ec] text-[#081d32]">
        <Hero locale={locale} />
        <TrustSection locale={locale} />
        <ProductSection locale={locale} products={featured} />
        <SolutionSection locale={locale} solutions={solutions.slice(0, 4)} />
        <ProcessSection locale={locale} />
        <AdvantagesSection locale={locale} />
        <KnowledgeSection locale={locale} faq={faqs[0]} articles={articles.slice(0, 4)} />
        <ContactSection locale={locale} phone={site.phone} />
      </div>
    </PageShell>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const proofs = zh
    ? [
        ['源头厂家', '设备制造与配置建议'],
        ['20年经验', '长期服务食品加工现场'],
        ['支持定制', '按产量与场地匹配'],
        ['全国服务', '售前选型与售后支持']
      ]
    : [
        ['Direct Factory', 'Manufacturing and configuration'],
        ['20 Years', 'Long-term field experience'],
        ['Custom Support', 'Matched to site and capacity'],
        ['China Service', 'Selection and after-sales support']
      ];

  return (
    <section className="industrial-grid relative overflow-hidden bg-[#041426] text-white sm:min-h-[720px] lg:min-h-[790px]">
      <Image
        src={assetPath(images.hero)}
        alt={zh ? '洪弟食品机械工厂与食品加工设备' : 'Hongdi Food Machinery factory and equipment'}
        fill
        priority
        className="object-cover object-[64%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,15,29,0.98)_0%,rgba(2,15,29,0.88)_31%,rgba(2,15,29,0.5)_57%,rgba(2,15,29,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,13,25,0.08)_40%,rgba(2,13,25,0.82)_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-[1460px] flex-col justify-center px-5 pb-8 pt-16 sm:min-h-[720px] sm:pb-44 md:px-10 lg:min-h-[790px] lg:px-14">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-black tracking-[0.18em] text-[#ff941f] before:h-[3px] before:w-10 before:bg-[#ff941f]">
            {zh ? '洪弟食品机械' : 'HONGDI FOOD MACHINERY'}
          </p>
          <h1 className="mt-7 text-[2.5rem] font-black leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl lg:text-[5.4rem]">
            {zh ? (
              <>
                家禽脱毛机与
                <br />
                泡水浸烫设备厂家
              </>
            ) : (
              <>
                Poultry Dehairing
                <br />
                Equipment Manufacturer
              </>
            )}
          </h1>
          <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-slate-200 md:text-lg">
            {zh
              ? '专注家禽脱毛、泡水浸烫和食品加工前处理设备，为屠宰档口、养殖场、食堂及食品加工客户提供设备选型与配套方案。'
              : 'Poultry dehairing, scalding and food pre-processing equipment, with practical configuration support for farms, stalls, canteens and food processors.'}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={`/${locale}/products`} className="industrial-button industrial-button-primary">
              {zh ? '查看设备产品' : 'View Equipment'}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={`/${locale}/solutions`} className="industrial-button industrial-button-secondary">
              {zh ? '查看解决方案' : 'View Solutions'}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="relative mt-10 grid border border-white/15 bg-[#041426]/88 backdrop-blur-md sm:absolute sm:inset-x-10 sm:bottom-0 sm:mt-0 sm:grid-cols-2 sm:border-b-0 lg:inset-x-14 lg:grid-cols-4">
          {proofs.map(([title, description], index) => (
            <div key={title} className="relative border-b border-white/12 px-5 py-5 last:border-b-0 sm:border-r lg:border-b-0 lg:px-7 lg:py-6">
              <span className="absolute left-0 top-0 h-1 w-14 bg-[#ff941f]" />
              <p className="text-xl font-black text-white">{title}</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-400">{description}</p>
              <span className="absolute right-4 top-4 text-4xl font-black text-white/[0.06]">0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const items = zh
    ? [
        ['源头厂家', '自有生产与装配经验', images.chain],
        ['支持定制', '按场地、产量和工序配置', images.motor],
        ['品质可靠', '关注材质、结构与运行稳定', images.bearing],
        ['服务支持', '选型、安装与配件协助', images.controlBox]
      ]
    : [
        ['Direct Factory', 'Manufacturing and assembly experience', images.chain],
        ['Custom Support', 'Configured by site, capacity and process', images.motor],
        ['Reliable Quality', 'Materials, structure and stable operation', images.bearing],
        ['Service Support', 'Selection, setup and parts assistance', images.controlBox]
      ];

  return (
    <section className="relative overflow-hidden bg-[#f3f1ec] px-5 py-16 md:px-10 lg:px-14 lg:py-24">
      <div className="blueprint-light absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1460px]">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_1fr] lg:items-end">
          <div className="relative flex items-end justify-center lg:justify-start">
            <span className="font-black leading-[0.78] tracking-[-0.08em] text-[#17314b] [font-size:clamp(7rem,18vw,17rem)]">20</span>
            <span className="mb-5 ml-3 border-l-2 border-[#ff941f] pl-3 text-xl font-black text-[#17314b]">{zh ? '年经验' : 'YEARS'}</span>
          </div>
          <div>
            <SectionHeading
              light
              overline={zh ? '制造与服务' : 'MANUFACTURING & SERVICE'}
              title={zh ? '专注食品机械制造与解决方案' : 'Focused on Food Machinery and Practical Solutions'}
              description={
                zh
                  ? '从设备结构、动力配置到现场水电与清洗维护，围绕客户真实加工需求提供更合适的设备建议。'
                  : 'From machine structure and power configuration to utilities and cleaning, recommendations are based on real processing needs.'
              }
            />
            <div className="mt-8 grid grid-cols-2 gap-0 border border-[#15324c]/15 xl:grid-cols-4">
              {items.map(([title, description, image], index) => (
                <article key={title} className="group relative overflow-hidden border-b border-r border-[#15324c]/15 bg-white/72 p-4 [&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0 xl:p-5">
                  <span className="text-xs font-black tracking-[0.16em] text-[#ff7f00]">0{index + 1}</span>
                  <p className="mt-3 text-base font-black text-[#081d32] md:text-xl">{title}</p>
                  <p className="mt-2 min-h-[4.5rem] text-xs font-semibold leading-5 text-slate-600 md:min-h-12 md:text-sm md:leading-6">{description}</p>
                  <div className="relative mt-5 aspect-[16/9] overflow-hidden bg-[#d7d9d8]">
                    <Image src={assetPath(image)} alt={`${title} - ${zh ? '洪弟食品机械设备制造细节' : 'Hongdi Food Machinery manufacturing detail'}`} fill className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" sizes="(max-width: 1280px) 50vw, 25vw" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSection({ locale, products }: { locale: Locale; products: ContentItem[] }) {
  const zh = locale === 'zh';
  const productImages = [images.integrated, images.mixer, images.scalding];
  const featureRows = zh
    ? [
        ['气动翻出', '泡水脱毛一体', '结实耐用'],
        ['双面翻盖', '自动搅拌', '恒温泡水'],
        ['不锈钢机身', '胶棒搅拌', '蒸汽加热']
      ]
    : [
        ['Pneumatic unloading', 'Scalding and dehairing', 'Durable structure'],
        ['Double lid', 'Automatic mixing', 'Stable scalding'],
        ['Stainless body', 'Rubber-rod mixing', 'Steam heating']
      ];

  return (
    <section className="industrial-grid relative overflow-hidden bg-[#031321] px-5 py-16 text-white md:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto max-w-[1460px]">
        <div className="flex flex-col gap-6 border-b border-white/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            overline={zh ? '核心设备' : 'CORE EQUIPMENT'}
            title={zh ? '家禽脱毛机与泡水浸烫设备' : 'Poultry Dehairing and Scalding Equipment'}
            description={zh ? '集中展示适合家禽泡水、脱毛和前处理的主力设备，方便根据加工方式进行对比。' : 'Compare core machines for poultry scalding, dehairing and pre-processing.'}
          />
          <Link href={`/${locale}/products`} className="industrial-link">
            {zh ? '查看全部设备' : 'View all equipment'} <span>→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {products.map((product, index) => (
            <article key={product.slug} className="group relative overflow-hidden border border-[#cb873e]/55 bg-[#081827] shadow-[0_26px_65px_rgba(0,0,0,0.32)]">
              <span className="absolute left-0 top-0 z-10 h-1 w-24 bg-[#ff941f]" />
              <div className="relative aspect-[1122/1402] overflow-hidden bg-[#06111c]">
                <Image src={assetPath(productImages[index])} alt={product.title} fill className="object-contain transition duration-700 group-hover:scale-[1.02]" sizes="(max-width: 1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,rgba(3,15,26,0.92)_100%)]" />
                <span className="absolute bottom-5 left-5 text-5xl font-black text-[#ff941f]">0{index + 1}</span>
              </div>
              <div className="border-t border-[#cb873e]/35 p-6">
                <h3 className="text-2xl font-black leading-tight text-white">{product.title}</h3>
                <p className="mt-4 line-clamp-3 min-h-[5.25rem] text-sm font-semibold leading-7 text-slate-300">{product.description}</p>
                <div className="mt-5 grid grid-cols-3 border border-white/10">
                  {featureRows[index]?.map((feature) => (
                    <span key={feature} className="border-r border-white/10 px-2 py-3 text-center text-xs font-black text-[#f1c38a] last:border-r-0">{feature}</span>
                  ))}
                </div>
                <Link href={`/${locale}/products/${product.slug}`} className="mt-6 inline-flex items-center gap-3 text-sm font-black text-[#ff941f]">
                  {zh ? '查看产品详情' : 'View product'} <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection({ locale, solutions }: { locale: Locale; solutions: ContentItem[] }) {
  const zh = locale === 'zh';
  const steps = zh
    ? [
        ['物料确认', '确认加工品类与单只重量'],
        ['产量评估', '确认日处理量和高峰处理量'],
        ['场地水电', '核对电压、进水、排水和操作空间'],
        ['设备组合', '匹配泡水、脱毛与清洗设备']
      ]
    : [
        ['Material', 'Confirm poultry type and unit weight'],
        ['Capacity', 'Confirm daily and peak throughput'],
        ['Site & utilities', 'Check voltage, water, drainage and space'],
        ['Equipment set', 'Match scalding, dehairing and cleaning']
      ];

  return (
    <section className="relative overflow-hidden bg-[#071a2c] px-5 py-16 text-white md:px-10 lg:px-14 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_34%,rgba(44,96,141,0.24),transparent_32%)]" />
      <div className="relative mx-auto max-w-[1460px]">
        <div className="grid gap-8 xl:grid-cols-[0.32fr_1fr_0.42fr]">
          <div className="border border-white/12 bg-[#041321]/75 p-6">
            <p className="text-xs font-black tracking-[0.18em] text-[#ff941f]">{zh ? '应用场景' : 'SCENARIOS'}</p>
            <h2 className="mt-4 text-3xl font-black">{zh ? '按生产现场配置设备' : 'Equipment Matched to Your Site'}</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
              {zh ? '根据加工品类、处理量和现场条件，选择更合适的设备组合。' : 'Choose a practical equipment set based on product, capacity and site conditions.'}
            </p>
            <div className="mt-7 space-y-2">
              {solutions.map((solution, index) => (
                <Link key={solution.slug} href={`/${locale}/solutions/${solution.slug}`} className={`block border px-4 py-4 text-sm font-black transition ${index === 0 ? 'border-[#ff941f] bg-[#ff941f] text-[#081d32]' : 'border-white/12 text-slate-200 hover:border-[#ff941f]/70 hover:text-[#ffb25e]'}`}>
                  {String(index + 1).padStart(2, '0')} · {solution.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden border border-white/12 bg-[#061524]">
            <Image src={assetPath(images.hero)} alt={zh ? '洪弟食品机械家禽泡水浸烫与脱毛设备配置' : 'Hongdi poultry scalding and dehairing equipment configuration'} fill className="object-cover object-[68%_center] opacity-65" sizes="(max-width: 1280px) 100vw, 55vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,14,25,0.18),rgba(3,14,25,0.92))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-xs font-black tracking-[0.18em] text-[#ff941f]">{zh ? '推荐配置路径' : 'RECOMMENDED PATH'}</p>
              <h3 className="mt-3 text-3xl font-black">{zh ? '泡水浸烫 → 脱毛处理 → 清洗整理' : 'Scalding → Dehairing → Cleaning'}</h3>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-300">
                {zh ? '可根据场地大小与单日处理量增减设备模块，避免设备能力不匹配。' : 'Modules can be adjusted to site size and daily throughput to avoid capacity mismatch.'}
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {[images.scalding, images.integrated, images.mixer].map((image, index) => (
                  <div key={image} className="relative aspect-[16/9] overflow-hidden border border-white/15 bg-black/30">
                    <Image src={assetPath(image)} alt={(zh ? ['泡水浸烫设备', '泡水脱毛一体设备', '家禽泡水搅拌设备'] : ['Poultry scalding equipment', 'Integrated scalding and dehairing equipment', 'Poultry scalding mixer'])[index]} fill className="object-cover" sizes="200px" />
                    <span className="absolute bottom-2 left-2 bg-[#051522]/90 px-2 py-1 text-xs font-black text-[#ffb25e]">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-[#d4a066]/55 bg-[linear-gradient(180deg,#11283c,#061524)] p-6">
            <p className="text-xs font-black tracking-[0.18em] text-[#ff941f]">{zh ? '确认四项信息' : 'FOUR DETAILS TO CONFIRM'}</p>
            <div className="mt-6 divide-y divide-white/12">
              {steps.map(([title, description], index) => (
                <div key={title} className="grid grid-cols-[3rem_1fr] gap-3 py-5 first:pt-0">
                  <span className="text-2xl font-black text-[#ff941f]">0{index + 1}</span>
                  <div>
                    <p className="font-black text-white">{title}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={`/${locale}/solutions`} className="industrial-button industrial-button-primary mt-4 w-full justify-center">
              {zh ? '查看全部方案' : 'View all solutions'} <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const steps = zh
    ? [
        ['01', '需求沟通', '加工品类、产量、场地'],
        ['02', '设备选型', '确认型号与配套设备'],
        ['03', '生产发货', '按配置组织生产与交付'],
        ['04', '安装指导', '协助接电、进排水与试机'],
        ['05', '售后支持', '清洗维护与配件协助']
      ]
    : [
        ['01', 'Requirement', 'Product, capacity and site'],
        ['02', 'Selection', 'Model and supporting equipment'],
        ['03', 'Production', 'Manufacturing and delivery'],
        ['04', 'Setup', 'Utilities and commissioning'],
        ['05', 'Support', 'Cleaning, maintenance and parts']
      ];
  const stepImages = [images.parts, images.scalding, images.plucker, images.outlet, images.controlBox];

  return (
    <section className="relative overflow-hidden bg-[#f3f1ec] px-5 py-16 md:px-10 lg:px-14 lg:py-24">
      <div className="blueprint-light absolute inset-0 opacity-55" />
      <div className="relative mx-auto max-w-[1460px]">
        <SectionHeading light centered overline={zh ? '服务流程' : 'SERVICE PROCESS'} title={zh ? '从需求确认到设备交付' : 'From Requirement to Equipment Delivery'} description={zh ? '清晰确认每一步，让设备配置、现场准备和后续使用更顺畅。' : 'A clear process for equipment configuration, site preparation and long-term use.'} />
        <div className="mt-10 grid gap-3 lg:grid-cols-5">
          {steps.map(([number, title, description], index) => (
            <article key={title} className="group relative overflow-hidden border border-[#17314b]/20 bg-white/80 p-3 shadow-[0_18px_40px_rgba(14,33,51,0.08)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#cfd2d1]">
                <Image src={assetPath(stepImages[index])} alt={`${title} - ${zh ? '洪弟食品机械服务流程' : 'Hongdi Food Machinery service process'}`} fill className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" sizes="(max-width: 1024px) 100vw, 20vw" />
                <span className="absolute left-0 top-0 bg-[#ff8c16] px-3 py-2 text-lg font-black text-white">{number}</span>
              </div>
              <div className="p-3 pb-4">
                <h3 className="text-xl font-black text-[#081d32]">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvantagesSection({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const advantages = zh
    ? [
        ['不锈钢机身', '关注耐腐蚀、清洗便利与长期使用。'],
        ['脱毛稳定', '结合禽体大小、浸烫条件与胶棒状态配置。'],
        ['易清洗维护', '结构与排水位置便于日常冲洗和检查。'],
        ['支持定制', '可结合尺寸、功能、功率和现场条件调整。']
      ]
    : [
        ['Stainless Body', 'Built for wet sites, cleaning and long-term use.'],
        ['Stable Finish', 'Matched to poultry size, scalding and rubber fingers.'],
        ['Easy Maintenance', 'Practical drainage, cleaning and inspection access.'],
        ['Custom Support', 'Dimensions, functions and power can be adjusted.']
      ];

  return (
    <section className="industrial-grid bg-[#031321] px-5 py-16 text-white md:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto grid max-w-[1460px] overflow-hidden border border-[#cb873e]/45 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[560px] overflow-hidden">
          <Image src={assetPath(images.plucker)} alt={zh ? '家禽脱毛机不锈钢结构与脱毛胶棒细节' : 'Poultry dehairing machine stainless structure and rubber finger details'} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(2,13,23,0.94)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
            <p className="text-sm font-black tracking-[0.2em] text-[#ff941f]">{zh ? '设备细节' : 'EQUIPMENT DETAILS'}</p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">{zh ? '四项设备优势' : 'Four Equipment Advantages'}</h2>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-300">{zh ? '设备好不好用，既看加工效果，也看结构、清洗和后续维护是否方便。' : 'Reliable equipment depends on processing results, structure, cleaning and maintenance.'}</p>
          </div>
        </div>
        <div className="divide-y divide-white/12 bg-[#071a2c]">
          {advantages.map(([title, description], index) => (
            <article key={title} className="group grid min-h-[140px] grid-cols-[4rem_1fr_auto] items-center gap-4 px-6 py-6 transition hover:bg-white/[0.035] md:px-8">
              <span className="text-3xl font-black text-[#ff941f]">0{index + 1}</span>
              <div>
                <h3 className="text-2xl font-black text-white">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{description}</p>
              </div>
              <span className="text-2xl text-[#ff941f] transition group-hover:translate-x-1">→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowledgeSection({ locale, faq, articles }: { locale: Locale; faq?: ContentItem; articles: ContentItem[] }) {
  const zh = locale === 'zh';
  if (!faq) return null;
  return (
    <section className="relative overflow-hidden bg-[#f4f2ed] px-5 py-16 md:px-10 lg:px-14 lg:py-24">
      <div className="blueprint-light absolute inset-0 opacity-45" />
      <div className="relative mx-auto max-w-[1460px]">
        <div className="grid gap-8 border-b border-[#17314b]/15 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading light overline={zh ? '采购支持' : 'BUYING SUPPORT'} title={zh ? '采购问题与选型知识' : 'Buying Questions and Selection Knowledge'} description={zh ? '围绕型号、产量、加工效果、场地水电和清洗维护，帮助您更快找到合适的设备。' : 'Practical guidance on models, capacity, processing results, utilities and maintenance.'} />
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-[#17314b]/15 bg-[#17314b]/15 sm:grid-cols-4">
            {(zh ? ['选型建议', '实用知识', '维护技巧', '厂家服务'] : ['Selection', 'Knowledge', 'Maintenance', 'Service']).map((item) => (
              <span key={item} className="bg-white/85 px-5 py-4 text-center text-xs font-black text-[#17314b]">{item}</span>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="relative overflow-hidden bg-[#061a2c] p-7 text-white shadow-[0_24px_55px_rgba(12,34,54,0.16)] md:p-9">
            <span className="text-xs font-black tracking-[0.18em] text-[#ff941f]">{zh ? '买家常问' : 'BUYER FAQ'}</span>
            <h3 className="mt-5 text-3xl font-black leading-tight md:text-4xl">{faq.title}</h3>
            <p className="mt-5 line-clamp-5 text-sm font-semibold leading-7 text-slate-300">{faq.description}</p>
            <div className="relative mt-7 aspect-[16/8] overflow-hidden border border-white/12">
              <Image src={assetPath(images.integrated)} alt={zh ? '家禽泡水脱毛一体设备' : 'Poultry scalding and dehairing integrated equipment'} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
            </div>
            <Link href={`/${locale}/faqs/${faq.slug}`} className="industrial-button industrial-button-primary mt-7">
              {zh ? '查看详细答案' : 'View answer'} <span>→</span>
            </Link>
          </article>
          <div className="grid gap-4 sm:grid-cols-2">
            {articles.map((article, index) => (
              <article key={article.slug} className="group flex min-h-[250px] flex-col border border-[#17314b]/15 bg-white/82 p-6 transition hover:border-[#ff941f]/60 hover:shadow-[0_18px_45px_rgba(13,36,56,0.11)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black tracking-[0.15em] text-[#ff7f00]">ARTICLE 0{index + 1}</span>
                  <span className="h-px flex-1 bg-[#17314b]/12" />
                </div>
                <h3 className="mt-5 line-clamp-2 text-xl font-black leading-tight text-[#081d32]">{article.title}</h3>
                <p className="mt-4 line-clamp-3 text-sm font-semibold leading-7 text-slate-600">{article.description}</p>
                <Link href={`/${locale}/articles/${article.slug}`} className="mt-auto pt-5 text-sm font-black text-[#d96f00]">
                  {zh ? '阅读文章' : 'Read article'} <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ locale, phone }: { locale: Locale; phone: string }) {
  const zh = locale === 'zh';
  return (
    <section className="relative overflow-hidden bg-[#06192b] px-5 py-14 text-white md:px-10 lg:px-14">
      <Image src={assetPath(images.hero)} alt="" fill className="object-cover object-center opacity-20" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#06192b_0%,rgba(6,25,43,0.88)_58%,rgba(6,25,43,0.72)_100%)]" />
      <div className="relative mx-auto grid max-w-[1460px] gap-8 border-y border-white/15 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-black tracking-[0.18em] text-[#ff941f]">{zh ? '联系厂家' : 'CONTACT THE FACTORY'}</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight md:text-5xl">{zh ? '需要配置家禽脱毛或泡水浸烫设备？' : 'Need poultry dehairing or scalding equipment?'}</h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-300">{zh ? '提供加工品类、单日处理量、现场电压和场地尺寸，我们可以协助确认设备方向。' : 'Share product type, daily capacity, voltage and site dimensions so we can help confirm the equipment direction.'}</p>
        </div>
        <a href={`tel:${phone}`} className="industrial-button industrial-button-primary min-w-[230px] justify-center text-base">
          {zh ? `电话 ${phone}` : `Call ${phone}`} <span>→</span>
        </a>
      </div>
    </section>
  );
}

function SectionHeading({
  overline,
  title,
  description,
  light = false,
  centered = false
}: {
  overline: string;
  title: string;
  description: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
      <p className="text-xs font-black tracking-[0.2em] text-[#ff8510]">{overline}</p>
      <h2 className={`mt-3 text-3xl font-black leading-tight md:text-5xl ${light ? 'text-[#081d32]' : 'text-white'}`}>{title}</h2>
      <p className={`mt-4 max-w-3xl text-sm font-semibold leading-7 md:text-base ${centered ? 'mx-auto' : ''} ${light ? 'text-slate-600' : 'text-slate-300'}`}>{description}</p>
    </div>
  );
}
