import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function Footer({ locale, site }: { locale: Locale; site: SiteConfig }) {
  const isZh = locale === 'zh';
  const tagline = isZh ? '专业食品机械设备制造' : 'Professional Food Machinery Manufacturing';
  const joiner = isZh ? '、' : ', ';
  const pages = [
    ['products', site.nav.products],
    ['solutions', site.nav.solutions],
    ['faqs', site.nav.faqs],
    ['articles', site.nav.articles],
    ['about', site.nav.about]
  ];
  const equipment = isZh
    ? ['不锈钢脱毛机', '泡水浸烫机', '烫脱一体机', '鸡鸭鹅处理设备']
    : ['Stainless Pluckers', 'Scalding Tanks', 'Scalding-Dehairing Machines', 'Poultry Processing Equipment'];

  return (
    <footer className="border-t border-white/10 bg-[#08233d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative block h-14 w-14 shrink-0 overflow-hidden bg-white">
                <Image src={assetPath('/images/factory/hongdi-logo-icon.png')} alt={site.name} fill className="object-contain p-1.5" sizes="56px" />
              </span>
              <span className="leading-none">
                <span className="block text-xl font-black tracking-[0.03em] text-white md:text-2xl">{site.name}</span>
                <span className="mt-2 flex items-center gap-2 text-xs font-black tracking-[0.12em] text-industrial-orange">
                  <span className="h-0.5 w-5 bg-industrial-orange" />
                  {tagline}
                  <span className="h-0.5 w-5 bg-industrial-orange" />
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200">{site.companyPositioning}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:justify-self-end lg:gap-16">
            <div>
              <p className="text-sm font-black text-white">{isZh ? '快速入口' : 'Quick Links'}</p>
              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-300">
                {pages.map(([key, label]) => (
                  <Link key={key} href={`/${locale}/${key}`} className="hover:text-industrial-orange">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-black text-white">{isZh ? '主营设备' : 'Main Equipment'}</p>
              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-300">
                {equipment.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-xs text-slate-300 sm:grid-cols-2 lg:grid-cols-[1fr_1.25fr_1.25fr_1.6fr]">
          <FooterInfo label={isZh ? '电话' : 'Phone'} value={`${site.phone}${isZh ? '（微信同号）' : ' (WeChat)'}`} strong />
          {site.douyinAccounts?.length ? <FooterInfo label={isZh ? '抖音' : 'Douyin'} value={site.douyinAccounts.join(joiner)} /> : null}
          {site.videoAccounts?.length ? <FooterInfo label={isZh ? '视频号' : 'WeChat Channels'} value={site.videoAccounts.join(joiner)} /> : null}
          <FooterInfo label={isZh ? '地址' : 'Address'} value={site.address} className="sm:col-span-2 lg:col-span-1" />
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {site.name}. {isZh ? '食品机械设备制造与选型服务。' : 'Food machinery manufacturing and equipment selection service.'}
      </div>
    </footer>
  );
}

function FooterInfo({ label, value, strong = false, className = '' }: { label: string; value: string; strong?: boolean; className?: string }) {
  return (
    <div className={`rounded border border-white/10 bg-white/[0.03] px-4 py-3 ${className}`}>
      <span className="block text-slate-500">{label}</span>
      <span className={`mt-1 block leading-5 text-slate-100 ${strong ? 'font-semibold' : ''}`}>{value}</span>
    </div>
  );
}
