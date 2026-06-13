import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';
import { LanguageSwitcher } from './LanguageSwitcher';

const navKeys = ['products', 'solutions', 'faqs', 'articles', 'about', 'contact'];

export function Header({ locale, site, path }: { locale: Locale; site: SiteConfig; path: string }) {
  const tagline = locale === 'zh' ? '专业食品机械设备制造' : 'Professional Food Machinery Manufacturing';

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#08233d]/95 text-white backdrop-blur">
      <div className="flex w-full flex-nowrap items-center justify-between gap-3 px-3 py-2 md:px-6">
        <Link href={`/${locale}`} className="flex min-w-[250px] shrink-0 items-center gap-3 sm:min-w-[330px]" aria-label={site.name}>
          <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/35 bg-white shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
            <Image
              src={assetPath('/images/factory/hongdi-logo-icon.png')}
              alt={site.name}
              fill
              className="scale-[1.42] object-cover"
              sizes="48px"
              priority
            />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block text-lg font-black tracking-[0.03em] text-white sm:text-xl">{site.shortName}</span>
            <span className="mt-1.5 hidden items-center gap-2 text-[11px] font-black tracking-[0.12em] text-industrial-orange sm:flex">
              <span className="h-0.5 w-5 bg-industrial-orange" />
              {tagline}
              <span className="h-0.5 w-5 bg-industrial-orange" />
            </span>
          </span>
        </Link>
        <nav className="flex min-w-0 flex-nowrap items-center justify-end gap-1 overflow-x-auto whitespace-nowrap text-xs font-semibold text-white sm:text-sm">
          {navKeys.map((key) => (
            <Link key={key} href={`/${locale}/${key}`} className="px-2.5 py-2 hover:bg-white/10 lg:px-3">
              {site.nav[key]}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} path={path} />
        </nav>
      </div>
    </header>
  );
}
