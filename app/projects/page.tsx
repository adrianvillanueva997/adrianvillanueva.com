"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import projectsData from "@/data/projectsData";

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
		<div className="divide-y divide-gray-200 dark:divide-gray-700">
			<div className="space-y-2 pt-6 pb-8 md:space-y-5">
				<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
					Projects
				</h1>
				<p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
					A showcase of my technical explorations and creative solutions
				</p>
			</div>

			{/* Search and Filter */}
			<div className="py-6">
				<div className="flex flex-col space-y-4">
					{/* Search Input */}
					<div className="relative max-w-lg">
						<input
							aria-label="Search projects"
							type="text"
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Search projects..."
							className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
						/>
						<svg
							className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>

					{/* Filters Section */}
					<div className="flex flex-col sm:flex-row gap-4">
						{/* Category filter */}
						<div>
							<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Categories
							</h3>
							<div className="flex flex-wrap gap-2">
								{allCategories.map((category) => (
									<button
										key={category}
										onClick={() => setSelectedCategory(category)}
										className={`px-3 py-1 text-sm font-medium rounded-md transition-colors
                        ${
													selectedCategory === category
														? "bg-primary-500 text-white"
														: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
												}`}
									>
										{category}
									</button>
								))}
							</div>
						</div>

						{/* Source type filter */}
						<div>
							<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Source Type
							</h3>
							<div className="flex gap-2">
								{["All", "Open Source", "Closed Source"].map((type) => (
									<button
										key={type}
										onClick={() => setSourceFilter(type)}
										className={`px-3 py-1 text-sm font-medium rounded-md transition-colors
                        ${
													sourceFilter === type
														? "bg-primary-500 text-white"
														: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
												}`}
									>
										{type}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Featured Project */}
			{featuredProject &&
				selectedCategory === "All" &&
				searchValue === "" &&
				sourceFilter === "All" && (
					<div className="py-8">
						<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
							Featured Project
						</h2>
						<div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
									{/* Source badge positioned over the image */}
									<div className="absolute top-4 right-4">
										<span
											className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-md ${
												featuredProject.isOpenSource
													? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
													: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
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
													Open Source
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
													Closed Source
												</>
											)}
										</span>
									</div>
								</div>
								<div className="p-6 md:w-1/3">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
										{featuredProject.title}
									</h3>

									{featuredProject.categories && (
										<div className="flex flex-wrap gap-2 mb-3">
											{featuredProject.categories.map((cat) => (
												<span
													key={cat}
													className="text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 py-1 px-2 rounded"
												>
													{cat}
												</span>
											))}
										</div>
									)}

									<p className="text-gray-700 dark:text-gray-300 mb-4">
										{featuredProject.description}
									</p>

									<div className="flex flex-col sm:flex-row gap-2">
										{/* Conditional buttons based on project type */}
										{featuredProject.isOpenSource && featuredProject.repoUrl ? (
											<a
												href={featuredProject.repoUrl}
												className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
											<a
												href={featuredProject.href}
												className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
											>
												View Project
											</a>
										)}

										{/* If it's open source but we want a demo link too */}
										{featuredProject.isOpenSource && featuredProject.href && (
											<a
												href={featuredProject.href}
												className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
											>
												View Demo
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

			{/* Project Grid */}
			<div className="py-12">
				{visibleProjects.length > 0 ? (
					<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{visibleProjects.map((project, index) => (
							<div
								key={project.title}
								className={`transform transition-all duration-500 ${
									isLoaded
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
											className={`text-xs px-2 py-1 rounded-full flex items-center ${
												project.isOpenSource
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
				)}
			</div>
		</div>
	);
}
