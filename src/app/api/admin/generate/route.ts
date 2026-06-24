import { NextRequest } from "next/server";
import { generateBlogPost, type Tone } from "@/lib/services/writer.service";
import * as draftRepo from "@/lib/repositories/draft.repo";

export const maxDuration = 120;

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("authorization") === `Bearer ${process.env.ADMIN_SECRET}`;
}

function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { topic, tone } = await req.json();
  if (!topic?.trim()) {
    return new Response(JSON.stringify({ error: "Topic is required" }), { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) =>
        controller.enqueue(encoder.encode(sse(event, data)));

      try {
        const post = await generateBlogPost(
          topic.trim(),
          tone as Tone,
          (step, message) => send("progress", { step, message })
        );

        send("progress", { step: "saving", message: "💾 Saving draft to database…" });

        const existing = await draftRepo.listDrafts();
        const slugs = new Set(existing.map((d) => d.slug));
        let slug = post.slug;
        if (slugs.has(slug)) slug = `${slug}-${Date.now()}`;

        const draft = await draftRepo.createDraft({
          topic: topic.trim(),
          title: post.title,
          slug,
          metaDescription: post.metaDescription,
          excerpt: post.excerpt,
          content: post.content,
          tags: post.tags,
          keywords: post.keywords ?? [],
          readingTime: post.readingTime ?? 0,
          sources: [],
        });

        send("done", { draftId: draft.id });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Generation failed";
        console.error("Generate error:", err);
        send("error", { message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
