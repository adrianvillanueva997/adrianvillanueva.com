import Link from "next/link";

interface RelatedPost {
	slug: string;
	title: string;
	summary: string;
}

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
	return (
		<section className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
			<h2 className="text-2xl font-bold mb-6">Related Posts</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800
              hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
					>
						<h3 className="font-semibold mb-2">{post.title}</h3>
						<p className="text-sm text-neutral-600 dark:text-neutral-400">
							{post.summary}
						</p>
					</Link>
				))}
			</div>
		</section>
	);
}