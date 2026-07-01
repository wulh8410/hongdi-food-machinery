import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ArticleCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { ContentItem, Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/articles`, title: `${site.nav.articles} | ${site.name}`, description: params.locale === 'zh' ? '食品机械产品知识、选型指南、行业资讯、设备维护和采购常见问题。' : 'Food machinery knowledge, selection guides, industry insights, maintenance, and buyer questions.', keywords: site.keywords });
}

export default async function ArticlesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const site = getSiteConfig(locale);
  const items = await getContentItems(locale, 'articles');
  const groups = groupArticles(items, locale);
  return (
    <PageShell locale={locale} path={`/${locale}/articles`}>
      <Breadcrumb locale={locale} items={[{ label: site.nav.articles, href: `/${locale}/articles` }]} />
      <Title title={site.nav.articles} description={locale === 'zh' ? '提供食品机械选型、设备维护、使用场景和采购准备方面的参考文章。' : 'Practical articles about equipment selection, buying preparation, maintenance, and processing applications.'} />
      <section className="mx-auto max-w-7xl px-4 pb-4 md:px-6">
        <nav className="flex flex-wrap gap-2" aria-label={locale === 'zh' ? '文章分类' : 'Article categories'}>
          {groups.map((group) => (
            <a key={group.key} href={`#${group.key}`} className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-industrial-navy hover:border-industrial-blue">
              <span>{group.label}</span>
              <span className="text-xs text-slate-500">{group.items.length}</span>
            </a>
          ))}
        </nav>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 md:px-6">
        {groups.map((group) => (
          <div key={group.key} id={group.key} className="scroll-mt-24 rounded-sm border border-[#08233d]/10 bg-white/70 p-5 shadow-soft md:p-6">
            <div className="mb-5 flex flex-col gap-2 border-b border-[#08233d]/10 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-black text-industrial-navy">{group.label}</h2>
              </div>
              <p className="text-sm font-bold text-slate-500">{group.items.length} {locale === 'zh' ? '篇' : 'articles'}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => <ArticleCard key={item.slug} locale={locale} item={item} />)}
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

function groupArticles(items: ContentItem[], locale: Locale) {
  const labels: Record<string, { zh: string; en: string }> = {
    buyer: { zh: '采购选型', en: 'Buying Guides' },
    product: { zh: '产品知识', en: 'Product Knowledge' },
    maintenance: { zh: '使用维护', en: 'Use and Maintenance' },
    solution: { zh: '场景方案', en: 'Scenario Solutions' },
    installation: { zh: '安装验收', en: 'Installation and Acceptance' },
    company: { zh: '厂家与服务', en: 'Factory and Service' }
  };
  const order = ['buyer', 'product', 'maintenance', 'solution', 'installation', 'company'];
  const buckets = new Map<string, ContentItem[]>();

  for (const item of items) {
    const key = normalizeArticleCategory(item.category, item.slug);
    buckets.set(key, [...(buckets.get(key) ?? []), item]);
  }

  return order.map((key) => ({ key, label: labels[key][locale], items: buckets.get(key) ?? [] }));
}

function normalizeArticleCategory(category = '', slug = '') {
  const value = `${category} ${slug}`.toLowerCase();
  if (value.includes('maintenance') || value.includes('clean') || value.includes('repair') || value.includes('rubber-finger')) return 'maintenance';
  if (value.includes('installation') || value.includes('delivery') || value.includes('site-preparation') || value.includes('acceptance')) return 'installation';
  if (value.includes('solution') || value.includes('scene') || value.includes('line') || value.includes('stall') || value.includes('canteen') || value.includes('farm')) return 'solution';
  if (value.includes('company') || value.includes('manufacturer') || value.includes('after-sales')) return 'company';
  if (value.includes('product') || value.includes('poultry-dehairing') || value.includes('scalding') || value.includes('livestock') || value.includes('custom')) return 'product';
  return 'buyer';
}
