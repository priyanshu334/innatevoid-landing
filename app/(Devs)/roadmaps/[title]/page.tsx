import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { roadmaps } from "@/lib/schema";
import { eq, or } from "drizzle-orm";
import { ArrowLeft, Map } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title: raw } = await params;
  const decoded = decodeURIComponent(raw);

  const rows = await db
    .select()
    .from(roadmaps)
    .where(or(eq(roadmaps.slug, decoded), eq(roadmaps.title, decoded)))
    .limit(1);

  const roadmap = rows[0];
  if (!roadmap) {
    notFound();
  }

  return (
    <div className="relative min-h-screen px-4 pb-20 pt-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

      <article className="relative mx-auto max-w-3xl space-y-8">
        <Button variant="ghost" size="sm" className="-ml-2 gap-2 text-muted-foreground" asChild>
          <Link href="/roadmaps">
            <ArrowLeft className="h-4 w-4" />
            All roadmaps
          </Link>
        </Button>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">
              {roadmap.slug}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Map className="h-3 w-3" />
              Roadmap
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">{roadmap.title}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{roadmap.description}</p>
        </header>

        <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">How to use this path</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Work through topics in order, practice with small projects, and revisit weak spots.</p>
            <p>
              Pair this roadmap with the{" "}
              <Link href="/skills" className="font-medium text-foreground underline underline-offset-4">
                skills hub
              </Link>{" "}
              for deeper dives on specific tools.
            </p>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
