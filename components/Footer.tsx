import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function Footer({ locale, site }: { locale: Locale; site: SiteConfig }) {
  const isZh = locale === 'zh';
  const tagline = isZh ? '专业食品机械设备制造' : 'Professional Food Machinery Manufacturing';
  const pages = [
    ['products', site.nav.products],
    ['solutions', site.nav.solutions],
    ['faqs', site.nav.faqs],
    ['articles', site.nav.articles],
    ['about', site.nav.about]
  ];
  const equipment = isZh
    ? ['家禽脱毛机', '鱼类脱鳞机', '鱼类采肉机', '烫脱一体机']
    : ['Poultry Plucker', 'Fish Scaler', 'Fish Meat Separator', 'Scalding-Dehairing Machine'];

  return (
    <footer className="border-t border-white/10 bg-[#08233d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[1.5fr_0.8fr_0.8fr] md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/35 bg-white shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
              <Image src={assetPath('/images/factory/hongdi-logo-icon.png')} alt={site.name} fill className="scale-[1.42] object-cover" sizes="56px" />
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
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200">{site.companyPositioning}</p>
          <div className="mt-4 grid gap-2 text-xs leading-6 text-slate-400">
            <p>{isZh ? '电话：' : 'Phone: '}{site.phone}</p>
            <p>{isZh ? '微信：' : 'WeChat: '}{site.wechat}</p>
            {site.douyinAccounts?.length ? <p>{isZh ? '抖音：' : 'Douyin: '}{site.douyinAccounts.join('、')}</p> : null}
            {site.videoAccounts?.length ? <p>{isZh ? '视频号：' : 'WeChat Channels: '}{site.videoAccounts.join('、')}</p> : null}
            <p>{site.address}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-white">{isZh ? '快速入口' : 'Quick Links'}</p>
          <div className="mt-4 grid grid-cols-3 gap-x-5 gap-y-2 text-sm text-slate-300 md:min-w-[260px]">
            {pages.map(([key, label]) => (
              <Link key={key} href={`/${locale}/${key}`} className="hover:text-industrial-orange">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-white">{isZh ? '主营设备' : 'Main Equipment'}</p>
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-slate-300 md:min-w-[220px]">
            {equipment.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {site.name}. {isZh ? '食品机械设备制造与选型服务。' : 'Food machinery manufacturing and equipment selection service.'}
      </div>
    </footer>
  );
}
