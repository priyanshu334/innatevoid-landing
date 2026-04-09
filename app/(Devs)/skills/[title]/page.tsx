import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { skills } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title: raw } = await params;
  const decoded = decodeURIComponent(raw);

  const rows = await db.select().from(skills).where(eq(skills.name, decoded)).limit(1);
  const skill = rows[0];
  if (!skill) {
    notFound();
  }

  return (
    <div className="relative min-h-screen px-4 pb-20 pt-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute right-0 top-24 h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-[90px]" />

      <article className="relative mx-auto max-w-3xl space-y-8">
        <Button variant="ghost" size="sm" className="-ml-2 gap-2 text-muted-foreground" asChild>
          <Link href="/skills">
            <ArrowLeft className="h-4 w-4" />
            All skills
          </Link>
        </Button>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <GraduationCap className="h-3 w-3" />
              Skill
            </Badge>
            {skill.roadmapId ? (
              <Badge variant="secondary" className="font-mono text-[10px]">
                Linked roadmap
              </Badge>
            ) : null}
          </div>
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">{skill.name}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {skill.description || "More detail for this skill will appear here as we expand the library."}
          </p>
        </header>

        <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Next steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Set a short practice goal, build one small deliverable, and add notes for what to revisit.</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/promptLib">Find a matching prompt</Link>
            </Button>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
