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
    path: `/${params.locale}/privacy`,
    title: `${params.locale === 'zh' ? '隐私政策' : 'Privacy Policy'} | ${site.name}`,
    description: params.locale === 'zh'
      ? '了解洪弟食品机械官网如何处理咨询信息、访问日志及第三方服务。'
      : 'Learn how the Hongdi Food Machinery website handles enquiry information, access logs, and third-party services.'
  });
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteConfig(params.locale);
  const zh = params.locale === 'zh';
  const title = zh ? '隐私政策' : 'Privacy Policy';
  const sections = zh
    ? [
        ['我们收集哪些信息', '本网站目前不提供在线下单或在线表单。只有当您主动通过电话、微信、邮箱、抖音或视频号联系我们时，我们才会收到您提供的姓名、联系方式、设备需求、场地条件等咨询信息。托管平台可能为保障网站安全和稳定运行而处理基础访问日志。'],
        ['信息如何使用', '咨询信息仅用于回复设备问题、提供选型与配置建议、安排生产交付沟通和后续服务，不会用于与上述目的无关的用途。'],
        ['第三方服务', '网站由第三方托管平台提供访问服务；您通过微信、抖音、视频号或邮箱联系我们时，相应平台会按照其自身隐私规则处理信息。请在使用前查看对应平台的隐私说明。'],
        ['保存与保护', '我们会在完成咨询、订单沟通及必要售后服务所需的合理期限内保存相关信息，并采取合理措施防止未经授权的访问、泄露或滥用。'],
        ['您的选择与权利', '您可以联系我们查询、更正或删除此前主动提供的咨询信息。法律法规或履行已确认交易要求保留的记录除外。'],
        ['联系我们', `如对本政策或个人信息处理有疑问，请拨打 ${site.phone}（微信同号）或发送邮件至 ${site.email}。`]
      ]
    : [
        ['Information We Receive', 'This website currently does not provide online ordering or online forms. We receive personal or business information only when you voluntarily contact us by phone, WeChat, email, Douyin, or WeChat Channels. The hosting provider may process basic access logs to keep the website secure and available.'],
        ['How Information Is Used', 'Enquiry information is used to answer equipment questions, provide selection or configuration guidance, coordinate production and delivery, and support after-sales service.'],
        ['Third-Party Services', 'The website is delivered through a third-party hosting provider. If you contact us through WeChat, Douyin, WeChat Channels, or email, those platforms process information under their own privacy terms.'],
        ['Retention and Protection', 'Information is retained only for a reasonable period needed for enquiries, confirmed order communication, and necessary after-sales support. Reasonable safeguards are used against unauthorized access or misuse.'],
        ['Your Choices', 'You may contact us to request access, correction, or deletion of information you previously provided, except where retention is required by law or a confirmed transaction.'],
        ['Contact', `For privacy questions, call ${site.phone} or email ${site.email}.`]
      ];

  return (
    <PageShell locale={params.locale} path={`/${params.locale}/privacy`}>
      <Breadcrumb locale={params.locale} items={[{ label: title, href: `/${params.locale}/privacy` }]} />
      <article className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <p className="text-sm font-black text-industrial-orange">{zh ? '网站信息说明' : 'WEBSITE INFORMATION'}</p>
        <h1 className="mt-2 text-3xl font-bold text-industrial-navy">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">{zh ? '更新日期：2026年9月3日' : 'Last updated: September 3, 2026'}</p>
        <p className="mt-5 leading-8 text-slate-700">
          {zh ? `本政策适用于 ${site.name} 官网，说明网站访问和设备咨询过程中可能涉及的信息处理方式。` : `This policy applies to the ${site.name} website and explains how information may be handled during website visits and equipment enquiries.`}
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
