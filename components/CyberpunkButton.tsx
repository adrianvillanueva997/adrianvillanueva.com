'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

interface CyberpunkButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    glitch?: boolean;
}

const CyberpunkButton: React.FC<CyberpunkButtonProps> = ({
    children,
    onClick,
    href,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    isLoading = false,
    glitch = false,
}) => {
    const [isGlitching, setIsGlitching] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (glitch) {
            const interval = setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    setIsGlitching(true);
                    setTimeout(() => setIsGlitching(false), 200);
                }
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [glitch]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const baseClasses = `
		relative overflow-hidden font-mono font-bold uppercase tracking-wider
		transition-all duration-300 transform
		border border-solid
		focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
		disabled:opacity-50 disabled:cursor-not-allowed
		hover:scale-105 active:scale-95
	`;

    const variantClasses = {
        primary: `
			bg-transparent border-[#00ff99] text-[#00ff99]
			hover:bg-[#00ff99] hover:text-gray-900 hover:shadow-lg hover:shadow-[#00ff99]/25
			focus:ring-[#00ff99]
		`,
        secondary: `
			bg-transparent border-[#ff3860] text-[#ff3860]
			hover:bg-[#ff3860] hover:text-white hover:shadow-lg hover:shadow-[#ff3860]/25
			focus:ring-[#ff3860]
		`,
        danger: `
			bg-transparent border-red-500 text-red-500
			hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/25
			focus:ring-red-500
		`,
        ghost: `
			bg-transparent border-gray-600 text-gray-300
			hover:bg-gray-800 hover:border-gray-400 hover:text-white
			focus:ring-gray-400
		`
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const combinedClasses = `
		${baseClasses}
		${variantClasses[variant]}
		${sizeClasses[size]}
		${isGlitching ? 'animate-pulse' : ''}
		${className}
	`.replace(/\s+/g, ' ').trim();

    const ButtonContent = () => (
        <>
            {/* Scan line effect */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    transform: 'translateX(-100%)',
                    animation: 'scan 2s infinite linear'
                }}
            />

            {/* Mouse follow glow effect */}
            <div
                className="absolute w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none blur-xl"
                style={{
                    background: variant === 'primary' ? '#00ff99' : '#ff3860',
                    left: mousePos.x - 40,
                    top: mousePos.y - 40,
                }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current opacity-60" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current opacity-60" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current opacity-60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current opacity-60" />

            {/* Content */}
            <span className={`relative z-10 flex items-center justify-center space-x-2 ${isGlitching ? 'animate-pulse' : ''}`}>
                {isLoading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" role="img" aria-label="Loading">
                        <title>Loading</title>
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                <span className={isLoading ? 'opacity-50' : ''}>{children}</span>
                {!isLoading && (
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                        &gt;
                    </span>
                )}
            </span>

            {/* Glitch effect overlay */}
            {isGlitching && (
                <div className="absolute inset-0 bg-current opacity-20 animate-pulse pointer-events-none" />
            )}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className={`group inline-block ${combinedClasses}`}
                onMouseMove={handleMouseMove}
            >
                <ButtonContent />
            </a>
        );
    }

    return (
        <button
            type="button"
            className={`group ${combinedClasses}`}
            onClick={onClick}
            disabled={disabled || isLoading}
            onMouseMove={handleMouseMove}
        >
            <ButtonContent />
        </button>
    );
};

export default CyberpunkButton;