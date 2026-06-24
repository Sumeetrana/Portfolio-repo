"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Tone = "technical" | "thought-leadership" | "beginner-friendly";

const TONES: { value: Tone; label: string; desc: string }[] = [
  { value: "technical", label: "Technical Deep-Dive", desc: "Production code, benchmarks, architecture — for senior engineers" },
  { value: "thought-leadership", label: "Thought Leadership", desc: "Opinionated, forward-looking — for engineering leaders & CTOs" },
  { value: "beginner-friendly", label: "Beginner Friendly", desc: "Analogies, step-by-step, no assumed knowledge" },
];


export default function GenerateClient() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("technical");
  const [loading, setLoading] = useState(false);
  const [progressLog, setProgressLog] = useState<string[]>([]);
  const [error, setError] = useState("");

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setProgressLog([]);

    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET ?? ""}`,
        },
        body: JSON.stringify({ topic, tone }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json();
        throw new Error(data.error ?? "Generation failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const messages = buffer.split("\n\n");
        buffer = messages.pop() ?? "";

        for (const msg of messages) {
          const eventMatch = msg.match(/^event: (.+)/m);
          const dataMatch = msg.match(/^data: (.+)/m);
          if (!eventMatch || !dataMatch) continue;

          const event = eventMatch[1].trim();
          const data = JSON.parse(dataMatch[1].trim());

          if (event === "progress") {
            setProgressLog((prev) => [...prev, data.message]);
          } else if (event === "done") {
            router.push(`/admin/drafts/${data.draftId}`);
            return;
          } else if (event === "error") {
            throw new Error(data.message);
          }
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
      setProgressLog([]);
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-100 mb-1">Generate Blog Post</h1>
      <p className="text-sm text-slate-400 mb-8">
        Describe a topic — the AI will research it deeply, then write a comprehensive 14-section article
        complete with system design diagrams, code examples, and performance benchmarks.
      </p>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What should the blog post be about?
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How Stripe implements idempotent APIs at scale, and how you can too"
            rows={4}
            required
            disabled={loading}
            className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none disabled:opacity-50"
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Be specific — the more context you give, the more targeted the research.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Tone</label>
          <div className="grid grid-cols-1 gap-2">
            {TONES.map((t) => (
              <label
                key={t.value}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  tone === t.value
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={t.value}
                  checked={tone === t.value}
                  onChange={() => setTone(t.value)}
                  disabled={loading}
                  className="mt-0.5 accent-indigo-500"
                />
                <div>
                  <p className="text-sm font-medium text-slate-200">{t.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-indigo-300">Generating your post…</p>
            </div>
            <div className="space-y-2">
              {progressLog.map((msg, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 text-xs mt-0.5 shrink-0">✓</span>
                  <p className="text-xs text-slate-400">{msg}</p>
                </div>
              ))}
              <div className="flex items-start gap-2">
                <div className="w-3 h-3 border border-indigo-400 border-t-transparent rounded-full animate-spin mt-0.5 shrink-0" />
                <p className="text-xs text-slate-500">Working…</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-4 pt-3 border-t border-slate-800">
              Generating 7 sections separately to ensure full depth. Takes 60–90 seconds.
            </p>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors text-sm"
          >
            ✨ Research & Generate
          </button>
        )}
      </form>
    </div>
  );
}
