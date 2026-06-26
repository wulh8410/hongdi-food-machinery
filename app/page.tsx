'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RootPage() {
  useEffect(() => {
    window.location.replace('/zh/');
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08233d] px-6 text-white">
      <div className="text-center">
        <p className="text-sm font-semibold text-orange-300">洪弟食品机械</p>
        <h1 className="mt-3 text-2xl font-black">正在进入中文首页</h1>
        <p className="mt-4 text-sm text-slate-200">如果页面没有自动跳转，请点击下方按钮。</p>
        <Link href="/zh/" className="mt-6 inline-flex rounded-sm bg-orange-500 px-5 py-3 text-sm font-black text-white">
          进入中文首页
        </Link>
      </div>
    </main>
  );
}
