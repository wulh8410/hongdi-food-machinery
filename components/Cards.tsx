import Link from 'next/link';
import Image from 'next/image';
import type { ContentItem, Locale } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function ProductCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  const image = item.images?.[0];
  const categoryLabels: Record<string, { zh: string; en: string }> = {
    'poultry-dehairing': { zh: '家禽脱毛设备', en: 'Poultry Dehairing' },
    'aquatic-processing': { zh: '水产加工设备', en: 'Aquatic Processing' },
    'scalding-dehairing': { zh: '泡水浸烫设备', en: 'Scalding Equipment' },
    'scalding-mixer': { zh: '泡水搅拌设备', en: 'Scalding Mixer' },
    'integrated-machine': { zh: '一体化设备', en: 'Integrated Equipment' }
  };
  const categoryKey = item.category ?? '';
  const categoryLabel = categoryLabels[categoryKey]?.[locale] ?? (locale === 'zh' ? '食品加工设备' : 'Food Processing Equipment');

  return (
    <article className="group overflow-hidden border border-slate-200 bg-white">
      {image ? (
        <Image src={assetPath(image)} alt={item.title} width={800} height={600} className="aspect-[4/3] w-full bg-industrial-mist object-cover transition duration-300 group-hover:scale-[1.02]" />
      ) : (
        <div className="aspect-[4/3] bg-industrial-mist" />
      )}
      <div className="min-h-[220px] p-5">
        <p className="text-xs font-black text-industrial-orange">{categoryLabel}</p>
        <h3 className="mt-2 text-lg font-black leading-snug text-industrial-navy">{item.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.applications?.slice(0, 3).map((app) => (
            <span key={app} className="bg-[#edf3f7] px-2 py-1 text-xs font-bold text-slate-600">
              {app}
            </span>
          ))}
        </div>
        <Link href={`/${locale}/products/${item.slug}`} className="mt-4 inline-block text-sm font-black text-industrial-orange">
          {locale === 'zh' ? '查看详情 →' : 'View Details →'}
        </Link>
      </div>
    </article>
  );
}

export function ArticleCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  return (
    <article className="border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold text-industrial-steel">{item.updated ?? item.date}</p>
      <h3 className="mt-3 line-clamp-2 text-lg font-black text-industrial-navy">{item.title}</h3>
      <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">{item.description}</p>
      <Link href={`/${locale}/articles/${item.slug}`} className="mt-4 inline-block text-sm font-black text-industrial-blue">
        {locale === 'zh' ? '阅读文章 →' : 'Read Article →'}
      </Link>
    </article>
  );
}

export function FAQCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  return (
    <article className="border border-slate-200 bg-white p-5">
      <h3 className="line-clamp-2 text-lg font-black text-industrial-navy">{item.title}</h3>
      <p className="mt-3 line-clamp-5 text-sm leading-6 text-slate-600">{item.description}</p>
      <Link href={`/${locale}/faqs/${item.slug}`} className="mt-4 inline-block text-sm font-black text-industrial-blue">
        {locale === 'zh' ? '查看答案 →' : 'View Answer →'}
      </Link>
    </article>
  );
}

export function SolutionCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  return (
    <article className="flex h-full flex-col border border-slate-200 bg-white p-6">
      {item.solutionCategory ? <p className="text-xs font-black text-industrial-orange">{item.solutionCategory}</p> : null}
      <h3 className={item.solutionCategory ? 'mt-3 text-xl font-black text-industrial-navy' : 'text-xl font-black text-industrial-navy'}>{item.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{item.description}</p>
      <p className="mt-4 text-sm font-bold text-slate-700">{item.capacity}</p>
      <Link href={`/${locale}/solutions/${item.slug}`} className="mt-auto inline-block pt-6 text-sm font-black text-industrial-blue">
        {locale === 'zh' ? '查看方案 →' : 'View Solution →'}
      </Link>
    </article>
  );
}
