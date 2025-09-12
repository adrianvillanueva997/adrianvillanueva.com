"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    cursor?: boolean;
}

export default function TypewriterText({
    text,
    className = "",
    speed = 100,
    delay = 0,
    cursor = true
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (hasStarted) return;

        const startDelay = delay > 0 ? delay : 0;
        const delayTimeout = setTimeout(() => {
            setHasStarted(true);
        }, startDelay);

        return () => clearTimeout(delayTimeout);
    }, [delay, hasStarted]);

    useEffect(() => {
        if (!hasStarted || currentIndex >= text.length) {
            if (currentIndex >= text.length && !isComplete) {
                setIsComplete(true);
            }
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayText(prev => prev + text[currentIndex]);
            setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
    }, [hasStarted, currentIndex, text, speed, isComplete]);

    return (
        <span className={className}>
            {displayText}
            {cursor && (
                <span className="inline-block w-0.5 h-6 ml-1 bg-[#00ff99] animate-pulse">
                    |
                </span>
            )}
        </span>
    );
}