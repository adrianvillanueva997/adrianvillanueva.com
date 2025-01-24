import { getBlogPosts } from "app/blog/utils";
import { CategoryGraph } from "app/components/CategoryGraph/CategoryGraph";
import type { BlogPost } from "app/types/blog";

export default async function CategoriesPage() {
	const posts = await getBlogPosts();

	// Create category-post mapping
	const categoryPosts = posts.reduce(
		(acc, post) => {
			const mappedPost: BlogPost = {
				...post,
				metadata: {
					title: post.metadata.title,
					description: post.metadata.summary,
					date: post.metadata.publishedAt,
					categories: post.metadata.categories,
					readingTime: post.metadata.readingTime,
				},
			};
			for (const category of mappedPost.metadata.categories ?? []) {
				if (!acc[category]) {
					acc[category] = [];
				}
				acc[category].push(mappedPost);
			}
			return acc;
		},
		{} as Record<string, BlogPost[]>,
	);

	return (
		<section className="space-y-8 animate-fade-in">
			<div className="space-y-4">
				<h1
					className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
				>
					Mind map Categories
				</h1>
				<p className="text-cyan-300/70">
					Exploring interconnected knowledge nodes
				</p>
				<CategoryGraph categoryPosts={categoryPosts} />
			</div>
		</section>
	);
}