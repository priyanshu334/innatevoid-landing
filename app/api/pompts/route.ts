import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { prompts } from "@/lib/schema";
import { and, eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })


    }
    const data = await db.select({ id: prompts.id, title: prompts.title, description: prompts.description, tags: prompts.tags, difficulty: prompts.difficulty }).from(prompts).where(and(eq(prompts.status, "published"), isNull(prompts.deletedAt)));
    return NextResponse.json({ data })
}