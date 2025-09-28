"use client";

import Comments from "@/components/Comments";
import Link from "@/components/Link";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import siteMetadata from "@/data/siteMetadata";
import type { Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import type { ReactNode } from "react";

interface LayoutProps {
	content: CoreContent<Blog>;
	children: ReactNode;
	next?: { path: string; title: string };
	prev?: { path: string; title: string };
}

export default function PostLayout({
	content,
	next,
	prev,
	children,
}: LayoutProps) {
	const { path, slug, date, title } = content;

	return (
		<div className="bg-white min-h-screen">
			<ScrollTopAndComment />
			<article>
				{/* Header */}
				<header className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
					<div className="max-w-4xl mx-auto text-center">
						<dl className="mb-8">
							<dt className="sr-only">Published on</dt>
							<dd className="border-2 border-black bg-gray-100 p-4 inline-block">
								<span className="font-mono font-black text-black uppercase text-sm">
									PUBLISHED:
								</span>
								<time dateTime={date} className="font-mono text-black ml-2">
									{formatDate(date, siteMetadata.locale)}
								</time>
							</dd>
						</dl>
						<div className="border-4 border-black bg-white p-8">
							<h1 className="text-3xl md:text-5xl font-black font-mono text-black uppercase leading-tight">
								{title}
							</h1>
						</div>
					</div>
				</header>

				{/* Content */}
				<div className="px-4 sm:px-6 md:px-10 bg-gray-50 py-16">
					<div className="max-w-4xl mx-auto">
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

						{/* Comments */}
						{siteMetadata.comments && (
							<div className="mt-16">
								<div className="border-4 border-black bg-white p-8">
									<h2 className="text-2xl font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
										COMMENTS
									</h2>
									<Comments slug={slug} />
								</div>
							</div>
						)}

						{/* Navigation */}
						{(prev || next) && (
							<div className="mt-16">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									{prev?.path && (
										<div className="border-4 border-black bg-white p-6">
											<h3 className="font-mono font-black text-black uppercase text-sm mb-4">
												PREVIOUS POST
											</h3>
											<Link
												href={`/${prev.path}`}
												className="font-mono text-red-500 hover:underline hover:decoration-4 transition-all font-bold"
												aria-label={`Previous post: ${prev.title}`}
											>
												← {prev.title}
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
												aria-label={`Next post: ${next.title}`}
											>
												{next.title} →
											</Link>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</article>
		</div>
	);
}
