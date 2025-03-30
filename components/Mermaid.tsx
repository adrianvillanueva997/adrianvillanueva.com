'use client';

import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

// Initialize mermaid config
mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
});

interface MermaidProps {
    chart: string;
    className?: string;
}

export default function Mermaid({ chart, className = '' }: MermaidProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svgContent, setSvgContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [id] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

    useEffect(() => {
        const renderChart = async () => {
            if (!containerRef.current) return;

            try {
                // Check if we need to use dark theme
                const isDarkMode = document.documentElement.classList.contains('dark');
                mermaid.initialize({
                    theme: isDarkMode ? 'dark' : 'neutral',
                    startOnLoad: false,
                    securityLevel: 'loose',
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                });

                // Clear previous content
                containerRef.current.innerHTML = chart;

                // Render the diagram
                const { svg } = await mermaid.render(id, chart);
                setSvgContent(svg);
                setError(null);
            } catch (err) {
                console.error('Failed to render mermaid diagram:', err);
                setError('Error rendering diagram. Check your syntax.');
            }
        };

        renderChart();

        // Add listener for theme changes
        const handleThemeChange = () => renderChart();
        window.addEventListener('themeChange', handleThemeChange);

        return () => {
            window.removeEventListener('themeChange', handleThemeChange);
        };
    }, [chart, id]);

    // Show error state if there's an error
    if (error) {
        return (
            <div className="border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg p-4 my-4">
                <p className="text-red-800 dark:text-red-400 text-sm font-medium">{error}</p>
                <pre className="mt-2 text-xs overflow-x-auto p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    {chart}
                </pre>
            </div>
        );
    }

    return (
        <div className={`mermaid-container my-8 ${className}`}>
            <div
                ref={containerRef}
                className="hidden"
            />
            {svgContent && (
                <div
                    className="flex justify-center overflow-auto"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />
            )}
        </div>
    );
}