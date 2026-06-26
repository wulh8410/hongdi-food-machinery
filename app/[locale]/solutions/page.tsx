import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SolutionCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/solutions`, title: `${site.nav.solutions} | ${site.name}`, description: params.locale === 'zh' ? '中小型屠宰档口、养殖场、食堂餐饮、水产门店和肉丸加工设备解决方案。' : 'Solutions for slaughter stalls, farms, canteens, restaurants, aquatic stores, and meatball processing.', keywords: site.keywords });
}

export default async function SolutionsPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const items = await getContentItems(params.locale, 'solutions');
  const categoryOrder = params.locale === 'zh' ? ['家禽加工', '水产加工', '鱼糜丸类', '场地与配套'] : [];
  const grouped = categoryOrder.map((category) => ({
    category,
    items: items.filter((item) => normalizeSolutionCategory(item.solutionCategory, item.slug, item.title) === category)
  }));
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/solutions`}>
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.solutions, href: `/${params.locale}/solutions` }]} />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.nav.solutions}</h1>
        <p className="mt-3 max-w-4xl leading-7 text-slate-600">{params.locale === 'zh' ? '按家禽加工、水产加工、鱼糜丸类和场地配套组织设备方案。每个方案说明适用客户、工艺流程、设备分工、产能边界、现场条件和验收重点，帮助采购者先判断方向，再联系厂家核实型号。' : 'Equipment configurations organized by slaughter, farm, catering, aquatic, and meatball processing scenarios.'}</p>
        {categoryOrder.length ? (
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="解决方案分类">
            {categoryOrder.map((category) => <a key={category} href={`#${category}`} className="border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-industrial-navy hover:border-industrial-blue">{category}</a>)}
          </nav>
        ) : null}
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
        {grouped.filter((group) => group.items.length).map((group) => (
          <section key={group.category} id={group.category} className="scroll-mt-24 border-t border-slate-200 py-8 first:border-t-0 first:pt-2">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-industrial-navy">{group.category}</h2>
              <p className="text-sm text-slate-500">{group.items.length} 个方案</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{group.items.map((item) => <SolutionCard key={item.slug} locale={params.locale} item={item} />)}</div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function normalizeSolutionCategory(category = '', slug = '', title = '') {
  const text = `${category} ${slug} ${title}`.toLowerCase();
  if (text.includes('水产') || text.includes('aquatic') || text.includes('鱼类') || text.includes('fish')) return '水产加工';
  if (text.includes('鱼糜') || text.includes('肉丸') || text.includes('丸') || text.includes('meatball')) return '鱼糜丸类';
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
    text.includes('布置') ||
    text.includes('后处理') ||
    text.includes('site') ||
    text.includes('maintenance') ||
    text.includes('installation')
  ) return '场地与配套';
  return '家禽加工';
}
