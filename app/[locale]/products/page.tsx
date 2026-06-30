import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ProductCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { getCategories, getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { ContentItem, Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({
    locale: params.locale,
    path: `/${params.locale}/products`,
    title: `${site.nav.products} | ${site.name}`,
    description: params.locale === 'zh' ? '家禽脱毛机、烫脱一体机、畜禽脱毛设备、水产加工设备和肉类加工配套设备产品中心。' : 'Product center for poultry dehairing machines, scalding-dehairing equipment, aquatic processing equipment, and meat processing support machines.',
    keywords: site.keywords
  });
}

export default async function ProductsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const site = getSiteConfig(locale);
  const products = await getContentItems(locale, 'products');
  const categories = getCategories(locale);
  const isZh = locale === 'zh';
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
      <Breadcrumb locale={locale} items={[{ label: site.nav.products, href: `/${locale}/products` }]} />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.nav.products}</h1>
        <p className="mt-3 max-w-4xl leading-7 text-slate-600">
          {isZh
            ? '集中展示洪弟食品机械当前主推设备，覆盖家禽脱毛、泡水浸烫、泡水脱毛一体和小禽类处理。每款产品都提供清晰图片、核心参数、适用场景和配套建议，方便采购前对比。'
            : 'Browse Hongdi Food Machinery equipment for poultry dehairing, scalding, integrated processing, and small bird processing with images, specifications, applications, and matching advice.'}
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
