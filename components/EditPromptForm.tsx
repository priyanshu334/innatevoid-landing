"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function EditPromptForm({ prompt }: { prompt: any }) {
    const router = useRouter()
    const [form, setForm] = useState({
        title: prompt.title ?? "",
        description: prompt.description ?? "",
        content: prompt.content ?? "",
        difficulty: prompt.difficulty ?? "medium",
        tags: prompt.tags ?? "",
        slug: prompt.slug ?? "",
        status: prompt.status ?? "draft",
    })
    const [saving, setSaving] = useState(false)

    const handleSubmit = async () => {
        if (!form.title || !form.slug || !form.content) {
            toast.error("Title, slug and content are required")
            return
        }
        setSaving(true)
        const res = await fetch(`/api/admin/prompts/${prompt.slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
        if (res.ok) {
            toast.success("Prompt updated!")
            router.push("/admin/prompts")
            router.refresh()
        } else {
            toast.error("Failed to update prompt")
        }
        setSaving(false)
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <Label>Title</Label>
                    <Input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Prompt title"
                    />
                </div>

                <div className="space-y-1">
                    <Label>Slug</Label>
                    <Input
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        placeholder="prompt-slug"
                        className="font-mono"
                    />
                </div>

                <div className="space-y-1">
                    <Label>Description</Label>
                    <Input
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Short description"
                    />
                </div>

                <div className="space-y-1">
                    <Label>Content <span className="text-muted-foreground text-xs">(Markdown supported)</span></Label>
                    <Textarea
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        rows={10}
                        className="font-mono text-sm"
                        placeholder="Prompt content…"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label>Difficulty</Label>
                        <select
                            value={form.difficulty}
                            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <Label>Status</Label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-1">
                    <Label>Tags <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
                    <Input
                        value={form.tags}
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        placeholder="writing, ai, productivity"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <Button onClick={handleSubmit} disabled={saving}>
                        {saving ? "Saving…" : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={() => router.push("/admin/prompts")}>
                        Cancel
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}