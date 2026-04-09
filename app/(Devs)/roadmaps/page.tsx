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
import { Map, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Roadmap = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getRoadmaps() {
      try {
        const res = await fetch("/api/roadmaps", { cache: "no-store" });
        const data = await res.json();
        setRoadmaps(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    }
    getRoadmaps();
  }, []);

  return (
    <div className="relative min-h-screen px-4 pb-20 pt-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl space-y-12">
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <Badge
            variant="secondary"
            className="border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm"
          >
            <Sparkles className="mr-1 inline h-3.5 w-3.5 text-amber-600" />
            Learning paths
          </Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
              Roadmaps{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
                Hub
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Structured paths from fundamentals to shipping—pick a track and move with clarity.
            </p>
          </div>

          <Card className="mx-auto max-w-xl border-border/60 bg-muted/30 text-left shadow-sm backdrop-blur-sm">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Full access and community perks are for InnateVoid members.
              </p>
              <Button asChild size="sm" className="shrink-0">
                <Link href="/register">Get started</Link>
              </Button>
            </CardContent>
          </Card>
        </header>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-border/50">
                <CardHeader className="space-y-3">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : roadmaps.length === 0 ? (
          <Card className="border-dashed border-border/70 bg-muted/20 py-16 text-center">
            <CardContent className="space-y-3">
              <Map className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="font-medium">No roadmaps yet</p>
              <p className="text-sm text-muted-foreground">
                Check back soon or explore the prompt library in the meantime.
              </p>
              <Button variant="outline" asChild>
                <Link href="/promptLib">Browse prompts</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((roadmap) => (
              <Card
                key={roadmap.id}
                className="group flex flex-col overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-all hover:border-primary/25 hover:shadow-md"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <Map className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="shrink-0 font-mono text-[10px] uppercase">
                      {roadmap.slug}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight tracking-tight">
                    {roadmap.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-base leading-relaxed">
                    {roadmap.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-2" />
                <CardFooter className="border-t border-border/50 bg-muted/20 pt-4">
                  <Button
                    className="w-full gap-2"
                    onClick={() =>
                      router.push(`/roadmaps/${encodeURIComponent(roadmap.slug)}`)
                    }
                  >
                    View roadmap
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
