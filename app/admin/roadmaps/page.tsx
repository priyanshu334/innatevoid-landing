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
import { Pencil, Trash2, Plus, Map } from "lucide-react"
import { toast } from "sonner"

export default function RoadmapsAdminPage() {
    const [roadmaps, setRoadmaps] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    async function loadRoadmaps() {
        const res = await fetch("/api/admin/roadmaps")
        const data = await res.json()
        setRoadmaps(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    useEffect(() => {
        loadRoadmaps()
    }, [])

    async function handleDelete(id: string, title: string) {
        if (!confirm(`Delete roadmap "${title}"? This may affect linked skills.`)) return
        const res = await fetch(`/api/admin/roadmaps/${id}`, { method: "DELETE" })
        if (res.ok) {
            toast.success(`Roadmap "${title}" deleted`)
            setRoadmaps((prev) => prev.filter((r) => r.id !== id))
        } else {
            toast.error("Failed to delete roadmap")
        }
    }

    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Roadmaps</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage learning roadmaps
                    </p>
                </div>
                <Link href="/admin/roadmaps/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Roadmap
                    </Button>
                </Link>
            </div>

            {loading ? (
                <p className="text-muted-foreground">Loading…</p>
            ) : roadmaps.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
                    <Map className="h-12 w-12 opacity-30" />
                    <p className="text-lg">No roadmaps yet.</p>
                    <Link href="/admin/roadmaps/create">
                        <Button variant="outline">Create your first roadmap</Button>
                    </Link>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roadmaps.map((roadmap) => (
                                <TableRow key={roadmap.id}>
                                    <TableCell className="font-medium">{roadmap.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-mono text-xs">
                                            {roadmap.slug}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground max-w-xs truncate">
                                        {roadmap.description}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(roadmap.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/roadmaps/${roadmap.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(roadmap.id, roadmap.title)}
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
