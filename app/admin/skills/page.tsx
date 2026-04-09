"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Pencil, Trash2, Plus, BookOpen } from "lucide-react"
import { toast } from "sonner"

export default function SkillsPage() {
    const [skills, setSkills] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    async function loadSkills() {
        const res = await fetch("/api/admin/skills")
        const data = await res.json()
        setSkills(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    useEffect(() => {
        loadSkills()
    }, [])

    async function handleDelete(id: string, name: string) {
        if (!confirm(`Delete skill "${name}"?`)) return
        const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" })
        if (res.ok) {
            toast.success(`Skill "${name}" deleted`)
            setSkills((prev) => prev.filter((s) => s.id !== id))
        } else {
            toast.error("Failed to delete skill")
        }
    }

    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Skills</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage all skills linked to roadmaps
                    </p>
                </div>
                <Link href="/admin/skills/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Skill
                    </Button>
                </Link>
            </div>

            {loading ? (
                <p className="text-muted-foreground">Loading…</p>
            ) : skills.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
                    <BookOpen className="h-12 w-12 opacity-30" />
                    <p className="text-lg">No skills yet.</p>
                    <Link href="/admin/skills/create">
                        <Button variant="outline">Create your first skill</Button>
                    </Link>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Roadmap ID</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {skills.map((skill) => (
                                <TableRow key={skill.id}>
                                    <TableCell className="font-medium">{skill.name}</TableCell>
                                    <TableCell className="text-muted-foreground max-w-xs truncate">
                                        {skill.description ?? <span className="italic opacity-50">—</span>}
                                    </TableCell>
                                    <TableCell>
                                        {skill.roadmapId ? (
                                            <Badge variant="outline" className="font-mono text-xs">
                                                {skill.roadmapId.slice(0, 8)}…
                                            </Badge>
                                        ) : (
                                            <span className="italic text-muted-foreground text-xs">None</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(skill.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/skills/${skill.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(skill.id, skill.name)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}