import Comments from "@/components/Comments";
import Image from "@/components/Image";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SectionContainer from "@/components/SectionContainer";
import siteMetadata from "@/data/siteMetadata";
import type { Blog } from "contentlayer/generated";
import Bleed from "pliny/ui/Bleed";
import type { CoreContent } from "pliny/utils/contentlayer";
import type { ReactNode } from "react";

interface LayoutProps {
	content: CoreContent<Blog>;
	children: ReactNode;
	next?: { path: string; title: string };
	prev?: { path: string; title: string };
}

export default function PostMinimal({
	content,
	next,
	prev,
	children,
}: LayoutProps) {
	const { slug, title, images } = content;
	const displayImage =
		images && images.length > 0
			? images[0]
			: "https://picsum.photos/seed/picsum/800/400";

	return (
		<SectionContainer>
			<ScrollTopAndComment />
			<article className="bg-black/20 rounded-lg border border-gray-800/30 shadow-2xl shadow-black/50 overflow-hidden">
				<div>
					<div className="space-y-1 pb-10 text-center dark:border-gray-700 relative">
						{/* Terminal indicator at top */}
						<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 font-mono text-xs text-gray-500 font-bold bg-black/80 px-4 py-2 rounded border border-gray-800/50">
							<span className="text-orange-400">▲</span> NEURAL_BANNER_ENTRY <span className="text-orange-400">▲</span>
						</div>

						<div className="w-full relative">
							<Bleed>
								<div className="relative aspect-2/1 w-full">
									<Image
										src={displayImage}
										alt={title}
										fill
										className="object-cover"
									/>
									{/* Cyber-doom overlay effects */}
									<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
									<div className="absolute inset-0 synthwave-grid opacity-10" />

									{/* Corner indicators */}
									<div className="absolute top-4 left-4 font-mono text-xs text-[#00ff99] font-bold">
										◉ VISUAL_DATA
									</div>
									<div className="absolute top-4 right-4 font-mono text-xs text-orange-400 font-bold">
										DOOM_PROTOCOL ▲
									</div>
								</div>
							</Bleed>
						</div>
						<div className="relative pt-10">
							<PageTitle>{title}</PageTitle>
						</div>
					</div>
					<div className="prose prose-invert max-w-none py-4 bg-black/20 border border-gray-800/30 rounded-lg p-8 shadow-2xl shadow-black/50 m-4">
						{children}
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
			</article>
		</SectionContainer>
	);
}
