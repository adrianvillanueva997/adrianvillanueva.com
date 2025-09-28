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

			// Generate brutalist colors
			function getTagColor(tag, count) {
				const colors = [
					'#000000', // Black
					'#FF0000', // Red
					'#000000', // Black
					'#FF0000', // Red
					'#000000', // Black
					'#FF0000', // Red
				];

				// Hash function to consistently assign colors
				let hash = 0;
				for (let i = 0; i < tag.length; i++) {
					hash = tag.charCodeAt(i) + ((hash << 5) - hash);
				}

				// Alternate between black and red for brutalist look
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
				<div className="bg-white border-2 border-black p-6">
					<div className="flex justify-center items-center h-[500px]">
						<div className="text-center">
							<div className="text-black font-mono font-black text-lg mb-2 uppercase">
								BUILDING GRAPH...
							</div>
							<div className="text-black font-mono text-sm">
								PROCESSING NODES
							</div>
							{/* Loading animation */}
							<div className="mt-4 flex justify-center space-x-1">
								{[0, 1, 2].map((i) => (
									<div
										key={i}
										className="w-3 h-3 bg-red-500 border border-black"
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
				<div className="bg-white border-2 border-black p-6">
					<div className="flex justify-center items-center h-[300px]">
						<div className="text-center">
							<div className="text-black font-mono font-black text-lg mb-2 uppercase">
								NO DATA
							</div>
							<div className="text-black font-mono text-sm">
								NOT ENOUGH CONNECTED NODES
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div ref={graphRef}>
			<div className="bg-white border-0 overflow-hidden">
				<ForceGraph2D
					graphData={graphData}
					width={dimensions.width}
					height={dimensions.height}
					backgroundColor="#ffffff"
					nodeLabel={(node) => {
						const nodeData = graphData.nodes.find(n => n.id === node.id);
						const connections = nodeData?.val || 0;
						return `${node.name.toUpperCase().replace(/\s+/g, '_')} - ${connections} posts`;
					}}
					nodeColor="color"
					nodeVal={(node) => Math.max(12, Math.sqrt(node.val) * 6)} // Larger base size for brutalist look
					linkWidth={(link) => Math.max(3, Math.sqrt(link.value) * 3)} // Thicker lines
					linkColor={() => "rgba(0, 0, 0, 0.6)"} // Black links
					linkDirectionalParticles={0} // No particles for cleaner brutalist look
					onNodeClick={handleNodeClick}
					onNodeHover={(node) => {
						// Add cursor pointer on hover
						document.body.style.cursor = node ? 'pointer' : 'default';
					}}
					cooldownTicks={100}
					nodeCanvasObject={(node, ctx, globalScale) => {
						const label = node.name;
						const fontSize = Math.max(10, 12 / globalScale); // Larger font for brutalist
						const nodeSize = node.val ?? 12;

						ctx.font = `bold ${fontSize}px 'Inter', monospace`;

						// Draw simple brutalist node
						ctx.beginPath();
						ctx.arc(
							node.x ?? 0,
							node.y ?? 0,
							nodeSize,
							0,
							2 * Math.PI,
							false,
						);

						// Simple solid fill
						const baseColor = node.color === '#000000' ? '#000000' : '#FF0000';
						ctx.fillStyle = baseColor;
						ctx.fill();

						// Strong black border
						ctx.strokeStyle = "#000000";
						ctx.lineWidth = 3 / globalScale;
						ctx.stroke();

						// Show labels when zoomed in
						if (globalScale >= 0.5) { // Lower threshold to show labels earlier
							const displayLabel = label.length > 12 ? `${label.substring(0, 12)}` : label;
							const textWidth = ctx.measureText(displayLabel).width;
							const backgroundRectHeight = fontSize + 8; // More padding
							const rectY = (node.y ?? 0) + nodeSize + 12; // More distance from node

							// Larger white background with black border
							ctx.fillStyle = "#ffffff";
							ctx.fillRect(
								(node.x ?? 0) - textWidth / 2 - 6,
								rectY,
								textWidth + 12,
								backgroundRectHeight,
							);

							// Thicker black border for better visibility
							ctx.strokeStyle = "#000000";
							ctx.lineWidth = 3;
							ctx.strokeRect(
								(node.x ?? 0) - textWidth / 2 - 6,
								rectY,
								textWidth + 12,
								backgroundRectHeight,
							);

							// Larger, bolder black text
							ctx.textAlign = "center";
							ctx.textBaseline = "middle";
							ctx.fillStyle = "#000000";
							ctx.font = `bold ${fontSize + 2}px 'Inter', monospace`; // Slightly larger and bolder
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
