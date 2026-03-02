"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    difficulty: z.string().min(1, "Difficulty is required"),
    tags: z.string().min(1, "Tags is required"),
    slug: z.string().min(1, "Slug is required"),
})

export default function CreatePromptPage() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            difficulty: "",
            tags: "",
            slug: "",
        },
    });
    async function onSubmit(data: z.infer<typeof schema>) {
        const res = await fetch("/api/admin/prompts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const json = await res.json()
        if (json.error) {
            alert(json.error)
        } else {
            router.push("/admin/prompts")
        }

    }

    return (
        <Card className="p-10 space-y-6">
            <CardHeader >
                <CardTitle>Create Prompt</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input type="text" {...register("title")} placeholder="Title" />
                    <Input type="text" {...register("description")} placeholder="Description" />
                    <Input type="text" {...register("content")} placeholder="Content" />
                    <Input type="text" {...register("difficulty")} placeholder="Difficulty" />
                    <Input type="text" {...register("tags")} placeholder="Tags" />
                    <Input type="text" {...register("slug")} placeholder="Slug" />
                    <Button type="submit">Create</Button>
                </form>
            </CardContent>
        </Card>
    )

}