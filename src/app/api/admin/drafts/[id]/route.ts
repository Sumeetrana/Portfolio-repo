import { NextRequest, NextResponse } from "next/server";
import * as draftRepo from "@/lib/repositories/draft.repo";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.ADMIN_SECRET}`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const draft = await draftRepo.getDraft(id);
  if (!draft) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ draft });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();

  // status changes (approve/reject)
  if (body.status) {
    const draft = await draftRepo.setDraftStatus(id, body.status, body.reviewNotes);
    return NextResponse.json({ draft });
  }

  // content edits
  const draft = await draftRepo.updateDraft(id, {
    title: body.title,
    metaDescription: body.metaDescription,
    excerpt: body.excerpt,
    content: body.content,
    tags: body.tags,
  });
  return NextResponse.json({ draft });
}
