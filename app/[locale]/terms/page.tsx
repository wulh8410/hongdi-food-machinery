import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageShell } from '@/components/PageShell';
import { getSiteConfig } from '@/lib/content';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const site = getSiteConfig(params.locale);
  return localizedMetadata({
    locale: params.locale,
    path: `/${params.locale}/terms`,
    title: `${params.locale === 'zh' ? '使用条款' : 'Terms of Use'} | ${site.name}`,
    description: params.locale === 'zh'
      ? '洪弟食品机械官网内容、产品资料、咨询与使用规则说明。'
      : 'Terms governing website content, product information, enquiries, and use of the Hongdi Food Machinery website.'
  });
}

export default function TermsPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const zh = params.locale === 'zh';
  const title = zh ? '使用条款' : 'Terms of Use';
  const sections = zh
    ? [
        ['网站用途', '本网站用于介绍洪弟食品机械、设备产品、应用场景和选型知识，不构成在线交易平台，也不代替针对具体生产现场的技术确认。'],
        ['产品信息', '页面中的图片、参数、产能和适用说明用于帮助客户初步了解设备。不同物料、处理量、场地、电压和定制要求可能影响最终配置，实际订单以双方书面确认的型号、参数、价格和交付内容为准。'],
        ['合理使用', '您可以为了解产品和采购沟通正常浏览、分享本网站页面，不得通过破坏网站运行、批量复制冒用、虚假陈述或其他违法方式使用网站内容。'],
        ['知识产权', '网站中的品牌名称、Logo、原创文案、产品图片和页面设计受相应法律保护。未经许可，不得用于冒充厂家、误导客户或商业性复制。'],
        ['外部平台与链接', '网站可能提及或链接至第三方平台。第三方服务的可用性、内容和规则由对应平台负责，洪弟食品机械不控制其独立服务。'],
        ['信息更新', '我们会根据产品与服务变化更新网站内容。对于已经进入采购沟通或交易流程的事项，应以双方最新书面确认内容为准。'],
        ['联系我们', `如对网站内容或设备资料有疑问，请拨打 ${site.phone}（微信同号）或发送邮件至 ${site.email}。`]
      ]
    : [
        ['Website Purpose', 'This website introduces Hongdi Food Machinery, equipment products, applications, and selection knowledge. It is not an online transaction platform and does not replace technical confirmation for a specific production site.'],
        ['Product Information', 'Images, specifications, capacity statements, and application notes help buyers make an initial assessment. Material, throughput, site, voltage, and custom requirements may change the final configuration. Confirmed orders are governed by the latest written model, specification, price, and delivery agreement.'],
        ['Acceptable Use', 'You may browse and share pages for product research and purchasing communication. You may not disrupt the website, impersonate the manufacturer, make misleading claims, or commercially reproduce content without permission.'],
        ['Intellectual Property', 'Brand names, logos, original copy, product images, and page designs are protected by applicable rights. They may not be used to impersonate the factory or mislead customers.'],
        ['External Platforms and Links', 'The website may mention or link to third-party platforms. Their availability, content, and policies are controlled by the relevant platform.'],
        ['Updates', 'Website content may be updated as products and services change. Matters already in a purchasing or transaction process are governed by the latest written confirmation between the parties.'],
        ['Contact', `For questions about website or equipment information, call ${site.phone} or email ${site.email}.`]
      ];

  return (
    <PageShell locale={params.locale} path={`/${params.locale}/terms`}>
      <Breadcrumb locale={params.locale} items={[{ label: title, href: `/${params.locale}/terms` }]} />
      <article className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <p className="text-sm font-black text-industrial-orange">{zh ? '网站使用说明' : 'WEBSITE USE'}</p>
        <h1 className="mt-2 text-3xl font-bold text-industrial-navy">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">{zh ? '更新日期：2026年9月3日' : 'Last updated: September 3, 2026'}</p>
        <p className="mt-5 leading-8 text-slate-700">
          {zh ? `访问和使用 ${site.name} 官网，即表示您同意按照以下规则使用网站内容。` : `By accessing the ${site.name} website, you agree to use its content under the following terms.`}
        </p>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {sections.map(([heading, body]) => (
            <section key={heading} className="py-6">
              <h2 className="text-xl font-bold text-industrial-navy">{heading}</h2>
              <p className="mt-3 leading-8 text-slate-700">{body}</p>
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
