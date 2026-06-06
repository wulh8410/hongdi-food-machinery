import Link from 'next/link';
import Image from 'next/image';
import type { ContentItem, Locale } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function ProductCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  const image = item.images?.[0];
  return (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-soft">
      {image ? (
        <Image src={assetPath(image)} alt={item.title} width={800} height={600} className="aspect-[4/3] w-full rounded bg-industrial-mist object-cover" />
      ) : (
        <div className="aspect-[4/3] rounded bg-industrial-mist" />
      )}
      <h3 className="mt-4 text-lg font-bold text-industrial-navy">{item.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.applications?.slice(0, 3).map((app) => (
          <span key={app} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
            {app}
          </span>
        ))}
      </div>
      <Link href={`/${locale}/products/${item.slug}`} className="mt-4 inline-block text-sm font-bold text-industrial-blue">
        {locale === 'zh' ? '查看详情' : 'View Details'}
      </Link>
    </article>
  );
}

export function ArticleCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold text-industrial-steel">{item.updated ?? item.date}</p>
      <h3 className="mt-2 text-lg font-bold text-industrial-navy">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
      <Link href={`/${locale}/articles/${item.slug}`} className="mt-4 inline-block text-sm font-bold text-industrial-blue">
        {locale === 'zh' ? '阅读文章' : 'Read Article'}
      </Link>
    </article>
  );
}

export function FAQCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-bold text-industrial-navy">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
      <Link href={`/${locale}/faqs/${item.slug}`} className="mt-4 inline-block text-sm font-bold text-industrial-blue">
        {locale === 'zh' ? '查看答案' : 'View Answer'}
      </Link>
    </article>
  );
}

export function SolutionCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-lg font-bold text-industrial-navy">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
      <p className="mt-3 text-sm font-semibold text-industrial-orange">{item.capacity}</p>
      <Link href={`/${locale}/solutions/${item.slug}`} className="mt-4 inline-block text-sm font-bold text-industrial-blue">
        {locale === 'zh' ? '查看方案' : 'View Solution'}
      </Link>
    </article>
  );
}
