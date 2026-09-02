import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';
import { LanguageSwitcher } from './LanguageSwitcher';

const navKeys = ['products', 'solutions', 'faqs', 'articles', 'about', 'contact'] as const;

export function Header({ locale, site, path }: { locale: Locale; site: SiteConfig; path: string }) {
  const targetLocale = locale === 'zh' ? 'en' : 'zh';
  const cleanPath = path.replace(/^\/(zh|en)/, '');

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#041426] text-white shadow-[0_12px_32px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <Link href={`/${locale}`} className="relative flex min-w-0 shrink items-center gap-3 bg-white px-3 py-2 text-[#08233d] sm:min-w-[292px] sm:px-5" aria-label={site.name}>
          <span className="absolute -right-7 inset-y-0 hidden w-8 bg-white [clip-path:polygon(0_0,100%_0,34%_100%,0_100%)] sm:block" />
          <span className="relative h-11 w-11 shrink-0 overflow-hidden">
            <Image src={assetPath('/images/factory/hongdi-logo-icon.png')} alt={`${site.name} Logo`} fill priority className="object-contain" sizes="44px" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-black tracking-[0.02em] sm:text-xl">{site.shortName}</span>
            <span className="mt-1 hidden text-[10px] font-black tracking-[0.14em] text-[#d76f00] sm:block">
              {locale === 'zh' ? '专业食品机械设备制造' : 'PROFESSIONAL FOOD MACHINERY'}
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 whitespace-nowrap text-sm font-bold lg:flex">
          <Link href={`/${locale}`} className="border-b-2 border-[#ff941f] px-3 py-6 text-white">{site.nav.home}</Link>
          {navKeys.map((key) => (
            <Link key={key} href={`/${locale}/${key}`} className="border-b-2 border-transparent px-3 py-6 text-slate-200 transition hover:border-[#ff941f] hover:text-white xl:px-4">
              {site.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 border-l border-white/15 pl-5 xl:flex">
          <span>
            <span className="block text-[10px] font-bold tracking-[0.12em] text-slate-400">{locale === 'zh' ? '咨询电话' : 'CONTACT'}</span>
            <a href={`tel:${site.phone}`} className="mt-0.5 block text-base font-black text-white">{site.phone}</a>
          </span>
          <LanguageSwitcher locale={locale} path={path} />
        </div>

        <details className="group relative shrink-0 lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-white/30 text-white [&::-webkit-details-marker]:hidden" aria-label={locale === 'zh' ? '打开网站导航' : 'Open site navigation'}>
            <span className="grid w-5 gap-1.5" aria-hidden="true">
              <span className="h-0.5 bg-current" />
              <span className="h-0.5 bg-current" />
              <span className="h-0.5 bg-current" />
            </span>
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(19rem,calc(100vw-2rem))] border border-white/15 bg-[#071a2c] p-3 shadow-2xl">
            <nav className="grid" aria-label={locale === 'zh' ? '移动端导航' : 'Mobile navigation'}>
              <Link href={`/${locale}`} className="border-b border-white/10 px-4 py-3 text-sm font-bold text-white">{site.nav.home}</Link>
              {navKeys.map((key) => (
                <Link key={key} href={`/${locale}/${key}`} className="border-b border-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/5 hover:text-[#ffb25e]">
                  {site.nav[key]}
                </Link>
              ))}
              <a href={`tel:${site.phone}`} className="mt-2 px-4 py-3 text-sm font-black text-[#ffb25e]">
                {locale === 'zh' ? `电话咨询 ${site.phone}` : `Call ${site.phone}`}
              </a>
              <Link href={`/${targetLocale}${cleanPath}`} className="mx-4 mb-2 mt-1 border border-white/25 px-3 py-2 text-center text-xs font-black text-white">
                {locale === 'zh' ? 'English' : '中文'}
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
