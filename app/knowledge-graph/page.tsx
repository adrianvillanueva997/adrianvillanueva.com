import { getBlogPosts } from "app/blog/utils";
import { CategoryGraph } from "app/components/CategoryGraph/CategoryGraph";
import type { BlogPost } from "app/types/blog";

export default async function CategoriesPage() {
	const posts = await getBlogPosts();

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
					draft: post.metadata.draft,
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

	const categoryCount = Object.keys(categoryPosts).length;
	const totalPosts = posts.length;

	return (
		<main className="min-h-screen">
			<section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
				<div className="space-y-12">
					<div className="text-center space-y-6">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
							Knowledge Graph
						</h1>
						<p className="text-xl text-cyan-300/70 max-w-2xl mx-auto animate-fade-in">
							Exploring {categoryCount} categories across {totalPosts}{" "}
							interconnected posts
						</p>
						<div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
					</div>

					<CategoryGraph categoryPosts={categoryPosts} />
				</div>
			</section>
		</main>
	);
}
