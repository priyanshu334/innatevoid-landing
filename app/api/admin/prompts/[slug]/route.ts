import { RequireAdmin } from "@/lib/requireAdmin";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { prompts } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    await RequireAdmin()
    const { slug } = await params
    const body = await req.json()
    const [updatedPrompt] = await db.update(prompts).set({
        title: body.title,
        description: body.description,
        status: body.status,
        content: body.content,
        difficulty: body.difficulty,
        tags: body.tags,
        slug: body.slug,
    }).where(eq(prompts.slug, slug)).returning()
    return NextResponse.json(updatedPrompt)

}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    await RequireAdmin();
    const { slug } = await params;

    await db
        .update(prompts)
        .set({ deletedAt: new Date() })
        .where(eq(prompts.slug, slug));

    return NextResponse.json({ success: true });
}