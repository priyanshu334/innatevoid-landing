import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { LayoutDashboard, FileText, BookOpen, Map, Mail } from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/prompts", label: "Prompts", icon: FileText },
    { href: "/admin/skills", label: "Skills", icon: BookOpen },
    { href: "/admin/roadmaps", label: "Roadmaps", icon: Map },
    { href: "/admin/contact-queries", label: "Contact Queries", icon: Mail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="flex pt-28">
                <aside className="hidden md:flex w-64 flex-col border-r p-4 gap-1 min-h-[calc(100vh-7rem)] shrink-0">
                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider px-3 mb-2">
                        Admin Panel
                    </p>
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                            href={href}
                        >
                            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                            {label}
                        </Link>
                    ))}
                </aside>
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    )
}