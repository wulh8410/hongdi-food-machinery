import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { RelatedLinks, Section } from '@/components/DetailBlocks';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getContentItem, getContentItems, getContentSlugs, getSiteConfig } from '@/lib/content';
import { itemMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return (['zh', 'en'] as Locale[]).flatMap((locale) => getContentSlugs(locale, 'solutions').map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Promise<Metadata> {
  const item = await getContentItem(params.locale, 'solutions', params.slug).catch(() => null);
  return item ? itemMetadata(params.locale, 'solutions', item) : {};
}

export default async function SolutionDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const item = await getContentItem(params.locale, 'solutions', params.slug).catch(() => null);
  if (!item) notFound();
  const site = getSiteConfig(params.locale);
  const [products, faqs] = await Promise.all([getContentItems(params.locale, 'products'), getContentItems(params.locale, 'faqs')]);
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/solutions/${params.slug}`}>
      <SchemaJsonLd data={breadcrumbSchema(params.locale, [{ name: site.nav.solutions, path: '/solutions' }, { name: item.title, path: `/solutions/${item.slug}` }])} />
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.solutions, href: `/${params.locale}/solutions` }, { label: item.title, href: `/${params.locale}/solutions/${item.slug}` }]} />
      <article className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{item.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">{item.description}</p>
        <Section title={params.locale === 'zh' ? '客户痛点' : 'Customer Pain Points'}><List items={item.painPoints} /></Section>
        <Section title={params.locale === 'zh' ? '工艺流程' : 'Process Flow'}><List items={item.process} /></Section>
        <Section title={params.locale === 'zh' ? '配置建议' : 'Configuration Advice'}><List items={item.configuration} /></Section>
        <Section title={params.locale === 'zh' ? '适合产能' : 'Suitable Capacity'}><p className="text-slate-700">{item.capacity}</p></Section>
        <Section title={params.locale === 'zh' ? '方案说明' : 'Solution Notes'}><div className="content" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} /></Section>
        <RelatedLinks locale={params.locale} title={params.locale === 'zh' ? '相关产品' : 'Related Products'} section="products" slugs={item.relatedProducts ?? item.recommendedProducts} items={products} />
        <RelatedLinks locale={params.locale} title={params.locale === 'zh' ? '常见问题' : 'FAQ'} section="faqs" slugs={item.relatedFaqs} items={faqs} />
      </article>
    </PageShell>
  );
}

function List({ items }: { items?: string[] }) {
  return <ul className="grid gap-2 md:grid-cols-2">{items?.map((item) => <li key={item} className="rounded bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{item}</li>)}</ul>;
}
