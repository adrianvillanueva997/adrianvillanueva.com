"use client";

import Card from "@/components/Card";
import projectsData from "@/data/projectsData";
import { useMemo, useState } from "react";

const projectCategories = [
	"All",
	...Array.from(new Set(projectsData.flatMap((project) => project.categories || []))),
];

export default function Projects() {
	const [searchValue, setSearchValue] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	const visibleProjects = useMemo(() => {
		return projectsData.filter((project) => {
			const matchesSearch = project.title.toLowerCase().includes(searchValue.toLowerCase()) ||
				project.description?.toLowerCase().includes(searchValue.toLowerCase());

			const matchesCategory = selectedCategory === "All" ||
				project.categories?.includes(selectedCategory);

			return matchesSearch && matchesCategory;
		});
	}, [searchValue, selectedCategory]);

	return (
		<div className="bg-white min-h-screen">
			{/* Header */}
			<section className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
				<div className="text-center max-w-5xl mx-auto">
					<h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase mb-8">
						PROJECTS
					</h1>
					<div className="border-4 border-black bg-white p-8 max-w-3xl mx-auto mb-12">
						<p className="text-xl font-mono text-black leading-relaxed font-medium">
							A collection of technical projects and digital constructs.
						</p>
					</div>
				</div>
			</section>

			{/* Search and Filters */}
			<div className="px-4 sm:px-6 md:px-10 bg-gray-50 py-12 border-b-2 border-black">
				<div className="max-w-6xl mx-auto">
					<div className="mb-8">
						<input
							type="text"
							placeholder="SEARCH PROJECTS..."
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							className="w-full px-6 py-4 text-lg font-mono font-black bg-white border-4 border-black focus:outline-none focus:ring-0 focus:border-red-500 uppercase placeholder-gray-500"
						/>
					</div>

					<div>
						<div className="flex flex-wrap gap-3">
							{projectCategories.map((category) => (
								<button
									type="button"
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-6 py-3 text-sm font-mono font-black border-2 border-black transition-all duration-300 uppercase ${selectedCategory === category
										? "bg-black text-white"
										: "bg-white text-black hover:bg-gray-50"
										}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Projects Grid */}
			<div className="px-4 sm:px-6 md:px-10 bg-white py-16">
				<div className="max-w-6xl mx-auto">
					{visibleProjects.length > 0 ? (
						<>
							<div className="text-center mb-12">
								<h2 className="text-3xl font-black font-mono text-black uppercase mb-4">
									All Projects
								</h2>
								<div className="w-20 h-1 bg-red-500 mx-auto mb-4" />
								<p className="text-lg font-mono text-gray-600">
									{visibleProjects.length} project{visibleProjects.length !== 1 ? 's' : ''} found
								</p>
							</div>

							<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
								{visibleProjects.map((project) => (
									<Card
										key={project.title}
										title={project.title}
										description={project.description}
										imgSrc={project.imgSrc}
										href={project.href}
										isOpenSource={project.isOpenSource}
										repoUrl={project.repoUrl}
									/>
								))}
							</div>
						</>
					) : (
						<div className="text-center py-16">
							<div className="border-4 border-black bg-gray-50 p-12 max-w-2xl mx-auto">
								<h3 className="text-2xl font-black font-mono text-black uppercase mb-4">
									NO RESULTS FOUND
								</h3>
								<p className="text-lg font-mono text-gray-600 mb-8">
									No projects match your current filters.
								</p>
								<button
									type="button"
									onClick={() => {
										setSearchValue("");
										setSelectedCategory("All");
									}}
									className="px-6 py-3 font-mono font-black text-white bg-red-500 border-2 border-black hover:bg-black transition-all duration-300 uppercase"
								>
									RESET FILTERS
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
