"use client"
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Loading from "../loading";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [promptCount, setPromptCount] = useState(0);
    useEffect(() => {
        async function fetchUser() {
            const user = await fetch("/api/me")
            const data = await user.json()
            setUser(data.user)
            setLoading(false)
        }
        async function fetchPromptCount() {
            const res = await fetch("/api/admin/prompts", { cache: "no-store" });
            if (res.ok) {
                const data = await res.json();
                setPromptCount(Array.isArray(data) ? data.length : 0);
            }
        }
        fetchUser()
        fetchPromptCount()
    }, [])
    if (loading) {
        return <Loading />
    }
    if (!user) {
        redirect("/login")
    }
    if (user.role !== "admin") {
        redirect("/")
    }
    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user.email}</p>
                </div>
                <Button variant="outline" onClick={() => authClient.signOut()}>Logout</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Prompts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{promptCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Prompt Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Link className="underline" href="/admin/prompts">View all prompts</Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Action</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Link className="underline" href="/admin/prompts/create">Create a new prompt</Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}