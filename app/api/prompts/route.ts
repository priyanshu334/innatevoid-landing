import { db } from "@/lib/db";
import { prompts } from "@/lib/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const PromptSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  tags: z.string().optional(),
  difficulty: z.string().optional(),
});

export async function GET() {
  const data = await db.select().from(prompts);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, description, content, tags, difficulty } = PromptSchema.parse(body);
    const result = await db
      .insert(prompts)
      .values({ title, slug, description, content, tags, difficulty })
      .returning();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
