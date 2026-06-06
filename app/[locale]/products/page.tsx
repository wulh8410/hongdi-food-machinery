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
  return (
    <PageShell locale={locale} path={`/${locale}/products`}>
      <Breadcrumb locale={locale} items={[{ label: site.nav.products, href: `/${locale}/products` }]} />
      <PageTitle title={site.nav.products} description={locale === 'zh' ? '按分类浏览家禽脱毛、烫脱一体、水产加工和肉类加工配套设备，查看适用场景、参数和采购 FAQ。' : 'Browse poultry dehairing, scalding-dehairing, aquatic processing, and meat processing equipment with applications, specifications, and buyer FAQ.'} />
      <section className="mx-auto max-w-7xl px-4 md:px-6"><CategoryFilter categories={categories} /></section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 md:grid-cols-3 lg:grid-cols-4 md:px-6">
        {products.map((item) => <ProductCard key={item.slug} locale={locale} item={item} />)}
      </section>
    </PageShell>
  );
}

function PageTitle({ title, description }: { title: string; description: string }) {
  return <section className="mx-auto max-w-7xl px-4 py-8 md:px-6"><h1 className="text-3xl font-bold text-industrial-navy">{title}</h1><p className="mt-3 max-w-3xl leading-7 text-slate-600">{description}</p></section>;
}
