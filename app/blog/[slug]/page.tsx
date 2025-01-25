import { formatDate, getBlogPosts } from "app/blog/utils";
import { CustomMDX } from "app/components/mdx";
import { Categories } from "app/components/post/Categories";
import { PostTitle } from "app/components/post/PostTitle";
import { baseUrl } from "app/sitemap";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

type BlogParams = {
	params: Promise<{ slug: string }>;
};

type JsonLdProps = {
	data: {
		"@context": string;
		"@type": string;
		headline: string;
		datePublished: string;
		dateModified: string;
		description: string;
		image: string;
		url: string;
		author: {
			"@type": string;
			name: string;
		};
	};
};

function JsonLd({ data }: JsonLdProps) {
  return (
			<Script type="application/ld+json" id="json-ld">
				{JSON.stringify(data)}
			</Script>
		);
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
		return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: BlogParams): Promise<Metadata> {
	const { slug } = await params;
	const posts = await getBlogPosts();
	const post = posts.find((post) => post.slug === slug);

	if (!post) return {};

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;

	const ogImage = image
		? image
		: `${baseUrl}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `${baseUrl}/blog/${slug}`,
			images: [{ url: ogImage }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function BlogPostPage({ params }: BlogParams) {
  const { slug } = await params;
		const posts = await getBlogPosts();
		const post = posts.find((p) => p.slug === slug);

		if (!post) {
			notFound();
		}

		return (
			<section className="animate-fade-in space-y-8">
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `${baseUrl}${post.metadata.image}`
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `${baseUrl}/blog/${slug}`,
						author: {
							"@type": "Person",
							name: "Adrian Villanueva",
						},
					}}
				/>

				<header className="space-y-4">
					<h1
						className="text-3xl font-bold tracking-tight bg-clip-text text-transparent
          bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600
          dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400"
					>
						{post.metadata.title}
					</h1>
					<div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
						<time dateTime={post.metadata.publishedAt}>
							{formatDate(post.metadata.publishedAt)}
						</time>
						{post.metadata.readingTime && (
							<>
								<span>·</span>
								<span>{post.metadata.readingTime} min read</span>
							</>
						)}
					</div>
				</header>

				<article className="prose dark:prose-invert max-w-none">
					<PostTitle title={post.metadata.title} draft={post.metadata.draft} />
					<CustomMDX source={post.content} />
				</article>

				{post.metadata.categories && (
					<footer className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
						<div className="flex items-center gap-4">
							<Categories categories={post.metadata.categories} />
						</div>
					</footer>
				)}
			</section>
		);
}
