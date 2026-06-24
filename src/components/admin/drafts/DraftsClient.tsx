"use client";

import Link from "next/link";

type DraftStatus = "DRAFT" | "APPROVED" | "REJECTED" | "PUBLISHED";

interface Draft {
  id: string;
  topic: string;
  title: string;
  slug: string;
  status: DraftStatus;
  tags: string[];
  createdAt: string;
  reviewedAt: string | null;
}

const STATUS_STYLE: Record<DraftStatus, string> = {
  DRAFT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  APPROVED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  PUBLISHED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function DraftsClient({ drafts }: { drafts: Draft[] }) {
  if (drafts.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Drafts</h1>
        <div className="mt-10 text-center py-20 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-slate-500 text-sm">No drafts yet.</p>
          <Link
            href="/admin/generate"
            className="mt-3 inline-block text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
          >
            ✨ Generate your first blog post →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Drafts</h1>
          <p className="text-sm text-slate-400 mt-0.5">{drafts.length} draft{drafts.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/generate"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          ✨ Generate New
        </Link>
      </div>

      <div className="space-y-3">
        {drafts.map((draft) => (
          <Link
            key={draft.id}
            href={`/admin/drafts/${draft.id}`}
            className="block bg-slate-900/50 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLE[draft.status]}`}
                  >
                    {draft.status}
                  </span>
                  <span className="text-xs text-slate-600">
                    {new Date(draft.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-100 font-medium group-hover:text-indigo-300 transition-colors truncate">
                  {draft.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 truncate">Topic: {draft.topic}</p>
              </div>
              <div className="flex flex-wrap gap-1 shrink-0 max-w-[200px] justify-end">
                {draft.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
