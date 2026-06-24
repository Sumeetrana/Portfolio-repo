"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DraftStatus = "DRAFT" | "APPROVED" | "REJECTED" | "PUBLISHED";

interface SocialPost {
  id: string;
  platform: "TWITTER" | "LINKEDIN";
  content: string;
}

interface Draft {
  id: string;
  topic: string;
  title: string;
  slug: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  tags: string[];
  sources: string[];
  status: DraftStatus;
  reviewNotes: string | null;
  socialPosts: SocialPost[];
  createdAt: string;
}

const STATUS_STYLE: Record<DraftStatus, string> = {
  DRAFT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  APPROVED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  PUBLISHED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET ?? ""}`,
});

export default function DraftEditor({ initialDraft }: { initialDraft: Draft }) {
  const router = useRouter();
  const [draft, setDraft] = useState(initialDraft);
  const [saving, setSaving] = useState(false);
  const [actioning, setActioning] = useState<string | null>(null);
  const [generatingSocial, setGeneratingSocial] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/drafts/${draft.id}`, {
        method: "PATCH",
        headers: authHeader(),
        body: JSON.stringify({
          title: draft.title,
          metaDescription: draft.metaDescription,
          excerpt: draft.excerpt,
          content: draft.content,
          tags: draft.tags,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Saved");
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(status: DraftStatus, reviewNotes?: string) {
    setActioning(status);
    try {
      const res = await fetch(`/api/admin/drafts/${draft.id}`, {
        method: "PATCH",
        headers: authHeader(),
        body: JSON.stringify({ status, reviewNotes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDraft((d) => ({ ...d, status, reviewNotes: reviewNotes ?? d.reviewNotes }));
      showToast(status === "APPROVED" ? "Draft approved!" : "Draft rejected");
      setShowRejectBox(false);
    } finally {
      setActioning(null);
    }
  }

  async function publish() {
    setActioning("PUBLISHED");
    try {
      const res = await fetch(`/api/admin/drafts/${draft.id}/publish`, {
        method: "POST",
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDraft((d) => ({ ...d, status: "PUBLISHED" }));
      showToast("Published! Redirecting…");
      setTimeout(() => router.push(`/blog/${draft.slug}`), 1200);
    } finally {
      setActioning(null);
    }
  }

  async function generateSocial() {
    setGeneratingSocial(true);
    try {
      const res = await fetch(`/api/admin/drafts/${draft.id}/social`, {
        method: "POST",
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDraft((d) => ({ ...d, socialPosts: data.draft.socialPosts }));
      showToast("Social posts generated!");
    } finally {
      setGeneratingSocial(false);
    }
  }

  const twitter = draft.socialPosts.find((p) => p.platform === "TWITTER");
  const linkedin = draft.socialPosts.find((p) => p.platform === "LINKEDIN");

  return (
    <div className="p-6 max-w-4xl">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/drafts")}
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
          >
            ← Drafts
          </button>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLE[draft.status]}`}
          >
            {draft.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {draft.status !== "PUBLISHED" && (
            <button
              onClick={save}
              disabled={saving}
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          )}

          {draft.status === "DRAFT" && (
            <>
              <button
                onClick={() => setShowRejectBox((v) => !v)}
                disabled={!!actioning}
                className="px-3 py-1.5 rounded-lg border border-red-800/50 text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
              >
                Reject
              </button>
              <button
                onClick={() => setStatus("APPROVED")}
                disabled={!!actioning}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-medium transition-colors disabled:opacity-50"
              >
                {actioning === "APPROVED" ? "Approving…" : "Approve"}
              </button>
            </>
          )}

          {draft.status === "APPROVED" && (
            <button
              onClick={publish}
              disabled={!!actioning}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium transition-colors disabled:opacity-50"
            >
              {actioning === "PUBLISHED" ? "Publishing…" : "Publish to Blog"}
            </button>
          )}
        </div>
      </div>

      {/* Reject box */}
      {showRejectBox && (
        <div className="mb-4 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
          <p className="text-xs text-red-400 mb-2">Reason for rejection (optional)</p>
          <textarea
            value={rejectNote}
            onChange={(e) => setRejectNote(e.target.value)}
            rows={2}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 resize-none focus:outline-none focus:border-red-500"
          />
          <button
            onClick={() => setStatus("REJECTED", rejectNote)}
            disabled={!!actioning}
            className="mt-2 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-xs text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Confirm Reject
          </button>
        </div>
      )}

      {/* Topic badge */}
      <p className="text-xs text-slate-500 mb-6">
        Topic: <span className="text-slate-400">{draft.topic}</span>
      </p>

      {/* Fields */}
      <div className="space-y-5">
        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Title</label>
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            disabled={draft.status === "PUBLISHED"}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 font-medium focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Meta Description</label>
          <input
            value={draft.metaDescription}
            onChange={(e) => setDraft({ ...draft, metaDescription: e.target.value })}
            disabled={draft.status === "PUBLISHED"}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-60"
          />
          <p className="text-xs text-slate-600 mt-1">{draft.metaDescription.length}/160 chars</p>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Excerpt</label>
          <textarea
            value={draft.excerpt}
            onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
            disabled={draft.status === "PUBLISHED"}
            rows={3}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 resize-none focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Tags (comma-separated)</label>
          <input
            value={draft.tags.join(", ")}
            onChange={(e) =>
              setDraft({
                ...draft,
                tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
              })
            }
            disabled={draft.status === "PUBLISHED"}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
            Content (Markdown)
          </label>
          <textarea
            value={draft.content}
            onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            disabled={draft.status === "PUBLISHED"}
            rows={30}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono resize-y focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-60"
          />
          <p className="text-xs text-slate-600 mt-1">
            ~{Math.round(draft.content.split(/\s+/).length / 200)} min read ·{" "}
            {draft.content.split(/\s+/).length} words
          </p>
        </div>

        {/* Sources */}
        {draft.sources.length > 0 && (
          <div>
            <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">
              Sources Gemini Used
            </label>
            <div className="space-y-1">
              {draft.sources.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-xs text-slate-500 hover:text-indigo-400 truncate transition-colors"
                >
                  {url}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Social Posts */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs text-slate-500 uppercase tracking-wider">Social Posts</label>
            {draft.status !== "PUBLISHED" && (
              <button
                onClick={generateSocial}
                disabled={generatingSocial}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors disabled:opacity-50"
              >
                {generatingSocial ? "Generating…" : "✨ Generate Social Posts"}
              </button>
            )}
          </div>

          {twitter ? (
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 mb-1.5">Twitter / X</p>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 whitespace-pre-wrap">
                  {twitter.content}
                </div>
              </div>
              {linkedin && (
                <div>
                  <p className="text-xs text-slate-600 mb-1.5">LinkedIn</p>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {linkedin.content}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-600">
              No social posts yet — click Generate Social Posts above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
