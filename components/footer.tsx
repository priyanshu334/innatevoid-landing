"use client"

import Link from "next/link"
import { Github, Twitter, MessageSquare, Mail } from "lucide-react"

const footerLinks = {
  products: [
    { name: "SaaS Platforms", href: "/products/saas-pltforms" },
    { name: "Mobile Apps", href: "#" },
    { name: "API Solutions", href: "#" },
  ],
  resources: [
    { name: "Prompts Library", href: "/promptLib" },
    { name: "Roadmaps", href: "/roadmaps" },
    { name: "Skills", href: "/skills" },
    { name: "Templates", href: "/templates" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/50 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2 lg:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-black tracking-tighter">
              Innate<span className="text-amber-600 italic">void</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Empowering builders with AI-first workflows, premium templates, and actionable roadmaps to ship faster than ever.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors">
              <Twitter className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="#" className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors">
              <Github className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="#" className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="mailto:support@innatevoid.com" className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Products</h4>
          <ul className="space-y-4">
            {footerLinks.products.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="space-y-4">
            {footerLinks.resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-4">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
            {footerLinks.legal.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} INNATEVOID. ALL RIGHTS RESERVED.
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          BUILT BY BUILDERS FOR BUILDERS.
        </p>
      </div>
    </footer>
  )
}
