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
            <Image src={assetPath('/images/factory/hongdi-logo-icon.png')} alt="" fill priority className="object-contain" sizes="44px" />
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

        <Link href={`/${targetLocale}${cleanPath}`} className="shrink-0 border border-white/30 px-3 py-2 text-xs font-black text-white lg:hidden">
          {locale === 'zh' ? 'English' : '中文'}
        </Link>
      </div>
    </header>
  );
}
