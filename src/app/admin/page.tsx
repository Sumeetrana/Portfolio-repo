export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-100 mb-2">Dashboard</h1>
      <p className="text-slate-400">
        AI content research & publishing platform. Use the sidebar to manage
        sources, review articles, edit drafts, and publish.
      </p>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Sources", value: "—", color: "indigo" },
          { label: "Articles", value: "—", color: "violet" },
          { label: "Drafts", value: "—", color: "purple" },
          { label: "Published", value: "—", color: "blue" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900/60 border border-slate-800 rounded-xl p-5"
          >
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-slate-300 mb-3">
          Getting Started
        </h2>
        <ol className="space-y-2 text-sm text-slate-400 list-decimal list-inside">
          <li>Add RSS/blog sources in Sources</li>
          <li>Trigger a crawl — articles are fetched and stored</li>
          <li>AI analyzes and clusters articles by topic</li>
          <li>AI-generated drafts appear in Drafts for review</li>
          <li>Approve a draft → it goes live on your blog</li>
        </ol>
      </div>
    </div>
  );
}
