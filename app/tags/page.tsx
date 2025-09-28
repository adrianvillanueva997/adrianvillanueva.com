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
			{/* Brutalist Header Section */}
			<section className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
				<div className="text-center max-w-5xl mx-auto">
					<div className="relative inline-block mb-8">
						<h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase">
							TAGS
						</h1>
					</div>

					<div className="border-4 border-black bg-white p-8 max-w-3xl mx-auto">
						<p className="text-xl font-mono text-black leading-relaxed font-medium">
							Explore content organized by topic. Each tag represents a collection of related posts and ideas.
						</p>
					</div>

					{/* Enhanced stats display */}
					<div className="mt-12 flex flex-wrap justify-center gap-6">
						<div className="bg-white border-4 border-black px-8 py-4">
							<span className="font-mono font-black text-black text-sm uppercase tracking-wider">Total Tags:</span>
							<span className="font-mono text-black ml-3 text-2xl font-black">{sortedTags.length}</span>
						</div>
						<div className="bg-red-500 border-4 border-black px-8 py-4">
							<span className="font-mono font-black text-white text-sm uppercase tracking-wider">Total Posts:</span>
							<span className="font-mono text-white ml-3 text-2xl font-black">
								{Object.values(tagData).reduce((sum, count) => sum + count, 0)}
							</span>
						</div>
						<div className="bg-black border-4 border-black px-8 py-4">
							<span className="font-mono font-black text-white text-sm uppercase tracking-wider">Most Used:</span>
							<span className="font-mono text-white ml-3 text-2xl font-black">
								{Math.max(...Object.values(tagData))}
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Brutalist Tag Graph Section */}
			<div className="px-4 sm:px-6 md:px-10 bg-white py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-black font-mono text-black uppercase mb-6">
						TAG NETWORK
					</h2>
					<p className="font-mono text-black max-w-3xl mx-auto text-lg leading-relaxed">
						Interactive visualization showing relationships between tags based on shared posts. 
						Larger nodes indicate more popular tags.
					</p>
				</div>

				{/* Enhanced Graph Legend */}
				<div className="mb-12 bg-white border-4 border-black p-8 max-w-5xl mx-auto">
					<h3 className="font-mono font-black text-black uppercase text-lg mb-6 text-center">
						LEGEND
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base font-mono text-black">
						<div className="flex items-center justify-center border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors">
							<div className="w-6 h-6 bg-red-500 border-2 border-black mr-4 flex-shrink-0" />
							<span className="font-black">Node Size = Post Count</span>
						</div>
						<div className="flex items-center justify-center border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors">
							<div className="w-12 h-1 bg-black mr-4 flex-shrink-0" />
							<span className="font-black">Line = Shared Posts</span>
						</div>
						<div className="flex items-center justify-center border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors">
							<div className="w-4 h-4 bg-black mr-4 flex-shrink-0 cursor-pointer" />
							<span className="font-black">Click to Navigate</span>
						</div>
					</div>
				</div>

				<div className="bg-white border-4 border-black">
					<TagGraph posts={posts} />
				</div>

				{/* Enhanced Controls */}
				<div className="mt-8 bg-white border-4 border-black p-8 max-w-5xl mx-auto">
					<h3 className="font-mono font-black text-black uppercase text-lg mb-6 text-center">
						INTERACTION GUIDE
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-mono text-black">
						<div className="flex items-center justify-center border-2 border-black p-4 hover:bg-gray-50 transition-colors">
							<kbd className="px-4 py-2 bg-black text-white border-2 border-black mr-4 font-mono font-black text-sm">DRAG</kbd>
							<span className="font-black">Move nodes around</span>
						</div>
						<div className="flex items-center justify-center border-2 border-black p-4 hover:bg-gray-50 transition-colors">
							<kbd className="px-4 py-2 bg-black text-white border-2 border-black mr-4 font-mono font-black text-sm">SCROLL</kbd>
							<span className="font-black">Zoom in and out</span>
						</div>
						<div className="flex items-center justify-center border-2 border-black p-4 hover:bg-gray-50 transition-colors">
							<kbd className="px-4 py-2 bg-red-500 text-white border-2 border-black mr-4 font-mono font-black text-sm">CLICK</kbd>
							<span className="font-black">Go to tag page</span>
						</div>
					</div>
				</div>
			</div>

			{/* Brutalist Tag Grid */}
			<div className="px-4 sm:px-6 md:px-10 bg-white py-16 border-t-4 border-black">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-black font-mono text-black uppercase mb-6">
						TAG INDEX
					</h2>
					<p className="font-mono text-black max-w-2xl mx-auto text-lg leading-relaxed">
						Click any tag below to explore related content
					</p>
				</div>

				<div className="flex flex-wrap gap-3 justify-center max-w-6xl mx-auto">
					{sortedTags.map((tag, index) => {
						const count = tagData[tag];
						const isLarge = count > 5;
						return (
							<Link
								key={tag}
								href={`/tags/${tag}`}
								className={`inline-flex items-center bg-white border-3 border-black hover:bg-red-500 hover:text-white text-black transition-all duration-200 font-mono font-black uppercase text-sm hover:scale-105 hover:shadow-lg hover:border-red-500 group ${
									isLarge ? 'px-6 py-3 text-base' : 'px-4 py-2'
								}`}
							>
								<span className="relative">
									{tag}
									{isLarge && (
										<div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 group-hover:bg-white" />
									)}
								</span>
								<span className={`ml-3 bg-black text-white group-hover:bg-white group-hover:text-black px-2 py-1 text-xs font-black border border-black group-hover:border-white ${
									isLarge ? 'px-3 py-1' : 'px-2 py-1'
								}`}>
									{count}
								</span>
							</Link>
						);
					})}
				</div>
			</div>

			{/* Brutalist Statistics Section */}
			<div className="px-4 sm:px-6 md:px-10 bg-white py-16 border-t-4 border-black">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-black font-mono text-black uppercase mb-6">
						STATISTICS
					</h2>
					<p className="font-mono text-black max-w-3xl mx-auto text-lg leading-relaxed">
						Comprehensive metrics about content organization and tag distribution across the site
					</p>
				</div>

				{/* Main Statistics Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
					<div className="text-center bg-white border-4 border-black p-8 group hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
						<div className="text-5xl font-mono font-black text-black mb-4">
							{sortedTags.length}
						</div>
						<div className="text-xl font-mono font-black text-black uppercase tracking-wider mb-2">
							Total Tags
						</div>
						<div className="text-sm font-mono text-black opacity-75">
							Unique topic categories
						</div>
					</div>

					<div className="text-center bg-red-500 border-4 border-black p-8 group hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-1">
						<div className="text-5xl font-mono font-black text-white mb-4">
							{Object.values(tagData).reduce((sum, count) => sum + count, 0)}
						</div>
						<div className="text-xl font-mono font-black text-white uppercase tracking-wider mb-2">
							Total Posts
						</div>
						<div className="text-sm font-mono text-white opacity-90">
							All tagged content
						</div>
					</div>

					<div className="text-center bg-black border-4 border-black p-8 group hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1">
						<div className="text-5xl font-mono font-black text-white mb-4">
							{Math.max(...Object.values(tagData))}
						</div>
						<div className="text-xl font-mono font-black text-white uppercase tracking-wider mb-2">
							Most Used
						</div>
						<div className="text-sm font-mono text-white opacity-90">
							Highest tag count
						</div>
					</div>

					<div className="text-center bg-white border-4 border-black p-8 group hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
						<div className="text-5xl font-mono font-black text-black mb-4">
							{(Object.values(tagData).reduce((sum, count) => sum + count, 0) / sortedTags.length).toFixed(1)}
						</div>
						<div className="text-xl font-mono font-black text-black uppercase tracking-wider mb-2">
							Average
						</div>
						<div className="text-sm font-mono text-black opacity-75">
							Posts per tag
						</div>
					</div>
				</div>

				{/* Tag Distribution Analysis */}
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h3 className="text-2xl font-black font-mono text-black uppercase mb-4">
							TAG DISTRIBUTION
						</h3>
						<p className="font-mono text-black max-w-2xl mx-auto">
							Analysis of content distribution across different tag categories
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						{/* Popular Tags */}
						<div className="bg-white border-4 border-black p-6">
							<h4 className="font-mono font-black text-black uppercase text-lg mb-4 text-center">
								TOP 5 TAGS
							</h4>
							<div className="space-y-3">
								{sortedTags.slice(0, 5).map((tag, index) => (
									<div key={tag} className="flex items-center justify-between bg-gray-50 border-2 border-black p-3">
										<div className="flex items-center">
											<div className="w-6 h-6 bg-red-500 border border-black mr-3 flex items-center justify-center">
												<span className="text-white font-mono font-black text-xs">
													{index + 1}
												</span>
											</div>
											<Link 
												href={`/tags/${tag}`}
												className="font-mono font-black text-black uppercase hover:text-red-500 transition-colors"
											>
												{tag}
											</Link>
										</div>
										<span className="bg-black text-white px-3 py-1 font-mono font-black text-sm">
											{tagData[tag]}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Tag Categories */}
						<div className="bg-white border-4 border-black p-6">
							<h4 className="font-mono font-black text-black uppercase text-lg mb-4 text-center">
								DISTRIBUTION
							</h4>
							<div className="space-y-3">
								<div className="flex items-center justify-between bg-gray-50 border-2 border-black p-3">
									<span className="font-mono font-black text-black uppercase">High Usage (5+ posts)</span>
									<span className="bg-red-500 text-white px-3 py-1 font-mono font-black text-sm">
										{Object.values(tagData).filter(count => count >= 5).length}
									</span>
								</div>
								<div className="flex items-center justify-between bg-gray-50 border-2 border-black p-3">
									<span className="font-mono font-black text-black uppercase">Medium Usage (2-4 posts)</span>
									<span className="bg-black text-white px-3 py-1 font-mono font-black text-sm">
										{Object.values(tagData).filter(count => count >= 2 && count < 5).length}
									</span>
								</div>
								<div className="flex items-center justify-between bg-gray-50 border-2 border-black p-3">
									<span className="font-mono font-black text-black uppercase">Low Usage (1 post)</span>
									<span className="bg-white border-2 border-black text-black px-3 py-1 font-mono font-black text-sm">
										{Object.values(tagData).filter(count => count === 1).length}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Key Insights */}
					<div className="bg-black border-4 border-black p-8">
						<h3 className="text-2xl font-black font-mono text-white uppercase mb-6 text-center">
							KEY INSIGHTS
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-white border-2 border-white p-4 text-center">
								<div className="font-mono font-black text-black uppercase text-sm mb-2">
									Most Popular Tag
								</div>
								<div className="text-lg font-mono font-black text-black">
									{sortedTags[0]}
								</div>
								<div className="text-sm font-mono text-black opacity-75">
									{tagData[sortedTags[0]]} posts
								</div>
							</div>
							<div className="bg-red-500 border-2 border-white p-4 text-center">
								<div className="font-mono font-black text-white uppercase text-sm mb-2">
									Coverage Range
								</div>
								<div className="text-lg font-mono font-black text-white">
									{Math.min(...Object.values(tagData))} - {Math.max(...Object.values(tagData))}
								</div>
								<div className="text-sm font-mono text-white opacity-90">
									posts per tag
								</div>
							</div>
							<div className="bg-white border-2 border-white p-4 text-center">
								<div className="font-mono font-black text-black uppercase text-sm mb-2">
									Tagging Efficiency
								</div>
								<div className="text-lg font-mono font-black text-black">
									{((Object.values(tagData).filter(count => count > 1).length / sortedTags.length) * 100).toFixed(0)}%
								</div>
								<div className="text-sm font-mono text-black opacity-75">
									tags with multiple posts
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
