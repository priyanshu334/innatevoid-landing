"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function EditRoadmapPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [id, setId] = useState("")
    const [form, setForm] = useState({ title: "", slug: "", description: "" })

    useEffect(() => {
        async function init() {
            const { id } = await params
            setId(id)
            const res = await fetch(`/api/admin/roadmaps/${id}`)
            if (res.ok) {
                const data = await res.json()
                setForm({
                    title: data.title ?? "",
                    slug: data.slug ?? "",
                    description: data.description ?? "",
                })
            } else {
                toast.error("Roadmap not found")
                router.push("/admin/roadmaps")
            }
            setLoading(false)
        }
        init()
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.title || !form.slug || !form.description) {
            toast.error("All fields are required")
            return
        }
        setSaving(true)
        const res = await fetch(`/api/admin/roadmaps/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
        if (res.ok) {
            toast.success("Roadmap updated!")
            router.push("/admin/roadmaps")
        } else {
            toast.error("Failed to update roadmap")
        }
        setSaving(false)
    }

    if (loading) return <div className="p-10 text-muted-foreground">Loading…</div>

    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <Link href="/admin/roadmaps" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to Roadmaps
            </Link>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Edit Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label>Title</Label>
                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="Roadmap title"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Slug</Label>
                            <Input
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                placeholder="roadmap-slug"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Description</Label>
                            <Textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Describe this roadmap"
                                rows={4}
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" disabled={saving}>
                                {saving ? "Saving…" : "Save Changes"}
                            </Button>
                            <Link href="/admin/roadmaps">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
