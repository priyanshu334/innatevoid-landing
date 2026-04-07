import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Rocket, BookOpen, Target, Brain } from "lucide-react"

const SaasPlatforms = [
    {
        title: "AI Teacher Toolkit",
        href: "/products/ai-teacher",
        description: "Generate question papers, worksheets, and class materials instantly using AI.",
        icon: Brain
    },
    {
        title: "X Days Challenge",
        href: "/products/x-days-challenge",
        description: "Build habits, track progress, and stay consistent with structured challenges.",
        icon: Target
    },
    {
        title: "Content Automation Hub",
        href: "/products/content-automation",
        description: "Automate your LinkedIn, X, and short-form content workflow.",
        icon: Rocket
    },
    {
        title: "Smart Notes App",
        href: "/products/notes",
        description: "Organize, search, and manage notes with powerful tagging and AI summaries.",
        icon: BookOpen
    }
]

export default function Page() {
    return (
        <div className="container mx-auto px-4 py-12">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">
                    SaaS Platforms
                </h1>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                    A collection of SaaS products I’m building to solve real-world problems using AI and modern tech.
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SaasPlatforms.map((platform, index) => {
                    const Icon = platform.icon

                    return (
                        <Card key={index} className="hover:shadow-lg transition">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-2 rounded-xl bg-primary/10">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>{platform.title}</CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <CardDescription className="mb-4">
                                    {platform.description}
                                </CardDescription>

                                <Link href={platform.href}>
                                    <Button className="w-full">
                                        View Product
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

        </div>
    )
}