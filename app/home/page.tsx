"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Github } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null);

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

    return (
        <div ref={containerRef} className="pt-20 px-6 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center justify-center gap-8">
                <h1 className="animate-item text-4xl md:text-7xl font-black text-center leading-tight tracking-tighter">
                    Unleash Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-700">
                        Digital Potential
                    </span>
                </h1>

                <p className="animate-item text-center text-muted-foreground text-xl max-w-2xl leading-relaxed">
                    Innatevoid provides the tools, expertise, and community you need to build the next generation of software. Simple, powerful, and built for speed.
                </p>

                <div className="animate-item flex flex-wrap justify-center gap-4 pt-4">
                    <Button onClick={() => router.push("/register")} size="lg" className="rounded-lg px-12 py-6 text-lg bg-amber-600 hover:bg-amber-700 text-white gap-2 group">
                        Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" className="rounded- lg px-12 py-6 text-lg gap-2">
                        Join Discord
                    </Button>
                </div>

                <div className="animate-item flex items-center gap-8 pt-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 font-bold text-sm">
                        GITHUB
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-2 font-bold text-sm">
                        PRODUCT HUNT
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-2 font-bold text-sm">
                        TECHCRUNCH
                    </div>
                </div>
            </div>
        </div>
    );
}