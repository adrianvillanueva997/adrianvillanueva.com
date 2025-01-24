"use client";

import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

interface MermaidProps {
	code: string;
	title?: string;
}

export function Mermaid({ code, title = "Diagram" }: MermaidProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { theme } = useTheme();
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const renderMermaidDiagram = async () => {
			if (!containerRef.current) return;
			setIsLoading(true);
			setHasError(false);

			try {
				mermaid.initialize({
					theme: theme === "dark" ? "dark" : "default",
					startOnLoad: false,
					securityLevel: "loose",
					flowchart: {
						useMaxWidth: true,
					},
				});

				const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
				const { svg } = await mermaid.render(uniqueId, code);

				// Force diagram to fit container width
				const parser = new DOMParser();
				const svgDoc = parser.parseFromString(svg, "image/svg+xml");
				const svgElement = svgDoc.documentElement;
				svgElement.setAttribute("width", "100%");
				svgElement.setAttribute("height", "100%");

				containerRef.current.innerHTML = svgElement.outerHTML;
			} catch (error) {
				console.error("Error rendering Mermaid diagram:", error);
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		};

		renderMermaidDiagram();
	}, [code, theme]);

	return (
		<div className="relative group my-8">
			<div
				className="absolute -top-3 left-3 z-10 px-3 py-1 text-xs font-mono
        rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm
        text-neutral-600 dark:text-neutral-400
        border border-neutral-200/50 dark:border-neutral-700/50
        shadow-sm"
			>
				{title}
			</div>
			<div
				className="absolute -top-3 right-12 z-10 px-3 py-1 text-xs font-mono
        rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm
        text-neutral-600 dark:text-neutral-400
        border border-neutral-200/50 dark:border-neutral-700/50
        shadow-sm"
			>
				mermaid
			</div>
			<div
				className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700
        bg-neutral-100 dark:bg-neutral-800 p-4"
			>
				{isLoading && (
					<div className="flex justify-center p-4">
						<div
							className="animate-spin rounded-full h-6 w-6 border-2
              border-neutral-500 border-t-transparent"
						/>
					</div>
				)}
				<div
					ref={containerRef}
					className="w-full min-h-[200px] flex items-center justify-center"
				/>
			</div>
		</div>
	);
}
