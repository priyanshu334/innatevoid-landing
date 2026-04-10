"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, BookOpen, Compass, FolderKanban, Sparkles, Users, Zap, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [userName, setUserName] = useState<string>("Builder");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".animate-item", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });
        }, containerRef);
        return () => ctx.revert();
    }, [isLoading]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/me");
                const data = await res.json();
                if (data.user) {
                    setUserName(data.user.name?.split(' ')[0] || "Builder");
                }
            } catch (error) {
                console.error("Auth error", error);
            } finally {
                setIsLoading(false);
            }
        };
        getUser();
    }, []);

    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
            <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-orange-500/10 blur-[120px] rounded-full -z-10" />

            <main ref={containerRef} className="pt-32 pb-20 px-6 max-w-6xl mx-auto">

                {/* Hero Section */}
                <section className="animate-item mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <Badge variant="secondary" className="px-3 py-1 border-primary/20 bg-primary/5 text-primary">
                            <Zap className="w-3 h-3 mr-1 fill-current" /> System Online
                        </Badge>
                        <div className="h-[1px] w-12 bg-border" />
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Version 2.0.4</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                        {isLoading ? (
                            <span className="opacity-20">Initializing...</span>
                        ) : (
                            <>Hey {userName}, <br /><span className="text-muted-foreground">let's ship something.</span></>
                        )}
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
                        Your workspace is primed. Access your prompt libraries, technical documentation, and execution roadmaps in one command.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" onClick={() => router.push("/promptLib")} className="rounded-full px-8 shadow-lg shadow-primary/20">
                            Prompt Library <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => router.push("/docs")} className="rounded-full px-8">
                            Documentation
                        </Button>
                    </div>
                </section>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">

                    {/* Primary Focus Card */}
                    <Card className="animate-item md:col-span-8 bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden group">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Compass className="w-6 h-6 text-primary" />
                                </div>
                                <Badge variant="outline">Priority 01</Badge>
                            </div>
                            <CardTitle className="text-2xl mt-4">Suggested next steps</CardTitle>
                            <CardDescription>Actionable items to keep your momentum high.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-4">
                                {[
                                    "Complete your first prompt workflow",
                                    "Pick a roadmap and set a 7-day milestone",
                                    "Publish one project update"
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors border border-transparent hover:border-border cursor-pointer">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center text-xs font-mono">
                                            0{i + 1}
                                        </div>
                                        <span className="text-sm font-medium">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Secondary Action Card */}
                    <Card className="animate-item md:col-span-4 bg-gradient-to-br from-primary to-orange-600 text-primary-foreground border-none shadow-xl shadow-orange-500/10">
                        <CardHeader>
                            <Sparkles className="w-8 h-8 mb-2" />
                            <CardTitle className="text-2xl">Level Up</CardTitle>
                            <CardDescription className="text-primary-foreground/80">
                                Master AI-first workflows and scale your output.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="secondary" className="w-full mt-4 group" onClick={() => router.push("/skills")}>
                                Explore Skills
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Utilities Grid */}
                <section className="animate-item grid gap-6 md:grid-cols-3">
                    {[
                        { title: "Build Queue", icon: FolderKanban, desc: "Organize ideas into execution-ready tasks." },
                        { title: "Learning Path", icon: BookOpen, desc: "Practical guides designed for high-growth builders." },
                        { title: "Community", icon: Users, desc: "Stay accountable with others sharing wins." },
                    ].map((item, idx) => (
                        <Card key={idx} className="bg-card/30 hover:bg-card/80 transition-all border-border/50">
                            <CardHeader>
                                <item.icon className="w-5 h-5 text-primary mb-2" />
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                                <CardDescription>{item.desc}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </section>

                {/* Footer Social/Trust */}
                <section className="animate-item text-center pt-20">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-8 bg-border" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">Trusted Network</span>
                        <div className="h-px w-8 bg-border" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="font-black text-xl italic">GITHUB</span>
                        <span className="font-black text-xl italic">PRODUCT HUNT</span>
                        <span className="font-black text-xl italic">X.COM</span>
                    </div>
                </section>
            </main>
        </div>
    );
}