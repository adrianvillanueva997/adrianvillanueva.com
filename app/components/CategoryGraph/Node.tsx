import Link from "next/link";
import { memo } from "react";
import type { Node as GraphNode } from "./types";

interface NodeProps {
	node: GraphNode;
	isHovered: boolean;
	onHover: (id: string | null) => void;
}

export const Node = memo(function Node({
	node,
	isHovered,
	onHover,
}: NodeProps) {
	const baseStyles = {
		width: node.radius * 2,
		height: node.radius * 2,
		transform: `translate(${node.x}px, ${node.y}px) translate(-50%, -50%)`,
	};

	if (node.type === "post") {
		return (
			<Link
				href={`/blog/${node.slug}`}
				className="absolute block rounded-full border border-cyan-700 transition-all duration-300"
				style={{
					...baseStyles,
					backgroundColor: isHovered
						? "rgba(34, 211, 238, 0.8)"
						: "rgba(8, 47, 73, 0.5)",
				}}
				onMouseEnter={() => onHover(node.id)}
				onMouseLeave={() => onHover(null)}
			>
				<span className="absolute inset-0 flex items-center justify-center text-xs text-cyan-100">
					{node.label}
				</span>
			</Link>
		);
	}

	return (
		<div
			className="absolute rounded-full border border-cyan-900 flex items-center justify-center font-medium text-cyan-100 transition-all duration-300"
			style={{
				...baseStyles,
				backgroundColor: node.color,
				boxShadow: isHovered
					? `0 0 20px ${node.color?.replace("0.9)", "0.4)")}`
					: "none",
			}}
			onMouseEnter={() => onHover(node.id)}
			onMouseLeave={() => onHover(null)}
		>
			{node.label}
		</div>
	);
});
