import { db } from "@/lib/db";
import { skills } from "@/lib/schema";
import { RequireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function GET() {
    await RequireAdmin();
    const data = await db.select().from(skills);
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    await RequireAdmin();
    const body = await req.json();

    if (!body.name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const [newSkill] = await db
        .insert(skills)
        .values({
            name: body.name,
            description: body.description ?? null,
            roadmapId: body.roadmapId ?? null,
        })
        .returning();

    return NextResponse.json(newSkill);
}
