import { NextRequest, NextResponse } from "next/server";
import * as draftRepo from "@/lib/repositories/draft.repo";
import type { DraftStatus } from "@prisma/client";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.ADMIN_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get("status") as DraftStatus | null;
  const drafts = await draftRepo.listDrafts(status ?? undefined);
  return NextResponse.json({ drafts });
}
