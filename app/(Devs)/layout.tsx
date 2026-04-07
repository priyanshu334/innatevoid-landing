// Removed Navbar import

import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen">
            {/* Top Notification Bar */}
            {/* <div className="w-full h-12 bg-primary/5 flex items-center justify-center border-b border-border/50 relative overflow-hidden">
                <Badge variant="secondary" className="px-4 py-1 text-xs font-bold tracking-tight animate-pulse">
                    ✨ UPCOMING LAUNCH — MARCH 4TH
                </Badge>
            </div> */}

            {/* Floating Navbar */}
            {/* Floating Navbar removed as it is now global */}


            {/* Main Content Area */}
            <main className="pt-24">


                {children}
            </main>
        </div>
    );
}