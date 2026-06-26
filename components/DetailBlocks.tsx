import Link from 'next/link';
import Image from 'next/image';
import type { ContentItem, Locale } from '@/lib/types';
import { assetPath } from '@/lib/asset';

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-industrial-navy">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ProductGallery({ images = [], title = '' }: { images?: string[]; title?: string }) {
  const image = images[0];
  return (
    <div className="grid gap-3 rounded bg-white p-3 ring-1 ring-slate-200">
      {image ? (
        <Image src={assetPath(image)} alt={title} width={900} height={675} className="aspect-[4/3] w-full rounded bg-slate-50 object-contain" />
      ) : (
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-slate-200 to-slate-100" aria-label="Product image placeholder" />
      )}
      {images.length > 1 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {images.slice(1).map((item, index) => (
            <Image
              key={item}
              src={assetPath(item)}
              alt={`${title} ${index + 2}`}
              width={700}
              height={525}
              className="aspect-[4/3] w-full rounded border border-slate-100 bg-slate-50 object-contain"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SpecTable({ specs }: { specs?: Record<string, string> }) {
  if (!specs) return null;
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {Object.entries(specs).map(([key, value]) => (
          <tr key={key} className="border-b border-slate-200 last:border-0">
            <th className="w-1/3 bg-slate-50 px-3 py-3 text-left font-semibold text-slate-700">{key}</th>
            <td className="px-3 py-3 text-slate-600">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function FAQBlock({ faqs }: { faqs?: { question: string; answer: string }[] }) {
  if (!faqs?.length) return null;
  return (
    <div className="grid gap-4">
      {faqs.map((faq) => (
        <div key={faq.question} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
          <h3 className="font-bold text-industrial-navy">{faq.question}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

export function RelatedLinks({
  locale,
  title,
  section,
  slugs,
  items
}: {
  locale: Locale;
  title: string;
  section: 'products' | 'articles' | 'faqs' | 'solutions';
  slugs?: string[];
  items: ContentItem[];
}) {
  const related = items.filter((item) => slugs?.includes(item.slug));
  if (!related.length) return null;
  return (
    <Section title={title}>
      <div className="grid gap-3 md:grid-cols-2">
        {related.map((item) => (
          <Link key={item.slug} href={`/${locale}/${section}/${item.slug}`} className="rounded bg-slate-50 p-4 font-semibold text-industrial-blue">
            {item.title}
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function ContactBlock({
  locale,
  phone,
  email,
  wechat,
  douyinAccounts = [],
  videoAccounts = []
}: {
  locale: Locale;
  phone: string;
  email: string;
  wechat: string;
  douyinAccounts?: string[];
  videoAccounts?: string[];
}) {
  const isZh = locale === 'zh';

  return (
    <section className="mt-10 bg-industrial-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-[1.25fr_0.75fr] md:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-industrial-orange">
            {isZh ? '设备选型咨询' : 'Equipment Consultation'}
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            {isZh ? '需要家禽脱毛、水产加工或配套设备建议？' : 'Need advice for poultry or aquatic processing equipment?'}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-200 md:text-base">
            {isZh
              ? '提供加工物料、单日产量、现场电压、场地尺寸和前后工序信息，我们可以先给出适合的设备型号与配置建议。'
              : 'Share material type, daily capacity, voltage, site size, and process requirements for an initial equipment recommendation.'}
          </p>
        </div>
        <div className="grid gap-4 rounded border border-white/15 bg-white/5 p-5 text-sm shadow-sm">
          <div className="grid grid-cols-[4em_1fr] gap-3">
            <p className="text-slate-300">{isZh ? '电话' : 'Phone'}</p>
            <p className="font-bold">{isZh ? `${phone}\uff08\u5fae\u4fe1\u540c\u53f7\uff09` : `${phone} (same number on WeChat)`}</p>
          </div>
          <div className="grid grid-cols-[4em_1fr] gap-3">
            <p className="text-slate-300">{isZh ? '邮箱' : 'Email'}</p>
            <p className="font-bold">{email}</p>
          </div>
          {douyinAccounts.length ? (
            <div className="grid grid-cols-[4em_1fr] gap-3">
              <p className="text-slate-300">{isZh ? '抖音' : 'Douyin'}</p>
              <p className="font-bold">{douyinAccounts.join('、')}</p>
            </div>
          ) : null}
          {videoAccounts.length ? (
            <div className="grid grid-cols-[4em_1fr] gap-3">
              <p className="text-slate-300">{isZh ? '视频号' : 'WeChat Channels'}</p>
              <p className="font-bold">{videoAccounts.join('、')}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function BrandConsultation({
  locale,
  phone,
  wechat,
  address,
  douyinAccounts = [],
  videoAccounts = [],
  topic = 'poultry'
}: {
  locale: Locale;
  phone: string;
  wechat: string;
  address: string;
  douyinAccounts?: string[];
  videoAccounts?: string[];
  topic?: 'poultry' | 'aquatic';
}) {
  const isZh = locale === 'zh';
  const consultationText = topic === 'aquatic'
    ? '如果你正在判断鱼类脱鳞机、鱼类采肉机或水产加工配套设备，可以提供鱼种、单条重量、每日处理量、目标成品、场地、电压和给排水条件，由厂家结合实际工况给出初步建议。'
    : '如果你正在判断家禽脱毛机、泡水机、搅拌机或泡水脱毛一体机的型号配置，可以提供禽种、单日产量、场地尺寸、电压和现有工序，由厂家结合实际工况给出初步建议。';

  return (
    <section className="mt-8 rounded border border-industrial-blue/20 bg-slate-50 p-6">
      <p className="text-sm font-semibold text-industrial-orange">{isZh ? '厂家选型咨询' : 'Factory Consultation'}</p>
      <h2 className="mt-2 text-xl font-bold text-industrial-navy">
        {isZh ? '联系洪弟食品机械获取设备选型建议' : 'Contact Hongdi Food Machinery for equipment selection advice'}
      </h2>
      <p className="mt-3 leading-8 text-slate-700">
        {isZh
          ? consultationText
          : 'Share material type, daily capacity, site size, voltage, and process requirements for an initial equipment recommendation.'}
      </p>
      <div className="mt-5 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
        <div className="rounded bg-white p-4 ring-1 ring-slate-200">
          <p className="text-slate-500">{isZh ? '电话' : 'Phone'}</p>
          <p className="mt-1 font-bold text-industrial-navy">{isZh ? `${phone}\uff08\u5fae\u4fe1\u540c\u53f7\uff09` : `${phone} (same number on WeChat)`}</p>
        </div>
        <div className="rounded bg-white p-4 ring-1 ring-slate-200">
          <p className="text-slate-500">{isZh ? '地址' : 'Address'}</p>
          <p className="mt-1 font-bold text-industrial-navy">{address}</p>
        </div>
        {douyinAccounts.length ? (
          <div className="rounded bg-white p-4 ring-1 ring-slate-200">
            <p className="text-slate-500">{isZh ? '抖音' : 'Douyin'}</p>
            <p className="mt-1 font-bold text-industrial-navy">{douyinAccounts.join('、')}</p>
          </div>
        ) : null}
        {videoAccounts.length ? (
          <div className="rounded bg-white p-4 ring-1 ring-slate-200">
            <p className="text-slate-500">{isZh ? '视频号' : 'WeChat Channels'}</p>
            <p className="mt-1 font-bold text-industrial-navy">{videoAccounts.join('、')}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function CategoryFilter({ categories }: { categories: { slug: string; name: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <span key={category.slug} className="rounded border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
          {category.name}
        </span>
      ))}
    </div>
  );
}
