"use client"
import { Card } from "@/components/ui/card";
import { RequireAdmin } from "@/lib/requireAdmin";
import Link from "next/link";
import ReachMarkdown from "react-markdown"
import { useEffect, useState } from "react";

export default function PromptsPage() {
    const [prompts, setPrompts] = useState<any>([])

    useEffect(() => {
        async function fetchPrompts() {
            const res = await fetch("/api/admin/prompts", { cache: "no-store" })
            const data = await res.json()
            setPrompts(data)
        }
        fetchPrompts()
    }, [])
    return (
        <div className="p-10 space-y-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Manage Prompts</h1>
                <Link href="/admin/prompts/create">
                    Create Prompt
                </Link>
            </div>

            <div className="space-y-4">
                {prompts.map((p: any) => (
                    <div
                        key={p.id}
                        className="border p-4 rounded flex justify-between"
                    >
                        <span>{p.title}</span>
                        <Card className="porse max-w-none p-6">
                            <ReachMarkdown>{p.content}</ReachMarkdown>

                        </Card>
                        <Link href={`/admin/prompts/${p.slug}`}>
                            Edit
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}