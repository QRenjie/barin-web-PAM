function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <p className="text-sm font-medium text-sky-600">barin-web-PAM</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            项目资产展示平台
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Monorepo 已初始化。接下来可按 PRD 实现卡片/列表视图与搜索功能。
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium">本地开发</h2>
          <p className="mt-2 text-sm text-slate-600">
            在仓库根目录执行 <code className="rounded bg-slate-100 px-1.5 py-0.5">pnpm dev</code>{' '}
            启动 Web 应用（默认 http://localhost:5173）。
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
