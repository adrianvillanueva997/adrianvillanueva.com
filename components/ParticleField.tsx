"use client";

import { useEffect, useRef, useState } from "react";

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
    const lastFrameRef = useRef<number>(0);
    const isVisibleRef = useRef<boolean>(true);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Honor user preference to reduce motion
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Delay start to avoid competing with FCP; prefer idle time
        const start = () => setReady(true);
        if ('requestIdleCallback' in window) {
            type RequestIdleCallback = (cb: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void, opts?: { timeout?: number }) => number;
            const ric = (window as unknown as { requestIdleCallback?: RequestIdleCallback }).requestIdleCallback;
            if (ric) ric(start, { timeout: 500 });
        } else {
            setTimeout(start, 300);
        }

        // Cap device pixel ratio to limit pixel work
        const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

        const resizeCanvas = () => {
            const { offsetWidth, offsetHeight } = canvas;
            canvas.width = Math.max(1, Math.floor(offsetWidth * DPR));
            canvas.height = Math.max(1, Math.floor(offsetHeight * DPR));
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        };

        const colors = ["#00ff99", "#ff3860", "#8b5cf6", "#00ffff", "#ff8c00"];

        const createParticles = () => {
            // Compute count from CSS pixels (not scaled by DPR)
            const w = canvas.offsetWidth || (canvas.width / DPR);
            const h = canvas.offsetHeight || (canvas.height / DPR);
            // Fewer particles for better perf; scale with area
            const particleCount = Math.min(35, Math.floor((w * h) / 18000));
            particlesRef.current = [];

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    opacity: Math.random() * 0.5 + 0.2,
                    size: Math.random() * 2 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        // Spatial hashing to reduce O(n^2) neighbor checks
        type BucketKey = string;
        const connectionDistance = 90; // px in CSS units
        const cellSize = connectionDistance;
        const maxConnectionsPerParticle = 3;

        const buildBuckets = (particles: Particle[]) => {
            const buckets = new Map<BucketKey, number[]>();
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const cx = Math.floor(p.x / cellSize);
                const cy = Math.floor(p.y / cellSize);
                const key = `${cx},${cy}`;
                let arr = buckets.get(key);
                if (!arr) {
                    arr = [];
                    buckets.set(key, arr);
                }
                arr.push(i);
            }
            return buckets;
        };

        const fps = 30; // throttle to reduce CPU
        const frameInterval = 1000 / fps;

        const animate = () => {
            // Clear in CSS pixels because transform scales drawing operations
            const cssW = (canvas.width) / DPR;
            const cssH = (canvas.height) / DPR;
            ctx.clearRect(0, 0, cssW, cssH);

            const particles = particlesRef.current;
            const frameW = canvas.offsetWidth || (canvas.width / DPR);
            const frameH = canvas.offsetHeight || (canvas.height / DPR);

            // Build neighbor buckets once per frame
            const buckets = buildBuckets(particles);

            // Draw and update particles
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x <= 0 || particle.x >= frameW) particle.vx *= -1;
                if (particle.y <= 0 || particle.y >= frameH) particle.vy *= -1;

                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(frameW, particle.x));
                particle.y = Math.max(0, Math.min(frameH, particle.y));

                // Draw particle (no expensive gradient)
                ctx.globalAlpha = particle.opacity;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Connections to neighbors in adjacent cells only, capped per particle
                let connections = 0;
                const cx = Math.floor(particle.x / cellSize);
                const cy = Math.floor(particle.y / cellSize);
                for (let ny = -1; ny <= 1; ny++) {
                    for (let nx = -1; nx <= 1; nx++) {
                        const key: BucketKey = `${cx + nx},${cy + ny}`;
                        const indices = buckets.get(key);
                        if (!indices) continue;
                        for (const j of indices) {
                            if (j <= i) continue; // avoid double draw
                            const other = particles[j];
                            const dx = particle.x - other.x;
                            const dy = particle.y - other.y;
                            const dist2 = dx * dx + dy * dy;
                            const maxD = connectionDistance;
                            if (dist2 <= maxD * maxD) {
                                // Fade based on distance; very thin line
                                const distance = Math.sqrt(dist2);
                                ctx.globalAlpha = 0.08 * (1 - distance / maxD);
                                ctx.strokeStyle = "#00ff99";
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(other.x, other.y);
                                ctx.stroke();
                                connections++;
                                if (connections >= maxConnectionsPerParticle) break;
                            }
                        }
                        if (connections >= maxConnectionsPerParticle) break;
                    }
                    if (connections >= maxConnectionsPerParticle) break;
                }
            }

            ctx.globalAlpha = 1;
        };

        resizeCanvas();
        createParticles();

        const onFrame = (now: number) => {
            // Only animate when visible and not reduced motion
            if (!isVisibleRef.current || document.hidden || prefersReducedMotion || !ready) {
                lastFrameRef.current = now;
                animationRef.current = requestAnimationFrame(onFrame);
                return;
            }
            const last = lastFrameRef.current || now;
            const delta = now - last;
            if (delta >= frameInterval) {
                lastFrameRef.current = now - (delta % frameInterval);
                animate();
            }
            animationRef.current = requestAnimationFrame(onFrame);
        };

        animationRef.current = requestAnimationFrame(onFrame);

        const handleResize = () => {
            resizeCanvas();
            createParticles();
        };

        // Debounce resize
        let resizeTimer: number | undefined;
        const debouncedResize = () => {
            if (resizeTimer) window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(handleResize, 150);
        };
        window.addEventListener("resize", debouncedResize);

        // Pause when canvas not in viewport
        const io = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === canvas) {
                    isVisibleRef.current = entry.isIntersecting;
                }
            }
        }, { threshold: 0.05 });
        io.observe(canvas);

        // Page visibility listener to pause when tab hidden
        const onVisibility = () => {
            // No-op; onFrame checks document.hidden
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            window.removeEventListener("resize", debouncedResize);
            document.removeEventListener('visibilitychange', onVisibility);
            io.disconnect();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [ready]);

    return (
        <canvas
            ref={canvasRef}
            className="particle-field absolute inset-0 w-full h-full pointer-events-none opacity-40"
            style={{ mixBlendMode: "screen" }}
        />
    );
}