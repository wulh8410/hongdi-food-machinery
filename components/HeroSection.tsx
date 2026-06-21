import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function HeroSection({ locale }: { locale: Locale; site: SiteConfig }) {
  const isZh = locale === 'zh';
  const proofPoints = isZh ? ['源头厂家', '20年经验', '支持定制', '全国服务'] : ['Direct Factory', '20 Years', 'Customizable', 'China Service'];
  const systemPoints = isZh ? ['不锈钢结构', '按产能配置', '易清洗维护', '支持非标定制'] : ['Stainless Structure', 'Capacity Matching', 'Easy Cleaning', 'Custom Builds'];
  const metrics = isZh
    ? [
        ['20+', '行业生产经验'],
        ['30+', '设备方案品类'],
        ['5000+', '现代化生产基地'],
        ['全国', '客户服务范围']
      ]
    : [
        ['20+', 'Years Experience'],
        ['30+', 'Equipment Options'],
        ['5000+', 'Production Base'],
        ['China', 'Service Coverage']
      ];

  return (
    <section className="relative overflow-hidden bg-[#061725] text-white">
      <Image
        src={assetPath('/images/hero/hongdi-factory-equipment-banner.png')}
        alt={isZh ? '洪弟食品机械厂房与食品加工设备展示' : 'Hongdi Food Machinery factory and equipment display'}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,15,26,0.96)_0%,rgba(4,15,26,0.88)_34%,rgba(4,15,26,0.52)_58%,rgba(4,15,26,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,15,26,0.08)_0%,rgba(4,15,26,0.72)_100%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:120px_120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-16 md:px-8 md:pt-20 lg:px-16">
        <div className="grid min-h-[660px] gap-10 lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="flex items-center gap-3 text-sm font-black tracking-[0.08em] text-industrial-orange before:h-1 before:w-10 before:bg-industrial-orange">
              {isZh ? '洪弟食品机械' : 'Hongdi Food Machinery'}
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[1.03] tracking-[-0.01em] text-white md:text-7xl lg:text-[76px]">
              {isZh ? (
                <>
                  食品机械设备
                  <br />
                  源头制造商
                </>
              ) : (
                <>
                  Food Machinery
                  <br />
                  Direct Manufacturer
                </>
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-200 md:text-lg">
              {isZh
                ? '专注家禽脱毛、烫脱一体、水产加工设备与肉类加工配套机械，围绕真实生产场景提供设备选型、产能配置和定制方案。'
                : 'Poultry dehairing, scalding-dehairing, aquatic processing, and meat pre-processing equipment configured for real production scenarios.'}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {proofPoints.map((item) => (
                <span key={item} className="border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-black backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/products`} className="bg-industrial-orange px-7 py-4 text-sm font-black text-white shadow-soft">
                {isZh ? '查看设备产品' : 'View Equipment'}
              </Link>
              <Link href={`/${locale}/solutions`} className="border border-white/35 px-7 py-4 text-sm font-black text-white hover:bg-white/10">
                {isZh ? '查看解决方案' : 'View Solutions'}
              </Link>
            </div>
          </div>

          <aside className="self-end border border-white/15 bg-[#061929]/85 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur md:mb-20 lg:mt-60">
            <div className="flex justify-between px-6 pt-6 text-xs font-black uppercase tracking-[0.14em] text-white/65">
              <span>{isZh ? '设备系统' : 'Equipment System'}</span>
              <span>HONGDI</span>
            </div>
            <div className="px-6 py-5">
              <h2 className="text-3xl font-black leading-tight text-white">
                {isZh ? '家禽脱毛机、烫脱一体机、水产加工设备与前处理配套' : 'Poultry, scalding, aquatic, and pre-processing equipment'}
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-white/75">
                {isZh ? '适用于屠宰档口、养殖场、食堂、餐饮连锁、水产门店、食品加工厂等场景。' : 'For slaughter stalls, farms, canteens, restaurants, aquatic stores, and food processors.'}
              </p>
            </div>
            <div className="grid border-t border-white/15 sm:grid-cols-2">
              {systemPoints.map((item) => (
                <div key={item} className="border-t border-white/15 px-5 py-4 text-sm font-black text-white first:border-t-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(-n+2)]:border-t-0">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="grid border-y border-white/15 bg-[#04111d]/75 md:grid-cols-4">
          {metrics.map(([value, label], index) => (
            <div key={label} className={`px-7 py-7 ${index ? 'border-t border-white/15 md:border-l md:border-t-0' : ''}`}>
              <p className="text-4xl font-black leading-none text-white md:text-5xl">{value}</p>
              <p className="mt-2 text-sm font-black text-white/80">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
