import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, sessions } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { addDays } from "date-fns";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (!user.length) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const valid = await bcrypt.compare(password, user[0].password);

        if (!valid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create session
        const expiresAt = addDays(new Date(), 7);

        const [session] = await db
            .insert(sessions)
            .values({
                userId: user[0].id,
                expiresAt,
            })
            .returning();

        const response = NextResponse.json({ message: "Login successful" });

        response.cookies.set("sessionId", session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: expiresAt,
            path: "/",
        });

        return response;
    } catch {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}