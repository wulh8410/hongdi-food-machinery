import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SolutionCard } from '@/components/Cards';
import { PageShell } from '@/components/PageShell';
import { getContentItems, getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/solutions`, title: `${site.nav.solutions} | ${site.name}`, description: params.locale === 'zh' ? '中小型屠宰档口、养殖场、食堂餐饮、水产门店和肉丸加工设备解决方案。' : 'Solutions for slaughter stalls, farms, canteens, restaurants, aquatic stores, and meatball processing.', keywords: site.keywords });
}

export default async function SolutionsPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const items = await getContentItems(params.locale, 'solutions');
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/solutions`}>
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.solutions, href: `/${params.locale}/solutions` }]} />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.nav.solutions}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{params.locale === 'zh' ? '按屠宰、养殖、餐饮、水产和丸类加工场景组织设备配置，让采购者快速匹配产能、流程和常见问题。' : 'Equipment configurations organized by slaughter, farm, catering, aquatic, and meatball processing scenarios.'}</p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-10 md:grid-cols-3 md:px-6">{items.map((item) => <SolutionCard key={item.slug} locale={params.locale} item={item} />)}</section>
    </PageShell>
  );
}
