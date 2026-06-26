import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FAQCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { ContentItem, Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/faqs`, title: `${site.nav.faqs} | ${site.name}`, description: params.locale === 'zh' ? '食品机械采购、选型、定制、价格和生产线规划常见问题。' : 'FAQ about food machinery buying, selection, customization, price, and production line planning.', keywords: site.keywords });
}

export default async function FAQsPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const items = await getContentItems(params.locale, 'faqs');
  const groups = groupFaqs(items, params.locale);
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/faqs`}>
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.faqs, href: `/${params.locale}/faqs` }]} />
      <Title title={site.nav.faqs} description={params.locale === 'zh' ? '整理客户在选购食品机械前常问的问题，帮助提前了解设备配置、价格、定制和售后。' : 'Common questions about equipment configuration, pricing, customization, and after-sales support.'} />
      <section className="mx-auto max-w-7xl px-4 pb-4 md:px-6">
        <div className="flex flex-wrap gap-2 rounded-sm border border-[#08233d]/10 bg-white/80 p-3 shadow-soft">
          {groups.map((group) => (
            <a key={group.key} href={`#${group.key}`} className="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-black text-industrial-navy hover:border-industrial-orange hover:text-industrial-orange">
              <span>{group.label}</span>
              <span className="rounded-sm bg-[#edf3f7] px-2 py-0.5 text-xs text-slate-500">{group.items.length}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 md:px-6">
        {groups.map((group) => (
          <div key={group.key} id={group.key} className="scroll-mt-24 rounded-sm border border-[#08233d]/10 bg-white/70 p-5 shadow-soft md:p-6">
            <div className="mb-5 flex flex-col gap-2 border-b border-[#08233d]/10 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-black text-industrial-navy">{group.label}</h2>
              </div>
              <p className="text-sm font-bold text-slate-500">{group.items.length} {params.locale === 'zh' ? '条' : 'questions'}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => <FAQCard key={item.slug} locale={params.locale} item={item} />)}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

function Title({ title, description }: { title: string; description: string }) {
  return <section className="mx-auto max-w-7xl px-4 py-8 md:px-6"><h1 className="text-3xl font-bold text-industrial-navy">{title}</h1><p className="mt-3 max-w-3xl leading-7 text-slate-600">{description}</p></section>;
}

function groupFaqs(items: ContentItem[], locale: Locale) {
  const labels: Record<string, { zh: string; en: string }> = {
    buying: { zh: '采购报价', en: 'Buying and Pricing' },
    selection: { zh: '型号选型', en: 'Model Selection' },
    application: { zh: '适用场景', en: 'Applications' },
    effect: { zh: '加工效果', en: 'Processing Results' },
    site: { zh: '场地水电', en: 'Site and Utilities' },
    maintenance: { zh: '清洗维护', en: 'Cleaning and Maintenance' },
    safety: { zh: '安全卫生', en: 'Safety and Sanitation' },
    service: { zh: '售后服务', en: 'After-sales Service' }
  };
  const order = ['buying', 'selection', 'application', 'effect', 'site', 'maintenance', 'safety', 'service'];
  const buckets = new Map<string, ContentItem[]>();

  for (const item of items) {
    const key = classifyFaq(item);
    buckets.set(key, [...(buckets.get(key) ?? []), item]);
  }

  return order
    .filter((key) => buckets.has(key))
    .map((key) => ({ key, label: labels[key][locale], items: buckets.get(key) ?? [] }));
}

function classifyFaq(item: ContentItem) {
  const text = `${item.slug} ${item.title} ${item.description}`.toLowerCase();
  if (text.includes('price') || text.includes('quote') || text.includes('cheap') || text.includes('报价') || text.includes('价格') || text.includes('多少钱')) return 'buying';
  if (text.includes('clean') || text.includes('water-change') || text.includes('rubber') || text.includes('maintenance') || text.includes('清洗') || text.includes('胶棒') || text.includes('维护') || text.includes('更换')) return 'maintenance';
  if (text.includes('site') || text.includes('space') || text.includes('electric') || text.includes('220v') || text.includes('380v') || text.includes('drain') || text.includes('场地') || text.includes('电压') || text.includes('排水')) return 'site';
  if (text.includes('safe') || text.includes('chemical') || text.includes('alkali') || text.includes('live') || text.includes('安全') || text.includes('药水') || text.includes('火碱') || text.includes('活禽')) return 'safety';
  if (text.includes('after-sales') || text.includes('warranty') || text.includes('安装') || text.includes('验收') || text.includes('售后')) return 'service';
  if (text.includes('damage') || text.includes('not-clean') || text.includes('fine-feather') || text.includes('break') || text.includes('效果') || text.includes('破皮') || text.includes('脱不干净') || text.includes('细毛') || text.includes('肉质')) return 'effect';
  if (text.includes('stall') || text.includes('canteen') || text.includes('farm') || text.includes('restaurant') || text.includes('aquatic') || text.includes('档口') || text.includes('食堂') || text.includes('养殖') || text.includes('门店')) return 'application';
  return 'selection';
}
