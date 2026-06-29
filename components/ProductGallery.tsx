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
  const hasMultipleImages = images.length > 1;

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
          className="relative select-none overflow-hidden rounded-sm"
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
            draggable={false}
          />
          {hasMultipleImages ? (
            <>
              <button
                type="button"
                onClick={showPrevious}
                disabled={activeIndex === 0}
                aria-label={isZh ? '查看上一张图片' : 'View previous image'}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-industrial-navy/75 text-2xl font-bold text-white shadow-lg backdrop-blur transition hover:bg-industrial-orange disabled:cursor-not-allowed disabled:opacity-35"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={showNext}
                disabled={activeIndex === images.length - 1}
                aria-label={isZh ? '查看下一张图片' : 'View next image'}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-industrial-navy/75 text-2xl font-bold text-white shadow-lg backdrop-blur transition hover:bg-industrial-orange disabled:cursor-not-allowed disabled:opacity-35"
              >
                ›
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-slate-200 to-slate-100" aria-label="Product image placeholder" />
      )}
      {hasMultipleImages ? (
        <div className="mt-3 flex items-center justify-center">
          <div className="flex gap-1.5" aria-label={isZh ? `第 ${activeIndex + 1} 张，共 ${images.length} 张` : `Image ${activeIndex + 1} of ${images.length}`}>
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
        </div>
      ) : null}
    </div>
  );
}
