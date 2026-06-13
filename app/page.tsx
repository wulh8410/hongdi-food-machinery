export default function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-xl rounded border border-slate-200 bg-white p-8 text-center shadow-soft">
        <h1 className="text-2xl font-bold text-industrial-navy">Hongdi Food Machinery</h1>
        <p className="mt-3 text-slate-600">Choose a language to enter the poultry dehairing and food processing equipment website.</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/zh/" className="rounded bg-industrial-blue px-5 py-3 text-sm font-bold text-white">中文</a>
          <a href="/en/" className="rounded border border-industrial-blue px-5 py-3 text-sm font-bold text-industrial-blue">English</a>
        </div>
      </div>
    </main>
  );
}
