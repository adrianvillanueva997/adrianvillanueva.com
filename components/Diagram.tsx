"use client";

import { useState } from "react";

interface DiagramProps {
    name: string;
    alt?: string;
    className?: string;
}

export default function Diagram({ name, alt, className }: DiagramProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            {/* Accessible Overlay for expanded mode */}
            {expanded && (
                <button
                    type="button" // accessible button
                    onClick={() => setExpanded(false)}
                    className="fixed inset-0 bg-black/70 z-40 cursor-pointer"
                    aria-label="Close diagram"
                />
            )}

            <div className="relative inline-block">
                <img
                    src={`/static/diagrams/${name}.svg`}
                    alt={alt ?? name}
                    className={`${className ?? ""} ${expanded
                        ? "fixed top-1/2 left-1/2 w-[90vw] h-[90vh] max-w-[90vw] max-h-[90vh] z-50 transform -translate-x-1/2 -translate-y-1/2 object-contain rounded shadow-lg bg-white dark:bg-black p-2"
                        : ""
                        }`}
                />

                {/* Expand/Close Button */}
                <button
                    type="button" // explicit type for accessibility
                    onClick={() => setExpanded(!expanded)}
                    className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded shadow z-50"
                >
                    {expanded ? "Close" : "Expand"}
                </button>
            </div>
        </>
    );
}