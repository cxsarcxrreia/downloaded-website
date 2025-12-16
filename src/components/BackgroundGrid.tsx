"use client";

import { useEffect, useRef } from "react";

export default function BackgroundGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        const DOT_SPACING = 30; // Closer spacing for Voxel look
        const DOT_RADIUS = 1.5;
        const INTERACTION_RADIUS = 150;

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const width = canvas.width;
            const height = canvas.height;

            // Calculate offsets to center the grid
            const startX = (width % DOT_SPACING) / 2;
            const startY = (height % DOT_SPACING) / 2;

            // dark gray for base dots
            ctx.fillStyle = "#333";

            for (let x = startX; x < width; x += DOT_SPACING) {
                for (let y = startY; y < height; y += DOT_SPACING) {

                    // Calculate distance to mouse
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let currentRadius = DOT_RADIUS;
                    let currentAlpha = 0.2; // Base opacity

                    // Interaction effect
                    if (distance < INTERACTION_RADIUS) {
                        const factor = 1 - distance / INTERACTION_RADIUS;
                        // Scale up and brighten
                        currentRadius = DOT_RADIUS + (factor * 2); // growth
                        currentAlpha = 0.2 + (factor * 0.8); // brightening
                    }

                    ctx.beginPath();
                    ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        }

        // Init
        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerleave", handleMouseLeave);

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 bg-[#050505]">
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
            {/* Vignette for depth */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-80" />
        </div>
    );
}
