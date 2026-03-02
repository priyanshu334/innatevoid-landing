"use client"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function AdminPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchUser() {
            const user = await fetch("/api/me")
            const data = await user.json()
            setUser(data.user)
            setLoading(false)
        }
        fetchUser()
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
        <div>
            <h1>Welcome {user.email}</h1>
            <Button onClick={() => authClient.signOut()}>Logout</Button>
        </div>
    )
}