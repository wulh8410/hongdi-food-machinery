import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BrandConsultation, RelatedLinks, Section } from '@/components/DetailBlocks';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getContentItem, getContentItems, getContentSlugs, getSiteConfig } from '@/lib/content';
import { itemMetadata } from '@/lib/seo';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return (['zh', 'en'] as Locale[]).flatMap((locale) => getContentSlugs(locale, 'articles').map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Promise<Metadata> {
  const item = await getContentItem(params.locale, 'articles', params.slug).catch(() => null);
  return item ? itemMetadata(params.locale, 'articles', item) : {};
}

export default async function ArticlePage({ params }: { params: { locale: Locale; slug: string } }) {
  const item = await getContentItem(params.locale, 'articles', params.slug).catch(() => null);
  if (!item) notFound();

  const site = getSiteConfig(params.locale);
  const [products, faqs] = await Promise.all([getContentItems(params.locale, 'products'), getContentItems(params.locale, 'faqs')]);
  const topic = item.relatedProducts?.some((slug) => slug === 'fish-scaling-machine' || slug === 'fish-meat-separator') ? 'aquatic' : 'poultry';

  return (
    <PageShell locale={params.locale} path={`/${params.locale}/articles/${params.slug}`}>
      <SchemaJsonLd data={articleSchema(params.locale, item)} />
      <SchemaJsonLd data={breadcrumbSchema(params.locale, [{ name: site.nav.articles, path: '/articles' }, { name: item.title, path: `/articles/${item.slug}` }])} />
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.articles, href: `/${params.locale}/articles` }, { label: item.title, href: `/${params.locale}/articles/${item.slug}` }]} />
      <article className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{item.title}</h1>
        <p className="mt-3 text-sm text-industrial-steel">{item.date} / {item.updated}</p>
        <p className="mt-4 text-lg leading-8 text-slate-700">{item.description}</p>
        <div className="content mt-8 rounded border border-slate-200 bg-white p-6" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
        <RelatedLinks locale={params.locale} title={params.locale === 'zh' ? '关联产品' : 'Related Products'} section="products" slugs={item.relatedProducts} items={products} />
        <RelatedLinks locale={params.locale} title={params.locale === 'zh' ? '关联 FAQ' : 'Related FAQ'} section="faqs" slugs={item.relatedFaqs} items={faqs} />
        <Section title={params.locale === 'zh' ? '推荐阅读' : 'Recommended Reading'}>
          <p className="text-sm text-slate-600">
            {params.locale === 'zh'
              ? '可继续浏览产品详情、FAQ 和解决方案页面，形成完整采购判断。'
              : 'Continue with product details, FAQ, and solution pages for complete buying context.'}
          </p>
        </Section>
        <BrandConsultation locale={params.locale} phone={site.phone} wechat={site.wechat} address={site.address} topic={topic} />
      </article>
    </PageShell>
  );
}
