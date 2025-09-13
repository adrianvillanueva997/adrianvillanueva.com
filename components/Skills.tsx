"use client";

import type { ResumeData } from "@/utils/resumeData";
import { useState } from "react";

interface SkillsProps {
	resumeData?: ResumeData;
}

export default function Skills({ resumeData }: SkillsProps) {
	const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

	if (!resumeData || !resumeData.skills) {
		return (
			<div className="p-6 border border-gray-700 rounded-xl bg-gray-950/50 relative overflow-hidden">
				{/* Animated scan line */}
				<div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff3860] to-transparent animate-pulse" />
				<p className="text-gray-400 font-mono">Skills data not available</p>
			</div>
		);
	}

	// Flatten all skills into a single array
	const allSkills = [
		...(resumeData.skills.languages || []),
		...(resumeData.skills.frameworks || []),
		...(resumeData.skills.cloud || []),
		...(resumeData.skills.tools || []),
		...(resumeData.skills.mlops || []),
		...(resumeData.skills.databases || []),
		...(resumeData.skills.monitoring || []),
		...(resumeData.skills["CI/CD"] || []),
		...(resumeData.skills.other || []),
	];

	return (
		<div className="relative overflow-hidden">
			{/* Background grid pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0" style={{
					backgroundImage: `
						linear-gradient(rgba(0, 255, 153, 0.1) 1px, transparent 1px),
						linear-gradient(90deg, rgba(0, 255, 153, 0.1) 1px, transparent 1px)
					`,
					backgroundSize: '20px 20px'
				}} />
			</div>

			{/* Animated scan lines */}
			<div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00ff99] to-transparent animate-pulse" />
			<div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff3860] to-transparent animate-pulse delay-500" />

			<div className="relative z-10 p-4 md:p-6 border border-gray-700/60 rounded-xl bg-gray-950/80 backdrop-blur-sm">
				{/* Program Loading header */}
				<div className="flex items-center mb-4 font-mono text-xs">
					<span className="text-[#00ff99] mr-2">▶</span>
					<span className="text-gray-400">Loading skills....</span>
					<div className="ml-auto flex space-x-1">
						<div className="w-2 h-2 rounded-full bg-[#ff3860] animate-pulse" />
						<div className="w-2 h-2 rounded-full bg-[#ffff00] animate-pulse delay-150" />
						<div className="w-2 h-2 rounded-full bg-[#00ff99] animate-pulse delay-300" />
					</div>
				</div>

				<h2 className="text-2xl md:text-3xl font-gothic text-[#ff3860] mb-6">Skills</h2>

				{/* Simple grid of all skills */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
					{allSkills.map((skill, index) => (
						<div key={`skill-${index}-${skill}`}
							className="group relative"
							onMouseEnter={() => setHoveredSkill(skill)}
							onMouseLeave={() => setHoveredSkill(null)}
						>
							<div className="relative px-3 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default hover:border-[#00ff99] hover:text-[#00ff99] hover:shadow-[#00ff99]/20">
								<span className="text-xs md:text-sm font-mono font-medium">
									{skill}
								</span>

								{/* Simple glow effect on hover */}
								{hoveredSkill === skill && (
									<div className="absolute inset-0 bg-[#00ff99]/10 rounded-lg animate-pulse" />
								)}
							</div>
						</div>
					))}
				</div>

				{/* Footer stats */}
				<div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center font-mono text-xs text-gray-500">
					<span>Total skills: {allSkills.length}</span>
					<span className="text-[#00ff99]">Program: LOADED</span>
				</div>
			</div>

			{/* Add scan animation keyframes */}
			<style jsx>{`
				@keyframes scan {
					0% { background-position: -200% 0; }
					100% { background-position: 200% 0; }
				}
			`}</style>
		</div>
	);
}