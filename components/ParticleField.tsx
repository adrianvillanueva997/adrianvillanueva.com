"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    opacity: number;
    size: number;
    color: string;
}

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const colors = ["#00ff99", "#ff3860", "#8b5cf6", "#00ffff", "#ff8c00"];

        const createParticles = () => {
            const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 10000));
            particlesRef.current = [];

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                    size: Math.random() * 2 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections between nearby particles
            for (let i = 0; i < particlesRef.current.length; i++) {
                const particle = particlesRef.current[i];
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const otherParticle = particlesRef.current[j];
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 255, 153, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw and update particles
            for (const particle of particlesRef.current) {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
                if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));

                // Draw particle
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw glow effect
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                gradient.addColorStop(0, `${particle.color}40`);
                gradient.addColorStop(1, `${particle.color}00`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createParticles();
        animate();

        const handleResize = () => {
            resizeCanvas();
            createParticles();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            style={{ mixBlendMode: "screen" }}
        />
    );
}