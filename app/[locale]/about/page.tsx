import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageShell } from '@/components/PageShell';
import { SchemaJsonLd } from '@/components/SchemaJsonLd';
import { getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import { organizationSchema } from '@/lib/schema';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({ locale: params.locale, path: `/${params.locale}/about`, title: `${site.nav.about} | ${site.name}`, description: site.companyPositioning, keywords: site.keywords });
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const sections = params.locale === 'zh'
    ? ['公司简介', '工厂实力', '生产能力', '研发能力', '服务流程', '资质证书', '合作优势']
    : ['Company Introduction', 'Factory Strength', 'Production Capacity', 'R&D Capability', 'Service Process', 'Certificates', 'Cooperation Advantages'];
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/about`}>
      <SchemaJsonLd data={organizationSchema(params.locale)} />
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.about, href: `/${params.locale}/about` }]} />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.name}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{site.description}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section} className="rounded border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-industrial-navy">{section}</h2>
              <p className="mt-3 leading-7 text-slate-600">{params.locale === 'zh' ? '围绕食品加工企业的真实生产需求，提供设备选型、定制制造、安装调试和后续服务。' : 'We provide equipment selection, custom manufacturing, installation, commissioning, and support around real food production needs.'}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
