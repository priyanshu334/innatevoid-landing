"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".animate-item", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

            gsap.to(".floating-card", {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-background flex items-center justify-center px-6"
        >
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

                {/* About Section */}
                <div className="animate-item space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        About Us
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        We build modern digital experiences with performance, design,
                        and scalability in mind. Our goal is to create products that
                        users love and businesses trust.
                    </p>
                </div>

                {/* Team Section */}
                <div className="animate-item floating-card space-y-6 bg-card border rounded-2xl p-8 shadow-sm">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Our Team
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        A passionate group of developers, designers, and thinkers
                        working together to push innovation forward.
                    </p>
                </div>

            </div>
        </div>
    );
}