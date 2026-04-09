import { db } from "@/lib/db";
import { skills } from "@/lib/schema";
import { RequireAdmin } from "@/lib/requireAdmin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await RequireAdmin();
    const { id } = await params;
    const body = await req.json();

    const [updated] = await db
        .update(skills)
        .set({
            name: body.name,
            description: body.description ?? null,
            roadmapId: body.roadmapId ?? null,
        })
        .where(eq(skills.id, id))
        .returning();

    return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await RequireAdmin();
    const { id } = await params;
    await db.delete(skills).where(eq(skills.id, id));
    return NextResponse.json({ success: true });
}
