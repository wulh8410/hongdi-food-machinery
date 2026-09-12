import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SolutionCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import { collectionPageSchema } from '@/lib/schema';
import type { Locale } from '@/lib/types';

const solutionLabels = {
  zh: {
    poultry: '家禽加工',
    aquatic: '水产加工参考（非当前在售）',
    support: '场地与配套'
  },
  en: {
    poultry: 'Poultry Processing',
    aquatic: 'Aquatic Reference (Not Currently Sold)',
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
        ? '面向屠宰档口、养殖场、食堂餐饮和食品加工客户的家禽处理设备方案与场地配套参考。'
        : 'Practical poultry-processing equipment and site-support guidance for slaughter stalls, farms, canteens, restaurants, and food processors.',
    keywords: site.keywords
  });
}

export default async function SolutionsPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const items = await getContentItems(params.locale, 'solutions');
  const labels = solutionLabels[params.locale];
  const description = params.locale === 'zh'
    ? '方案库以当前家禽加工和场地配套为主，并保留部分水产旧资料供历史内容识别；旧资料不代表当前在售产品。每页说明工艺、设备分工、产能边界、现场条件和验收重点。'
    : 'The solution library focuses on current poultry processing and site support. Some legacy aquatic references remain for historical clarity and do not represent products currently offered.';
  const groups = (['poultry', 'aquatic', 'support'] as const)
    .map((key) => ({
      key,
      category: labels[key],
      items: items.filter((item) => normalizeSolutionCategory(item.solutionCategory, item.slug, item.title) === key)
    }));

  return (
    <PageShell locale={params.locale} path={`/${params.locale}/solutions`}>
      <SchemaJsonLd data={collectionPageSchema(params.locale, '/solutions', site.nav.solutions, description)} />
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.solutions, href: `/${params.locale}/solutions` }]} />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.nav.solutions}</h1>
        <p className="mt-3 max-w-4xl leading-7 text-slate-600">
          {description}
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
