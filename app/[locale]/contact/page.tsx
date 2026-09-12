import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import { contactPageSchema, organizationSchema } from '@/lib/schema';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/contact`, title: `${site.nav.contact} | ${site.name}`, description: params.locale === 'zh' ? '联系洪弟食品机械，获取家禽脱毛机、烫脱一体机和配套食品加工设备选型建议。' : 'Contact Hongdi Food Machinery for poultry dehairing, scalding-dehairing, and food processing equipment selection advice.', keywords: site.keywords });
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const isZh = params.locale === 'zh';
  const rows = [
    { label: isZh ? '品牌名称' : 'Brand', value: site.name },
    { label: isZh ? '电话 / 微信' : 'Phone / WeChat', value: site.phone, href: `tel:${site.phone}`, note: isZh ? '微信同号' : 'Same number on WeChat' },
    { label: isZh ? '邮箱' : 'Email', value: site.email, href: `mailto:${site.email}` },
    { label: isZh ? '地址' : 'Address', value: site.address },
    { label: isZh ? '服务范围' : 'Service Area', value: site.serviceArea },
    ...(site.douyinAccounts?.length ? [{ label: isZh ? '抖音账号' : 'Douyin', value: site.douyinAccounts.join('、') }] : []),
    ...(site.videoAccounts?.length ? [{ label: isZh ? '视频号' : 'WeChat Channels', value: site.videoAccounts.join('、') }] : [])
  ];
  const preparation = isZh
    ? ['主要加工鸡、鸭、鹅或其他禽类', '单只重量、日处理量与小时高峰量', '现场电压、热源、给排水条件', '可用场地尺寸、出入口与现场照片或视频', '已有工序、希望新增的设备与预算范围']
    : ['Poultry species and average unit weight', 'Daily volume and peak-hour throughput', 'Available voltage, heat source, water, and drainage', 'Site dimensions, access points, photos, or video', 'Existing process, equipment needed, and budget range'];
  const scope = isZh
    ? ['当前11款家禽脱毛、泡水浸烫与烫脱一体设备', '按禽种、处理量、场地和电力条件进行型号初选', '设备组合、安装衔接、清洗维护与常用配件咨询']
    : ['The current 11 poultry dehairing, scalding, and integrated machines', 'Initial model selection by species, throughput, site, and power supply', 'Equipment matching, installation interfaces, cleaning, maintenance, and common parts'];
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/contact`}>
      <SchemaJsonLd data={organizationSchema(params.locale)} />
      <SchemaJsonLd data={contactPageSchema(params.locale)} />
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.contact, href: `/${params.locale}/contact` }]} />
      <section className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.nav.contact}</h1>
        <p className="mt-3 leading-7 text-slate-600">{isZh ? '如需咨询设备选型、现场配置或定制方案，可通过电话、同号微信或邮箱联系。先提供真实工况，型号建议会更准确。' : 'For equipment selection, site configuration, or custom solutions, contact us by phone, WeChat, or email. Real operating details make the recommendation more accurate.'}</p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-industrial-navy">{isZh ? '联系方式' : 'Contact Details'}</h2>
          <address className="mt-4 rounded border border-slate-200 bg-white not-italic">
            <dl>
              {rows.map((row) => (
                <div key={row.label} className="grid border-b border-slate-200 last:border-0 md:grid-cols-[180px_1fr]">
                  <dt className="bg-slate-50 px-4 py-4 font-semibold text-industrial-navy">{row.label}</dt>
                  <dd className="px-4 py-4 text-slate-700">
                    {row.href ? <a href={row.href} className="font-bold text-industrial-blue underline decoration-industrial-blue/25 underline-offset-4">{row.value}</a> : row.value}
                    {row.note ? <span className="ml-2 text-slate-500">({row.note})</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </address>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-industrial-navy">{isZh ? '咨询前请准备' : 'Prepare Before Contacting'}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">{preparation.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="rounded border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-industrial-navy">{isZh ? '可咨询范围' : 'Consultation Scope'}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">{scope.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
