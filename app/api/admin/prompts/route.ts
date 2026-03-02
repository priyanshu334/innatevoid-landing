import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { prompts } from "@/lib/schema";
import { getCurrentUser } from "@/lib/auth";
import { RequireAdmin } from "@/lib/requireAdmin";

export async function GET() {
    await RequireAdmin()
    const Prompts = await db.select().from(prompts)
    return NextResponse.json(Prompts)
}

export async function POST(req: Request) {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const body = await req.json();

    const [newPrompt] = await db
        .insert(prompts).values({
            title: body.title,
            description: body.description,
            content: body.content,
            difficulty: body.difficulty,
            tags: body.tags,
            slug: body.slug,
            status: body.status,
        }).returning();

    return NextResponse.json(newPrompt);
}