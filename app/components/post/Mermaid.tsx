"use client"; // Ensure this is a client-side component

import mermaid from "mermaid";
import { useEffect, useRef } from "react";

// Initialize Mermaid once globally
mermaid.initialize({
	startOnLoad: false, // We trigger rendering manually
	theme: "default", // Set the Mermaid theme
	securityLevel: "loose", // Allow inline styles (useful for flexibility)
});

export function Mermaid({ code }: { code: string }) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Function to render Mermaid diagram
		const renderMermaidDiagram = async () => {
			if (!containerRef.current) return;

			try {
				// Generate a unique ID for the diagram
				const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

				// Render the diagram using Mermaid
				const { svg } = await mermaid.render(uniqueId, code);

				// Set the rendered SVG in the container
				containerRef.current.innerHTML = svg;
			} catch (error) {
				console.error("Error rendering Mermaid diagram:", error);
				containerRef.current.innerHTML =
					"<p style='color: red;'>Error rendering diagram. Check your syntax.</p>";
			}
		};

		renderMermaidDiagram();
	}, [code]); // Re-render when the `code` changes

	return <div ref={containerRef} className="mermaid-container my-4" />;
}
