import type { Metadata, Viewport } from 'next';
import type { Locale } from '@/lib/types';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hd.hong1234.com')
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
  return (
    <html lang={params.locale === 'zh' ? 'zh-CN' : 'en'}>
      <body>{children}</body>
    </html>
  );
}
