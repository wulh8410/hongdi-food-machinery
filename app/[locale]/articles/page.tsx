import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ArticleCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/articles`, title: `${site.nav.articles} | ${site.name}`, description: params.locale === 'zh' ? '食品机械产品知识、选型指南、行业资讯、设备维护和采购常见问题。' : 'Food machinery knowledge, selection guides, industry insights, maintenance, and buyer questions.', keywords: site.keywords });
}

export default async function ArticlesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const site = getSiteConfig(locale);
  const items = await getContentItems(locale, 'articles');
  return (
    <PageShell locale={locale} path={`/${locale}/articles`}>
      <Breadcrumb locale={locale} items={[{ label: site.nav.articles, href: `/${locale}/articles` }]} />
      <Title title={site.nav.articles} description={locale === 'zh' ? '提供食品机械选型、设备维护、使用场景和采购准备方面的参考文章。' : 'Practical articles about equipment selection, buying preparation, maintenance, and processing applications.'} />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-10 md:grid-cols-3 md:px-6">{items.map((item) => <ArticleCard key={item.slug} locale={locale} item={item} />)}</section>
    </PageShell>
  );
}

function Title({ title, description }: { title: string; description: string }) {
  return <section className="mx-auto max-w-7xl px-4 py-8 md:px-6"><h1 className="text-3xl font-bold text-industrial-navy">{title}</h1><p className="mt-3 max-w-3xl leading-7 text-slate-600">{description}</p></section>;
}
