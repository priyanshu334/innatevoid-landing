"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter()
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".animate-splash", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Subtle float animation for the image
      gsap.to(".profile-img", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-2xl space-y-8 relative z-10">

        {/* Profile Image */}
        <div className="animate-splash profile-img relative w-44 h-44 rounded-full p-1 bg-gradient-to-tr from-primary via-orange-500 to-amber-300 shadow-2xl">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
            <Image
              src="/download.png"
              alt="Priyanshu"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <div className="animate-splash space-y-2">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
              InnateVoid
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="animate-splash text-muted-foreground text-xl leading-relaxed max-w-lg">
          Building in public. Startups, code, AI, and productivity —
          the space where ideas become execution.
        </p>

        {/* Button */}
        <div className="animate-splash">
          <Button
            onClick={() => router.push("/home")}
            size="lg"
            className="px-10 py-8 text-xl font-bold rounded-full shadow-2xl shadow-primary/20 hover:scale-105 transition-all duration-300 group gap-2 bg-amber-800 text-white hover:bg-amber-900 hover:text-white"
          >
            Start Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </div>
  );
}