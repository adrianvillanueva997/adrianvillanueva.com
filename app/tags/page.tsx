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
			{/* Cyber-Doom Hero Section */}
			<section className="relative overflow-hidden pb-8 pt-6 md:space-y-5 mb-12">
				{/* Dark atmosphere background */}
				<div className="absolute inset-0 synthwave-grid opacity-5" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

				<div className="relative z-10 space-y-6 text-center">
					{/* Cyber-Doom terminal indicator */}
					<div className="font-mono text-xs text-gray-500 mb-4 font-bold">
						<span className="text-orange-400">⸸</span> NEURAL_TAG_MATRIX_ONLINE <span className="text-orange-400">⸸</span>
					</div>

					{/* Enhanced typography */}
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-widest text-[#ff3860] mb-4 font-mono drop-shadow-lg">
						TAG_REGISTRY
					</h1>

					{/* Cyber-Doom subtitle */}
					<div className="font-mono text-sm text-gray-600 tracking-wider mb-2">
						⸸ DIGITAL VOID TAXONOMIES ⸸
					</div>

					<p className="text-lg md:text-xl font-mono text-gray-300 max-w-2xl mx-auto">
						<span className="text-[#00ff99]">[DARK_NEXUS]</span> Navigate the knowledge void. Each tag is a neural pathway to deeper understanding.
					</p>

					{/* Enhanced stats display */}
					<div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-mono">
						<div className="bg-black/60 border border-orange-900/50 px-4 py-2 rounded shadow-lg shadow-orange-900/20">
							<span className="text-orange-400">⸸ NEURAL_NODES:</span>
							<span className="text-gray-200 ml-2 font-bold">{sortedTags.length}</span>
						</div>
						<div className="bg-black/60 border border-[#ff3860]/50 px-4 py-2 rounded shadow-lg shadow-[#ff3860]/20">
							<span className="text-[#ff3860]">◉ MATRIX_STATUS:</span>
							<span className="text-[#ff3860] ml-2 font-bold">ACTIVE</span>
						</div>
					</div>
				</div>
			</section>

			{/* Cyber-Doom Tag Grid */}
			<div className="mb-16">
				<div className="mb-6 text-center">
					<div className="font-mono text-sm text-gray-500">
						<span className="text-[#00ff99]">◉</span> NEURAL_NODE_DIRECTORY <span className="text-[#00ff99]">◉</span>
					</div>
				</div>
				<div className="flex flex-wrap gap-3 justify-center">
					{sortedTags.map((tag) => {
						const count = tagData[tag];
						return (
							<Link
								key={tag}
								href={`/tags/${tag}`}
								className="group relative inline-flex items-center px-4 py-3 bg-black/60 border border-gray-800/50 text-[#00ff99] hover:text-white hover:border-orange-900/60 hover:bg-black/80 transition-all duration-300 rounded font-mono text-sm shadow-lg hover:shadow-orange-900/20 overflow-hidden"
							>
								{/* Cyber-Doom glow effect */}
								<div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#00ff99] via-orange-400 to-[#ff3860] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

								<span className="relative z-10">
									⸸ {tag.toUpperCase().replace(/\s+/g, '_')}
								</span>
								<span className="ml-3 text-xs text-gray-500 group-hover:text-orange-400 transition-colors bg-black/60 px-2 py-1 rounded border border-gray-700/50 group-hover:border-orange-900/50">
									{count}
								</span>
							</Link>
						);
					})}
				</div>
			</div>

			{/* Cyber-Doom Knowledge Graph Section */}
			<div className="mb-16">
				<div className="text-center mb-8">
					<h2 className="text-2xl md:text-3xl font-bold font-mono text-orange-400 tracking-wider mb-2">
						⸸ NEURAL_NETWORK ⸸
					</h2>
					<div className="font-mono text-sm text-gray-600 tracking-wider">
						◉ DIGITAL VOID TOPOLOGY ◉
					</div>
				</div>

				{/* Enhanced Graph Legend */}
				<div className="mb-6 bg-black/70 border border-orange-900/30 rounded-lg p-6 shadow-2xl shadow-orange-900/10">
					<div className="text-center mb-4">
						<span className="font-mono text-sm text-orange-400 font-bold">INTERFACE_LEGEND</span>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
						<div className="flex items-center justify-center bg-black/60 border border-gray-800/50 rounded p-3">
							<div className="w-4 h-4 bg-[#ff3860] rounded-full mr-2 border border-white shadow-lg shadow-[#ff3860]/30" />
							<span className="text-gray-300">Node Size = Ritual Count</span>
						</div>
						<div className="flex items-center justify-center bg-black/60 border border-gray-800/50 rounded p-3">
							<div className="w-8 h-0.5 bg-orange-400 mr-2 opacity-60" />
							<span className="text-gray-300">Connection = Shared Posts</span>
						</div>
						<div className="flex items-center justify-center bg-black/60 border border-gray-800/50 rounded p-3">
							<div className="w-2 h-2 bg-[#00ff99] rounded-full mr-2 animate-pulse" />
							<span className="text-gray-300">Pulse = Data Flow</span>
						</div>
					</div>
				</div>

				<div className="bg-black/80 border border-orange-900/50 rounded-lg overflow-hidden shadow-2xl shadow-orange-900/20">
					<TagGraph posts={posts} />
				</div>

				{/* Cyber-Doom Enhanced Controls */}
				<div className="mt-6 bg-black/60 border border-orange-900/30 rounded-lg p-6 shadow-lg shadow-orange-900/10">
					<div className="text-center">
						<div className="text-sm font-mono text-gray-400 mb-4">
							<span className="text-orange-400 font-bold">⸸ NEURAL_INTERFACE_COMMANDS ⸸</span>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-gray-500">
							<div className="flex items-center justify-center bg-black/60 border border-gray-800/50 rounded p-3">
								<kbd className="px-3 py-2 bg-black/80 border border-[#00ff99]/50 rounded text-[#00ff99] mr-3 shadow-lg shadow-[#00ff99]/20 font-bold">DRAG</kbd>
								<span>Rearrange neural nodes</span>
							</div>
							<div className="flex items-center justify-center bg-black/60 border border-gray-800/50 rounded p-3">
								<kbd className="px-3 py-2 bg-black/80 border border-orange-400/50 rounded text-orange-400 mr-3 shadow-lg shadow-orange-400/20 font-bold">SCROLL</kbd>
								<span>Zoom void matrix</span>
							</div>
							<div className="flex items-center justify-center bg-black/60 border border-gray-800/50 rounded p-3">
								<kbd className="px-3 py-2 bg-black/80 border border-[#ff3860]/50 rounded text-[#ff3860] mr-3 shadow-lg shadow-[#ff3860]/20 font-bold">CLICK</kbd>
								<span>Execute ritual</span>
							</div>
						</div>
						<div className="mt-4 text-xs text-gray-500 border-t border-orange-900/30 pt-4">
							<span className="text-orange-400">◉</span> Interactive neural topology mapping void relationships <span className="text-orange-400">◉</span>
							<br />
							<span className="text-gray-600">Larger nodes = more digital rituals • Connected nodes share knowledge paths</span>
						</div>
					</div>
				</div>
			</div>

			{/* Cyber-Doom Statistics Section */}
			<div className="bg-black/80 border border-orange-900/50 rounded-lg p-8 shadow-2xl shadow-orange-900/10 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-orange-900/5 via-black/20 to-[#ff3860]/5" />

				<div className="relative z-10">
					<div className="text-center mb-8">
						<h3 className="text-xl font-mono font-bold text-orange-400 tracking-wider mb-2">
							⸸ NEURAL_VOID_METRICS ⸸
						</h3>
						<div className="font-mono text-sm text-gray-600">
							◉ SYSTEM_DIAGNOSTICS ◉
						</div>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						<div className="text-center bg-black/60 border border-gray-800/50 rounded-lg p-4 shadow-lg hover:shadow-[#00ff99]/20 transition-all duration-300">
							<div className="text-2xl md:text-3xl font-mono font-bold text-[#00ff99] mb-2">
								{sortedTags.length}
							</div>
							<div className="text-sm font-mono text-gray-400">
								NEURAL_NODES
							</div>
						</div>
						<div className="text-center bg-black/60 border border-gray-800/50 rounded-lg p-4 shadow-lg hover:shadow-orange-400/20 transition-all duration-300">
							<div className="text-2xl md:text-3xl font-mono font-bold text-orange-400 mb-2">
								{Object.values(tagData).reduce((sum, count) => sum + count, 0)}
							</div>
							<div className="text-sm font-mono text-gray-400">
								VOID_RITUALS
							</div>
						</div>
						<div className="text-center bg-black/60 border border-gray-800/50 rounded-lg p-4 shadow-lg hover:shadow-[#ff3860]/20 transition-all duration-300">
							<div className="text-2xl md:text-3xl font-mono font-bold text-[#ff3860] mb-2">
								{Math.max(...Object.values(tagData))}
							</div>
							<div className="text-sm font-mono text-gray-400">
								MAX_COMMUNION
							</div>
						</div>
						<div className="text-center bg-black/60 border border-gray-800/50 rounded-lg p-4 shadow-lg hover:shadow-gray-500/20 transition-all duration-300">
							<div className="text-2xl md:text-3xl font-mono font-bold text-gray-300 mb-2">
								{(Object.values(tagData).reduce((sum, count) => sum + count, 0) / sortedTags.length).toFixed(1)}
							</div>
							<div className="text-sm font-mono text-gray-400">
								AVG_DENSITY
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
