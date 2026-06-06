import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default function LocaleLayout({ children }: { children: React.ReactNode; params: { locale: Locale } }) {
  return children;
}
