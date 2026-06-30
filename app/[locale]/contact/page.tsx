import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageShell } from '@/components/PageShell';
import { getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/contact`, title: `${site.nav.contact} | ${site.name}`, description: params.locale === 'zh' ? '联系洪弟食品机械，获取家禽脱毛机、烫脱一体机和配套食品加工设备选型建议。' : 'Contact Hongdi Food Machinery for poultry dehairing, scalding-dehairing, and food processing equipment selection advice.', keywords: site.keywords });
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const rows = [
    [params.locale === 'zh' ? '公司名称' : 'Company', site.name],
    [params.locale === 'zh' ? '\u7535\u8bdd' : 'Phone', params.locale === 'zh' ? `${site.phone}\uff08\u5fae\u4fe1\u540c\u53f7\uff09` : `${site.phone} (same number on WeChat)`],
    [params.locale === 'zh' ? '抖音' : 'Douyin', site.douyinAccounts?.join('、') ?? ''],
    [params.locale === 'zh' ? '视频号' : 'WeChat Channels', site.videoAccounts?.join('、') ?? ''],
    [params.locale === 'zh' ? '邮箱' : 'Email', site.email],
    [params.locale === 'zh' ? '地址' : 'Address', site.address],
    [params.locale === 'zh' ? '服务范围' : 'Service Area', site.serviceArea]
  ];
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/contact`}>
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.contact, href: `/${params.locale}/contact` }]} />
      <section className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.nav.contact}</h1>
        <p className="mt-3 leading-7 text-slate-600">{params.locale === 'zh' ? '如需咨询设备选型、现场配置或定制方案，可通过以下方式联系洪弟食品机械。' : 'For equipment selection, site configuration, or custom solutions, contact Hongdi Food Machinery below.'}</p>
        <div className="mt-8 rounded border border-slate-200 bg-white">
          {rows.map(([label, value]) => (
            <div key={label} className="grid border-b border-slate-200 last:border-0 md:grid-cols-[180px_1fr]">
              <div className="bg-slate-50 px-4 py-4 font-semibold text-industrial-navy">{label}</div>
              <div className="px-4 py-4 text-slate-700">{value}</div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
