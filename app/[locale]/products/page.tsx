import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ProductCard } from '@/components/Cards';
import { CategoryFilter } from '@/components/DetailBlocks';
import { PageShell } from '@/components/PageShell';
import { getCategories, getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

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
  return (
    <PageShell locale={locale} path={`/${locale}/products`}>
      <Breadcrumb locale={locale} items={[{ label: site.nav.products, href: `/${locale}/products` }]} />
      <section className="bg-[linear-gradient(135deg,#08233d,#123452)] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-6">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-industrial-orange">{isZh ? '产品中心' : 'Product Center'}</p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">{site.nav.products}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
              {isZh
                ? '集中展示洪弟食品机械当前主推设备，覆盖家禽脱毛、泡水浸烫、泡水脱毛一体和小禽类处理场景。每款产品都提供图片、参数、适用场景和搭配建议，便于采购前横向对比。'
                : 'Browse Hongdi Food Machinery equipment for poultry dehairing, scalding, integrated processing, and small bird processing with images, specifications, applications, and matching advice.'}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categoryCounts.map((category) => (
              <div key={category.slug} className="border border-white/15 bg-white/5 p-4">
                <p className="text-xl font-black text-white">{category.count}</p>
                <p className="mt-1 text-sm font-bold text-slate-200">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pt-8 md:px-6"><CategoryFilter categories={categoryCounts} /></section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-2 lg:grid-cols-3 md:px-6">
        {products.map((item) => <ProductCard key={item.slug} locale={locale} item={item} />)}
      </section>
    </PageShell>
  );
}
