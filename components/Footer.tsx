import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function Footer({ locale, site }: { locale: Locale; site: SiteConfig }) {
  const isZh = locale === 'zh';
  const joiner = isZh ? ' / ' : ', ';
  const pages = [
    ['products', site.nav.products],
    ['solutions', site.nav.solutions],
    ['faqs', site.nav.faqs],
    ['articles', site.nav.articles],
    ['about', site.nav.about],
    ['contact', site.nav.contact]
  ];
  const equipment = isZh
    ? ['家禽脱毛机', '鱼类脱鳞机', '鱼类采肉机', '烫脱一体机']
    : ['Poultry Plucker', 'Fish Scaler', 'Fish Meat Separator', 'Scalding-Dehairing Machine'];

  return (
    <footer className="border-t border-white/10 bg-[#08233d] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <Image
              src={assetPath('/images/factory/hongdi-logo-header.png')}
              alt={site.name}
              width={320}
              height={74}
              className="h-16 w-[280px] border border-white/15 bg-white object-contain px-3 py-1.5"
            />
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-200">{site.companyPositioning}</p>
            <div className="mt-6 grid gap-3 text-xs text-slate-200 sm:grid-cols-2">
              <FooterInfo label={isZh ? '电话' : 'Phone'} value={`${site.phone}${isZh ? '（微信同号）' : ' (WeChat)'}`} strong />
              <FooterInfo label={isZh ? '地址' : 'Address'} value={site.address} />
              {site.douyinAccounts?.length ? <FooterInfo label={isZh ? '抖音' : 'Douyin'} value={site.douyinAccounts.join(joiner)} /> : null}
              {site.videoAccounts?.length ? <FooterInfo label={isZh ? '视频号' : 'WeChat Channels'} value={site.videoAccounts.join(joiner)} /> : null}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-white">{isZh ? '快速入口' : 'Quick Links'}</h3>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold text-slate-300">
              {pages.map(([key, label]) => (
                <Link key={key} href={`/${locale}/${key}`} className="hover:text-industrial-orange">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-white">{isZh ? '主营设备' : 'Main Equipment'}</h3>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold text-slate-300">
              {equipment.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {site.name}. {isZh ? '食品机械设备制造与选型服务。' : 'Food machinery manufacturing and equipment selection service.'}
      </div>
    </footer>
  );
}

function FooterInfo({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="block text-slate-500">{label}</span>
      <span className={`mt-1 block leading-5 text-slate-100 ${strong ? 'font-semibold' : ''}`}>{value}</span>
    </div>
  );
}
