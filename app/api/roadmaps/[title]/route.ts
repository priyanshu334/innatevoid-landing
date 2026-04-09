import { db } from "@/lib/db";
import { roadmaps } from "@/lib/schema";
import { eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";

async function resolveParam(raw: string) {
  const decoded = decodeURIComponent(raw);
  const bySlug = await db.select().from(roadmaps).where(eq(roadmaps.slug, decoded));
  if (bySlug.length) return bySlug;
  return db.select().from(roadmaps).where(eq(roadmaps.title, decoded));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  const data = await resolveParam(title);
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  const decoded = decodeURIComponent(title);
  const body = await req.json();
  const data = await db
    .update(roadmaps)
    .set(body)
    .where(or(eq(roadmaps.slug, decoded), eq(roadmaps.title, decoded)));
  return NextResponse.json(data);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  const decoded = decodeURIComponent(title);
  const data = await db
    .delete(roadmaps)
    .where(or(eq(roadmaps.slug, decoded), eq(roadmaps.title, decoded)));
  return NextResponse.json(data);
}