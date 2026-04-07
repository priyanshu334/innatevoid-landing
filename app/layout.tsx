import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "InnateVoid | Launchpad for Builders & AI Workflows",
  description: "Accelerate your product execution with curated AI prompts, production-ready SaaS templates, and actionable roadmaps for builders and founders.",
  keywords: ["AI workflows", "Prompt engineering", "SaaS templates", "Startup execution", "Product roadmaps", "Developer tools"],
  openGraph: {
    title: "InnateVoid | Ship Faster with AI Systems",
    description: "Your launchpad for AI workflows, prompt systems, and startup execution.",
    url: "https://innatevoid.com",
    siteName: "InnateVoid",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InnateVoid | Launchpad for Builders",
    description: "Curated AI prompts, templates, and roadmaps to speed up execution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
