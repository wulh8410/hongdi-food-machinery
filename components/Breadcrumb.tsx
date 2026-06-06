import Link from 'next/link';
import type { Locale } from '@/lib/types';

export function Breadcrumb({ locale, items }: { locale: Locale; items: { label: string; href: string }[] }) {
  return (
    <nav className="mx-auto max-w-7xl px-4 pt-6 text-sm text-slate-500 md:px-6" aria-label="Breadcrumb">
      <Link href={`/${locale}`} className="hover:text-industrial-blue">
        {locale === 'zh' ? '首页' : 'Home'}
      </Link>
      {items.map((item) => (
        <span key={item.href}>
          <span className="px-2">/</span>
          <Link href={item.href} className="hover:text-industrial-blue">
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
