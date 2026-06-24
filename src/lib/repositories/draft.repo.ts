import { prisma } from "@/lib/db/prisma";
import type { Draft, DraftStatus, Prisma } from "@prisma/client";

export async function listDrafts(status?: DraftStatus) {
  return prisma.draft.findMany({
    where: status ? { status } : undefined,
    include: { socialPosts: true, published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDraft(id: string) {
  return prisma.draft.findUnique({
    where: { id },
    include: { socialPosts: true, published: true },
  });
}

export async function createDraft(data: Prisma.DraftCreateInput): Promise<Draft> {
  return prisma.draft.create({ data });
}

export async function updateDraft(id: string, data: Prisma.DraftUpdateInput): Promise<Draft> {
  return prisma.draft.update({ where: { id }, data });
}

export async function setDraftStatus(
  id: string,
  status: DraftStatus,
  reviewNotes?: string
): Promise<Draft> {
  return prisma.draft.update({
    where: { id },
    data: { status, reviewNotes, reviewedAt: new Date() },
  });
}

export async function upsertSocialPosts(
  draftId: string,
  twitter: string,
  linkedin: string
) {
  await prisma.socialPost.deleteMany({ where: { draftId } });
  return prisma.socialPost.createMany({
    data: [
      { draftId, platform: "TWITTER", content: twitter },
      { draftId, platform: "LINKEDIN", content: linkedin },
    ],
  });
}
