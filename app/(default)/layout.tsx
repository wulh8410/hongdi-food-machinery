import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hd.hong1234.com'),
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://hd.hong1234.com/zh/' }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function DefaultLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
      <Script
        src="https://geo.hong1234.com/script.js"
        data-website-id="c5ab8bd1-54f3-4c78-a59e-c3e9acd83650"
        strategy="afterInteractive"
      />
    </html>
  );
}
