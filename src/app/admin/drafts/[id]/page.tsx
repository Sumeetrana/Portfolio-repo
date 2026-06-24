import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import DraftEditor from "@/components/admin/drafts/DraftEditor";

export const dynamic = "force-dynamic";

export default async function DraftPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const d = await prisma.draft.findUnique({
    where: { id },
    include: { socialPosts: true },
  });

  if (!d) notFound();

  const draft = {
    id: d.id,
    topic: d.topic,
    title: d.title,
    slug: d.slug,
    metaDescription: d.metaDescription,
    excerpt: d.excerpt,
    content: d.content,
    tags: d.tags,
    sources: d.sources,
    status: d.status as "DRAFT" | "APPROVED" | "REJECTED" | "PUBLISHED",
    reviewNotes: d.reviewNotes,
    socialPosts: d.socialPosts.map((s) => ({
      id: s.id,
      platform: s.platform as "TWITTER" | "LINKEDIN",
      content: s.content,
    })),
    createdAt: d.createdAt.toISOString(),
  };

  return <DraftEditor initialDraft={draft} />;
}
