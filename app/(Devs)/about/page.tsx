"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
export default function Page() {
    const containerRef = useRef(null)

    useEffect
        (() => {
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
            <h1>About</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rem culpa modi, sunt in fugit enim. Iste, officia nihil perferendis dolor id, accusantium a doloribus molestias voluptates reprehenderit mollitia quae.</p>
        </div>
    )
}