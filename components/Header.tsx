import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { assetPath } from '@/lib/asset';
import { LanguageSwitcher } from './LanguageSwitcher';

const navKeys = ['products', 'solutions', 'faqs', 'articles', 'about', 'contact'];

export function Header({ locale, site, path }: { locale: Locale; site: SiteConfig; path: string }) {
  const tagline = locale === 'zh' ? '专业食品机械设备制造' : 'Professional Food Machinery Manufacturing';

  return (
    <header className="sticky top-0 z-30 border-b border-[#d7e2e9] bg-[#f6fafc]/95 text-industrial-navy backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 py-3 md:px-8 lg:px-16">
        <Link href={`/${locale}`} className="flex shrink-0 items-center gap-4" aria-label={site.name}>
          <span className="relative block h-14 w-[260px] overflow-hidden border border-[#d8e1e7] bg-white shadow-soft sm:w-[280px]">
            <Image
              src={assetPath('/images/factory/hongdi-logo-header.png')}
              alt={site.name}
              fill
              className="object-contain px-3 py-1.5"
              sizes="280px"
              priority
            />
          </span>
          <span className="hidden border-l-4 border-industrial-orange pl-4 text-sm font-black text-[#29445a] lg:block">
            {tagline}
          </span>
        </Link>

        <nav className="flex min-w-0 items-center justify-end gap-1 overflow-x-auto whitespace-nowrap text-xs font-black text-[#193249] md:gap-2 md:text-sm">
          {navKeys.map((key) => (
            <Link key={key} href={`/${locale}/${key}`} className="px-2.5 py-2 hover:text-industrial-orange lg:px-3">
              {site.nav[key]}
            </Link>
          ))}
          <span className="ml-2 text-industrial-blue">
            <LanguageSwitcher locale={locale} path={path} />
          </span>
        </nav>
      </div>
    </header>
  );
}
