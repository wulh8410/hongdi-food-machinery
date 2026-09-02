import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function Footer({ locale, site }: { locale: Locale; site: SiteConfig }) {
  const zh = locale === 'zh';
  const pages = [
    ['products', site.nav.products],
    ['solutions', site.nav.solutions],
    ['faqs', site.nav.faqs],
    ['articles', site.nav.articles],
    ['about', site.nav.about],
    ['contact', site.nav.contact]
  ];
  const equipment = zh
    ? ['家禽脱毛设备', '泡水浸烫设备', '烫脱一体设备', '食品加工前处理']
    : ['Poultry Dehairing', 'Scalding Equipment', 'Integrated Machines', 'Food Pre-processing'];

  return (
    <footer className="industrial-grid relative overflow-hidden border-t border-[#ff941f]/25 bg-[#031321] text-white">
      <div className="relative mx-auto max-w-[1460px] px-5 py-14 md:px-10 lg:px-14">
        <div className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[1.15fr_0.58fr_0.68fr_1.15fr]">
          <div>
            <div className="relative h-[92px] max-w-[350px] overflow-hidden border border-white/16 bg-white p-3 shadow-[0_20px_45px_rgba(0,0,0,0.2)]">
              <Image src={assetPath('/images/factory/hongdi-logo-header.png')} alt={site.name} fill className="object-contain p-3" sizes="350px" />
            </div>
            <p className="mt-6 max-w-xl text-sm font-semibold leading-7 text-slate-300">{site.companyPositioning}</p>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-xs font-black text-[#f1c38a]">
              <span>{zh ? '源头厂家' : 'Direct Factory'}</span>
              <span>{zh ? '20年经验' : '20 Years'}</span>
              <span>{zh ? '支持定制' : 'Custom Support'}</span>
            </div>
          </div>

          <FooterGroup title={zh ? '快速导航' : 'Quick Links'}>
            {pages.map(([key, label]) => (
              <Link key={key} href={`/${locale}/${key}`} className="transition hover:text-[#ff941f]">{label}</Link>
            ))}
          </FooterGroup>

          <FooterGroup title={zh ? '主要设备' : 'Equipment'}>
            {equipment.map((item) => <span key={item}>{item}</span>)}
          </FooterGroup>

          <div>
            <p className="text-sm font-black tracking-[0.12em] text-white">{zh ? '联系方式' : 'Contact'}</p>
            <span className="mt-3 block h-0.5 w-10 bg-[#ff941f]" />
            <div className="mt-5 space-y-3 text-xs font-semibold leading-6 text-slate-300">
              <FooterContact label={zh ? '电话' : 'Phone'} value={`${site.phone}${zh ? '（微信同号）' : ' (WeChat)'}`} />
              {site.douyinAccounts?.length ? <FooterContact label={zh ? '抖音' : 'Douyin'} value={site.douyinAccounts.join(' / ')} /> : null}
              {site.videoAccounts?.length ? <FooterContact label={zh ? '视频号' : 'Channels'} value={site.videoAccounts.join(' / ')} /> : null}
              <FooterContact label={zh ? '地址' : 'Address'} value={site.address} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {zh ? '食品机械设备制造与选型服务。' : 'Food machinery manufacturing and equipment selection service.'}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={`/${locale}/privacy`} className="transition hover:text-[#ff941f]">{zh ? '隐私政策' : 'Privacy Policy'}</Link>
            <Link href={`/${locale}/terms`} className="transition hover:text-[#ff941f]">{zh ? '使用条款' : 'Terms of Use'}</Link>
            <span className="tracking-[0.14em] text-slate-600">HONGDI FOOD MACHINERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-sm font-black tracking-[0.12em] text-white">{title}</p>
      <span className="mt-3 block h-0.5 w-10 bg-[#ff941f]" />
      <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-300">{children}</div>
    </div>
  );
}

function FooterContact({ label, value }: { label: string; value: string }) {
  const isPhone = /^\d{11}/.test(value);
  return (
    <div className="grid grid-cols-[3.5rem_1fr] gap-3 border-b border-white/8 pb-3 last:border-b-0">
      <span className="font-black text-[#dca35f]">{label}</span>
      {isPhone ? <a href={`tel:${value.slice(0, 11)}`} className="transition hover:text-[#ffb25e]">{value}</a> : <span>{value}</span>}
    </div>
  );
}
