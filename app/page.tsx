"use client"

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { ArrowRight, Blocks, BrainCircuit, Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";

export default function Home() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null);
  const featureCards = [
    {
      title: "Prompt Engineering",
      description: "Curated prompts and practical workflows to speed up execution.",
      icon: BrainCircuit,
    },
    {
      title: "SaaS Tooling",
      description: "Production-ready tools and templates for faster shipping.",
      icon: Blocks,
    },
    {
      title: "Growth Systems",
      description: "Simple frameworks for content, launch and distribution.",
      icon: Rocket,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".animate-splash", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.to(".profile-img", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <main className="pt-36 pb-20 px-6 max-w-6xl mx-auto relative z-10 space-y-24">
        <section className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <Badge className="animate-splash bg-amber-700 text-white hover:bg-amber-800">
            Build faster with InnateVoid
          </Badge>

          <div className="animate-splash profile-img relative w-36 h-36 rounded-full p-1 bg-linear-to-tr from-primary via-orange-500 to-amber-300 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
              <Image
                src="/download.png"
                alt="InnateVoid"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="animate-splash space-y-3">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              Ship ideas into
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">
                real products
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
              InnateVoid is your launchpad for AI workflows, prompt systems, and startup execution.
              Learn, build, and scale from one place.
            </p>
          </div>

          <div className="animate-splash flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => router.push("/register")}
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-full gap-2 bg-amber-800 text-white hover:bg-amber-900"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => router.push("/docs")}
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full"
            >
              Explore Docs
            </Button>
          </div>
        </section>

        <section className="animate-splash grid md:grid-cols-3 gap-4">
          {featureCards.map((feature) => (
            <Card key={feature.title} className="border-border/70 backdrop-blur-sm">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="animate-splash">
          <Card className="p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Discover</h3>
                </div>
                <p className="text-muted-foreground">Use ready-made resources, prompt libraries, and roadmaps.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Build</h3>
                </div>
                <p className="text-muted-foreground">Turn concepts into products with practical workflows and tooling.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Grow</h3>
                </div>
                <p className="text-muted-foreground">Join a builder-first community and ship faster every week.</p>
              </div>
            </div>
          </Card>
        </section>

        <section className="animate-splash">
          <Card className="p-8 md:p-12 text-center space-y-5 bg-linear-to-r from-primary/10 to-orange-500/10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Ready to build your next product?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From idea validation to launch, InnateVoid helps you move with confidence and clarity.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => router.push("/home")} size="lg" className="rounded-full px-8">
                Start Your Journey <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}