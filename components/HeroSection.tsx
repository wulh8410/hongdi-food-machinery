import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function HeroSection({ locale }: { locale: Locale; site: SiteConfig }) {
  const isZh = locale === 'zh';
  const proofPoints = isZh ? ['源头工厂', '稳定耐用', '支持配套', '售后配件'] : ['Direct Factory', 'Stable Build', 'Configured Support', 'Parts Support'];
  const metrics = isZh
    ? [
        ['20+', '行业生产经验'],
        ['30+', '设备方案品类'],
        ['5000㎡', '现代化生产基地'],
        ['全国', '客户服务范围']
      ]
    : [
        ['20+', 'Years Experience'],
        ['30+', 'Equipment Options'],
        ['5000㎡', 'Production Base'],
        ['China', 'Service Coverage']
      ];

  return (
    <section className="bg-[#e8f0f5] px-4 pt-6 md:px-6 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[600px] overflow-hidden border border-[#08233d]/10 bg-[#08233d] shadow-soft lg:min-h-[640px]">
          <Image
            src={assetPath('/images/hero/hongdi-factory-showroom-hero.png')}
            alt={isZh ? '洪弟机械食品厂门面与食品加工设备展示' : 'Hongdi Machinery factory and food processing equipment display'}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,35,61,0.94)_0%,rgba(8,35,61,0.8)_40%,rgba(8,35,61,0.28)_72%,rgba(8,35,61,0.08)_100%)]" />
          <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:92px_92px]" />
          <div className="relative z-10 max-w-2xl px-6 py-14 md:px-12 lg:px-14 lg:py-20">
            <p className="flex items-center gap-3 text-sm font-black tracking-[0.08em] text-industrial-orange before:h-1 before:w-8 before:bg-industrial-orange">
              {isZh ? '洪弟机械食品厂' : 'Hongdi Machinery Food Factory'}
            </p>
            <h1 className="mt-6 text-4xl font-black leading-[1.08] text-white md:text-6xl lg:text-7xl">
              {isZh ? '食品加工设备制造与选型服务' : 'Food Processing Equipment Manufacturing'}
            </h1>
            <p className="mt-6 text-xl font-black text-industrial-orange md:text-2xl">
              {isZh ? '家禽脱毛 · 水产加工 · 肉类前处理 · 配套交付' : 'Poultry · Aquatic · Meat Prep · Configured Delivery'}
            </p>
            <p className="mt-7 max-w-xl text-base font-semibold leading-8 text-slate-200 md:text-lg">
              {isZh
                ? '围绕真实加工场景，提供设备选型、产能配置、安装调试和后续配件支持，帮助屠宰档口、养殖场、食堂与食品加工客户更稳定地完成生产配置。'
                : 'Equipment selection, capacity configuration, commissioning, and parts support for practical food processing scenarios.'}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {proofPoints.map((item) => (
                <div key={item} className="border border-white/15 border-l-4 border-l-industrial-orange bg-white/10 px-3 py-3 text-sm font-black text-white">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${locale}/products`} className="bg-industrial-orange px-7 py-4 text-sm font-black text-white shadow-soft">
                {isZh ? '查看核心设备' : 'View Equipment'}
              </Link>
              <Link href={`/${locale}/solutions`} className="border border-white/40 px-7 py-4 text-sm font-black text-white hover:bg-white/10">
                {isZh ? '获取选型建议' : 'Get Selection Advice'}
              </Link>
            </div>
          </div>
        </div>
        <div className="grid border border-t-0 border-white/10 bg-[#123452] text-white md:grid-cols-4">
          {metrics.map(([value, label], index) => (
            <div key={label} className={`px-8 py-7 ${index ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}>
              <p className="text-4xl font-black text-industrial-orange">{value}</p>
              <p className="mt-2 text-sm font-bold text-white">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
