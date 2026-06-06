import Link from 'next/link';
import type { Locale } from '@/lib/types';

export function LanguageSwitcher({ locale, path }: { locale: Locale; path: string }) {
  const targetLocale = locale === 'zh' ? 'en' : 'zh';
  const cleanPath = path.replace(/^\/(zh|en)/, '');

  return (
    <Link
      href={`/${targetLocale}${cleanPath}`}
      className="rounded border border-industrial-blue/25 px-3 py-2 text-sm font-semibold text-industrial-blue"
    >
      {locale === 'zh' ? 'English' : '中文'}
    </Link>
  );
}
