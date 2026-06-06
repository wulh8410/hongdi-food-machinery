import Image from 'next/image';
import Link from 'next/link';
import type { Locale, SiteConfig } from '@/lib/types';
import { LanguageSwitcher } from './LanguageSwitcher';

const navKeys = ['products', 'solutions', 'faqs', 'articles', 'about', 'contact'];

export function Header({ locale, site, path }: { locale: Locale; site: SiteConfig; path: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex w-full flex-nowrap items-center justify-between gap-3 py-2 pl-0 pr-3 md:pr-6">
        <Link href={`/${locale}`} className="relative block h-11 w-[190px] shrink-0 sm:w-[230px] lg:w-[270px]" aria-label={site.name}>
          <Image
            src="/images/factory/hongdi-logo-header.png"
            alt={site.name}
            fill
            className="object-contain object-left"
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
            priority
          />
        </Link>
        <nav className="flex min-w-0 flex-nowrap items-center justify-end gap-1 overflow-x-auto whitespace-nowrap text-xs font-semibold text-slate-700 sm:text-sm">
          {navKeys.map((key) => (
            <Link key={key} href={`/${locale}/${key}`} className="rounded px-2.5 py-2 hover:bg-industrial-mist lg:px-3">
              {site.nav[key]}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} path={path} />
        </nav>
      </div>
    </header>
  );
}
