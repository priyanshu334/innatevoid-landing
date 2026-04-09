"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const Schema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z.string().min(1, "Description is required"),
})

export default function CreateRoadmapPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
    })

    const title = watch("title")

    function autoSlug(val: string) {
        return val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }

    const onSubmit = async (data: z.infer<typeof Schema>) => {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/roadmaps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            const json = await res.json()
            if (json.error) {
                toast.error(json.error)
            } else {
                toast.success("Roadmap created!")
                router.push("/admin/roadmaps")
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <Link href="/admin/roadmaps" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to Roadmaps
            </Link>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Create Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1">
                            <Label>Title</Label>
                            <Input
                                {...register("title")}
                                placeholder="e.g. Frontend Development"
                                onChange={(e) => {
                                    setValue("title", e.target.value)
                                    setValue("slug", autoSlug(e.target.value))
                                }}
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label>Slug</Label>
                            <Input {...register("slug")} placeholder="frontend-development" />
                            {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label>Description</Label>
                            <Textarea {...register("description")} placeholder="Describe this roadmap" rows={4} />
                            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating…" : "Create Roadmap"}
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
