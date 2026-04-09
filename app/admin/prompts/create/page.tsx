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

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    difficulty: z.enum(["easy", "medium", "hard"]),
    tags: z.string().min(1, "Tags are required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    status: z.enum(["draft", "published"]),
})

export default function CreatePromptPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    type FormValues = z.infer<typeof schema>

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            title: "",
            description: "",
            content: "",
            difficulty: "medium",
            tags: "",
            slug: "",
            status: "draft",
        },
    })

    function autoSlug(val: string) {
        return val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }

    async function onSubmit(data: z.infer<typeof schema>) {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/prompts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            const json = await res.json()
            if (json.error) {
                toast.error(json.error)
            } else {
                toast.success("Prompt created!")
                router.push("/admin/prompts")
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <Link href="/admin/prompts" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to Prompts
            </Link>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Create Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1">
                            <Label>Title</Label>
                            <Input
                                {...register("title")}
                                placeholder="e.g. Write a Blog Post Outline"
                                onChange={(e) => {
                                    setValue("title", e.target.value)
                                    setValue("slug", autoSlug(e.target.value))
                                }}
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label>Slug</Label>
                            <Input {...register("slug")} placeholder="write-a-blog-post-outline" />
                            {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label>Description</Label>
                            <Input {...register("description")} placeholder="Short description of this prompt" />
                            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label>Content <span className="text-muted-foreground text-xs">(Markdown supported)</span></Label>
                            <Textarea {...register("content")} placeholder="Write your prompt content here…" rows={8} className="font-mono text-sm" />
                            {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Difficulty</Label>
                                <select
                                    {...register("difficulty")}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                                {errors.difficulty && <p className="text-sm text-destructive">{errors.difficulty.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label>Status</Label>
                                <select
                                    {...register("status")}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label>Tags <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
                            <Input {...register("tags")} placeholder="writing, ai, productivity" />
                            {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating…" : "Create Prompt"}
                            </Button>
                            <Link href="/admin/prompts">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}