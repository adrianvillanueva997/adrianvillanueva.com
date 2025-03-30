import React from 'react';

interface DetailsProps {
    summary: string | React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

export function Details({
    summary,
    children,
    defaultOpen = false,
    className = '',
}: DetailsProps) {
    return (
        <details
            className={`my-4 group border border-cyan-800/30 rounded-lg ${className}`}
            open={defaultOpen}
        >
            <summary
                className="px-4 py-2 cursor-pointer bg-cyan-900/20 hover:bg-cyan-900/30 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 text-gray-800 dark:text-gray-100"
            >
                <span className="flex items-center justify-between">
                    <span>{summary}</span>
                    <svg
                        className="w-5 h-5 transform group-open:rotate-180 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </summary>
            <div className="p-4 prose dark:prose-invert max-w-none dark:text-gray-200">{children}</div>
        </details>
    );
}
