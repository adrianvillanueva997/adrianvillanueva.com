"use client";

import type React from "react";

interface BrutalistButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
}

const BrutalistButton: React.FC<BrutalistButtonProps> = ({
    children,
    onClick,
    href,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    isLoading = false,
}) => {
    const baseClasses = "inline-flex items-center justify-center font-mono font-black uppercase tracking-wide transition-all duration-200 border-4 border-black";

    const variantClasses = {
        primary: "bg-black text-white hover:bg-white hover:text-black",
        secondary: "bg-white text-black hover:bg-gray-100",
        danger: "bg-red-500 text-white hover:bg-white hover:text-red-500 border-red-500",
        ghost: "bg-transparent text-black hover:bg-black hover:text-white",
    };

    const sizeClasses = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
    };

    const classes = `
		${baseClasses}
		${variantClasses[variant]}
		${sizeClasses[size]}
		${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
		${className}
	`.trim().replace(/\s+/g, " ");

    const content = (
        <>
            {isLoading && (
                <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent animate-spin" />
            )}
            {children}
        </>
    );

    if (href && !disabled) {
        return (
            <a href={href} className={classes}>
                {content}
            </a>
        );
    }

    return (
        <button
            type="button"
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={classes}
        >
            {content}
        </button>
    );
};

export default BrutalistButton;