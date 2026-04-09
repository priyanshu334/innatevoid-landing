import { db } from "@/lib/db"
import { prompts } from "@/lib/schema"
import { eq } from "drizzle-orm"
import EditPromptForm from "@/components/EditPromptForm"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const [prompt] = await db.select().from(prompts).where(eq(prompts.slug, slug))

    if (!prompt) notFound()

    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <Link
                href="/admin/prompts"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> Back to Prompts
            </Link>
            <EditPromptForm prompt={prompt} />
        </div>
    )
}