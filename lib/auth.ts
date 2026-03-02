import { db } from "@/lib/db";
import { sessions, users } from "@/lib/schema";
import { eq, and, gt } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getCurrentUser() {
    const sessionId = (await cookies()).get("sessionId")?.value;

    if (!sessionId) return null;

    const result = await db
        .select({
            user: users,
        })
        .from(sessions)
        .innerJoin(users, eq(users.id, sessions.userId))
        .where(
            and(
                eq(sessions.id, sessionId),
                eq(sessions.revoked, false),
                gt(sessions.expiresAt, new Date())
            )
        );

    if (!result.length) return null;

    return result[0].user;
}