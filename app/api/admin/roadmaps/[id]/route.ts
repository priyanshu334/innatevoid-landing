import { db } from "@/lib/db";
import { roadmaps } from "@/lib/schema";
import { RequireAdmin } from "@/lib/requireAdmin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await RequireAdmin();
    const { id } = await params;
    const [roadmap] = await db.select().from(roadmaps).where(eq(roadmaps.id, id));
    if (!roadmap) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(roadmap);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await RequireAdmin();
    const { id } = await params;
    const body = await req.json();

    const [updated] = await db
        .update(roadmaps)
        .set({
            title: body.title,
            slug: body.slug,
            description: body.description,
        })
        .where(eq(roadmaps.id, id))
        .returning();

    return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await RequireAdmin();
    const { id } = await params;
    await db.delete(roadmaps).where(eq(roadmaps.id, id));
    return NextResponse.json({ success: true });
}
