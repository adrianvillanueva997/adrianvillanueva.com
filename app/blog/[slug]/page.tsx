import { formatDate, getBlogPosts } from "app/blog/utils";
import { CustomMDX } from "app/components/mdx";
import { baseUrl } from "app/sitemap";
import { notFound } from "next/navigation";
import Script from "next/script";

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

export async function generateMetadata(context: { params: { slug: string } }) {
	const { slug } = context.params; // Access params directly without awaiting
	const posts = await getBlogPosts();
	const post = posts.find((post) => post.slug === slug);
	if (!post) {
		return;
	}

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
			url: `${baseUrl}/blog/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

interface PageParams {
	params: {
		slug: string;
	};
}

// Default export for the page component
export default async function BlogPostPage({ params }: PageParams) {
	const posts = await getBlogPosts();
	const { slug } = params; // Access params directly without awaiting
	// Find the specific post by slug
	const post = posts.find((post) => post.slug === slug);

	if (!post) {
		notFound(); // Redirect to 404 if the post is not found
	}

	return (
		<section>
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
					url: `${baseUrl}/blog/${post.slug}`,
					author: {
						"@type": "Person",
						name: "My Portfolio",
					},
				}}
			/>
			<h1 className="title font-semibold text-2xl tracking-tighter">
				{post.metadata.title}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.metadata.publishedAt)}
				</p>
			</div>
			<article className="prose">
				<CustomMDX source={post.content} />
			</article>
		</section>
	);
}
