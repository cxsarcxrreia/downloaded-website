"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

interface SectionRevealProps {
    children: ReactNode;
    delay?: number;
}

/**
 * Wrap any section with <SectionReveal>...</SectionReveal>
 * - Animates once when ~15% of the element is visible
 * - Fade-in + slide-up
 * - Respects prefers-reduced-motion
 */
export default function SectionReveal({ children, delay = 0 }: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Respect reduced motion
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (media.matches) {
            setVisible(true);
            return;
        }

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el); // animate once
                }
            },
            {
                root: null,
                threshold: 0.15,
                rootMargin: "0px 0px -10% 0px", // trigger a bit before fully centered
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={[
                // base transition
                "transition-all duration-700 ease-out will-change-transform",
                // initial vs revealed
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
        >
            {children}
        </div>
    );
}
