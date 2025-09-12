import Image from "@/components/Image";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SectionContainer from "@/components/SectionContainer";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import type { Authors, Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import type { ReactNode } from "react";

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`;
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
		<SectionContainer>
			<ScrollTopAndComment />
			<article className="bg-black/20 rounded-lg border border-gray-800/30 shadow-2xl shadow-black/50 overflow-hidden">
				<div className="xl:divide-y xl:divide-gray-800/50 xl:dark:divide-gray-700">
					<header className="pt-6 xl:pb-6 relative overflow-hidden">
						{/* Cyber-Doom background effects */}
						<div className="absolute inset-0 synthwave-grid opacity-5" />
						<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

						<div className="relative z-10 space-y-6 text-center">
							{/* Terminal indicator */}
							<div className="font-mono text-xs text-gray-500 mb-4 font-bold">
								<span className="text-orange-400">▲</span> LOADING_NEURAL_ENTRY <span className="text-orange-400">▲</span>
							</div>

							<dl className="space-y-4">
								<div>
									<dt className="sr-only">Published on</dt>
									<dd className="text-base leading-6 font-mono font-medium text-[#00ff99] bg-black/60 border border-[#00ff99]/30 px-4 py-2 rounded shadow-lg shadow-[#00ff99]/20 inline-block">
										<span className="text-gray-400">◉ TIMESTAMP:</span>
										<time dateTime={date} className="ml-2">
											{new Date(date).toLocaleDateString(
												siteMetadata.locale,
												postDateTemplate,
											)}
										</time>
									</dd>
								</div>
							</dl>
							<div>
								<PageTitle>{title}</PageTitle>
							</div>
						</div>
					</header>
					<div className="grid-rows-[auto_1fr] divide-y divide-gray-800/50 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
						<div className="divide-y divide-gray-800/50 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700 xl:order-1 order-2">
							<div className="prose prose-invert max-w-none pt-10 pb-8 bg-black/20 border border-gray-800/30 rounded-lg p-8 shadow-2xl shadow-black/50">
								{children}
							</div>
							<div className="pt-6 pb-6 text-sm font-mono">
								<div className="bg-black/60 border border-[#00ff99]/30 rounded px-4 py-2 inline-block shadow-lg shadow-[#00ff99]/20">
									<span className="text-[#00ff99]">◉ SOURCE_CODE:</span>
									<Link href={editUrl(filePath)} className="text-gray-300 hover:text-[#00ff99] transition-colors duration-300 ml-2">
										View on Neural Matrix
									</Link>
								</div>
							</div>
						</div>
						<dl className="pt-6 pb-10 xl:border-b xl:border-orange-900/50 xl:pt-11 xl:dark:border-gray-700 xl:order-2 order-1">
							<dt className="sr-only">Authors</dt>
							<dd>
								<div className="mb-6 text-center xl:text-left">
									<div className="font-mono text-sm text-orange-400 font-bold mb-4">
										▲ AUTHOR_REGISTRY ▲
									</div>
								</div>
								<ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
									{authorDetails.map((author) => (
										<li
											className="flex items-center space-x-3 bg-black/60 border border-gray-800/50 rounded-lg p-4 hover:border-orange-900/60 transition-all duration-300 shadow-lg min-w-0"
											key={author.name}
										>
											{author.avatar && (
												<Image
													src={author.avatar}
													width={38}
													height={38}
													alt="avatar"
													className="h-10 w-10 rounded-full border-2 border-orange-400/60 shadow-lg shadow-orange-400/20 flex-shrink-0"
												/>
											)}
											<dl className="text-sm leading-5 font-mono font-medium flex-1 min-w-0">
												<dt className="sr-only">Name</dt>
												<dd className="text-gray-100 font-bold break-words">
													◉ {author.name}
												</dd>
												<dt className="sr-only">Twitter</dt>
												<dd className="mt-1">
													{author.twitter && (
														<Link
															href={author.twitter}
															className="text-[#00ff99] hover:text-[#ff3860] transition-colors duration-300 text-xs break-words"
														>
															{author.twitter
																.replace("https://twitter.com/", "@")
																.replace("https://x.com/", "@")}
														</Link>
													)}
												</dd>
											</dl>
										</li>
									))}
								</ul>
							</dd>
						</dl>
						<footer>
							<div className="divide-gray-800/50 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
								{tags && (
									<div className="py-4 xl:py-8">
										<h2 className="text-sm tracking-wide font-mono text-orange-400 uppercase font-bold mb-4">
											▲ NEURAL_TAGS ▲
										</h2>
										<div className="flex flex-wrap gap-2">
											{tags.map((tag) => (
												<Tag key={tag} text={tag} />
											))}
										</div>
									</div>
								)}
								{(next || prev) && (
									<div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
										{prev?.path && (
											<div className="bg-black/60 border border-gray-800/50 rounded-lg p-4 hover:border-orange-900/60 transition-all duration-300 shadow-lg">
												<h2 className="text-xs tracking-wide font-mono text-orange-400 uppercase font-bold mb-2">
													▲ PREVIOUS_NODE
												</h2>
												<div className="text-[#00ff99] hover:text-white transition-colors duration-300">
													<Link href={`/${prev.path}`} className="font-mono text-sm">{prev.title}</Link>
												</div>
											</div>
										)}
										{next?.path && (
											<div className="bg-black/60 border border-gray-800/50 rounded-lg p-4 hover:border-orange-900/60 transition-all duration-300 shadow-lg">
												<h2 className="text-xs tracking-wide font-mono text-orange-400 uppercase font-bold mb-2">
													▲ NEXT_NODE
												</h2>
												<div className="text-[#00ff99] hover:text-white transition-colors duration-300">
													<Link href={`/${next.path}`} className="font-mono text-sm">{next.title}</Link>
												</div>
											</div>
										)}
									</div>
								)}
							</div>
							<div className="pt-4 xl:pt-8">
								<Link
									href={`/${basePath}`}
									className="inline-flex items-center px-4 py-2 bg-black/60 border border-gray-800/50 rounded-lg hover:border-orange-900/60 transition-all duration-300 shadow-lg font-mono text-[#00ff99] hover:text-white"
									aria-label="Back to the blog"
								>
									<span className="mr-2">▲</span>
									<span className="text-xs tracking-wider uppercase">RETURN_TO_NEXUS</span>
								</Link>
							</div>
						</footer>
					</div>
				</div>
			</article>
		</SectionContainer>
	);
}
