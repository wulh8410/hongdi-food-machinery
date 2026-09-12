import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ProductCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getCategories, getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import { collectionPageSchema } from '@/lib/schema';
import type { ContentItem, Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({
    locale: params.locale,
    path: `/${params.locale}/products`,
    title: `${site.nav.products} | ${site.name}`,
    description: params.locale === 'zh' ? '当前在售的家禽脱毛机、泡水浸烫设备、烫脱一体机和食品加工前处理配套设备。' : 'Current poultry dehairing machines, scalding equipment, integrated scalding-dehairing machines, and food pre-processing support equipment.',
    keywords: site.keywords
  });
}

export default async function ProductsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const site = getSiteConfig(locale);
  const products = await getContentItems(locale, 'products');
  const categories = getCategories(locale);
  const isZh = locale === 'zh';
  const description = isZh
    ? '集中展示洪弟食品机械当前主推的11款家禽脱毛、泡水浸烫和烫脱一体设备，提供图片、参数、适用场景与配套建议。'
    : 'Browse 11 current poultry dehairing, scalding, and integrated machines from Hongdi Food Machinery with images, specifications, applications, and matching advice.';
  const categoryCounts = categories.map((category) => ({
    ...category,
    count: products.filter((product) => product.category === category.slug).length
  })).filter((category) => category.count > 0);
  const categoryPriority = ['scalding-dehairing', 'poultry-dehairing'];
  const orderedCategoryCounts = [...categoryCounts].sort((a, b) => {
    const aIndex = categoryPriority.indexOf(a.slug);
    const bIndex = categoryPriority.indexOf(b.slug);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
  const groupedProducts = orderedCategoryCounts.map((category) => ({
    ...category,
    items: products.filter((product) => product.category === category.slug)
  })).filter((group) => group.items.length);

  return (
    <PageShell locale={locale} path={`/${locale}/products`}>
      <SchemaJsonLd data={collectionPageSchema(locale, '/products', site.nav.products, description, products)} />
      <Breadcrumb locale={locale} items={[{ label: site.nav.products, href: `/${locale}/products` }]} />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.nav.products}</h1>
        <p className="mt-3 max-w-4xl leading-7 text-slate-600">
          {description}
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-4 md:px-6">
        <nav className="flex flex-wrap gap-2" aria-label={isZh ? '产品分类' : 'Product categories'}>
          {groupedProducts.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-industrial-navy hover:border-industrial-blue"
            >
              <span>{category.name}</span>
              <span className="text-xs text-slate-500">{category.items.length}</span>
            </a>
          ))}
        </nav>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {groupedProducts.map((group) => (
          <ProductGroup key={group.slug} locale={locale} id={group.slug} name={group.name} description={group.description} items={group.items} />
        ))}
      </div>
    </PageShell>
  );
}

function ProductGroup({
  locale,
  id,
  name,
  description,
  items
}: {
  locale: Locale;
  id: string;
  name: string;
  description: string;
  items: ContentItem[];
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[#08233d]/10 py-8 first:border-t-0 first:pt-0">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-industrial-navy">{name}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <p className="text-sm font-bold text-slate-500">{items.length} {locale === 'zh' ? '款设备' : 'models'}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => <ProductCard key={item.slug} locale={locale} item={item} />)}
      </div>
    </section>
  );
}
