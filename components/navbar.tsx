"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
            { title: "Templates", href: "#" },
            { title: "Automations", href: "#" },
        ],
    },
    {
        title: "Space",
        href: "#",
        children: [
            { title: "Discord Community", href: "#" },
            { title: "Latest Blogs", href: "#" },
            { title: "Documentation", href: "#" },
        ],
    },
    {
        title: "About",
        href: "#",
    },
    {
        title: "Pricing",
        href: "#",
    },
];

export function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
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

    return (
        <>
            <nav
                ref={navRef}
                className="
          fixed
          top-8
          left-1/2
          -translate-x-1/2
          z-50
          w-[95%]
          md:w-[85%]
          lg:w-[75%]
          xl:w-[65%]
          flex
          items-center
          justify-between
          px-6
          py-3
          bg-background/70
          backdrop-blur-xl
          border
          border-border/50
          rounded-2xl
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        "
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-primary rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center">
                        <div className="w-4 h-4 bg-background rounded-full animate-pulse" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">
                        Innate<span className="text-primary italic">void</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {NavItems.map((item) => (
                        <div key={item.title}>
                            {item.children ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="gap-1 hover:bg-primary/10 hover:text-primary transition-all rounded-full px-4">
                                            {item.title}
                                            <ChevronDown className="w-4 h-4 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="min-w-[160px] rounded-xl p-2">
                                        {item.children.map((child) => (
                                            <DropdownMenuItem key={child.title} asChild>
                                                <Link href={child.href} className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium">
                                                    {child.title}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary transition-all rounded-full px-4 text-sm font-medium">
                                    <Link href={item.href}>{item.title}</Link>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <div className="hidden sm:block">
                        <ModeToggle />
                    </div>
                    <Button variant="ghost" size="sm" className="hidden md:flex rounded-full">
                        Login
                    </Button>
                    <Button
                        size="sm"
                        className="px-6 rounded-full font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105"
                    >
                        Join Now
                    </Button>

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
                            <Button className="w-full  py-6 text-lg font-bold rounded-full bg-amber-800 text-white">Join Now</Button>
                            <Button variant="outline" className="w-full rounded-full py-6 text-lg">Login</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}