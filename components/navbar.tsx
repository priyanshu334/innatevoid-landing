"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, LayoutDashboard, LogOut, Menu, Settings, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
// import { getCurrentUser } from "@/lib/auth"; // Remove this
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavItems = [
    {
        title: "Products",
        href: "#",
        children: [
            { title: "SaaS Platform", href: "#" },
            { title: "Mobile Apps", href: "#" },
            { title: "API Solutions", href: "#" },
        ],
    },
    {
        title: "Resources",
        href: "#",
        children: [
            { title: "Prompts Library", href: "/promptLib" },
            { title: "Develope skills", href: "/skills" },
            { title: "Templates", href: "/templates" },
            { title: "Automations", href: "/automations" },
            { title: "Roadmaps", href: "/resourses/roadmaps" }

        ],
    },
    {
        title: "Space",
        href: "#",
        children: [
            { title: "Discord Community", href: "#" },
            { title: "Latest Blogs", href: "https://blogs-next-liard.vercel.app/" },
            { title: "Documentation", href: "/docs" },
        ],
    },
    {
        title: "Language",
        href: "#",
        children: [
            { title: "English", href: "#" },
            { title: "Hindi", href: "#" },
        ],
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Pricing",
        href: "/prising",
    },

];

export function Navbar() {
    const router = useRouter();
    const navRef = useRef<HTMLElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch User Session
        const checkUser = async () => {
            try {
                const res = await fetch("/api/me");
                const data = await res.json();
                setUser(data.user);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };
        checkUser();

        // Animation
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -50,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.2,
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        setUser(null);
        router.push("/");
        router.refresh(); // Refresh server components
    };



    return (
        <>
            <nav ref={navRef} className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[85%] lg:w-[75%] xl:w-[65%] flex items-center justify-between px-6 py-3 bg-background/70 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-primary rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center">
                        <div className="w-4 h-4 bg-background rounded-full animate-pulse" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">
                        Innate<span className="text-amber-600 italic">void</span>
                    </span>
                </Link>

                {/* Desktop Navigation (Center) */}
                <div className="hidden lg:flex items-center gap-1">
                    {NavItems.map((item) => (
                        <div key={item.title}>
                            {item.children ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="gap-1 hover:bg-primary/10 rounded-full px-4">
                                            {item.title}
                                            <ChevronDown className="w-4 h-4 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="min-w-[180px] rounded-xl p-2">
                                        {item.children.map((child) => (
                                            <DropdownMenuItem key={child.title} asChild>
                                                <Link href={child.href} className="cursor-pointer">{child.title}</Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                                    <Link href={item.href}>{item.title}</Link>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:block">
                        <ModeToggle />
                    </div>

                    {loading ? (
                        <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                    ) : user ? (
                        /* PROFILE DROPDOWN */
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-border/50 p-0 overflow-hidden hover:ring-2 ring-primary/20 transition-all">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                                        <AvatarFallback className="bg-amber-100 text-amber-900 font-bold">
                                            {user.name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2" align="end">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold leading-none">{user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer rounded-lg">
                                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer rounded-lg">
                                    <Settings className="mr-2 h-4 w-4" /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer rounded-lg">
                                    <LogOut className="mr-2 h-4 w-4" /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        /* AUTH BUTTONS */
                        <div className="flex items-center gap-2">
                            <Button onClick={() => router.push("/login")} variant="ghost" size="sm" className="hidden md:flex rounded-full px-5">
                                Login
                            </Button>
                            <Button
                                onClick={() => router.push("/register")}
                                size="sm"
                                className="px-6 font-bold rounded-full shadow-lg shadow-amber-900/20 transition-all hover:scale-105 bg-amber-800 text-white hover:bg-amber-900"
                            >
                                Join Now
                            </Button>
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden rounded-full h-9 w-9 bg-primary/5"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md lg:hidden flex flex-col pt-32 px-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-6">
                        {NavItems.map((item) => (
                            <div key={item.title} className="space-y-3">
                                <div className="text-xl font-bold text-primary/80 px-2">{item.title}</div>
                                {item.children ? (
                                    <div className="grid grid-cols-1 gap-2 pl-4 border-l border-primary/20">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.title}
                                                href={child.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-muted-foreground hover:text-primary py-1 transition-colors"
                                            >
                                                {child.title}
                                            </Link>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                        <div className="pt-8 border-t border-border mt-4 flex flex-col gap-4">
                            <Button onClick={() => router.push("/register")} className="w-full  py-6 text-lg font-bold rounded-lg bg-amber-800 text-white">Join Now</Button>
                            <Button onClick={() => router.push("/login")} variant="outline" className="w-full rounded-lg py-6 text-lg">Login</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}