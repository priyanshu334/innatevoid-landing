import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { prompts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ title: string }> }) {
    const { title } = await params;
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const result = await db.select().from(prompts).where(eq(prompts.title, title));
    return NextResponse.json({ result })

}