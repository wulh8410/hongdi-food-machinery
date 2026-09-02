import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BrandConsultation, FAQBlock, RelatedLinks, Section } from '@/components/DetailBlocks';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getContentItem, getContentItems, getContentSlugs, getSiteConfig, isCanonicalContent } from '@/lib/content';
import { itemMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqPageSchema, solutionSchema } from '@/lib/schema';
import type { Locale, SolutionCapacityOption, SolutionEquipmentRole } from '@/lib/types';

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
  const [products, articles, faqs] = await Promise.all([
    getContentItems(params.locale, 'products'),
    getContentItems(params.locale, 'articles'),
    getContentItems(params.locale, 'faqs')
  ]);
  const isZh = params.locale === 'zh';
  const productTitleMap = new Map(products.map((product) => [product.slug, product.title]));
  const topic = item.solutionCategory === '水产加工' ? 'aquatic' : 'poultry';
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/solutions/${params.slug}`}>
      <SchemaJsonLd data={breadcrumbSchema(params.locale, [{ name: site.nav.solutions, path: '/solutions' }, { name: item.title, path: `/solutions/${item.slug}` }])} />
      {isCanonicalContent(params.locale, 'solutions', item.slug) ? <SchemaJsonLd data={solutionSchema(params.locale, item)} /> : null}
      {isCanonicalContent(params.locale, 'solutions', item.slug) && item.faqs?.length ? <SchemaJsonLd data={faqPageSchema(item.faqs)} /> : null}
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.solutions, href: `/${params.locale}/solutions` }, { label: item.title, href: `/${params.locale}/solutions/${item.slug}` }]} />
      <article className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        {item.solutionCategory ? <p className="text-sm font-bold text-industrial-orange">{item.solutionCategory}</p> : null}
        <h1 className="text-3xl font-bold text-industrial-navy">{item.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">{item.description}</p>
        {item.decisionSummary ? (
          <div className="mt-7 border-l-4 border-industrial-orange bg-industrial-navy px-6 py-5 text-white">
            <p className="text-xs font-bold text-industrial-orange">{isZh ? '方案结论' : 'Recommendation'}</p>
            <p className="mt-2 text-lg font-semibold leading-8">{item.decisionSummary}</p>
          </div>
        ) : null}
        {item.suitableFor?.length ? <Section title={isZh ? '适用客户与生产场景' : 'Suitable Customers'}><List items={item.suitableFor} /></Section> : null}
        {item.painPoints?.length ? <Section title={isZh ? '客户痛点' : 'Customer Pain Points'}><List items={item.painPoints} /></Section> : null}
        {item.equipmentRoles?.length ? <Section title={isZh ? '推荐设备与分工' : 'Equipment Roles'}><EquipmentTable items={item.equipmentRoles} isZh={isZh} productTitleMap={productTitleMap} /></Section> : null}
        {item.process?.length ? <Section title={isZh ? '工艺流程' : 'Process Flow'}><ProcessList items={item.process} /></Section> : null}
        {item.capacityOptions?.length ? <Section title={isZh ? '分档配置建议' : 'Configuration Options'}><CapacityTable items={item.capacityOptions} isZh={isZh} /></Section> : null}
        {(item.siteRequirements?.length || item.configuration?.length) ? <Section title={isZh ? '现场条件与配置要求' : 'Site Requirements'}><List items={item.siteRequirements ?? item.configuration} /></Section> : null}
        {item.requiredInfo?.length ? <Section title={isZh ? '采购前需要提供的信息' : 'Information Required'}><List items={item.requiredInfo} /></Section> : null}
        {item.acceptancePoints?.length ? <Section title={isZh ? '安装调试与验收重点' : 'Commissioning and Acceptance'}><List items={item.acceptancePoints} /></Section> : null}
        {item.maintenanceTips?.length ? <Section title={isZh ? '清洗维护建议' : 'Cleaning and Maintenance'}><List items={item.maintenanceTips} /></Section> : null}
        <Section title={isZh ? '完整方案说明' : 'Solution Notes'}><div className="content" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} /></Section>
        {item.faqs?.length ? <Section title={isZh ? '方案常见问题' : 'Solution FAQ'}><FAQBlock faqs={item.faqs} /></Section> : null}
        {item.sourceNote ? <p className="mt-6 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-500">{item.sourceNote}</p> : null}
        <RelatedLinks locale={params.locale} title={isZh ? '相关产品' : 'Related Products'} section="products" slugs={item.relatedProducts ?? item.recommendedProducts} items={products} />
        <RelatedLinks locale={params.locale} title={isZh ? '延伸阅读' : 'Related Articles'} section="articles" slugs={item.relatedArticles} items={articles} />
        <RelatedLinks locale={params.locale} title={isZh ? '相关采购问答' : 'FAQ'} section="faqs" slugs={item.relatedFaqs} items={faqs} />
        <BrandConsultation
          locale={params.locale}
          phone={site.phone}
          wechat={site.wechat}
          address={site.address}
          douyinAccounts={site.douyinAccounts}
          videoAccounts={site.videoAccounts}
          topic={topic}
        />
      </article>
    </PageShell>
  );
}

function List({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return <ul className="grid gap-2 md:grid-cols-2">{items?.map((item) => <li key={item} className="rounded bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{item}</li>)}</ul>;
}

function ProcessList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return <ol className="grid gap-3 md:grid-cols-2">{items.map((item, index) => <li key={item} className="flex gap-3 border-b border-slate-200 pb-3"><span className="font-bold text-industrial-orange">{String(index + 1).padStart(2, '0')}</span><span className="text-sm font-semibold leading-6 text-slate-700">{item}</span></li>)}</ol>;
}

function EquipmentTable({ items, isZh, productTitleMap }: { items: SolutionEquipmentRole[]; isZh: boolean; productTitleMap: Map<string, string> }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-sm"><thead><tr className="bg-slate-100 text-left text-industrial-navy"><th className="px-4 py-3">{isZh ? '设备' : 'Equipment'}</th><th className="px-4 py-3">{isZh ? '流程作用' : 'Role'}</th><th className="px-4 py-3">{isZh ? '选型说明' : 'Selection'}</th></tr></thead><tbody>{items.map((item) => <tr key={`${item.product}-${item.role}`} className="border-b border-slate-200"><td className="px-4 py-3 font-bold text-industrial-navy">{productTitleMap.get(item.product) ?? item.product}</td><td className="px-4 py-3 text-slate-700">{item.role}</td><td className="px-4 py-3 text-slate-600">{item.selection}</td></tr>)}</tbody></table></div>;
}

function CapacityTable({ items, isZh }: { items: SolutionCapacityOption[]; isZh: boolean }) {
  return <div className="grid gap-4 lg:grid-cols-3">{items.map((item) => <div key={item.level} className="border border-slate-200 bg-slate-50 p-5"><h3 className="font-bold text-industrial-navy">{item.level}</h3><p className="mt-3 text-sm leading-6 text-slate-700"><strong>{isZh ? '适合：' : 'Suitable for: '}</strong>{item.suitableFor}</p><p className="mt-2 text-sm leading-6 text-slate-700"><strong>{isZh ? '配置：' : 'Configuration: '}</strong>{item.configuration}</p><p className="mt-2 text-xs leading-5 text-slate-500">{item.note}</p></div>)}</div>;
}
