"use client";

import Card from "@/components/Card";
import projectsData from "@/data/projectsData";
import Image from "next/image";
import { useEffect, useState } from "react";

// Get all unique categories from projects
const allCategories = [
	"All",
	...new Set(
		projectsData.flatMap((project) => project.categories || ["Uncategorized"]),
	),
];

export default function Projects() {
	const [searchValue, setSearchValue] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [sourceFilter, setSourceFilter] = useState("All"); // 'All', 'Open Source', 'Closed Source'
	const [visibleProjects, setVisibleProjects] = useState(projectsData);
	const [isLoaded, setIsLoaded] = useState(false);

	// Featured project is the first one or can be explicitly marked
	const featuredProject =
		projectsData.find((p) => p.featured) || projectsData[0];

	// Filter projects based on search, category, and source type
	useEffect(() => {
		const filteredProjects = projectsData.filter((project) => {
			const matchesSearch =
				project.title.toLowerCase().includes(searchValue.toLowerCase()) ||
				project.description.toLowerCase().includes(searchValue.toLowerCase());

			const matchesCategory =
				selectedCategory === "All" ||
				project.categories?.includes(selectedCategory);

			const matchesSourceType =
				sourceFilter === "All" ||
				(sourceFilter === "Open Source" && project.isOpenSource) ||
				(sourceFilter === "Closed Source" && !project.isOpenSource);

			return matchesSearch && matchesCategory && matchesSourceType;
		});

		setVisibleProjects(filteredProjects);

		// Add animation delay for a smooth entrance
		if (!isLoaded) {
			setTimeout(() => setIsLoaded(true), 100);
		}
	}, [searchValue, selectedCategory, sourceFilter, isLoaded]);

	return (
		<div className="divide-y divide-gray-800/50">
			{/* Cyber-Doom Header */}
			<section className="relative overflow-hidden pb-8 pt-6 md:space-y-5 mb-12">
				{/* Dark atmosphere background */}
				<div className="absolute inset-0 synthwave-grid opacity-5" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

				<div className="relative z-10 space-y-6 text-center">
					{/* Cyber-Doom terminal indicator */}
					<div className="font-mono text-xs text-gray-500 mb-4 font-bold">
						<span className="text-orange-400">▲</span> DIGITAL_FORGE_ONLINE <span className="text-orange-400">▲</span>
					</div>

					{/* Enhanced typography */}
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-widest text-[#ff3860] mb-4 font-mono drop-shadow-lg">
						PROJECTS_ARCHIVE
					</h1>

					{/* Cyber-Doom subtitle */}
					<div className="font-mono text-sm text-gray-600 tracking-wider mb-2">
						▲ NEURAL CONSTRUCTS FROM THE VOID ▲
					</div>

					<p className="text-lg md:text-xl font-mono text-gray-300 max-w-2xl mx-auto">
						<span className="text-[#00ff99]">[DARK_FORGE]</span> Technical explorations and digital rituals manifested in code.
					</p>

					{/* Enhanced stats display */}
					<div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-mono">
						<div className="bg-black/60 border border-[#00ff99]/50 px-4 py-2 rounded shadow-lg shadow-[#00ff99]/20">
							<span className="text-[#00ff99]">◉ TOTAL_CONSTRUCTS:</span>
							<span className="text-gray-200 ml-2 font-bold">{projectsData.length}</span>
						</div>
						<div className="bg-black/60 border border-orange-900/50 px-4 py-2 rounded shadow-lg shadow-orange-900/20">
							<span className="text-orange-400">▲ VOID_STATUS:</span>
							<span className="text-orange-400 ml-2 font-bold">ACTIVE</span>
						</div>
					</div>
				</div>
			</section>

			{/* Cyber-Doom Search and Filter */}
			<div className="py-8 border-t border-orange-900/30">
				<div className="mb-6 text-center">
					<div className="font-mono text-sm text-gray-500">
						<span className="text-[#00ff99]">◉</span> PROJECT_QUERY_INTERFACE <span className="text-[#00ff99]">◉</span>
					</div>
				</div>
				<div className="flex flex-col space-y-6">
					{/* Enhanced Search Input */}
					<div className="relative max-w-2xl mx-auto">
						<div className="relative">
							<input
								aria-label="Search projects"
								type="text"
								onChange={(e) => setSearchValue(e.target.value)}
								placeholder="◉ SEARCH_NEURAL_CONSTRUCTS..."
								className="block w-full px-6 py-4 font-mono text-gray-100 bg-black/60 border border-gray-800/50 rounded-lg focus:ring-2 focus:ring-[#00ff99]/50 focus:border-[#00ff99] placeholder-gray-500 hover:border-[#00ff99]/60 transition-all duration-300 shadow-lg hover:shadow-[#00ff99]/20"
							/>
							<div className="absolute right-4 top-1/2 transform -translate-y-1/2">
								<svg
									className="w-5 h-5 text-[#00ff99]"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
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
					</div>

					{/* Cyber-Doom Filters Section */}
					<div className="flex flex-col lg:flex-row gap-8 justify-center">
						{/* Category filter */}
						<div className="text-center">
							<h3 className="text-sm font-medium font-mono text-orange-400 mb-4 uppercase tracking-wider">
								▲ NEURAL_CATEGORIES ▲
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								{allCategories.map((category) => (
									<button
										key={category}
										type="button"
										onClick={() => setSelectedCategory(category)}
										className={`px-4 py-2 text-sm font-mono font-medium rounded transition-all duration-300 uppercase tracking-wide shadow-lg
                        ${selectedCategory === category
												? "bg-[#00ff99] text-black border border-[#00ff99] shadow-[#00ff99]/30"
												: "bg-black/60 border border-gray-800/50 text-gray-300 hover:bg-black/80 hover:text-[#00ff99] hover:border-[#00ff99]/60 hover:shadow-[#00ff99]/20"
											}`}
									>
										◉ {category}
									</button>
								))}
							</div>
						</div>

						{/* Source type filter */}
						<div className="text-center">
							<h3 className="text-sm font-medium font-mono text-orange-400 mb-4 uppercase tracking-wider">
								▲ SOURCE_MATRIX ▲
							</h3>
							<div className="flex justify-center gap-2">
								{["All", "Open Source", "Closed Source"].map((type) => (
									<button
										key={type}
										type="button"
										onClick={() => setSourceFilter(type)}
										className={`px-4 py-2 text-sm font-mono font-medium rounded transition-all duration-300 uppercase tracking-wide shadow-lg
                        ${sourceFilter === type
												? "bg-[#ff3860] text-white border border-[#ff3860] shadow-[#ff3860]/30"
												: "bg-black/60 border border-gray-800/50 text-gray-300 hover:bg-black/80 hover:text-[#ff3860] hover:border-[#ff3860]/60 hover:shadow-[#ff3860]/20"
											}`}
									>
										{type === "Open Source" ? "◉ OPEN_VOID" : type === "Closed Source" ? "▲ CLOSED_RITUAL" : "◈ ALL_MATRIX"}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Cyber-Doom Featured Project */}
			{featuredProject &&
				selectedCategory === "All" &&
				searchValue === "" &&
				sourceFilter === "All" && (
					<div className="py-12">
						<div className="text-center mb-8">
							<h2 className="text-2xl md:text-3xl font-bold font-mono text-orange-400 tracking-wider mb-2">
								▲ PRIME_NEURAL_CONSTRUCT ▲
							</h2>
							<div className="font-mono text-sm text-gray-600 tracking-wider">
								◉ FEATURED VOID RITUAL ◉
							</div>
						</div>
						<div className="bg-black/80 border border-orange-900/50 rounded-lg overflow-hidden shadow-2xl shadow-orange-900/20 hover:shadow-orange-900/30 transition-all duration-500">
							<div className="md:flex">
								<div className="md:w-2/3 relative h-64 md:h-auto">
									{featuredProject.imgSrc && (
										<Image
											src={featuredProject.imgSrc}
											alt={featuredProject.title}
											layout="fill"
											objectFit="cover"
											className="h-full w-full object-cover"
										/>
									)}
									{/* Cyber-Doom Source badge positioned over the image */}
									<div className="absolute top-4 right-4">
										<span
											className={`flex items-center px-4 py-2 rounded font-mono text-sm font-bold shadow-2xl border ${featuredProject.isOpenSource
												? "bg-black/80 text-[#00ff99] border-[#00ff99]/50 shadow-[#00ff99]/30"
												: "bg-black/80 text-[#ff3860] border-[#ff3860]/50 shadow-[#ff3860]/30"
												}`}
										>
											{featuredProject.isOpenSource ? (
												<>
													<svg
														className="w-4 h-4 mr-1.5"
														fill="currentColor"
														viewBox="0 0 24 24"
														aria-hidden="true"
													>
														<path
															fillRule="evenodd"
															d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
															clipRule="evenodd"
														/>
													</svg>
													◉ OPEN_VOID
												</>
											) : (
												<>
													<svg
														className="w-4 h-4 mr-1.5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														aria-hidden="true"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
														/>
													</svg>
													▲ SEALED_RITUAL
												</>
											)}
										</span>
									</div>
								</div>
								<div className="p-6 md:w-1/3 bg-gradient-to-b from-black/20 via-transparent to-orange-900/10">
									<h3 className="text-xl font-bold font-mono text-white mb-3 tracking-wide">
										{featuredProject.title}
									</h3>

									{featuredProject.categories && (
										<div className="flex flex-wrap gap-2 mb-4">
											{featuredProject.categories.map((cat) => (
												<span
													key={cat}
													className="text-xs font-mono font-bold bg-black/60 border border-gray-800/50 text-orange-400 py-1 px-3 rounded shadow-lg"
												>
													▲ {cat.toUpperCase()}
												</span>
											))}
										</div>
									)}

									<p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed">
										{featuredProject.description}
									</p>

									<div className="flex flex-col sm:flex-row gap-2">
										{/* Conditional buttons based on project type */}
										{featuredProject.isOpenSource && featuredProject.repoUrl ? (
											<a
												href={featuredProject.repoUrl}
												className="inline-flex items-center justify-center px-6 py-3 border border-[#00ff99]/50 text-sm font-mono font-bold rounded bg-black/60 text-[#00ff99] hover:bg-[#00ff99] hover:text-black transition-all duration-300 shadow-lg shadow-[#00ff99]/20 hover:shadow-[#00ff99]/40"
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													className="w-4 h-4 mr-2"
													fill="currentColor"
													viewBox="0 0 24 24"
													aria-hidden="true"
												>
													<path
														fillRule="evenodd"
														d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
														clipRule="evenodd"
													/>
												</svg>
												◉ ACCESS_VOID_SOURCE
											</a>
										) : (
											<a
												href={featuredProject.href}
												className="inline-flex items-center justify-center px-6 py-3 border border-[#ff3860]/50 text-sm font-mono font-bold rounded bg-black/60 text-[#ff3860] hover:bg-[#ff3860] hover:text-white transition-all duration-300 shadow-lg shadow-[#ff3860]/20 hover:shadow-[#ff3860]/40"
											>
												▲ ENTER_RITUAL
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

			{/* Cyber-Doom Project Grid */}
			<div className="py-16">
				{visibleProjects.length > 0 ? (
					<>
						<div className="text-center mb-12">
							<div className="font-mono text-sm text-gray-500 mb-4">
								<span className="text-[#00ff99]">◉</span> NEURAL_CONSTRUCT_MATRIX <span className="text-[#00ff99]">◉</span>
							</div>
						</div>
						<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
							{visibleProjects.map((project, index) => (
								<div
									key={project.title}
									className={`transform transition-all duration-500 ${isLoaded
										? "translate-y-0 opacity-100"
										: "translate-y-4 opacity-0"
										}`}
									style={{ transitionDelay: `${index * 100}ms` }}
								>
									<Card
										title={project.title}
										description={project.description}
										imgSrc={project.imgSrc}
										href={project.isOpenSource ? undefined : project.href} // Remove href for open source projects
										className="h-full hover:shadow-xl transition-all duration-300"
									>
										<div className="flex flex-wrap items-center justify-between mb-2">
											{project.categories && project.categories.length > 0 ? (
												<div className="flex flex-wrap gap-2">
													{project.categories.map((cat) => (
														<span
															key={cat}
															className="text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 py-1 px-2 rounded"
														>
															{cat}
														</span>
													))}
												</div>
											) : (
												<div /> // Empty div for flex alignment
											)}

											<span
												className={`text-xs px-2 py-1 rounded-full flex items-center ${project.isOpenSource
													? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
													: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
													}`}
											>
												{project.isOpenSource ? (
													<>
														<svg
															className="w-3 h-3 mr-1"
															fill="currentColor"
															viewBox="0 0 24 24"
															aria-hidden="true"
														>
															<path
																fillRule="evenodd"
																d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
																clipRule="evenodd"
															/>
														</svg>
														Open Source
													</>
												) : (
													<>
														<svg
															className="w-3 h-3 mr-1"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
															aria-hidden="true"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
															/>
														</svg>
														Closed Source
													</>
												)}
											</span>
										</div>

										{/* Either show source link for open source projects or link to project */}
										{project.isOpenSource && project.repoUrl ? (
											<a
												href={project.repoUrl}
												className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													className="w-4 h-4 mr-2"
													fill="currentColor"
													viewBox="0 0 24 24"
													aria-hidden="true"
												>
													<path
														fillRule="evenodd"
														d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
														clipRule="evenodd"
													/>
												</svg>
												View Source Code
											</a>
										) : (
											!project.isOpenSource &&
											project.href && (
												<a
													href={project.href}
													className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
												>
													View Project Details
												</a>
											)
										)}
									</Card>
								</div>
							))}
						</div>
						) : (
						<div className="text-center py-12">
							<svg
								className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
								No projects found
							</h3>
							<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
								Try adjusting your search or filter to find what you're looking
								for.
							</p>
							<div className="mt-6">
								<button
									type="button"
									onClick={() => {
										setSearchValue("");
										setSelectedCategory("All");
										setSourceFilter("All");
									}}
									className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								>
									Clear filters
								</button>
							</div>
						</div>
					</>
				) : (
					<div className="text-center py-24">
						<div className="relative bg-black/80 border border-red-900/60 rounded-lg p-12 mx-auto max-w-2xl overflow-hidden shadow-2xl shadow-red-900/20">
							<div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black/50 to-orange-900/10" />

							<div className="relative z-10">
								<div className="text-6xl md:text-8xl font-mono text-[#ff3860] mb-4 opacity-90 tracking-wider font-black">
									▲ VOID ▲
								</div>
								<div className="text-2xl font-bold font-mono text-gray-300 mb-2 tracking-wider">NO_CONSTRUCTS_FOUND</div>
								<div className="text-gray-500 font-mono text-sm mb-6">NEURAL_MATRIX :: QUERY_FAILED</div>

								<div className="bg-black/70 border border-orange-900/40 rounded p-4 font-mono text-xs text-gray-400 shadow-lg shadow-orange-900/30">
									<div className="flex items-center justify-center space-x-2 mb-2">
										<span className="text-orange-400">▲</span>
										<span>Recalibrating search parameters...</span>
										<span className="text-orange-400">▲</span>
									</div>
									<div className="text-center">
										<button
											type="button"
											onClick={() => {
												setSearchValue("");
												setSelectedCategory("All");
												setSourceFilter("All");
											}}
											className="inline-flex items-center px-6 py-3 border border-[#00ff99]/50 text-sm font-mono font-bold rounded bg-black/60 text-[#00ff99] hover:bg-[#00ff99] hover:text-black transition-all duration-300 shadow-lg shadow-[#00ff99]/20 hover:shadow-[#00ff99]/40 mt-4"
										>
											◉ RESET_NEURAL_MATRIX
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
