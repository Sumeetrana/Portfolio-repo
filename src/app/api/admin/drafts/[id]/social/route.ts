import { NextRequest, NextResponse } from "next/server";
import { generateSocialPosts } from "@/lib/services/writer.service";
import * as draftRepo from "@/lib/repositories/draft.repo";

export const maxDuration = 30;

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.ADMIN_SECRET}`;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const draft = await draftRepo.getDraft(id);
  if (!draft) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const social = await generateSocialPosts(draft.title, draft.excerpt, draft.slug);
  await draftRepo.upsertSocialPosts(id, social.twitter, social.linkedin);

  const updated = await draftRepo.getDraft(id);
  return NextResponse.json({ draft: updated });
}
