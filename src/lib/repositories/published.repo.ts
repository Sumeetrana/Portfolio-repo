import { prisma } from "@/lib/db/prisma";

export async function listPublished() {
  return prisma.publishedArticle.findMany({
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPublishedBySlug(slug: string) {
  return prisma.publishedArticle.findUnique({ where: { slug } });
}

export async function publishDraft(draftId: string) {
  const draft = await prisma.draft.findUniqueOrThrow({ where: { id: draftId } });
  const wordCount = draft.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const published = await prisma.publishedArticle.create({
    data: {
      draftId,
      slug: draft.slug,
      title: draft.title,
      content: draft.content,
      metaDescription: draft.metaDescription,
      excerpt: draft.excerpt,
      tags: draft.tags,
      readingTime,
    },
  });

  await prisma.draft.update({
    where: { id: draftId },
    data: { status: "PUBLISHED" },
  });

  return published;
}

export async function incrementViews(slug: string) {
  return prisma.publishedArticle.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}
