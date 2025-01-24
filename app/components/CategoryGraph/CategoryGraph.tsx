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
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, dimensions.width, dimensions.height);

		edges.forEach((edge) => {
			const source = nodes.find((n) => n.id === edge.source);
			const target = nodes.find((n) => n.id === edge.target);
			if (!source || !target) return;

			ctx.beginPath();
			ctx.moveTo(source.x, source.y);
			ctx.lineTo(target.x, target.y);
			ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
			ctx.lineWidth = 1.5;
			ctx.setLineDash([4, 4]);
			ctx.stroke();
		});
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
					{nodes.map((node) => (
						<div
							key={node.id}
							className="absolute"
							style={{
								transform: `translate(${node.x}px, ${node.y}px) translate(-50%, -50%)`,
								transition: "all 0.3s ease",
							}}
						>
							{node.type === "post" ? (
								<Link
									href={`/blog/${node.id}`}
									className={`
                    block rounded-full
                    ${hoveredNode === node.id ? "bg-cyan-400/80" : "bg-cyan-900/50"}
                    border border-cyan-700
                    transition-all duration-300
                    hover:bg-cyan-400/80
                    cursor-pointer
                  `}
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
							) : (
								<div
									className={`
                    rounded-full
                    ${hoveredNode === node.id ? "bg-cyan-400/80" : "bg-cyan-900/50"}
                    border border-cyan-700
                    flex items-center justify-center
                    font-medium text-cyan-100
                  `}
									style={{
										width: node.radius * 2,
										height: node.radius * 2,
									}}
									onMouseEnter={() => setHoveredNode(node.id)}
									onMouseLeave={() => setHoveredNode(null)}
								>
									{node.label}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}