"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { toast } from "sonner"

const Schema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    roadmapId: z.string().optional(),
})

export default function CreateSkillPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [roadmaps, setRoadmaps] = useState<any[]>([])

    useEffect(() => {
        fetch("/api/roadmaps").then(r => r.json()).then(d => setRoadmaps(Array.isArray(d) ? d : []))
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
    })

    const onSubmit = async (data: z.infer<typeof Schema>) => {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/skills", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            const json = await res.json()
            if (json.error) {
                toast.error(json.error)
            } else {
                toast.success("Skill created!")
                router.push("/admin/skills")
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full p-6 md:p-10">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Create Skill</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input {...register("name")} placeholder="e.g. React Hooks" />
                            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label>Description <span className="text-muted-foreground">(optional)</span></Label>
                            <Textarea {...register("description")} placeholder="Briefly describe this skill" />
                        </div>

                        <div className="space-y-1">
                            <Label>Roadmap <span className="text-muted-foreground">(optional)</span></Label>
                            <select
                                {...register("roadmapId")}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="">— None —</option>
                                {roadmaps.map((r) => (
                                    <option key={r.id} value={r.id}>{r.title}</option>
                                ))}
                            </select>
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating…" : "Create Skill"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}