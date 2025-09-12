import Link from "@/components/Link";
import TagGraph from "@/components/TagGraph";
import { genPageMetadata } from "app/seo";
import tagData from "app/tag-data.json";
import { allBlogs } from "contentlayer/generated";
import { allCoreContent } from "pliny/utils/contentlayer";

export const metadata = genPageMetadata({ title: "Tags" });

export default async function Page() {
	const sortedTags = Object.keys(tagData).sort(
		(a, b) => tagData[b] - tagData[a],
	);
	const posts = allCoreContent(allBlogs);

	return (
		<>
			{/* Hero Section */}
			<div className="mb-12 md:mb-16">
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-gothic font-bold text-[#ff3860] mb-4 tracking-wide">
						TAG_REGISTRY
					</h1>
					<p className="text-lg md:text-xl font-mono text-gray-300 max-w-2xl mx-auto">
						Navigate the knowledge void. Each tag is a gateway to deeper understanding.
					</p>
					<div className="mt-6 font-mono text-sm text-[#00ff99]">
						[{sortedTags.length} NODES_ACTIVE]
					</div>
				</div>
			</div>

			{/* Quick Tag List */}
			<div className="mb-16">
				<div className="flex flex-wrap gap-2 justify-center">
					{sortedTags.map((tag) => {
						const count = tagData[tag];
						return (
							<Link
								key={tag}
								href={`/tags/${tag}`}
								className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-600 text-[#00ff99] hover:text-[#ff3860] hover:border-[#ff3860] hover:bg-gray-800 transition-all duration-200 rounded-md font-mono text-sm hover:shadow-md hover:shadow-[#ff3860]/20"
							>
								{tag.toUpperCase().replace(/\s+/g, '_')}
								<span className="ml-2 text-xs text-gray-400">({count})</span>
							</Link>
						);
					})}
				</div>
			</div>

			{/* Knowledge Graph Section */}
			<div className="mb-16">
				<h2 className="text-2xl md:text-3xl font-gothic text-[#ff3860] mb-6 text-center">
					NEURAL_NETWORK
				</h2>

				{/* Graph Legend */}
				<div className="mb-6 bg-gray-900/50 border border-gray-700 rounded-lg p-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
						<div className="flex items-center justify-center">
							<div className="w-4 h-4 bg-[#ff3860] rounded-full mr-2 border border-white" />
							<span className="text-gray-300">Node Size = Post Count</span>
						</div>
						<div className="flex items-center justify-center">
							<div className="w-8 h-0.5 bg-[#ff3860] mr-2 opacity-60" />
							<span className="text-gray-300">Line Thickness = Shared Posts</span>
						</div>
						<div className="flex items-center justify-center">
							<div className="w-2 h-2 bg-[#00ff99] rounded-full mr-2 animate-pulse" />
							<span className="text-gray-300">Particles = Data Flow</span>
						</div>
					</div>
				</div>

				<div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden">
					<TagGraph posts={posts} />
				</div>

				{/* Enhanced Controls */}
				<div className="mt-6 bg-gray-900/30 border border-gray-800 rounded-lg p-4">
					<div className="text-center">
						<div className="text-sm font-mono text-gray-400 mb-3">
							<span className="text-[#00ff99]">INTERFACE_COMMANDS:</span>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-gray-500">
							<div className="flex items-center justify-center">
								<kbd className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-[#00ff99] mr-2">DRAG</kbd>
								<span>Rearrange nodes</span>
							</div>
							<div className="flex items-center justify-center">
								<kbd className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-[#00ff99] mr-2">SCROLL</kbd>
								<span>Zoom in/out</span>
							</div>
							<div className="flex items-center justify-center">
								<kbd className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-[#00ff99] mr-2">CLICK</kbd>
								<span>Navigate to tag</span>
							</div>
						</div>
						<div className="mt-3 text-xs text-gray-500 border-t border-gray-800 pt-3">
							Interactive knowledge map showing tag relationships • Larger nodes = more posts • Connected nodes share content
						</div>
					</div>
				</div>
			</div>

			{/* Statistics Section */}
			<div className="bg-gray-950/50 border border-gray-800 rounded-lg p-6 md:p-8">
				<h3 className="text-xl font-gothic text-[#ff3860] mb-6 text-center">
					SYSTEM_STATS
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					<div className="text-center">
						<div className="text-2xl md:text-3xl font-mono font-bold text-[#00ff99]">
							{sortedTags.length}
						</div>
						<div className="text-sm font-mono text-gray-400 mt-1">
							TOTAL_TAGS
						</div>
					</div>
					<div className="text-center">
						<div className="text-2xl md:text-3xl font-mono font-bold text-[#00ff99]">
							{Object.values(tagData).reduce((sum, count) => sum + count, 0)}
						</div>
						<div className="text-sm font-mono text-gray-400 mt-1">
							TOTAL_POSTS
						</div>
					</div>
					<div className="text-center">
						<div className="text-2xl md:text-3xl font-mono font-bold text-[#00ff99]">
							{Math.max(...Object.values(tagData))}
						</div>
						<div className="text-sm font-mono text-gray-400 mt-1">
							MAX_FREQUENCY
						</div>
					</div>
					<div className="text-center">
						<div className="text-2xl md:text-3xl font-mono font-bold text-[#00ff99]">
							{(Object.values(tagData).reduce((sum, count) => sum + count, 0) / sortedTags.length).toFixed(1)}
						</div>
						<div className="text-sm font-mono text-gray-400 mt-1">
							AVG_USAGE
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
