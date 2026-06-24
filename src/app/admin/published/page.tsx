import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PublishedPage() {
  let articles: {
    id: string;
    slug: string;
    title: string;
    tags: string[];
    readingTime: number;
    views: number;
    publishedAt: string;
  }[] = [];

  try {
    const rows = await prisma.publishedArticle.findMany({
      orderBy: { publishedAt: "desc" },
    });
    articles = rows.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      tags: a.tags,
      readingTime: a.readingTime,
      views: a.views,
      publishedAt: a.publishedAt.toISOString(),
    }));
  } catch {
    // DB not available
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Published</h1>

      {articles.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-slate-500 text-sm">No published articles yet.</p>
          <Link href="/admin/generate" className="mt-3 inline-block text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
            ✨ Generate your first post →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Published</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Read time</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Views</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-slate-100">{a.title}</p>
                    <div className="flex gap-1 mt-1">
                      {a.tags.slice(0, 3).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-500 text-xs rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 text-xs">
                    {new Date(a.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3.5 text-slate-400">{a.readingTime} min</td>
                  <td className="px-4 py-3.5 text-slate-400">{a.views}</td>
                  <td className="px-4 py-3.5 text-right">
                    <a
                      href={`/blog/${a.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      View →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
