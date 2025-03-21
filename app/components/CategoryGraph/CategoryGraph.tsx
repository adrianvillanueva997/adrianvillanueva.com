"use client";

import type { BlogPost } from "app/types/blog";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Edge, Node as GraphNode } from "./types";
import { calculateGraphLayout } from "./utils";

interface CategoryGraphProps {
	categoryPosts: Record<string, BlogPost[]>;
}

export function CategoryGraph({ categoryPosts }: CategoryGraphProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [nodes, setNodes] = useState<GraphNode[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [hoveredNode, setHoveredNode] = useState<string | null>(null);

	const dimensions = { width: 1200, height: 800 };

	useEffect(() => {
		const { nodes: calculatedNodes, edges: calculatedEdges } =
			calculateGraphLayout(categoryPosts, dimensions.width, dimensions.height);

		setNodes(calculatedNodes);
		setEdges(calculatedEdges);
	}, [categoryPosts]);

	useEffect(() => {
		if (!canvasRef.current) return;
		const ctx = canvasRef.current.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, dimensions.width, dimensions.height);

		for (const edge of edges) {
			const source = nodes.find((n) => n.id === edge.source);
			const target = nodes.find((n) => n.id === edge.target);
			if (!source || !target) continue;

			// Calculate vector between nodes
			const dx = target.x - source.x;
			const dy = target.y - source.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Calculate unit vector
			const ux = dx / distance;
			const uy = dy / distance;

			// Adjust start and end points to node boundaries
			const startX = source.x + ux * source.radius;
			const startY = source.y + uy * source.radius;
			const endX = target.x - ux * target.radius;
			const endY = target.y - uy * target.radius;

			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);

			// Improve edge visibility
			ctx.strokeStyle = edge.color || "rgba(103, 232, 249, 0.2)";
			ctx.lineWidth = 1.5;

			// Add glow effect
			ctx.shadowColor = edge.color || "rgba(103, 232, 249, 0.4)";
			ctx.shadowBlur = 3;
			ctx.stroke();

			// Reset shadow
			ctx.shadowColor = "transparent";
			ctx.shadowBlur = 0;
		}
	}, [nodes, edges]);

	return (
		<div className="flex items-center justify-center w-full h-screen">
			<div className="relative w-[1200px] h-[800px]">
				<canvas
					ref={canvasRef}
					width={dimensions.width}
					height={dimensions.height}
					className="absolute inset-0"
				/>

				<div className="relative w-full h-full">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg className="absolute inset-0 w-full h-full">
						{edges.map((edge) => {
							const source = nodes.find((n) => n.id === edge.source);
							const target = nodes.find((n) => n.id === edge.target);
							if (!source || !target) return null;

							return (
								<path
									key={`${edge.source}-${edge.target}`}
									d={`M ${source.x} ${source.y} L ${target.x} ${target.y}`}
									stroke="rgba(103, 232, 249, 0.1)"
									strokeWidth={1}
									strokeDasharray="none"
									shapeRendering="geometricPrecision"
									fill="none"
								/>
							);
						})}
					</svg>
					{nodes.map((node) => (
						<div
							key={node.id} // Using unique node.id that includes type prefix
							className="absolute"
							style={{
								transform: `translate(${node.x}px, ${node.y}px) translate(-50%, -50%)`,
								transition: "all 0.3s ease",
							}}
						>
							{node.type === "post" ? (
								<Link
									href={`/blog/${node.slug}`} // Use slug instead of id
									className={`block rounded-full border border-cyan-700 transition-all duration-300 cursor-pointer ${
										hoveredNode === node.id
											? "bg-cyan-400/80"
											: "bg-cyan-900/50"
									} hover:bg-cyan-400/80`}
									style={{
										width: node.radius * 2,
										height: node.radius * 2,
									}}
									onMouseEnter={() => setHoveredNode(node.id)}
									onMouseLeave={() => setHoveredNode(null)}
								>
									<span className="absolute inset-0 flex items-center justify-center text-xs text-cyan-100">
										{node.label}
									</span>
								</Link>
							) : node.type === "category" ? (
								<div
									className="rounded-full border border-cyan-900 flex items-center justify-center font-medium text-cyan-100 transition-all duration-300"
									style={{
										width: node.radius * 2,
										height: node.radius * 2,
										backgroundColor: node.color || "rgba(8, 25, 48, 0.9)",
										boxShadow:
											hoveredNode === node.id
												? "0 0 15px rgba(34, 211, 238, 0.5)"
												: "none",
									}}
								>
									{node.label}
								</div>
							) : null}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
