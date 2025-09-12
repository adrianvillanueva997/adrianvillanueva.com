"use client";

import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import tagData from "app/tag-data.json";
import type { Blog } from "contentlayer/generated";
import { slug } from "github-slugger";
import { usePathname } from "next/navigation";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}
interface ListLayoutProps {
	posts: CoreContent<Blog>[];
	title: string;
	initialDisplayPosts?: CoreContent<Blog>[];
	pagination?: PaginationProps;
	showSimplifiedView?: boolean; // New prop for simplified view
	description?: string; // Add this line
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
	const pathname = usePathname();
	const segments = pathname.split("/");
	const _lastSegment = segments[segments.length - 1];
	const basePath = pathname
		.replace(/^\//, "") // Remove leading slash
		.replace(/\/page\/\d+$/, ""); // Remove any trailing /page
	console.log(pathname);
	console.log(basePath);
	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<div className="space-y-2 pt-6 pb-8 md:space-y-5">
			<nav className="flex justify-between">
				{!prevPage && (
					<button
						className="cursor-auto disabled:opacity-50"
						disabled={!prevPage}
					>
						Previous
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
					>
						Previous
					</Link>
				)}
				<span>
					{currentPage} of {totalPages}
				</span>
				{!nextPage && (
					<button
						className="cursor-auto disabled:opacity-50"
						disabled={!nextPage}
					>
						Next
					</button>
				)}
				{nextPage && (
					<Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
						Next
					</Link>
				)}
			</nav>
		</div>
	);
}

export default function ListLayoutWithTags({
	posts,
	title,
	initialDisplayPosts = [],
	pagination,
	showSimplifiedView = false, // Default to false
	description, // Add this line
}: ListLayoutProps) {
	const pathname = usePathname();
	const tagCounts = tagData as Record<string, number>;
	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

	const displayPosts =
		initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

	return (
		<div>
			<section className="relative overflow-hidden pb-8 pt-6 md:space-y-5">
				<div className="absolute inset-0 synthwave-grid opacity-10" />
				<div className="relative z-10 space-y-2">
					<h1 className="text-3xl font-doom font-extrabold leading-9 tracking-tight text-primary-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 glow-text-subtle animate-doom-pulse">
						{title.toUpperCase().replace(/\s/g, '_')}
					</h1>
					{description && (
						<p className="text-lg leading-7 text-gray-300 font-mono">
							<span className="text-primary-400">[SYSTEM]</span> {description}
						</p>
					)}
				</div>
			</section>

			{/* RSS Feed Notice - Doom Style */}
			<div className="flex items-center text-sm text-gray-300 mt-4 border-t border-primary-700 pt-4 font-mono">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="h-4 w-4 mr-2 text-primary-400"
				>
					<title>RSS Feed</title>
					<path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" />
					<path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z" />
					<circle cx="6" cy="18" r="2" />
				</svg>
				<span>
					<span className="text-primary-400">[FEED]</span> Subscribe via{" "}
					<a
						href="/feed.xml"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-primary-400 hover:text-primary-300 hover-glow"
					>
						RSS
					</a>{" "}
					for real-time updates
				</span>
			</div>
			<div className="flex sm:space-x-24">
				<div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
					<div className="px-6 py-4">
						{pathname.startsWith("/blog") ? (
							<h3 className="text-primary-500 font-bold uppercase">
								All Posts
							</h3>
						) : (
							<Link
								href={`/blog`}
								className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
							>
								All Posts
							</Link>
						)}
						<ul>
							{sortedTags.map((t) => {
								return (
									<li key={t} className="my-3">
										{decodeURI(pathname.split("/tags/")[1]) === slug(t) ? (
											<h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
												{`${t} (${tagCounts[t]})`}
											</h3>
										) : (
											<Link
												href={`/tags/${slug(t)}`}
												className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
												aria-label={`View posts tagged ${t}`}
											>
												{`${t} (${tagCounts[t]})`}
											</Link>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div>
					{!showSimplifiedView ? (
						<ul>
							{displayPosts.map((post) => {
								const { path, date, title, summary, tags } = post;
								return (
									<li key={path} className="py-5">
										<article className="flex flex-col space-y-2 xl:space-y-0">
											<dl>
												<dt className="sr-only">Published on</dt>
												<dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
													<time dateTime={date} suppressHydrationWarning>
														{formatDate(date, siteMetadata.locale)}
													</time>
												</dd>
											</dl>
											<div className="space-y-3">
												<div>
													<h2 className="text-2xl leading-8 font-bold tracking-tight">
														<Link
															href={`/${path}`}
															className="text-gray-900 dark:text-gray-100"
														>
															{title}
														</Link>
													</h2>
													<div className="flex flex-wrap">
														{tags?.map((tag) => (
															<Tag key={tag} text={tag} />
														))}
													</div>
												</div>
												<div className="prose max-w-none text-gray-500 dark:text-gray-400">
													{summary}
												</div>
											</div>
										</article>
									</li>
								);
							})}
						</ul>
					) : (
						<ul className="divide-y divide-gray-200 dark:divide-gray-700">
							{displayPosts.map((post) => {
								const { path, date, title } = post;
								return (
									<li key={path} className="py-3">
										<article className="flex items-center space-x-4">
											<time
												className="text-sm text-gray-500 dark:text-gray-400 min-w-[90px]"
												dateTime={date}
											>
												{formatDate(date, siteMetadata.locale)}
											</time>
											<Link
												href={path}
												className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
											>
												<h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
													{title}
												</h2>
											</Link>
										</article>
									</li>
								);
							})}
						</ul>
					)}
					{pagination && pagination.totalPages > 1 && (
						<Pagination
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
