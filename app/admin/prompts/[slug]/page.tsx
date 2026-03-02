import EditPromptForm from "@/components/EditPromptForm"

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const res = await fetch(`/api/admin/prompts/${slug}`)
    const prompt = await res.json()
    return (
        <div>
            <h1>Edit Prompt</h1>
            <EditPromptForm prompt={prompt} />
        </div>
    )
}