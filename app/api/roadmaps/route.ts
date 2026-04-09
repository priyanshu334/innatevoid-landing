import { db } from "@/lib/db";
import { roadmaps } from "@/lib/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const RoadmapSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
});

export async function GET() {
  const data = await db.select().from(roadmaps);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, description } = RoadmapSchema.parse(body);
    const result = await db
      .insert(roadmaps)
      .values({ title, slug, description })
      .returning();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
