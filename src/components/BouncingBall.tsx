"use client";

import { useEffect, useRef } from "react";

interface BouncingBallProps {
    wrapperRef: React.RefObject<HTMLDivElement | null>;
    buttonRef: React.RefObject<HTMLAnchorElement | null>;
    onBounce: () => void;
}

export default function BouncingBall({ wrapperRef, buttonRef, onBounce }: BouncingBallProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !wrapperRef.current || !buttonRef.current) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let timeoutId: NodeJS.Timeout;

        // Physics parameters
        let x = -50;
        let y = 100;
        const baseVelocityX = 7.3; // Calibrated for 1920px width
        let velocityX = baseVelocityX;
        let velocityY = 0;
        const gravity = 0.45;
        const bounceFactor = -0.85;
        const floorY = canvas.height + 100;

        // Trail history
        const trail: { x: number; y: number; opacity: number }[] = [];
        const trailLength = 20;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Reset ball loop
        const resetBall = () => {
            x = -50;
            y = window.innerHeight * 0.15;

            // Calculate responsive velocity:
            // Scale the base velocity (7.3) by the ratio of current width to base width (1920)
            const widthRatio = window.innerWidth / 1920;
            const responsiveVelocity = baseVelocityX * widthRatio;

            velocityX = responsiveVelocity + Math.random() * 0.5; // Reduced random variation
            velocityY = 4 + Math.random() * 4;
            // Clear trail on reset
            trail.length = 0;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Physics Update
            velocityY += gravity;
            x += velocityX;
            y += velocityY;

            // Floor Collision (Bounce off bottom of screen)
            if (y + 8 > canvas.height) { // 8 is ball radius
                y = canvas.height - 8;
                velocityY *= bounceFactor;
                // Apply some friction on ground hit
                velocityX *= 0.95;
            }

            // Button Collision Logic
            if (buttonRef.current) {
                const btnRect = buttonRef.current.getBoundingClientRect();

                // Ball radius
                const r = 8;

                // Check overlap
                if (
                    x + r > btnRect.left &&
                    x - r < btnRect.right &&
                    y + r > btnRect.top &&
                    y - r < btnRect.bottom
                ) {
                    // Determine side of collision for better bounce? 
                    // For now simple "top bounce" preference as requested
                    // Calculate button's center Y for a more robust top-hit check
                    const btnCenterY = btnRect.top + btnRect.height / 2;

                    if (velocityY > 0 && y < btnCenterY) {
                        // Hitting from top
                        y = btnRect.top - r;
                        velocityY *= bounceFactor;
                        onBounce();
                    }
                    // If hitting side/bottom, maybe just let it pass or bounce x? 
                    // User focused on hitting "top of the Say Hello button".
                    // Let's refine the condition to be stricter on "top" hit.
                    else if (y + r > btnRect.top && y - r < btnRect.top + 20 && velocityY > 0) {
                        y = btnRect.top - r;
                        velocityY *= bounceFactor;
                        onBounce();
                    }
                }
            }

            if (x > canvas.width + 100) {
                // Loop back with delay
                timeoutId = setTimeout(() => {
                    resetBall();
                    animationFrameId = requestAnimationFrame(draw);
                }, 4000);
                return;
            }

            // Trail Update & Draw
            trail.push({ x, y, opacity: 1.0 });
            if (trail.length > trailLength) {
                trail.shift();
            }

            // Draw Trail
            ctx.beginPath();
            for (let i = 0; i < trail.length - 1; i++) {
                const point = trail[i];
                const nextPoint = trail[i + 1];

                // Fade out older points
                point.opacity -= 0.02;

                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);

                // Gradient trail or simple opacity
                ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, i / trailLength)})`;
                ctx.lineWidth = (i / trailLength) * 8; // Tapering
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            // Draw Head
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleCanvasClick = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const dist = Math.sqrt((x - clickX) ** 2 + (y - clickY) ** 2);
            // Ball radius is around 6-8, give it a generous hit area (e.g. 30px)
            if (dist < 30) {
                velocityY = -15; // Jump up!
            }
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener('pointerdown', handleCanvasClick);

        resizeCanvas();

        // Start
        resetBall();
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener('pointerdown', handleCanvasClick);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timeoutId);
        };
    }, [buttonRef, onBounce]); // Re-run if props change (unlikely for refs)

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ width: "100%", height: "100%" }}
        />
        );
}
