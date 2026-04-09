import { db } from "@/lib/db";
import { skills } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.select().from(skills);
  return NextResponse.json(data);
}
