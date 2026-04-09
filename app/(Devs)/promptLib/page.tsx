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
import { BookMarked, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Prompt = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  tags: string | null;
  difficulty: string | null;
  status: string;
  views: number;
  createdAt: string;
};

function parseTags(tags: string | null): string[] {
  if (!tags?.trim()) return [];
  return tags
    .split(/[,#]/)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export default function PromptLibPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/prompts", { cache: "no-store" });
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data ?? [];
        setPrompts(list);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen px-4 pb-20 pt-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute left-0 top-32 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl space-y-12">
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <Badge
            variant="secondary"
            className="border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm"
          >
            <Sparkles className="mr-1 inline h-3.5 w-3.5 text-amber-600" />
            AI workflows
          </Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
              Prompt{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
                Library
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Copy-ready prompts with difficulty and tags—tune them for your stack and ship faster.
            </p>
          </div>

          <Card className="mx-auto max-w-xl border-border/60 bg-muted/30 text-left shadow-sm backdrop-blur-sm">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Members get early drops and expanded collections.
              </p>
              <Button asChild size="sm" className="shrink-0">
                <Link href="/register">Become a member</Link>
              </Button>
            </CardContent>
          </Card>
        </header>

        {prompts.length === 0 ? (
          <Card className="border-dashed border-border/70 bg-muted/20 py-16 text-center">
            <CardContent className="space-y-3">
              <BookMarked className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="font-medium">No prompts available</p>
              <p className="text-sm text-muted-foreground">
                Prompts will show up here once they are published.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt) => {
              const tagList = parseTags(prompt.tags);
              const href = `/promptLib/${encodeURIComponent(prompt.slug)}`;
              return (
                <Card
                  key={prompt.id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(href);
                    }
                  }}
                  onClick={() => router.push(href)}
                  className="group flex cursor-pointer flex-col overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-all hover:border-primary/25 hover:shadow-md"
                >
                  <CardHeader className="space-y-3 pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <BookMarked className="h-5 w-5" />
                      </div>
                      {prompt.difficulty ? (
                        <Badge className="shrink-0 bg-amber-800 text-white hover:bg-amber-900">
                          {prompt.difficulty}
                        </Badge>
                      ) : null}
                    </div>
                    <CardTitle className="text-xl leading-tight tracking-tight">
                      {prompt.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-base leading-relaxed">
                      {prompt.description}
                    </CardDescription>
                    {tagList.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tagList.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-end pb-2">
                    <p className="text-xs text-muted-foreground">
                      {prompt.views != null ? `${prompt.views} views` : ""}
                      {prompt.status ? ` · ${prompt.status}` : ""}
                    </p>
                  </CardContent>
                  <CardFooter
                    className="border-t border-border/50 bg-muted/20 pt-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button className="w-full gap-2" asChild>
                      <Link href={href}>
                        View prompt
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
