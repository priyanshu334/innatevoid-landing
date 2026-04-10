import { db } from "@/lib/db"
import { contact } from "@/lib/schema"
import { NextResponse } from "next/server"
import { z } from "zod"

const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(1, "Message is required"),
})

function getDbErrorCode(error: unknown): string | undefined {
    if (typeof error === "object" && error !== null && "code" in error) {
        const code = (error as { code?: unknown }).code
        return typeof code === "string" ? code : undefined
    }
    return undefined
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, message } = ContactSchema.parse(body)

        const [newMessage] = await db
            .insert(contact)
            .values({
                name,
                email,
                message,
            })
            .returning()

        return NextResponse.json(
            {
                success: true,
                data: newMessage,
            },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: error.issues[0]?.message ?? "Invalid input" },
                { status: 400 }
            )
        }

        const dbErrorCode = getDbErrorCode(error)

        if (dbErrorCode === "23505") {
            return NextResponse.json(
                {
                    success: false,
                    error: "This email already submitted a message. Please use another email.",
                },
                { status: 409 }
            )
        }

        if (dbErrorCode === "42P01") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Contact table not found. Please run database migrations.",
                },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        )
    }
}
