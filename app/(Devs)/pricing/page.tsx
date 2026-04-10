"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PricingPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation for text and cards
            gsap.from(".animate-item", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.2,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-background py-20 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto text-center space-y-4">
                <Badge variant="outline" className="animate-item border-amber-600/50 text-amber-700">
                    Flexible Pricing
                </Badge>

                <h1 className="animate-item text-4xl md:text-6xl font-extrabold tracking-tight">
                    Pricing<span className="text-amber-600"> of Excellence</span>
                </h1>

                <p className="animate-item text-muted-foreground text-lg max-w-2xl mx-auto">
                    Choose a plan that fits your journey with InnateVoid. Transparent pricing for every stage of growth.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="animate-item mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Free Plan */}
                <Card className="group rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-muted">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">Free</CardTitle>
                        <CardDescription>Perfect to get started</CardDescription>
                        <div className="text-5xl font-bold mt-4 tracking-tighter">
                            ₹0<span className="text-base font-normal text-muted-foreground">/mo</span>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4 py-6">
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-amber-600" /> Access to basic features
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-amber-600" /> Community support
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground/60 line-through">
                                Advanced analytics
                            </li>
                        </ul>
                    </CardContent>

                    <CardFooter>
                        <Button className="w-full" variant="outline">
                            Get Started
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="group rounded-2xl shadow-lg border-2 border-amber-600 relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur-sm">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-1 shadow-md">
                            Most Popular
                        </Badge>
                    </div>

                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                        <CardDescription>For serious builders</CardDescription>
                        <div className="text-5xl font-bold mt-4 tracking-tighter">
                            ₹1,600<span className="text-base font-normal text-muted-foreground">/mo</span>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4 py-6">
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2 font-medium">
                                <CheckIcon className="text-amber-600" /> Everything in Free
                            </li>
                            <li className="flex items-center gap-2 font-medium">
                                <CheckIcon className="text-amber-600" /> Unlimited access
                            </li>
                            <li className="flex items-center gap-2 font-medium">
                                <CheckIcon className="text-amber-600" /> Priority support
                            </li>
                            <li className="flex items-center gap-2 font-medium">
                                <CheckIcon className="text-amber-600" /> Advanced analytics
                            </li>
                        </ul>
                    </CardContent>

                    <CardFooter>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20">
                            Upgrade to Pro
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

// Small helper icon component
function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className={`w-4 h-4 ${className}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
}