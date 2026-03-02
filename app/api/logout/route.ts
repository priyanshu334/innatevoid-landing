import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const sessionId = req.headers
        .get("cookie")
        ?.split("sessionId=")[1]
        ?.split(";")[0];

    if (sessionId) {
        await db
            .update(sessions)
            .set({ revoked: true })
            .where(eq(sessions.id, sessionId));
    }

    const response = NextResponse.json({ message: "Logged out" });

    response.cookies.set("sessionId", "", {
        expires: new Date(0),
        path: "/",
    });

    return response;
}