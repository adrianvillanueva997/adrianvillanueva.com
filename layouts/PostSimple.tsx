import Comments from "@/components/Comments";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SectionContainer from "@/components/SectionContainer";
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
		<SectionContainer>
			<ScrollTopAndComment />
			<article className="bg-black/20 rounded-lg border border-gray-800/30 shadow-2xl shadow-black/50 overflow-hidden">
				<div>
					<header className="relative overflow-hidden">
						{/* Cyber-Doom background effects */}
						<div className="absolute inset-0 synthwave-grid opacity-5" />
						<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

						<div className="relative z-10 space-y-6 border-b border-gray-800/50 pb-10 text-center pt-6">
							{/* Terminal indicator */}
							<div className="font-mono text-xs text-gray-500 mb-4 font-bold">
								<span className="text-orange-400">▲</span> NEURAL_ENTRY_SIMPLE <span className="text-orange-400">▲</span>
							</div>

							<dl>
								<div>
									<dt className="sr-only">Published on</dt>
									<dd className="text-base leading-6 font-mono font-medium text-[#00ff99] bg-black/60 border border-[#00ff99]/30 px-4 py-2 rounded shadow-lg shadow-[#00ff99]/20 inline-block">
										<span className="text-gray-400">◉ TIMESTAMP:</span>
										<time dateTime={date} className="ml-2">
											{formatDate(date, siteMetadata.locale)}
										</time>
									</dd>
								</div>
							</dl>
							<div>
								<PageTitle>{title}</PageTitle>
							</div>
						</div>
					</header>
					<div className="grid-rows-[auto_1fr] divide-y divide-gray-800/50 pb-8 xl:divide-y-0 dark:divide-gray-700">
						<div className="divide-y divide-gray-800/50 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
							<div className="prose prose-invert max-w-none pt-10 pb-8 bg-black/20 border border-gray-800/30 rounded-lg p-8 shadow-2xl shadow-black/50 m-4">
								{children}
							</div>
						</div>
						{siteMetadata.comments && (
							<div
								className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
								id="comment"
							>
								<Comments slug={slug} />
							</div>
						)}
						<footer className="px-4 pb-4">
							<div className="flex flex-col gap-4 text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
								{prev?.path && (
									<div className="pt-4 xl:pt-8">
										<Link
											href={`/${prev.path}`}
											className="inline-flex items-center px-4 py-2 bg-black/60 border border-gray-800/50 rounded-lg hover:border-orange-900/60 transition-all duration-300 shadow-lg font-mono text-[#00ff99] hover:text-white"
											aria-label={`Previous post: ${prev.title}`}
										>
											<span className="mr-2">▲</span>
											<span className="text-xs tracking-wider uppercase">PREVIOUS: {prev.title}</span>
										</Link>
									</div>
								)}
								{next?.path && (
									<div className="pt-4 xl:pt-8">
										<Link
											href={`/${next.path}`}
											className="inline-flex items-center px-4 py-2 bg-black/60 border border-gray-800/50 rounded-lg hover:border-orange-900/60 transition-all duration-300 shadow-lg font-mono text-[#00ff99] hover:text-white"
											aria-label={`Next post: ${next.title}`}
										>
											<span className="text-xs tracking-wider uppercase">NEXT: {next.title}</span>
											<span className="ml-2">▲</span>
										</Link>
									</div>
								)}
							</div>
						</footer>
					</div>
				</div>
			</article>
		</SectionContainer>
	);
}
