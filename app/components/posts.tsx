import { formatDate, getBlogPosts } from "app/blog/utils";
import Link from "next/link";

interface BlogPostsProps {
	limit?: number;
	sortBy?: "date" | "title";
	showSummary?: boolean;
}

export async function BlogPosts({
	limit,
	sortBy = "date",
	showSummary = true,
}: BlogPostsProps = {}) {
	let allBlogs = await getBlogPosts();

	if (process.env.NODE_ENV === "production") {
		// Filter out drafts in production
		allBlogs = allBlogs.filter((post) => !post.metadata.draft);
	}

	const postsToShow = allBlogs
		.sort((a, b) => {
			if (sortBy === "title") {
				return a.metadata.title.localeCompare(b.metadata.title);
			}
			return (
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
			);
		})
		.slice(0, limit);

	return (
		<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
			{postsToShow.map((post) => (
				<Link
					key={post.slug}
					className="group relative flex flex-col py-3 px-2 hover:bg-neutral-50
            dark:hover:bg-neutral-900 rounded-md transition-colors"
					href={`/blog/${post.slug}`}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<span className="text-sm text-neutral-500 dark:text-neutral-400 w-20 shrink-0">
								{formatDate(post.metadata.publishedAt, "short")}
							</span>
							<span className="text-neutral-800 dark:text-neutral-200">
								{post.metadata.title}
							</span>
						</div>

						<div className="flex items-center gap-2">
							{post.metadata.readingTime && (
								<span className="text-xs text-neutral-500 shrink-0">
									{post.metadata.readingTime}m
								</span>
							)}
							<span
								className="text-neutral-300 group-hover:text-neutral-400
              group-hover:translate-x-0.5 transition-all"
							>
								→
							</span>
						</div>
					</div>

					{showSummary && post.metadata.summary && (
						<p
							className="absolute left-full top-0 ml-2 p-4 w-80
								bg-neutral-50 dark:bg-neutral-900
								text-sm text-neutral-600 dark:text-neutral-400
								rounded-md shadow-lg
								opacity-0 group-hover:opacity-100
								transition-opacity duration-200 z-10
								line-clamp-3
								pointer-events-none
								border border-neutral-200 dark:border-neutral-800"
						>
							{post.metadata.summary}
						</p>
					)}
				</Link>
			))}
		</div>
	);
}