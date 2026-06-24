import { NextRequest, NextResponse } from "next/server";
import * as publishedRepo from "@/lib/repositories/published.repo";
import * as draftRepo from "@/lib/repositories/draft.repo";

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
  if (draft.status !== "APPROVED") {
    return NextResponse.json({ error: "Draft must be approved before publishing" }, { status: 400 });
  }

  const published = await publishedRepo.publishDraft(id);
  return NextResponse.json({ published });
}
