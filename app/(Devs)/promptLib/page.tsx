"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Page() {
    const router = useRouter()
    const [prompts, setPrompts] = useState<any[]>([])
    useEffect(() => {
        const fetchPrompts = async () => {
            const res = await fetch("/api/prompts")
            const data = await res.json()
            setPrompts(data.data)
        }
        fetchPrompts()
    }, [])
    return (
        <div className="flex flex-col gap-4 min-h-screen px-6 py-4 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 ">
                <h1 className="text-4xl font-bold tracking-tighter">Prompt <span className="text-amber-600">HUB</span></h1>
                <p className="text-muted-foreground text-lg">A collection of prompts for AI</p>
                <Badge variant="secondary" className="px-6  py-3 text-xs font-bold tracking-tight rounded-2xl animate-pulse flex items-center gap-2">
                    To Access prompts you need to be a member of Innatevoid
                    <Button className="ml-2" variant="default">Get Started</Button>

                </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prompts.map((prompt, index) => (

                    <Card key={index} onClick={() => (router.push(`/promptLib/${prompt.title}`))}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>{prompt.title}</CardTitle>
                                    <CardDescription>{prompt.description}</CardDescription>
                                </div>
                                <div>
                                    <Badge variant="secondary" className="px-4 py-1 text-xs font-bold tracking-tight">
                                        {prompt.difficulty}
                                    </Badge>
                                </div>

                            </div>
                        </CardHeader>


                        <CardFooter>
                            <Button>View Prompt</Button>
                        </CardFooter>
                    </Card>
                ))}

            </div>
        </div>
    )
}