import type { BlogPost } from "app/types/blog";
import type { Edge, Node as GraphNode } from "./types";

function generateDynamicColors(
	count: number,
): { base: string; glow: string }[] {
	const colors: { base: string; glow: string }[] = [];
	const hueStep = 360 / count;

	for (let i = 0; i < count; i++) {
		const hue = (i * hueStep + Math.random() * 20 - 10) % 360; // Add slight randomness
		const satBase = 50 + Math.random() * 20; // 50-70%
		const satGlow = 80 + Math.random() * 15; // 80-95%
		const lightBase = 12 + Math.random() * 8; // 12-20%
		const lightGlow = 35 + Math.random() * 15; // 35-50%

		colors.push({
			base: `hsla(${hue}, ${satBase}%, ${lightBase}%, 0.9)`,
			glow: `hsla(${hue}, ${satGlow}%, ${lightGlow}%, 0.4)`,
		});
	}

	return colors;
}

function generateCategoryColors(categories: string[]): Map<string, string> {
	const colorMap = new Map<string, string>();
	const dynamicColors = generateDynamicColors(Math.max(5, categories.length));

	categories.forEach((category, index) => {
		const colors = dynamicColors[index % dynamicColors.length];
		colorMap.set(category, colors.base);
		colorMap.set(`${category}-glow`, colors.glow);
	});

	return colorMap;
}

function checkOverlap(node1: GraphNode, node2: GraphNode): boolean {
	const dx = node1.x - node2.x;
	const dy = node2.y - node2.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance < node1.radius + node2.radius + 10; // 10px buffer
}

function adjustNodePosition(
	node: GraphNode,
	nodes: GraphNode[],
	width: number,
	height: number,
) {
	const iterations = 50;
	const moveStep = 5;

	for (let i = 0; i < iterations; i++) {
		let hasOverlap = false;

		for (const otherNode of nodes) {
			if (otherNode.id === node.id) continue;

			if (checkOverlap(node, otherNode)) {
				hasOverlap = true;
				const angle = Math.atan2(node.y - otherNode.y, node.x - otherNode.x);
				node.x += Math.cos(angle) * moveStep;
				node.y += Math.sin(angle) * moveStep;

				// Keep within bounds
				node.x = Math.max(node.radius, Math.min(width - node.radius, node.x));
				node.y = Math.max(node.radius, Math.min(height - node.radius, node.y));
			}
		}

		if (!hasOverlap) break;
	}
}

function getRandomPosition(width: number, height: number, radius: number) {
	const padding = radius * 2;
	return {
		x: padding + Math.random() * (width - padding * 2),
		y: padding + Math.random() * (height - padding * 2),
	};
}

function distanceToLine(
	point: { x: number; y: number },
	lineStart: { x: number; y: number },
	lineEnd: { x: number; y: number },
): number {
	const A = point.x - lineStart.x;
	const B = point.y - lineStart.y;
	const C = lineEnd.x - lineStart.x;
	const D = lineEnd.y - lineStart.y;

	const dot = A * C + B * D;
	const lenSq = C * C + D * D;
	let param = -1;

	if (lenSq !== 0) param = dot / lenSq;

	let xx: number;
	let yy: number;
	if (param < 0) {
		xx = lineStart.x;
		yy = lineStart.y;
	} else if (param > 1) {
		xx = lineEnd.x;
		yy = lineEnd.y;
	} else {
		xx = lineStart.x + param * C;
		yy = lineStart.y + param * D;
	}

	const dx = point.x - xx;
	const dy = point.y - yy;
	return Math.sqrt(dx * dx + dy * dy);
}

function checkLineOverlap(
	node: GraphNode,
	edges: Edge[],
	nodes: GraphNode[],
): boolean {
	const nodeRadius = node.radius + 5; // Buffer distance

	for (const edge of edges) {
		const source = nodes.find((n) => n.id === edge.source);
		const target = nodes.find((n) => n.id === edge.target);

		if (source && target && target.id !== node.id && source.id !== node.id) {
			const distance = distanceToLine(node, source, target);
			if (distance < nodeRadius) return true;
		}
	}
	return false;
}

function lineIntersectsNode(
	line: { start: { x: number; y: number }; end: { x: number; y: number } },
	node: { x: number; y: number; radius: number },
): boolean {
	const d = distanceToLine(node, line.start, line.end);
	return d < node.radius + 5; // 5px buffer
}

function adjustPostPosition(
	post: { x: number; y: number },
	categoryPos: { x: number; y: number },
	nodes: GraphNode[],
	nodeSize: number,
	angle: number,
	radius: number,
): { x: number; y: number } {
	let currentRadius = radius;
	const position = { ...post };
	let attempts = 0;
	const maxAttempts = 15;

	while (attempts < maxAttempts) {
		position.x = categoryPos.x + currentRadius * Math.cos(angle);
		position.y = categoryPos.y + currentRadius * Math.sin(angle);

		// Check if any category node intersects with the line
		const hasIntersection = nodes
			.filter((n) => n.type === "category")
			.some((node) =>
				lineIntersectsNode({ start: categoryPos, end: position }, node),
			);

		if (!hasIntersection) {
			break;
		}

		currentRadius += nodeSize * 0.5;
		attempts++;
	}

	return position;
}

function checkCategoryOverlap(node1: GraphNode, node2: GraphNode): boolean {
	const dx = node1.x - node2.x;
	const dy = node1.y - node2.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	const minDistance = node1.radius + node2.radius + 20; // 20px buffer
	return distance < minDistance;
}

function adjustCategoryPosition(
	position: { x: number; y: number },
	nodes: GraphNode[],
	nodeSize: number,
	centerArea: { x: number; y: number; width: number; height: number },
): { x: number; y: number } {
	let attempts = 0;
	const maxAttempts = 50;
	let adjustedPosition = { ...position };

	while (attempts < maxAttempts) {
		const hasOverlap = nodes
			.filter((n) => n.type === "category")
			.some((node) =>
				checkCategoryOverlap(
					{
						...adjustedPosition,
						radius: nodeSize,
						type: "category",
					} as GraphNode,
					node,
				),
			);

		if (!hasOverlap) break;

		// Try new random position
		adjustedPosition = {
			x: centerArea.x + Math.random() * centerArea.width,
			y: centerArea.y + Math.random() * centerArea.height,
		};

		attempts++;
	}

	return adjustedPosition;
}

export function calculateGraphLayout(
	categoryPosts: Record<string, BlogPost[]>,
	width: number,
	height: number,
) {
	const nodes: GraphNode[] = [];
	const edges: Edge[] = [];
	const addedPosts = new Set<string>();
	const categories = Object.keys(categoryPosts);
	const categoryColors = generateCategoryColors(categories);
	const categoryPositions = new Map<string, { x: number; y: number }>();

	// Count connections per category
	const categoryConnections = categories.reduce(
		(acc, category) => {
			acc[category] = categoryPosts[category].length;
			return acc;
		},
		{} as Record<string, number>,
	);

	// Sort categories by connection count
	const sortedCategories = categories.sort(
		(a, b) => categoryConnections[b] - categoryConnections[a],
	);

	// Position categories randomly in center area
	const centerArea = {
		width: width * 0.5,
		height: height * 0.5,
		x: width * 0.25,
		y: height * 0.25,
	};

	const nodeSize = Math.min(
		50,
		centerArea.width / (sortedCategories.length + 4),
	);

	// Adjust node sizes for better hierarchy
	const categoryNodeSize = nodeSize * 1.5;
	const postNodeSize = nodeSize * 0.8;

	sortedCategories.forEach((category, i) => {
		let position = {
			x: centerArea.x + Math.random() * centerArea.width,
			y: centerArea.y + Math.random() * centerArea.height,
		};

		position = adjustCategoryPosition(
			position,
			nodes,
			categoryNodeSize,
			centerArea,
		);

		const categoryId = `category-${category}-${i}`;
		const node = {
			id: categoryId,
			label: category,
			type: "category" as const,
			x: position.x,
			y: position.y,
			radius: categoryNodeSize,
			slug: "",
			color: categoryColors.get(category) || "rgba(8, 25, 48, 0.9)",
			glowColor:
				categoryColors.get(`${category}-glow`) || "rgba(6, 182, 212, 0.4)",
		};

		nodes.push(node);
		categoryPositions.set(category, position);
	});

	// Group posts by their category combinations
	const postsByCategories = new Map<string, Array<BlogPost>>();
	for (const post of Object.values(categoryPosts).flat()) {
		const categoriesKey = [...(post.metadata.categories ?? [])]
			.sort()
			.join("-");
		if (!postsByCategories.has(categoriesKey)) {
			postsByCategories.set(categoriesKey, []);
		}
		postsByCategories.get(categoriesKey)?.push(post);
	}

	// Position posts based on their categories
	const centerX = width / 2;
	const centerY = height / 2;
	postsByCategories.forEach((posts, categoriesKey) => {
		const postCategories = categoriesKey.split("-");
		posts.forEach((post, index) => {
			// Skip if post already added
			if (addedPosts.has(post.slug)) {
				return;
			}
			addedPosts.add(post.slug);

			const uniquePostId = `post-${categoriesKey}-${index}-${post.slug}`;
			let x = 0;
			let y = 0;

			if (postCategories.length > 1) {
				// Multiple categories - calculate centroid position
				let totalX = 0;
				let totalY = 0;
				let validPositions = 0;

				postCategories.forEach((category) => {
					const pos = categoryPositions.get(category);
					if (pos) {
						totalX += pos.x;
						totalY += pos.y;
						validPositions++;
					}
				});

				if (validPositions > 0) {
					x = totalX / validPositions;
					y = totalY / validPositions;

					// Add spread to avoid overlaps
					const spreadAngle = (index / posts.length) * 2 * Math.PI;
					const spreadRadius = nodeSize * (0.2 * postCategories.length);
					x += spreadRadius * Math.cos(spreadAngle);
					y += spreadRadius * Math.sin(spreadAngle);
				}
			} else {
				// Single category - place closer to parent
				const categoryPos = categoryPositions.get(postCategories[0]);
				if (categoryPos) {
					const baseAngle = Math.atan2(
						categoryPos.y - centerY,
						categoryPos.x - centerX,
					);
					let radius = nodeSize * 2; // Start further out
					const arcLength = Math.PI / Math.max(posts.length, 2);
					const arcAngle = baseAngle + (index - posts.length / 2) * arcLength;

					const position = adjustPostPosition(
						{ x, y },
						categoryPos,
						nodes,
						nodeSize,
						arcAngle,
						radius,
					);

					x = position.x;
					y = position.y;
				}
			}

			nodes.push({
				id: uniquePostId,
				label: post.metadata.title,
				type: "post",
				x,
				y,
				radius: postNodeSize,
				slug: post.slug,
				glowIntensity: postCategories.length, // More categories = more glow
			});

			postCategories.forEach((category) => {
				const categoryNode = nodes.find(
					(n) => n.type === "category" && n.label === category,
				);
				if (categoryNode) {
					edges.push({
						source: categoryNode.id,
						target: uniquePostId,
						color:
							categoryColors.get(`${category}-glow`) ||
							"rgba(6, 182, 212, 0.4)",
						width: 1.5,
						animate: true,
					});
				}
			});
		});
	});

	// After positioning nodes, adjust for overlaps
	nodes.forEach((node) => {
		if (node.type === "post") {
			adjustNodePosition(node, nodes, width, height);
		}
	});

	return { nodes, edges };
}