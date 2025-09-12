"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Dynamically import the ForceGraph component with no SSR
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
	ssr: false,
});

type GraphData = {
	nodes: Array<{
		id: string;
		name: string;
		val: number;
		color: string;
	}>;
	links: Array<{
		source: string;
		target: string;
		value: number;
	}>;
};

interface TagGraphProps {
	posts: any[];
}

export default function TagGraph({ posts }: TagGraphProps) {
	const [graphData, setGraphData] = useState<GraphData>({
		nodes: [],
		links: [],
	});
	const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
	const graphRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!posts || posts.length === 0) {
			setIsLoading(false);
			return;
		}

		try {
			// Build the graph data from posts and their tags
			const tagsMap = new Map();
			const relationships = new Map();

			// Count occurrences of each tag
			posts.forEach((post) => {
				if (!post.tags || !Array.isArray(post.tags)) return;

				const postTags = post.tags;

				// Add tags to map or increment count
				postTags.forEach((tag) => {
					if (!tag) return; // Skip null/undefined tags

					if (tagsMap.has(tag)) {
						tagsMap.set(tag, tagsMap.get(tag) + 1);
					} else {
						tagsMap.set(tag, 1);
					}

					// Create relationships between tags
					postTags.forEach((otherTag) => {
						if (!otherTag || tag === otherTag) return; // Skip self-relationships

						const relationKey = [tag, otherTag].sort().join("-");
						if (relationships.has(relationKey)) {
							relationships.set(
								relationKey,
								relationships.get(relationKey) + 1,
							);
						} else {
							relationships.set(relationKey, 1);
						}
					});
				});
			});

			// Generate doom/synthwave colors
			function getTagColor(tag, count) {
				const colors = [
					'#ff3860', // Primary red
					'#00ff99', // Primary green
					'#ff6b9d', // Pink
					'#6b73ff', // Blue
					'#ff9f40', // Orange
					'#9d65c9', // Purple
					'#5ce1e6', // Cyan
					'#ffd93d', // Yellow
				];

				// Hash function to consistently assign colors
				let hash = 0;
				for (let i = 0; i < tag.length; i++) {
					hash = tag.charCodeAt(i) + ((hash << 5) - hash);
				}

				// Always return the base color without alpha
				// Canvas rendering will handle transparency
				const baseColor = colors[Math.abs(hash) % colors.length];
				return baseColor;
			}

			// Create nodes for each tag
			const nodes = Array.from(tagsMap.entries()).map(([tag, count]) => ({
				id: tag,
				name: tag,
				val: Math.max(3, Math.sqrt(count) * 2), // Size based on count
				color: getTagColor(tag, count),
			}));

			// Get the set of all valid node IDs
			const nodeIds = new Set(nodes.map((node) => node.id));

			// Create links between related tags - only if both nodes exist
			const links = Array.from(relationships.entries())
				.map(([key, strength]) => {
					const [source, target] = key.split("-");

					// Only create links between existing nodes
					if (nodeIds.has(source) && nodeIds.has(target)) {
						return {
							source,
							target,
							value: strength,
						};
					}
					return null;
				})
				.filter(Boolean) // Remove null entries
				.filter(
					(link): link is { source: string; target: string; value: number } =>
						link !== null &&
						typeof link === "object" &&
						"value" in link &&
						link.value > 1,
				) // Filter out weak connections with type guard
				.map((link) => ({
					source: link.source,
					target: link.target,
					value: link.value,
				}));

			setGraphData({ nodes, links });

			// Set size to match container
			if (graphRef.current) {
				setDimensions({
					width: graphRef.current.clientWidth,
					height: 500,
				});
			}
		} catch (error) {
			console.error("Error generating knowledge graph:", error);
		} finally {
			setIsLoading(false);
		}

		// Handle window resize
		const handleResize = () => {
			if (graphRef.current) {
				setDimensions({
					width: graphRef.current.clientWidth,
					height: 500,
				});
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [posts]);

	const handleNodeClick = (node) => {
		window.location.href = `/tags/${node.id}`;
	};

	// No data or still loading
	if (isLoading) {
		return (
			<div ref={graphRef}>
				<div className="bg-gray-950 border border-gray-700 rounded-lg p-6">
					<div className="flex justify-center items-center h-[500px]">
						<div className="text-center">
							<div className="text-[#00ff99] font-mono text-lg mb-2">
								BUILDING_NEURAL_MAP...
							</div>
							<div className="text-gray-400 font-mono text-sm">
								PROCESSING_KNOWLEDGE_NODES
							</div>
							{/* Loading animation */}
							<div className="mt-4 flex justify-center space-x-1">
								{[0, 1, 2].map((i) => (
									<div
										key={i}
										className="w-2 h-2 bg-[#ff3860] rounded-full animate-pulse"
										style={{ animationDelay: `${i * 0.2}s` }}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// No graph data
	if (!graphData.nodes.length) {
		return (
			<div ref={graphRef}>
				<div className="bg-gray-950 border border-gray-700 rounded-lg p-6">
					<div className="flex justify-center items-center h-[300px]">
						<div className="text-center">
							<div className="text-[#ff3860] font-mono text-lg mb-2">
								INSUFFICIENT_DATA
							</div>
							<div className="text-gray-400 font-mono text-sm">
								NOT_ENOUGH_CONNECTED_NODES
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div ref={graphRef}>
			<div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden">
				<ForceGraph2D
					graphData={graphData}
					width={dimensions.width}
					height={dimensions.height}
					backgroundColor="#0a0a0a"
					nodeLabel={(node) => {
						const nodeData = graphData.nodes.find(n => n.id === node.id);
						const connections = nodeData?.val || 0;
						return `${node.name.toUpperCase().replace(/\s+/g, '_')} - ${connections} posts`;
					}}
					nodeColor="color"
					nodeVal={(node) => Math.max(8, Math.sqrt(node.val) * 4)} // Larger base size for better visibility
					linkWidth={(link) => Math.max(2, Math.sqrt(link.value) * 2)} // Better link visibility
					linkColor={() => "rgba(255, 56, 96, 0.4)"} // More visible doom red with proper alpha
					linkDirectionalParticles={2} // Fewer particles for less distraction
					linkDirectionalParticleWidth={3} // Larger particles
					linkDirectionalParticleSpeed={0.006} // Slower movement
					linkDirectionalParticleColor={() => "#00ff99"} // Synthwave green particles
					linkCurvature={0.1} // Less curve for cleaner look
					onNodeClick={handleNodeClick}
					onNodeHover={(node) => {
						// Add cursor pointer on hover
						document.body.style.cursor = node ? 'pointer' : 'default';
					}}
					cooldownTicks={100}
					nodeCanvasObject={(node, ctx, globalScale) => {
						const label = node.name;
						const fontSize = Math.max(8, 10 / globalScale); // Smaller font size
						const nodeSize = node.val ?? 8;

						ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

						// Draw node with better visibility
						ctx.beginPath();
						ctx.arc(
							node.x ?? 0,
							node.y ?? 0,
							nodeSize,
							0,
							2 * Math.PI,
							false,
						);

						// Main node fill with gradient effect
						const gradient = ctx.createRadialGradient(
							node.x ?? 0, node.y ?? 0, 0,
							node.x ?? 0, node.y ?? 0, nodeSize
						);

						// Ensure we have a clean base color (remove any existing alpha)
						const baseColor = node.color?.startsWith('#') ?
							(node.color.length > 7 ? node.color.substring(0, 7) : node.color) :
							'#ff3860'; // Fallback color

						try {
							gradient.addColorStop(0, baseColor);
							gradient.addColorStop(1, `${baseColor}40`); // Semi-transparent outer edge
							ctx.fillStyle = gradient;
							ctx.fill();
						} catch (error) {
							// Fallback to solid color if gradient fails
							ctx.fillStyle = baseColor;
							ctx.fill();
						}

						// Strong border for visibility
						ctx.strokeStyle = "#ffffff";
						ctx.lineWidth = 2.5 / globalScale;
						ctx.stroke();

						// Inner bright core
						ctx.beginPath();
						ctx.arc(
							node.x ?? 0,
							node.y ?? 0,
							nodeSize * 0.4,
							0,
							2 * Math.PI,
							false,
						);
						ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
						ctx.fill();

						// Show labels only when zoomed in enough to be readable
						if (globalScale >= 0.8) { // Higher threshold for better readability
							const displayLabel = label.length > 10 ? `${label.substring(0, 10)}...` : label;
							const textWidth = ctx.measureText(displayLabel).width;
							const backgroundRectHeight = fontSize + 4; // Smaller padding
							const rectY = (node.y ?? 0) + nodeSize + 8; // More distance from node

							// Compact background
							ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
							ctx.fillRect(
								(node.x ?? 0) - textWidth / 2 - 3,
								rectY,
								textWidth + 6,
								backgroundRectHeight,
							);

							// Thin border
							ctx.strokeStyle = "#00ff99";
							ctx.lineWidth = 1;
							ctx.strokeRect(
								(node.x ?? 0) - textWidth / 2 - 3,
								rectY,
								textWidth + 6,
								backgroundRectHeight,
							);

							// Smaller text
							ctx.textAlign = "center";
							ctx.textBaseline = "middle";
							ctx.fillStyle = "#ffffff";
							ctx.fillText(
								displayLabel.toUpperCase(),
								node.x ?? 0,
								rectY + backgroundRectHeight / 2,
							);
						}
					}}
				/>
			</div>
		</div>
	);
}
