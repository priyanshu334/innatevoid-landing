import { db } from "@/lib/db"
import { contact } from "@/lib/schema"
import { NextResponse } from "next/server"
import z from "zod"

const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(1, "Message is required"),
})
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, message } = ContactSchema.parse(body)

        const MessageCon = await db.insert(contact).values({
            name: name,
            email: email,
            message: message
        }).returning()

        return NextResponse.json(MessageCon)


    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}