import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';

export function HeroSection({ locale }: { locale: Locale; site: SiteConfig }) {
  const isZh = locale === 'zh';
  const tags = isZh ? ['源头厂家', '稳定耐用', '支持配套', '售后无忧'] : ['Direct Factory', 'Stable & Durable', 'Configuration Support', 'Service Support'];
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
    <section className="relative overflow-hidden bg-[#061a31] text-white">
      <div className="relative min-h-[610px] md:min-h-[690px]">
        <Image
          src="/images/hero/hongdi-factory-showroom-hero.png"
          alt={isZh ? '洪弟机械食品厂门面与食品加工设备展示' : 'Hongdi Machinery factory and food processing equipment display'}
          fill
          className="object-cover object-[58%_center]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061a31]/92 via-[#061a31]/36 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061a31]/55 via-transparent to-[#061a31]/55" />
        <div className="absolute left-0 top-0 h-full w-[58%] bg-[radial-gradient(circle_at_25%_18%,rgba(30,114,184,0.38),transparent_38%)]" />

        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}
        />

        <div className="relative z-10 w-full px-0 pt-0">
          <div className="ml-0 max-w-[560px] border-l-4 border-industrial-orange bg-[#061a31]/58 px-5 py-4 shadow-2xl shadow-black/25 backdrop-blur-sm md:px-6 md:py-5">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-industrial-orange md:text-sm">
              <span className="h-2 w-7 bg-industrial-orange" />
              {isZh ? '洪弟机械食品厂' : 'Hongdi Machinery Food Factory'}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-4xl lg:text-5xl">
              {isZh ? '专注食品机械设备制造' : 'Food Machinery Equipment Manufacturing'}
              <span className="mt-1 block text-2xl text-slate-100 md:text-3xl lg:text-4xl">
                {isZh ? '一站式加工设备解决方案' : 'Integrated Processing Equipment Solutions'}
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-100">
              {isZh
                ? '围绕家禽脱毛、水产加工、肉类加工等生产场景，提供设备选型、产能配置和配套方案建议，帮助客户提升加工效率与现场稳定性。'
                : 'Equipment selection and configuration for poultry dehairing, aquatic processing, meat processing, and practical food production workflows.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white md:text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/${locale}/products`} className="bg-industrial-orange px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/25">
                {isZh ? '查看设备产品' : 'View Products'}
              </Link>
              <Link href={`/${locale}/solutions`} className="border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/15">
                {isZh ? '查看解决方案' : 'View Solutions'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[#062442]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-5 md:grid-cols-4 md:px-6">
          {metrics.map(([value, label]) => (
            <div key={label} className="border-l border-white/10 px-4 py-2 first:border-l-0">
              <p className="text-3xl font-black text-white md:text-4xl">{value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-300 md:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
