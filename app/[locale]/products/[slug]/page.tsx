import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ContactBlock, FAQBlock, RelatedLinks, Section, SpecTable } from '@/components/DetailBlocks';
import { PageShell } from '@/components/PageShell';
import { ProductGallery } from '@/components/ProductGallery';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getContentItem, getContentItems, getContentSlugs, getSiteConfig } from '@/lib/content';
import { itemMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqPageSchema, productSchema } from '@/lib/schema';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return (['zh', 'en'] as Locale[]).flatMap((locale) => getContentSlugs(locale, 'products').map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Promise<Metadata> {
  const item = await getContentItem(params.locale, 'products', params.slug).catch(() => null);
  if (!item) return {};
  return itemMetadata(params.locale, 'products', item);
}

export default async function ProductDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const { locale, slug } = params;
  const product = await getContentItem(locale, 'products', slug).catch(() => null);
  if (!product) notFound();
  const site = getSiteConfig(locale);
  const [products, articles] = await Promise.all([getContentItems(locale, 'products'), getContentItems(locale, 'articles')]);
  const crumbs = [{ name: site.nav.products, path: '/products' }, { name: product.title, path: `/products/${product.slug}` }];
  const inquiryChecklist = locale === 'zh'
    ? ['加工物料与单只重量', '单日处理量与高峰处理量', '现场电压、水源和排水条件', '是否需要泡水、脱毛、清洗等配套']
    : ['Material type and single-piece weight', 'Daily and peak processing capacity', 'Voltage, water supply, and drainage', 'Scalding, dehairing, and cleaning support needs'];
  const factorySupport = locale === 'zh'
    ? ['按场地尺寸确认设备摆放', '按产量匹配单机或配套组合', '支持发货前沟通与到货使用建议']
    : ['Layout advice based on site size', 'Single-machine or matched equipment configuration', 'Pre-delivery communication and use guidance'];
  return (
    <PageShell locale={locale} path={`/${locale}/products/${slug}`}>
      <SchemaJsonLd data={productSchema(locale, product)} />
      <SchemaJsonLd data={breadcrumbSchema(locale, crumbs)} />
      {product.faqs?.length ? <SchemaJsonLd data={faqPageSchema(product.faqs)} /> : null}
      <Breadcrumb locale={locale} items={[{ label: site.nav.products, href: `/${locale}/products` }, { label: product.title, href: `/${locale}/products/${slug}` }]} />
      <section className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ProductGallery images={product.images} title={product.title} locale={locale} />
        <div className="grid content-start gap-5">
          <h1 className="text-3xl font-bold text-industrial-navy">{product.title}</h1>
          <p className="text-lg leading-8 text-slate-700">{product.description}</p>
          <div className="rounded border-l-4 border-industrial-orange bg-orange-50 p-4 text-sm leading-6 text-slate-700">{product.geoSummary}</div>
          <div className="flex flex-wrap gap-2">{product.features?.map((feature) => <span key={feature} className="rounded bg-industrial-mist px-3 py-2 text-sm font-semibold text-industrial-navy">{feature}</span>)}</div>
          {product.specs ? (
            <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-industrial-navy">{locale === 'zh' ? '技术参数' : 'Specifications'}</h2>
              <div className="mt-3">
                <SpecTable specs={product.specs} locale={locale} />
              </div>
            </div>
          ) : null}
          {product.applications?.length ? (
            <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-industrial-navy">{locale === 'zh' ? '适用场景' : 'Applications'}</h2>
              <div className="mt-3 flex flex-wrap gap-2">{product.applications.map((item) => <span key={item} className="rounded bg-slate-100 px-3 py-2 text-sm text-slate-700">{item}</span>)}</div>
            </div>
          ) : null}
          <div className="rounded border border-industrial-orange/25 bg-orange-50 p-5">
            <h2 className="text-lg font-bold text-industrial-navy">{locale === 'zh' ? '咨询前建议提供' : 'Prepare Before Inquiry'}</h2>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
              {inquiryChecklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-industrial-navy">{locale === 'zh' ? '厂家支持' : 'Factory Support'}</h2>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
              {factorySupport.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <article className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
        <Section title={locale === 'zh' ? '详细介绍与解决的问题' : 'Details and Problems Solved'}><div className="content" dangerouslySetInnerHTML={{ __html: product.bodyHtml }} /></Section>
        <Section title="FAQ"><FAQBlock faqs={product.faqs} /></Section>
        <RelatedLinks locale={locale} title={locale === 'zh' ? '相关产品' : 'Related Products'} section="products" slugs={product.relatedProducts} items={products} />
        <RelatedLinks locale={locale} title={locale === 'zh' ? '相关文章' : 'Related Articles'} section="articles" slugs={product.relatedArticles} items={articles} />
      </article>
      <ContactBlock
        locale={locale}
        phone={site.phone}
        email={site.email}
        wechat={site.wechat}
        douyinAccounts={site.douyinAccounts}
        videoAccounts={site.videoAccounts}
      />
    </PageShell>
  );
}
