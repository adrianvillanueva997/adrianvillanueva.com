"use client";

import Image from "@/components/Image";
import Link from "@/components/Link";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import type { Authors, Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import type { ReactNode } from "react";

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`;
const postDateTemplate: Intl.DateTimeFormatOptions = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

interface LayoutProps {
	content: CoreContent<Blog>;
	authorDetails: CoreContent<Authors>[];
	next?: { path: string; title: string };
	prev?: { path: string; title: string };
	children: ReactNode;
}

export default function PostLayout({
	content,
	authorDetails,
	next,
	prev,
	children,
}: LayoutProps) {
	const { filePath, path, slug, date, title, tags } = content;
	const basePath = path.split("/")[0];
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: title,
		datePublished: date,
		dateModified: date,
		author: authorDetails.map((author) => ({
			"@type": "Person",
			name: author.name,
			url: author.twitter || undefined,
		})),
		url: `${siteMetadata.siteUrl}/${path}`,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${siteMetadata.siteUrl}/${path}`,
		},
		publisher: {
			"@type": "Organization",
			name: siteMetadata.title,
			logo: {
				"@type": "ImageObject",
				url: `${siteMetadata.siteUrl}/static/images/avatar.png`,
			},
		},
	};

	return (
		<div className="bg-white min-h-screen">
			<ScrollTopAndComment />
			<article>
				{/* Header */}
				<header className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
					<div className="max-w-4xl mx-auto">
						<div className="text-center space-y-6">
							<dl>
								<dt className="sr-only">Published on</dt>
								<dd className="border-2 border-black bg-gray-100 p-4 inline-block">
									<span className="font-mono font-black text-black uppercase text-sm">
										PUBLISHED:
									</span>
									<time dateTime={date} className="font-mono text-black ml-2">
										{new Date(date).toLocaleDateString(
											siteMetadata.locale,
											postDateTemplate,
										)}
									</time>
								</dd>
							</dl>
							<div className="border-4 border-black bg-white p-8">
								<h1 className="text-3xl md:text-5xl font-black font-mono text-black uppercase leading-tight">
									{title}
								</h1>
							</div>
						</div>
					</div>
				</header>

				{/* Content */}
				<div className="px-4 sm:px-6 md:px-10 bg-gray-50 py-16">
					<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">

						{/* Main Content */}
						<div className="lg:col-span-3 order-2 lg:order-1">
							<div className="border-4 border-black bg-white p-8">
								<div className="prose prose-lg max-w-none
									prose-headings:font-mono prose-headings:font-black prose-headings:uppercase prose-headings:text-black prose-headings:border-b-4 prose-headings:border-black prose-headings:pb-4 prose-headings:mb-6
									prose-p:font-mono prose-p:text-black prose-p:leading-relaxed
									prose-strong:font-black prose-strong:text-black
									prose-code:font-mono prose-code:bg-yellow-300 prose-code:text-black prose-code:px-2 prose-code:py-1 prose-code:border prose-code:border-black prose-code:rounded-none prose-code:before:content-none prose-code:after:content-none
									prose-pre:bg-black prose-pre:text-green-400 prose-pre:border-4 prose-pre:border-black prose-pre:p-6 prose-pre:font-mono
									prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:bg-gray-100 prose-blockquote:p-4 prose-blockquote:font-mono prose-blockquote:text-black prose-blockquote:italic-0
									prose-ul:font-mono prose-ul:text-black
									prose-li:text-black prose-li:font-mono
									prose-a:text-red-500 prose-a:font-mono prose-a:font-black prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-4 prose-a:transition-all
									prose-hr:border-4 prose-hr:border-black prose-hr:my-8
									prose-img:border-4 prose-img:border-black
									prose-table:border-4 prose-table:border-black prose-table:font-mono
									prose-th:border-2 prose-th:border-black prose-th:bg-gray-100 prose-th:font-black prose-th:uppercase prose-th:p-4
									prose-td:border-2 prose-td:border-black prose-td:p-4
								">
									{children}
								</div>
							</div>

							{/* Edit Link */}
							<div className="mt-8">
								<div className="border-2 border-black bg-yellow-300 p-4 inline-block">
									<span className="font-mono font-black text-black uppercase text-sm mr-3">
										SOURCE:
									</span>
									<Link
										href={editUrl(filePath)}
										className="font-mono font-black text-red-500 hover:underline hover:decoration-4 transition-all"
									>
										VIEW ON GITHUB
									</Link>
								</div>
							</div>
						</div>

						{/* Sidebar */}
						<div className="lg:col-span-1 order-1 lg:order-2 space-y-8">
							{/* Authors */}
							<div className="border-4 border-black bg-white p-6">
								<h2 className="text-lg font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
									AUTHOR
								</h2>
								<div className="space-y-4">
									{authorDetails.map((author) => (
										<div key={author.name} className="border-2 border-black bg-gray-100 p-4">
											{author.avatar && (
												<div className="mb-4">
													<Image
														src={author.avatar}
														width={60}
														height={60}
														alt="Author"
														className="border-2 border-black"
													/>
												</div>
											)}
											<h3 className="font-mono font-black text-black uppercase text-sm mb-2">
												{author.name}
											</h3>
											{author.twitter && (
												<Link
													href={author.twitter}
													className="font-mono text-red-500 hover:underline hover:decoration-4 transition-all text-sm"
												>
													{author.twitter
														.replace("https://twitter.com/", "@")
														.replace("https://x.com/", "@")}
												</Link>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Tags */}
							{tags && (
								<div className="border-4 border-black bg-white p-6">
									<h2 className="text-lg font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
										TAGS
									</h2>
									<div className="flex flex-wrap gap-2">
										{tags.map((tag) => (
											<Tag key={tag} text={tag} />
										))}
									</div>
								</div>
							)}

							{/* Navigation */}
							{(next || prev) && (
								<div className="space-y-4">
									{prev?.path && (
										<div className="border-4 border-black bg-white p-6">
											<h3 className="font-mono font-black text-black uppercase text-sm mb-4">
												PREVIOUS POST
											</h3>
											<Link
												href={`/${prev.path}`}
												className="font-mono text-red-500 hover:underline hover:decoration-4 transition-all font-bold"
											>
												{prev.title}
											</Link>
										</div>
									)}
									{next?.path && (
										<div className="border-4 border-black bg-white p-6">
											<h3 className="font-mono font-black text-black uppercase text-sm mb-4">
												NEXT POST
											</h3>
											<Link
												href={`/${next.path}`}
												className="font-mono text-red-500 hover:underline hover:decoration-4 transition-all font-bold"
											>
												{next.title}
											</Link>
										</div>
									)}
								</div>
							)}

							{/* Back to Blog */}
							<div className="border-4 border-black bg-red-500 p-6">
								<Link
									href={`/${basePath}`}
									className="inline-block w-full text-center font-mono font-black text-white uppercase hover:bg-black transition-colors py-2"
									aria-label="Back to the blog"
								>
									← BACK TO BLOG
								</Link>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}
