"use client"
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Loading from "../loading";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Map, Mail, Plus, ArrowRight } from "lucide-react";

export default function AdminPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ prompts: 0, skills: 0, roadmaps: 0, contacts: 0 });

    useEffect(() => {
        async function fetchUser() {
            const user = await fetch("/api/me")
            const data = await user.json()
            setUser(data.user)
            setLoading(false)
        }

        async function fetchStats() {
            const [promptsRes, skillsRes, roadmapsRes] = await Promise.allSettled([
                fetch("/api/admin/prompts", { cache: "no-store" }),
                fetch("/api/admin/skills", { cache: "no-store" }),
                fetch("/api/admin/roadmaps", { cache: "no-store" }),
            ])

            const getCount = async (res: PromiseSettledResult<Response>) => {
                if (res.status === "fulfilled" && res.value.ok) {
                    const d = await res.value.json()
                    return Array.isArray(d) ? d.length : 0
                }
                return 0
            }

            const [prompts, skills, roadmaps] = await Promise.all([
                getCount(promptsRes),
                getCount(skillsRes),
                getCount(roadmapsRes),
            ])
            setStats(s => ({ ...s, prompts, skills, roadmaps }))
        }

        fetchUser()
        fetchStats()
    }, [])

    if (loading) return <Loading />
    if (!user) redirect("/login")
    if (user.role !== "admin") redirect("/")

    const statCards = [
        { label: "Prompts", value: stats.prompts, icon: FileText, href: "/admin/prompts", color: "text-violet-500" },
        { label: "Skills", value: stats.skills, icon: BookOpen, href: "/admin/skills", color: "text-blue-500" },
        { label: "Roadmaps", value: stats.roadmaps, icon: Map, href: "/admin/roadmaps", color: "text-emerald-500" },
    ]

    const quickLinks = [
        { label: "Create Prompt", href: "/admin/prompts/create", icon: FileText },
        { label: "Create Skill", href: "/admin/skills/create", icon: BookOpen },
        { label: "Create Roadmap", href: "/admin/roadmaps/create", icon: Map },
        { label: "View Contact Queries", href: "/admin/contact-queries", icon: Mail },
    ]

    return (
        <div className="w-full p-6 md:p-10 space-y-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Welcome back, <span className="font-medium">{user.email}</span></p>
                </div>
                <Button variant="outline" onClick={() => authClient.signOut()}>Logout</Button>
            </div>

            {/* Stats */}
            <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Overview</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {statCards.map(({ label, value, icon: Icon, href, color }) => (
                        <Link key={href} href={href}>
                            <Card className="hover:border-foreground/20 transition-colors cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                                    <Icon className={`h-5 w-5 ${color}`} />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">{value}</p>
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                        View all <ArrowRight className="h-3 w-3" />
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {quickLinks.map(({ label, href, icon: Icon }) => (
                        <Link key={href} href={href}>
                            <Card className="hover:border-foreground/20 transition-colors cursor-pointer">
                                <CardContent className="pt-5 pb-4 flex items-center gap-3">
                                    <div className="p-2 rounded-md bg-muted">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">{label}</span>
                                    <Plus className="h-4 w-4 ml-auto text-muted-foreground" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}