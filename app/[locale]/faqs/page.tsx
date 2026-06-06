import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FAQCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/faqs`, title: `${site.nav.faqs} | ${site.name}`, description: params.locale === 'zh' ? '食品机械采购、选型、定制、价格和生产线规划常见问题。' : 'FAQ about food machinery buying, selection, customization, price, and production line planning.', keywords: site.keywords });
}

export default async function FAQsPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const items = await getContentItems(params.locale, 'faqs');
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/faqs`}>
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.faqs, href: `/${params.locale}/faqs` }]} />
      <Title title={site.nav.faqs} description={params.locale === 'zh' ? '每个问题都对应真实采购场景，并关联产品、文章和方案。' : 'Each question maps to a real buying scenario with related products, articles, and solutions.'} />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-10 md:grid-cols-3 md:px-6">{items.map((item) => <FAQCard key={item.slug} locale={params.locale} item={item} />)}</section>
    </PageShell>
  );
}

function Title({ title, description }: { title: string; description: string }) {
  return <section className="mx-auto max-w-7xl px-4 py-8 md:px-6"><h1 className="text-3xl font-bold text-industrial-navy">{title}</h1><p className="mt-3 max-w-3xl leading-7 text-slate-600">{description}</p></section>;
}
