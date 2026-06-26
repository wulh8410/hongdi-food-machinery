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
  const specEntries = item.specs ? Object.entries(item.specs).slice(0, 3) : [];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-[#08233d]/10 bg-white shadow-[0_14px_30px_rgba(15,39,66,0.06)]">
      <div className="border-b border-slate-100 bg-[#f4f8fb] p-3">
        {image ? (
          <Image
            src={assetPath(image)}
            alt={item.title}
            width={900}
            height={675}
            className="aspect-[4/3] w-full rounded-sm bg-white object-contain transition duration-300 group-hover:scale-[1.015]"
          />
        ) : (
          <div className="aspect-[4/3] rounded-sm bg-industrial-mist" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-black text-industrial-orange">{categoryLabel}</p>
        <h3 className="mt-2 text-lg font-black leading-snug text-industrial-navy">{item.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
        {specEntries.length ? (
          <dl className="mt-4 grid gap-2 border-y border-slate-100 py-3 text-xs">
            {specEntries.map(([key, value]) => (
              <div key={key} className="grid grid-cols-[5.5em_1fr] gap-2">
                <dt className="font-bold text-slate-500">{formatSpecKey(key, locale)}</dt>
                <dd className="line-clamp-1 font-semibold text-industrial-navy">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.applications?.slice(0, 3).map((app) => (
        <span key={app} className="rounded-sm bg-[#edf3f7] px-2 py-1 text-xs font-bold text-slate-600">
              {app}
            </span>
          ))}
        </div>
        <Link href={`/${locale}/products/${item.slug}`} className="mt-auto inline-block pt-5 text-sm font-black text-industrial-orange">
          {locale === 'zh' ? '查看详情 →' : 'View Details →'}
        </Link>
      </div>
    </article>
  );
}

function formatSpecKey(key: string, locale: Locale) {
  const labels: Record<string, { zh: string; en: string }> = {
    voltage: { zh: '电压', en: 'Voltage' },
    material: { zh: '材质', en: 'Material' },
    use: { zh: '用途', en: 'Use' },
    model: { zh: '型号', en: 'Model' },
    capacity: { zh: '产能', en: 'Capacity' },
    scale: { zh: '适合规模', en: 'Scale' },
    power: { zh: '功率', en: 'Power' },
    weight: { zh: '重量', en: 'Weight' },
    size: { zh: '尺寸', en: 'Size' }
  };
  return labels[key]?.[locale] ?? key;
}

export function ArticleCard({ locale, item }: { locale: Locale; item: ContentItem }) {
  return (
    <article className="h-full rounded-sm border border-[#08233d]/10 bg-white p-5 shadow-[0_14px_30px_rgba(15,39,66,0.06)]">
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
    <article className="h-full rounded-sm border border-[#08233d]/10 bg-white p-5 shadow-[0_14px_30px_rgba(15,39,66,0.06)]">
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
    <article className="flex h-full flex-col rounded-sm border border-[#08233d]/10 bg-white p-6 shadow-[0_14px_30px_rgba(15,39,66,0.06)]">
      <h3 className="text-xl font-black text-industrial-navy">{item.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{item.description}</p>
      <p className="mt-4 text-sm font-bold text-slate-700">{item.capacity}</p>
      <Link href={`/${locale}/solutions/${item.slug}`} className="mt-auto inline-block pt-6 text-sm font-black text-industrial-blue">
        {locale === 'zh' ? '查看方案 →' : 'View Solution →'}
      </Link>
    </article>
  );
}
