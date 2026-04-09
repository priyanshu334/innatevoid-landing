"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditSkillPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [roadmaps, setRoadmaps] = useState<any[]>([])
    const [id, setId] = useState<string>("")
    const [form, setForm] = useState({ name: "", description: "", roadmapId: "" })

    useEffect(() => {
        async function init() {
            const { slug } = await params
            setId(slug)
            const [skillRes, roadmapRes] = await Promise.all([
                fetch(`/api/admin/skills`),
                fetch(`/api/roadmaps`),
            ])
            const skillsData = await skillRes.json()
            const roadmapsData = await roadmapRes.json()
            const skill = Array.isArray(skillsData) ? skillsData.find((s: any) => s.id === slug) : null
            if (skill) {
                setForm({
                    name: skill.name ?? "",
                    description: skill.description ?? "",
                    roadmapId: skill.roadmapId ?? "",
                })
            }
            setRoadmaps(Array.isArray(roadmapsData) ? roadmapsData : [])
            setLoading(false)
        }
        init()
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)
        const res = await fetch(`/api/admin/skills/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
        if (res.ok) {
            toast.success("Skill updated!")
            router.push("/admin/skills")
        } else {
            toast.error("Failed to update skill")
        }
        setSaving(false)
    }

    if (loading) return <div className="p-10 text-muted-foreground">Loading…</div>

    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <Link href="/admin/skills" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to Skills
            </Link>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Edit Skill</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Skill name"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Description <span className="text-muted-foreground">(optional)</span></Label>
                            <Textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Describe this skill"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Roadmap <span className="text-muted-foreground">(optional)</span></Label>
                            <select
                                value={form.roadmapId}
                                onChange={(e) => setForm({ ...form, roadmapId: e.target.value })}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="">— None —</option>
                                {roadmaps.map((r) => (
                                    <option key={r.id} value={r.id}>{r.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" disabled={saving}>
                                {saving ? "Saving…" : "Save Changes"}
                            </Button>
                            <Link href="/admin/skills">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
