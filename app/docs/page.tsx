import { ChevronRight, Rocket, Sparkles, Zap } from "lucide-react"

export default function Page() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    New v1.0.0 is out
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">Introduction</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Build stunning, high-performance landing pages in minutes with InnateVoid's production-ready component library.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-8 rounded-3xl border border-border/50 bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Quick Start</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        Learn how to get InnateVoid up and running in your project in less than 5 minutes.
                    </p>
                    <button className="flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                        Start building <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="group p-8 rounded-3xl border border-border/50 bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Performance</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        Optimized for core web vitals and blazing fast load times out of the box.
                    </p>
                    <button className="flex items-center gap-2 text-sm font-bold text-amber-500 group-hover:translate-x-1 transition-transform">
                        View metrics <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Why InnateVoid?</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                        InnateVoid was built with one goal: to bridge the gap between complex engineering and beautiful design. We provide a set of highly customizable, accessible, and performant components that allow you to focus on what matters—your product.
                    </p>
                    <ul>
                        <li><strong>Aesthetic by Default:</strong> Every component is designed to look premium.</li>
                        <li><strong>Developer Friendly:</strong> TypeScript first, fully documented, and easy to extend.</li>
                        <li><strong>Built for Conversion:</strong> Specifically designed for modern SaaS landing pages.</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}