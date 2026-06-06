import type { Locale } from '@/lib/types';
import { getSiteConfig } from '@/lib/content';
import { Header } from './Header';
import { Footer } from './Footer';

export function PageShell({ locale, path, children }: { locale: Locale; path: string; children: React.ReactNode }) {
  const site = getSiteConfig(locale);

  return (
    <>
      <Header locale={locale} site={site} path={path} />
      <main>{children}</main>
      <Footer locale={locale} site={site} />
    </>
  );
}
