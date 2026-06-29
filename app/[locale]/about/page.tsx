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
  const sections =
    params.locale === 'zh'
      ? [
          {
            title: '公司简介',
            body: '洪弟食品机械专注家禽脱毛、水产加工和肉类加工配套设备，主要服务屠宰档口、养殖场、食堂餐厅、水产门店和食品加工厂。'
          },
          {
            title: '主营设备',
            body: '产品覆盖滚筒式家禽脱毛机、不锈钢脱毛机、泡水浸烫机、烫脱一体机、鸡鸭鹅处理设备和现场配套设备。'
          },
          {
            title: '生产能力',
            body: '围绕常用食品加工场景组织生产，可按禽类品种、单日处理量、场地尺寸、电压条件和前后工序调整设备配置。'
          },
          {
            title: '选型经验',
            body: '根据客户物料、产能和使用场景推荐合适型号，帮助减少买小不够用、买大浪费预算或配套不顺的问题。'
          },
          {
            title: '服务流程',
            body: '从需求沟通、型号建议、配置确认、生产发货到安装调试指导，尽量让客户在采购前就明确设备适配性。'
          },
          {
            title: '售后与配件',
            body: '提供设备使用指导、日常维护建议和易损件配件支持，方便客户后续更换胶棒、轴承、电机等常见部件。'
          },
          {
            title: '合作优势',
            body: '源头厂家直接沟通，设备方案更贴近实际加工场景，适合需要稳定耐用、维护方便和可持续配件支持的客户。'
          }
        ]
      : [
          {
            title: 'Company Profile',
            body: 'Hongdi Food Machinery focuses on poultry dehairing, aquatic processing, and meat processing support equipment for slaughter stalls, farms, restaurants, aquatic stores, and food processors.'
          },
          {
            title: 'Main Equipment',
            body: 'The product range includes roller poultry dehairing machines, stainless pluckers, scalding tanks, scalding-dehairing machines, poultry processing equipment, and site support equipment.'
          },
          {
            title: 'Production Capability',
            body: 'Equipment can be configured around material type, daily capacity, site dimensions, voltage conditions, and upstream or downstream process requirements.'
          },
          {
            title: 'Selection Experience',
            body: 'We recommend suitable models based on practical production needs, helping buyers avoid underpowered machines, unnecessary overspending, or mismatched equipment combinations.'
          },
          {
            title: 'Service Process',
            body: 'The workflow covers requirement review, model recommendation, configuration confirmation, production, delivery, and installation or commissioning guidance.'
          },
          {
            title: 'After-Sales Support',
            body: 'We provide operation guidance, maintenance advice, and spare-part support for common components such as rubber fingers, bearings, motors, and wearing parts.'
          },
          {
            title: 'Cooperation Advantages',
            body: 'Direct factory communication makes the solution more practical for real processing environments, especially where durability, easy maintenance, and long-term parts support matter.'
          }
        ];
  return (
    <PageShell locale={params.locale} path={`/${params.locale}/about`}>
      <SchemaJsonLd data={organizationSchema(params.locale)} />
      <Breadcrumb locale={params.locale} items={[{ label: site.nav.about, href: `/${params.locale}/about` }]} />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-industrial-navy">{site.name}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{site.description}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-industrial-navy">{section.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
