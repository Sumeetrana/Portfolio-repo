import { prisma } from "@/lib/db/prisma";
import DraftsClient from "@/components/admin/drafts/DraftsClient";

export const dynamic = "force-dynamic";

export default async function DraftsPage() {
  let drafts: {
    id: string;
    topic: string;
    title: string;
    slug: string;
    status: "DRAFT" | "APPROVED" | "REJECTED" | "PUBLISHED";
    tags: string[];
    createdAt: string;
    reviewedAt: string | null;
  }[] = [];

  try {
    const rows = await prisma.draft.findMany({ orderBy: { createdAt: "desc" } });
    drafts = rows.map((d) => ({
      id: d.id,
      topic: d.topic,
      title: d.title,
      slug: d.slug,
      status: d.status,
      tags: d.tags,
      createdAt: d.createdAt.toISOString(),
      reviewedAt: d.reviewedAt?.toISOString() ?? null,
    }));
  } catch {
    // DB not available
  }

  return <DraftsClient drafts={drafts} />;
}
