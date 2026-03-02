import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default async function PromptDetailPage({
    params,
}: {
    params: Promise<{ title: string }>;
}) {
    const { title } = await params;

    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    const result = await fetch(`/api/pompts/title/${title}`)
    const prompt = await result.json()
    return (
        <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-4xl font-bold">{prompt.result[0].title}</h1>
                <p className="text-muted-foreground mt-2">
                    {prompt.result[0].description}
                </p>
            </div>

            <div className="flex gap-3">
                {prompt.result[0].difficulty && (
                    <Badge variant="secondary">
                        {prompt.difficulty}
                    </Badge>
                )}
                {prompt.result[0].tags && (
                    <Badge variant="outline">
                        {prompt.result[0].tags}
                    </Badge>
                )}
            </div>

            <Card className="p-6 whitespace-pre-wrap text-sm leading-relaxed bg-muted/40">
                {prompt.result[0].content}
            </Card>
        </div>
    );
}