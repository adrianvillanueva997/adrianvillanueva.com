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
		<div className="mt-8 pt-6 border-t-2 border-black">
			<nav className="flex justify-between items-center">
				{!prevPage ? (
					<div className="bg-gray-200 border-2 border-black px-6 py-3">
						<span className="font-mono font-black text-gray-500 uppercase">Previous</span>
					</div>
				) : (
					<Link
						href={
							currentPage - 1 === 1
								? `/${basePath}/`
								: `/${basePath}/page/${currentPage - 1}`
						}
						rel="prev"
						className="bg-white border-2 border-black hover:bg-red-500 hover:text-white text-black px-6 py-3 transition-colors duration-200"
					>
						<span className="font-mono font-black uppercase">Previous</span>
					</Link>
				)}
				<div className="bg-black border-2 border-black px-6 py-3">
					<span className="font-mono font-black text-white">
						{currentPage} OF {totalPages}
					</span>
				</div>
				{!nextPage ? (
					<div className="bg-gray-200 border-2 border-black px-6 py-3">
						<span className="font-mono font-black text-gray-500 uppercase">Next</span>
					</div>
				) : (
					<Link
						href={`/${basePath}/page/${currentPage + 1}`}
						rel="next"
						className="bg-white border-2 border-black hover:bg-red-500 hover:text-white text-black px-6 py-3 transition-colors duration-200"
					>
						<span className="font-mono font-black uppercase">Next</span>
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
		<div className="bg-white min-h-screen">
			{/* Brutalist Header Section */}
			<section className="px-4 sm:px-6 md:px-10 bg-white py-12 border-b-4 border-black">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-4xl md:text-6xl font-black font-mono text-black uppercase mb-6">
						{title}
					</h1>
					{description && (
						<div className="border-4 border-black bg-white p-6 max-w-3xl">
							<p className="text-lg font-mono text-black leading-relaxed">
								{description}
							</p>
						</div>
					)}
				</div>
			</section>

			{/* RSS Feed Notice */}
			<div className="px-4 sm:px-6 md:px-10 bg-white py-4 border-b-2 border-black">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center bg-gray-50 border-2 border-black p-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-5 w-5 mr-3 text-black"
						>
							<title>RSS Feed</title>
							<path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" />
							<path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z" />
							<circle cx="6" cy="18" r="2" />
						</svg>
						<span className="font-mono text-black">
							Subscribe via{" "}
							<a
								href="/feed.xml"
								target="_blank"
								rel="noopener noreferrer"
								className="font-black text-red-500 hover:text-black transition-colors underline"
							>
								RSS
							</a>{" "}
							for updates
						</span>
					</div>
				</div>
			</div>

			<div className="px-4 sm:px-6 md:px-10 bg-white py-8">
				<div className="max-w-6xl mx-auto">
					<div className="flex gap-8">
						{/* Sidebar */}
						<div className="hidden lg:block w-80 flex-shrink-0">
							<div className="bg-white border-4 border-black p-6 sticky top-8">
								<div className="mb-6">
									{pathname.startsWith("/blog") ? (
										<h3 className="font-mono font-black text-black uppercase text-lg border-b-2 border-black pb-2">
											All Posts
										</h3>
									) : (
										<Link
											href="/blog"
											className="font-mono font-black text-black uppercase text-lg hover:text-red-500 transition-colors border-b-2 border-black pb-2 block"
										>
											All Posts
										</Link>
									)}
								</div>
								<ul className="space-y-2 max-h-96 overflow-y-auto">
									{sortedTags.map((t) => {
										return (
											<li key={t}>
												{decodeURI(pathname.split("/tags/")[1]) === slug(t) ? (
													<div className="bg-red-500 border-2 border-black p-2">
														<span className="font-mono font-black text-white uppercase text-sm">
															{`${t} (${tagCounts[t]})`}
														</span>
													</div>
												) : (
													<Link
														href={`/tags/${slug(t)}`}
														className="block bg-white border-2 border-black p-2 hover:bg-gray-50 transition-colors"
														aria-label={`View posts tagged ${t}`}
													>
														<span className="font-mono font-black text-black uppercase text-sm">
															{`${t} (${tagCounts[t]})`}
														</span>
													</Link>
												)}
											</li>
										);
									})}
								</ul>
							</div>
						</div>

						{/* Main Content */}
						<div className="flex-1">
							{!showSimplifiedView ? (
								<div className="space-y-6">
									{displayPosts.map((post) => {
										const { path, date, title, summary, tags } = post;
										return (
											<article key={path} className="bg-white border-4 border-black p-6">
												<div className="flex flex-col space-y-4">
													<div className="flex items-start justify-between">
														<time
															className="bg-black text-white px-3 py-1 font-mono font-black text-sm uppercase flex-shrink-0"
															dateTime={date}
															suppressHydrationWarning
														>
															{formatDate(date, siteMetadata.locale)}
														</time>
													</div>
													<div>
														<h2 className="text-2xl font-black font-mono text-black uppercase mb-3 leading-tight">
															<Link
																href={`/${path}`}
																className="hover:text-red-500 transition-colors"
															>
																{title}
															</Link>
														</h2>
														<div className="flex flex-wrap gap-2 mb-4">
															{tags?.map((tag) => (
																<Tag key={tag} text={tag} />
															))}
														</div>
													</div>
													<div className="border-l-4 border-black pl-4">
														<p className="font-mono text-black leading-relaxed">
															{summary}
														</p>
													</div>
												</div>
											</article>
										);
									})}
								</div>
							) : (
								<div className="bg-white border-4 border-black">
									<div className="divide-y-2 divide-black">
										{displayPosts.map((post) => {
											const { path, date, title } = post;
											return (
												<article key={path} className="p-4 hover:bg-gray-50 transition-colors">
													<div className="flex items-center gap-4">
														<time
															className="bg-black text-white px-3 py-1 font-mono font-black text-xs uppercase min-w-[100px] text-center"
															dateTime={date}
														>
															{formatDate(date, siteMetadata.locale)}
														</time>
														<Link
															href={path}
															className="flex-1 hover:text-red-500 transition-colors"
														>
															<h2 className="font-mono font-black text-black uppercase">
																{title}
															</h2>
														</Link>
													</div>
												</article>
											);
										})}
									</div>
								</div>
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
			</div>
		</div>
	);
}
