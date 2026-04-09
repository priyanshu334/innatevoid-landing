import { db } from "@/lib/db";
import { roadmaps } from "@/lib/schema";
import { RequireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function GET() {
    await RequireAdmin();
    const data = await db.select().from(roadmaps);
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    await RequireAdmin();
    const body = await req.json();

    if (!body.title || !body.slug || !body.description) {
        return NextResponse.json({ error: "title, slug and description are required" }, { status: 400 });
    }

    const [newRoadmap] = await db
        .insert(roadmaps)
        .values({
            title: body.title,
            slug: body.slug,
            description: body.description,
        })
        .returning();

    return NextResponse.json(newRoadmap);
}
