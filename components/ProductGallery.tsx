"use client";

import { useState } from 'react';
import Image from 'next/image';
import { assetPath } from '@/lib/asset';
import type { Locale } from '@/lib/types';

export function ProductGallery({ images = [], title = '', locale = 'zh' }: { images?: string[]; title?: string; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const activeImage = images[activeIndex];
  const isZh = locale === 'zh';

  function showPrevious() {
    setActiveIndex((index) => Math.max(0, index - 1));
  }

  function showNext() {
    setActiveIndex((index) => Math.min(images.length - 1, index + 1));
  }

  function handlePointerUp(clientX: number) {
    if (dragStart === null) return;
    const distance = clientX - dragStart;
    if (Math.abs(distance) > 40) {
      if (distance < 0) showNext();
      else showPrevious();
    }
    setDragStart(null);
  }

  return (
    <div data-product-gallery className="rounded-sm border border-slate-200 bg-white p-2 shadow-[0_14px_30px_rgba(15,39,66,0.06)] md:p-3">
      {activeImage ? (
        <div
          className="select-none"
          onPointerDown={(event) => setDragStart(event.clientX)}
          onPointerUp={(event) => handlePointerUp(event.clientX)}
          onPointerCancel={() => setDragStart(null)}
        >
          <Image
            src={assetPath(activeImage)}
            alt={activeIndex === 0 ? title : `${title} 详情图`}
            width={1400}
            height={1050}
            priority={activeIndex === 0}
            className="block h-auto w-full rounded-sm object-contain"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-slate-200 to-slate-100" aria-label="Product image placeholder" />
      )}
      {images.length > 1 ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <p>{isZh ? '左右滑动查看产品图与详情图' : 'Swipe to view product and detail images'}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              disabled={activeIndex === 0}
              className="rounded-sm border border-slate-200 px-2 py-1 font-bold text-industrial-navy disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isZh ? '上一张' : 'Previous'}
            </button>
            <div className="flex gap-1" aria-label={isZh ? `第 ${activeIndex + 1} 张，共 ${images.length} 张` : `Image ${activeIndex + 1} of ${images.length}`}>
              {images.map((item, index) => (
                <button
                  key={`${item}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 w-6 rounded-full ${index === activeIndex ? 'bg-industrial-orange' : 'bg-slate-300'}`}
                  aria-label={isZh ? `查看第 ${index + 1} 张产品图` : `View product image ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={showNext}
              disabled={activeIndex === images.length - 1}
              className="rounded-sm border border-slate-200 px-2 py-1 font-bold text-industrial-navy disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isZh ? '下一张' : 'Next'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
