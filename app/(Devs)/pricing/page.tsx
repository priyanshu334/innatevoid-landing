"use client"
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
import gsap from "gsap"
export default function Page() {
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
        <div ref={containerRef} className="min-h-screen bg-background py-20 px-6">
            <div className="max-w-6xl mx-auto text-center space-y-4">


                <h1 className="animate-item text-4xl md:text-5xl font-bold tracking-tight">
                    Pricing<span className="text-amber-600"> of Excellence</span>
                </h1>

                <p className="animate-item text-muted-foreground text-lg max-w-2xl mx-auto">
                    Choose a plan that fits your journey with InnateVoid.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="animate-item mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <Card className="rounded-2xl shadow-sm">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl">Free</CardTitle>
                        <CardDescription>Perfect to get started</CardDescription>
                        <div className="text-4xl font-bold mt-4">
                            ₹0<span className="text-base font-normal text-muted-foreground"> /month</span>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <p>✔ Access to basic features</p>
                        <p>✔ Community support</p>
                        <p>✔ Limited usage</p>
                    </CardContent>

                    <CardFooter>
                        <Button className="w-full" variant="outline">
                            Get Started
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="rounded-2xl shadow-lg border-2 border-primary relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-background text-white px-3 py-1 text-xs">
                            Most Popular
                        </Badge>
                    </div>

                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <CardDescription>For serious builders</CardDescription>
                        <div className="text-4xl font-bold mt-4">
                            $20<span className="text-base font-normal text-muted-foreground"> /month</span>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <p>✔ Everything in Free</p>
                        <p>✔ Unlimited access</p>
                        <p>✔ Priority support</p>
                        <p>✔ Advanced analytics</p>
                    </CardContent>

                    <CardFooter>
                        <Button className="w-full bg-amber-700 text-white">
                            Upgrade to Pro
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}