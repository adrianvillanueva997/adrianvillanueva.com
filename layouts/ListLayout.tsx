"use client";

import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import type { Blog } from "contentlayer/generated";
import { usePathname } from "next/navigation";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import { useState } from "react";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}
interface ListLayoutProps {
	posts: CoreContent<Blog>[];
	title: string;
	initialDisplayPosts?: CoreContent<Blog>[];
	pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
	const pathname = usePathname();
	const segments = pathname.split("/");
	const _lastSegment = segments[segments.length - 1];
	const basePath = pathname
		.replace(/^\//, "") // Remove leading slash
		.replace(/\/page\/\d+$/, ""); // Remove any trailing /page
	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<div className="py-16">
			<nav className="flex justify-between items-center border-4 border-black bg-white p-6">
				{!prevPage && (
					<button
						type="button"
						className="cursor-not-allowed font-mono font-black text-gray-400 uppercase"
						disabled={!prevPage}
					>
						← PREVIOUS
					</button>
				)}
				{prevPage && (
					<Link
						href={
							currentPage - 1 === 1
								? `/${basePath}/`
								: `/${basePath}/page/${currentPage - 1}`
						}
						rel="prev"
						className="inline-flex items-center px-6 py-3 border-2 border-black bg-gray-100 hover:bg-red-500 hover:text-white transition-colors font-mono font-black uppercase"
					>
						← PREVIOUS
					</Link>
				)}
				<span className="font-mono font-black text-black bg-yellow-300 border-2 border-black px-6 py-3 uppercase">
					{currentPage} OF {totalPages}
				</span>
				{!nextPage && (
					<button
						type="button"
						className="cursor-not-allowed font-mono font-black text-gray-400 uppercase"
						disabled={!nextPage}
					>
						NEXT →
					</button>
				)}
				{nextPage && (
					<Link
						href={`/${basePath}/page/${currentPage + 1}`}
						rel="next"
						className="inline-flex items-center px-6 py-3 border-2 border-black bg-gray-100 hover:bg-red-500 hover:text-white transition-colors font-mono font-black uppercase"
					>
						NEXT →
					</Link>
				)}
			</nav>
		</div>
	);
}

export default function ListLayout({
	posts,
	title,
	initialDisplayPosts = [],
	pagination,
}: ListLayoutProps) {
	const [searchValue, setSearchValue] = useState("");
	const filteredBlogPosts = posts.filter((post) => {
		const searchContent = post.title + post.summary + post.tags?.join(" ");
		return searchContent.toLowerCase().includes(searchValue.toLowerCase());
	});

	// If initialDisplayPosts exist, display it if no searchValue is specified
	const displayPosts =
		initialDisplayPosts.length > 0 && !searchValue
			? initialDisplayPosts
			: filteredBlogPosts;

	return (
		<div className="bg-white min-h-screen">
			{/* Header */}
			<div className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
				<div className="text-center max-w-5xl mx-auto space-y-8">
					<h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase">
						{title}
					</h1>

					{/* Search */}
					<div className="max-w-lg mx-auto">
						<div className="border-4 border-black bg-white p-4">
							<label className="block">
								<span className="font-mono font-black text-black uppercase text-sm mb-2 block">
									SEARCH POSTS:
								</span>
								<input
									aria-label="Search articles"
									type="text"
									onChange={(e) => setSearchValue(e.target.value)}
									placeholder="TYPE SEARCH TERMS..."
									className="w-full px-4 py-3 border-2 border-black font-mono text-black bg-white focus:outline-none focus:bg-yellow-100 transition-colors placeholder-gray-500 uppercase"
								/>
							</label>
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="px-4 sm:px-6 md:px-10 bg-gray-50 py-16">
				<div className="max-w-4xl mx-auto">
					{/* No Results */}
					{!filteredBlogPosts.length && (
						<div className="text-center py-16">
							<div className="border-4 border-black bg-red-500 text-white p-8">
								<p className="font-mono font-black text-xl uppercase mb-4">
									NO POSTS FOUND
								</p>
								<p className="font-mono text-white">
									Try different search terms or browse all posts.
								</p>
							</div>
						</div>
					)}

					{/* Posts List */}
					<div className="space-y-8">
						{displayPosts.map((post) => {
							const { path, date, title, summary, tags } = post;
							return (
								<article key={path} className="border-4 border-black bg-white p-8 hover:bg-gray-50 transition-colors">
									<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
										{/* Date */}
										<div className="lg:col-span-1">
											<div className="border-2 border-black bg-yellow-300 p-4 text-center lg:text-left">
												<span className="font-mono font-black text-black uppercase text-sm block mb-2">
													PUBLISHED:
												</span>
												<time dateTime={date} className="font-mono text-black">
													{formatDate(date, siteMetadata.locale)}
												</time>
											</div>
										</div>

										{/* Content */}
										<div className="lg:col-span-3 space-y-4">
											<h2 className="text-2xl lg:text-3xl font-black font-mono text-black uppercase leading-tight">
												<Link
													href={`/${path}`}
													className="text-black hover:text-red-500 transition-colors"
												>
													{title}
												</Link>
											</h2>

											{/* Tags */}
											{tags && (
												<div className="flex flex-wrap gap-2">
													{tags.map((tag) => (
														<Tag key={tag} text={tag} />
													))}
												</div>
											)}

											{/* Summary */}
											{summary && (
												<p className="font-mono text-black leading-relaxed">
													{summary}
												</p>
											)}

											{/* Read More */}
											<div className="pt-4">
												<Link
													href={`/${path}`}
													className="inline-block px-6 py-3 border-2 border-black bg-red-500 text-white font-mono font-black uppercase hover:bg-black transition-colors"
												>
													READ POST →
												</Link>
											</div>
										</div>
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</div>

			{/* Pagination */}
			{pagination && pagination.totalPages > 1 && !searchValue && (
				<div className="px-4 sm:px-6 md:px-10 bg-gray-50">
					<div className="max-w-4xl mx-auto">
						<Pagination
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
