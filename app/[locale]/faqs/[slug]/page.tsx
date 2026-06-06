import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { RelatedLinks, Section } from '@/components/DetailBlocks';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getContentItem, getContentItems, getContentSlugs, getSiteConfig } from '@/lib/content';
import { itemMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return (['zh', 'en'] as Locale[]).flatMap((locale) => getContentSlugs(locale, 'faqs').map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Promise<Metadata> {
  const item = await getContentItem(params.locale, 'faqs', params.slug).catch(() => null);
  return item ? itemMetadata(params.locale, 'faqs', item) : {};
}

export default async function FAQDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const item = await getContentItem(params.locale, 'faqs', params.slug).catch(() => null);
  if (!item) notFound();
  const site = getSiteConfig(params.locale);
  const [products, articles, solutions] = await Promise.all([getContentItems(params.locale, 'products'), getContentItems(params.locale, 'articles'), getContentItems(params.locale, 'solutions')]);
  const q = item.question ?? item.title;
  const a = item.answer ?? item.description;
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/faqs/${params.slug}`}>
      <SchemaJsonLd data={faqPageSchema([{ question: q, answer: a }])} />
      <SchemaJsonLd data={breadcrumbSchema(params.locale, [{ name: site.nav.faqs, path: '/faqs' }, { name: item.title, path: `/faqs/${item.slug}` }])} />
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.faqs, href: `/${params.locale}/faqs` }, { label: item.title, href: `/${params.locale}/faqs/${item.slug}` }]} />
      <article className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{q}</h1>
        <Section title={params.locale === 'zh' ? '答案' : 'Answer'}><p className="leading-8 text-slate-700">{a}</p></Section>
        <Section title={params.locale === 'zh' ? '采购说明' : 'Buying Notes'}><div className="content" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} /></Section>
        <RelatedLinks locale={params.locale} title={params.locale === 'zh' ? '关联产品' : 'Related Products'} section="products" slugs={item.relatedProducts} items={products} />
        <RelatedLinks locale={params.locale} title={params.locale === 'zh' ? '关联文章' : 'Related Articles'} section="articles" slugs={item.relatedArticles} items={articles} />
        <RelatedLinks locale={params.locale} title={params.locale === 'zh' ? '推荐解决方案' : 'Recommended Solutions'} section="solutions" slugs={item.relatedSolutions} items={solutions} />
      </article>
    </PageShell>
  );
}
