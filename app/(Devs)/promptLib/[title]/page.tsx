import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { prompts } from "@/lib/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { ArrowLeft, BookMarked, Eye } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

function parseTags(tags: string | null): string[] {
  if (!tags?.trim()) return [];
  return tags
    .split(/[,#]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title: raw } = await params;
  const decoded = decodeURIComponent(raw);

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const rows = await db
    .select()
    .from(prompts)
    .where(
      and(
        or(eq(prompts.slug, decoded), eq(prompts.title, decoded)),
        isNull(prompts.deletedAt)
      )
    )
    .limit(1);

  const prompt = rows[0];
  if (!prompt) {
    notFound();
  }

  const tagList = parseTags(prompt.tags);

  return (
    <div className="relative min-h-screen px-4 pb-20 pt-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[min(90vw,600px)] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

      <article className="relative mx-auto max-w-3xl space-y-8">
        <Button variant="ghost" size="sm" className="-ml-2 gap-2 text-muted-foreground" asChild>
          <Link href="/promptLib">
            <ArrowLeft className="h-4 w-4" />
            Prompt library
          </Link>
        </Button>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <BookMarked className="h-3 w-3" />
              Prompt
            </Badge>
            {prompt.difficulty ? (
              <Badge className="bg-amber-800 text-white hover:bg-amber-900">{prompt.difficulty}</Badge>
            ) : null}
            {prompt.status ? (
              <Badge variant="secondary">{prompt.status}</Badge>
            ) : null}
            <Badge variant="outline" className="gap-1 font-normal">
              <Eye className="h-3 w-3" />
              {prompt.views} views
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">{prompt.title}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{prompt.description}</p>
          {tagList.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tagList.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </header>

        <Card className="overflow-hidden border-border/60 bg-muted/30 shadow-sm backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
              {prompt.content}
            </pre>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
