import type { BlogPost } from "app/types/blog";
import type { Edge, Node } from "./types";

export function calculateGraphLayout(
	categoryPosts: Record<string, BlogPost[]>,
	width: number,
	height: number,
) {
	const nodes: Node[] = [];
	const edges: Edge[] = [];
	const categories = Object.keys(categoryPosts);

	// Add category nodes with unique IDs
	categories.forEach((category, i) => {
		const categoryId = `category-${category}`;
		nodes.push({
			id: categoryId,
			label: category,
			type: "category",
			x: 0,
			y: 0,
			radius: 50,
		});

		// Add post nodes with unique IDs
		categoryPosts[category].forEach((post) => {
			const postId = `post-${post.slug}`;

			// Only add post node if it doesn't exist
			if (!nodes.find((n) => n.id === postId)) {
				nodes.push({
					id: postId,
					label: post.metadata.title,
					type: "post",
					x: 0,
					y: 0,
					radius: 35,
				});
			}

			// Add edge from category to post
			edges.push({
				source: categoryId,
				target: postId,
			});
		});
	});

	// Calculate positions
	const centerX = width / 2;
	const centerY = height / 2;

	// Place categories in outer circle
	categories.forEach((category, i) => {
		const angle = (i / categories.length) * 2 * Math.PI;
		const radius = Math.min(width, height) / 3;

		const categoryId = `category-${category}`;
		const categoryNode = nodes.find((n) => n.id === categoryId);
		if (categoryNode) {
			categoryNode.x = centerX + radius * Math.cos(angle);
			categoryNode.y = centerY + radius * Math.sin(angle);
		}

		// Place posts around category
		const posts = categoryPosts[category];
		posts.forEach((post, j) => {
			const postRadius = radius * 0.7;
			const postAngle = angle + ((j / posts.length - 0.5) * Math.PI) / 3;

			const postId = `post-${post.slug}`;
			const postNode = nodes.find((n) => n.id === postId);
			if (postNode) {
				postNode.x = centerX + postRadius * Math.cos(postAngle);
				postNode.y = centerY + postRadius * Math.sin(postAngle);
			}
		});
	});

	return { nodes, edges };
}