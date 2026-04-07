"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, BookOpen, Compass, FolderKanban, Sparkles, Users } from "lucide-react";
import { useRouter } from "next/navigation";
// Removed Navbar import

export default function Home() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null);
    const [userName, setUserName] = useState<string>("Builder");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".animate-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        try {
            const res = await fetch("/api/me");
            const data = await res.json();
            if (!data.user) {
                router.push("/login");
                return;
            }
            setUserName(data.user.name || data.user.email || "Builder");
        } catch (error) {
            router.push("/login");
            return;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navbar removed as it is now global */}

            <main ref={containerRef} className="pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-12">
                <section className="animate-item">
                    <Badge className="mb-4 bg-amber-700 text-white hover:bg-amber-800">
                        Welcome back
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                        {isLoading ? "Preparing your workspace..." : `Hey ${userName}, let us ship something today.`}
                    </h1>
                    <p className="text-muted-foreground text-lg mt-4 max-w-3xl">
                        Your personalized home for prompts, docs, and product execution. Pick a direction and keep momentum.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <Button onClick={() => router.push("/promptLib")} className="gap-2">
                            Open Prompt Library <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" onClick={() => router.push("/docs")}>
                            Read Docs
                        </Button>
                        <Button variant="outline" onClick={() => router.push("/resourses/roadmaps")}>
                            Explore Roadmaps
                        </Button>
                    </div>
                </section>

                <section className="animate-item grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FolderKanban className="w-5 h-5 text-primary" />
                                Build Queue
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Organize ideas into execution-ready tasks and keep shipping consistently.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary" />
                                Learning Path
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Follow practical guides designed for builders, developers, and founders.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                Community
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Stay accountable with a focused community sharing progress and wins.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="animate-item grid gap-4 md:grid-cols-2">
                    <Card className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            <Compass className="w-5 h-5 text-primary" />
                            Suggested next steps
                        </h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>Complete your first prompt workflow from the library.</li>
                            <li>Pick a roadmap and set a 7-day milestone.</li>
                            <li>Publish one project update in your community channel.</li>
                        </ul>
                    </Card>
                    <Card className="p-6 md:p-8 bg-linear-to-r from-primary/10 to-orange-500/10">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            Ready to level up?
                        </h2>
                        <p className="text-muted-foreground mb-5">
                            Move from learning to launching with focused systems and AI-first workflows.
                        </p>
                        <Button onClick={() => router.push("/skills")} className="gap-2">
                            Explore Skills <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Card>
                </section>

                <section className="animate-item text-center pt-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Trusted by builders shipping every week
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm font-semibold text-muted-foreground">
                        <span>GITHUB</span>
                        <span>PRODUCT HUNT</span>
                        <span>TECHCRUNCH</span>
                        <span>X</span>
                    </div>
                </section>
            </main>
        </div>
    );
}