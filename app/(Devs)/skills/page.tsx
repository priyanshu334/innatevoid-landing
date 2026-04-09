"use client";

import Loading from "@/app/loading";
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
import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Skill = {
  id: string;
  name: string;
  description: string | null;
  roadmapId: string | null;
  createdAt: string;
  updatedAt?: string;
};

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<Skill[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getSkills() {
      try {
        const res = await fetch("/api/skills", { cache: "no-store" });
        const data = await res.json();
        setSkills(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    }
    getSkills();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-item", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading, skills.length]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen px-4 pb-20 pt-4 sm:px-6 md:px-8"
    >
      <div className="pointer-events-none absolute right-0 top-24 h-[380px] w-[380px] rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl space-y-12">
        <header className="animate-item mx-auto max-w-3xl space-y-6 text-center">
          <Badge
            variant="secondary"
            className="border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm"
          >
            <Sparkles className="mr-1 inline h-3.5 w-3.5 text-amber-600" />
            Skill stack
          </Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
              Skills{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
                Hub
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Practical skills tied to roadmaps—deepen what you need for your next ship.
            </p>
          </div>

          <Card className="mx-auto max-w-xl border-border/60 bg-muted/30 text-left shadow-sm backdrop-blur-sm">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Members get curated paths and updates as we add new skills.
              </p>
              <Button asChild size="sm" className="shrink-0">
                <Link href="/register">Join InnateVoid</Link>
              </Button>
            </CardContent>
          </Card>
        </header>

        {skills.length === 0 ? (
          <Card className="animate-item border-dashed border-border/70 bg-muted/20 py-16 text-center">
            <CardContent className="space-y-3">
              <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="font-medium">No skills published yet</p>
              <p className="text-sm text-muted-foreground">
                Roadmaps and skills will appear here as they go live.
              </p>
              <Button variant="outline" asChild>
                <Link href="/roadmaps">View roadmaps</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <Card
                key={skill.id}
                className="animate-item group flex flex-col overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-all hover:border-primary/25 hover:shadow-md"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    {skill.roadmapId ? (
                      <Badge variant="outline" className="max-w-[140px] truncate font-mono text-[10px]">
                        Roadmap linked
                      </Badge>
                    ) : null}
                  </div>
                  <CardTitle className="text-xl leading-tight tracking-tight">
                    {skill.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-base leading-relaxed">
                    {skill.description || "Explore this skill to see notes and resources."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-2" />
                <CardFooter className="border-t border-border/50 bg-muted/20 pt-4">
                  <Button
                    className="w-full gap-2"
                    onClick={() =>
                      router.push(`/skills/${encodeURIComponent(skill.name)}`)
                    }
                  >
                    Open skill
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
