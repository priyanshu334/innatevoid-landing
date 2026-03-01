"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, ChevronRight, Files, Home, Layout, Settings, Terminal, Search, ExternalLink } from "lucide-react"

const docsNavigation = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs", icon: Home },
            { title: "Installation", href: "/docs/installation", icon: Terminal },
            { title: "Architecture", href: "/docs/architecture", icon: Layout },
        ]
    },
    {
        title: "Components",
        items: [
            { title: "Navbar", href: "/docs/components/navbar", icon: Files },
            { title: "Hero Sections", href: "/docs/components/hero", icon: Files },
            { title: "Buttons", href: "/docs/components/buttons", icon: Files },
            { title: "Forms", href: "/docs/components/forms", icon: Files },
        ]
    },
    {
        title: "Advanced",
        items: [
            { title: "Theming", href: "/docs/theming", icon: Settings },
            { title: "API Reference", href: "/docs/api", icon: BookOpen },
        ]
    }
]

export function DocsSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed top-28 left-[calc(50%-45%)] md:left-[calc(50%-42.5%)] lg:left-[calc(50%-37.5%)] xl:left-[calc(50%-32.5%)] w-64 h-[calc(100vh-120px)] overflow-y-auto hidden md:block">
            <div className="flex flex-col gap-8 pr-6 pb-10">
                {/* Search Bar Placeholder */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search docs..."
                        className="w-full bg-muted/50 border border-border/50 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                    <kbd className="absolute right-2 top-1/2 -translate-y-1/2 h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 hidden sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>

                <nav className="flex flex-col gap-8">
                    {docsNavigation.map((section) => (section.items.length > 0 && (
                        <div key={section.title} className="flex flex-col gap-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 px-4">
                                {section.title}
                            </h3>
                            <div className="flex flex-col gap-1">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                                                isActive
                                                    ? "bg-primary/10 text-primary shadow-[0_4px_12px_rgba(var(--primary),0.1)]"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className={cn(
                                                "w-4 h-4 transition-transform duration-200",
                                                isActive ? "scale-110" : "group-hover:scale-110"
                                            )} />
                                            {item.title}
                                            {isActive && (
                                                <div className="absolute left-0 w-1 h-5 bg-primary rounded-full" />
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )))}
                </nav>

                <div className="mt-4 p-4 rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 space-y-3">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                        Need help? <ExternalLink className="w-3 h-3" />
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Join our Discord community to get help from our team and other builders.
                    </p>
                    <Link
                        href="#"
                        className="inline-block text-xs font-bold text-primary hover:underline"
                    >
                        Join Discord
                    </Link>
                </div>
            </div>
        </aside>
    )
}
