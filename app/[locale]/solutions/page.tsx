import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SolutionCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

const solutionLabels = {
  zh: {
    poultry: '家禽加工',
    aquatic: '水产加工',
    support: '场地与配套'
  },
  en: {
    poultry: 'Poultry Processing',
    aquatic: 'Aquatic Processing',
    support: 'Site and Support'
  }
} as const;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({
    locale: params.locale,
    path: `/${params.locale}/solutions`,
    title: `${site.nav.solutions} | ${site.name}`,
    description:
      params.locale === 'zh'
        ? '中小型屠宰档口、养殖场、食堂餐饮、水产门店和食品加工设备解决方案。'
        : 'Practical equipment solutions for slaughter stalls, farms, canteens, restaurants, aquatic stores, and food processors.',
    keywords: site.keywords
  });
}

export default async function SolutionsPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const items = await getContentItems(params.locale, 'solutions');
  const labels = solutionLabels[params.locale];
  const groups = (['poultry', 'aquatic', 'support'] as const)
    .map((key) => ({
      key,
      category: labels[key],
      items: items.filter((item) => normalizeSolutionCategory(item.solutionCategory, item.slug, item.title) === key)
    }));

  return (
    <PageShell locale={params.locale} path={`/${params.locale}/solutions`}>
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.solutions, href: `/${params.locale}/solutions` }]} />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.nav.solutions}</h1>
        <p className="mt-3 max-w-4xl leading-7 text-slate-600">
          {params.locale === 'zh'
            ? '按家禽加工、水产加工和场地配套组织设备方案。每个方案说明适用客户、工艺流程、设备分工、产能边界、现场条件和验收重点，帮助采购者先判断方向，再联系厂家核实型号。'
            : 'Solutions are organized by poultry processing, aquatic processing, and site support. Each page explains suitable customers, workflow, equipment roles, capacity options, site requirements, and acceptance points.'}
        </p>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label={params.locale === 'zh' ? '解决方案分类' : 'Solution categories'}>
          {groups.map((group) => (
            <a key={group.key} href={`#${group.key}`} className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-industrial-navy hover:border-industrial-blue">
              <span>{group.category}</span>
              <span className="text-xs text-slate-500">{group.items.length}</span>
            </a>
          ))}
        </nav>
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
        {groups.map((group) => (
          <section key={group.key} id={group.key} className="scroll-mt-24 border-t border-slate-200 py-8 first:border-t-0 first:pt-2">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-industrial-navy">{group.category}</h2>
              <p className="text-sm text-slate-500">
                {group.items.length} {params.locale === 'zh' ? '个方案' : 'solutions'}
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => <SolutionCard key={item.slug} locale={params.locale} item={item} />)}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function normalizeSolutionCategory(category = '', slug = '', title = '') {
  const text = `${category} ${slug} ${title}`.toLowerCase();
  if (text.includes('水产') || text.includes('aquatic') || text.includes('鱼类') || text.includes('fish')) return 'aquatic';
  if (
    text.includes('场地') ||
    text.includes('配套') ||
    text.includes('维护') ||
    text.includes('保养') ||
    text.includes('安装') ||
    text.includes('验收') ||
    text.includes('咨询') ||
    text.includes('效果') ||
    text.includes('耗材') ||
    text.includes('卫生') ||
    text.includes('布局') ||
    text.includes('后处理') ||
    text.includes('site') ||
    text.includes('support') ||
    text.includes('maintenance') ||
    text.includes('installation') ||
    text.includes('acceptance') ||
    text.includes('clean') ||
    text.includes('drain') ||
    text.includes('utility')
  ) return 'support';
  return 'poultry';
}
