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
		<div className="space-y-2 pt-6 pb-8 md:space-y-5">
			<nav className="flex justify-between items-center bg-black/60 border border-gray-800/50 rounded-lg p-6 shadow-lg">
				{!prevPage && (
					<button
						type="button"
						className="cursor-auto disabled:opacity-50 font-mono text-gray-600"
						disabled={!prevPage}
					>
						▲ PREVIOUS_VOID
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
						className="inline-flex items-center px-4 py-2 bg-black/60 border border-gray-800/50 rounded hover:border-orange-900/60 transition-all duration-300 shadow-lg font-mono text-[#00ff99] hover:text-white"
					>
						<span className="mr-2">▲</span>
						PREVIOUS_VOID
					</Link>
				)}
				<span className="font-mono text-orange-400 font-bold bg-black/80 border border-orange-400/30 px-4 py-2 rounded">
					◉ {currentPage} / {totalPages} ◉
				</span>
				{!nextPage && (
					<button
						type="button"
						className="cursor-auto disabled:opacity-50 font-mono text-gray-600"
						disabled={!nextPage}
					>
						NEXT_VOID ▲
					</button>
				)}
				{nextPage && (
					<Link
						href={`/${basePath}/page/${currentPage + 1}`}
						rel="next"
						className="inline-flex items-center px-4 py-2 bg-black/60 border border-gray-800/50 rounded hover:border-orange-900/60 transition-all duration-300 shadow-lg font-mono text-[#00ff99] hover:text-white"
					>
						NEXT_VOID
						<span className="ml-2">▲</span>
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
		<>
			<div className="divide-y divide-gray-800/50 dark:divide-gray-700">
				<div className="space-y-6 pt-6 pb-8 md:space-y-8 relative overflow-hidden">
					{/* Cyber-doom background effects */}
					<div className="absolute inset-0 synthwave-grid opacity-5" />
					<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

					<div className="relative z-10">
						{/* Terminal indicator */}
						<div className="font-mono text-xs text-gray-500 mb-4 font-bold text-center">
							<span className="text-orange-400">▲</span> ARCHIVE_NEXUS <span className="text-orange-400">▲</span>
						</div>

						<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-[#ff3860] sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 font-gothic text-center">
							{title}
						</h1>
					</div>

					<div className="relative max-w-lg mx-auto z-10">
						<label>
							<span className="sr-only">Search articles</span>
							<input
								aria-label="Search articles"
								type="text"
								onChange={(e) => setSearchValue(e.target.value)}
								placeholder="Search neural entries..."
								className="w-full px-4 py-3 bg-black/60 border border-gray-800/50 rounded-lg text-[#00ff99] font-mono placeholder-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
							/>
						</label>
						<svg
							className="absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-label="Search icon"
						>
							<title>Search</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
				<ul className="space-y-6">
					{!filteredBlogPosts.length && (
						<div className="text-center py-12 bg-black/40 border border-gray-800/30 rounded-lg">
							<p className="font-mono text-orange-400 text-lg">
								▲ NO NEURAL_ENTRIES DETECTED ▲
							</p>
							<p className="font-mono text-gray-500 text-sm mt-2">
								The void speaks no wisdom today.
							</p>
						</div>
					)}
					{displayPosts.map((post) => {
						const { path, date, title, summary, tags } = post;
						return (
							<li key={path} className="py-6">
								<article className="space-y-4 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 bg-black/40 border border-gray-800/30 rounded-lg p-6 hover:border-orange-900/60 transition-all duration-300 shadow-lg hover:shadow-xl">
									<dl className="xl:mb-0 mb-4">
										<dt className="sr-only">Published on</dt>
										<dd className="text-sm leading-6 font-mono font-medium text-orange-400 bg-black/60 border border-orange-400/30 px-3 py-2 rounded shadow-lg shadow-orange-400/10">
											<span className="text-gray-500">◉</span>
											<time dateTime={date} className="ml-2">
												{formatDate(date, siteMetadata.locale)}
											</time>
										</dd>
									</dl>
									<div className="space-y-4 xl:col-span-3">
										<div>
											<h3 className="text-xl leading-7 font-bold tracking-tight font-gothic">
												<Link
													href={`/${path}`}
													className="text-[#00ff99] hover:text-white transition-colors duration-300"
												>
													{title}
												</Link>
											</h3>
											<div className="flex flex-wrap gap-2 mt-3">
												{tags?.map((tag) => (
													<Tag key={tag} text={tag} />
												))}
											</div>
										</div>
										<div className="prose max-w-none text-gray-400 font-mono text-sm leading-relaxed">
											{summary}
										</div>
									</div>
								</article>
							</li>
						);
					})}
				</ul>
			</div>
			{pagination && pagination.totalPages > 1 && !searchValue && (
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={pagination.totalPages}
				/>
			)}
		</>
	);
}
