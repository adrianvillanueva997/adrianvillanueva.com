"use client";

import type { ResumeData } from "@/utils/resumeData";

interface SkillsProps {
	resumeData?: ResumeData;
}

export default function Skills({ resumeData }: SkillsProps) {
	if (!resumeData || !resumeData.skills) {
		return (
			<div className="brutalist-box p-6">
				<p className="text-black font-mono font-bold uppercase">Skills data not available</p>
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
			{/* Geometric shapes background for brutalist feel */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-5 left-5 w-12 h-12 bg-black" />
				<div className="absolute bottom-10 right-10 w-8 h-20 bg-red-500" />
				<div className="absolute top-1/2 left-1/4 w-6 h-6 bg-black" />
			</div>

			<div className="relative z-10 brutalist-box p-4 md:p-6">
				{/* Brutalist header */}
				<div className="flex items-center mb-6 font-mono">
					<h2 className="text-2xl md:text-3xl font-heading font-black text-black uppercase border-b-4 border-red-500 pb-2">
						Technical Skills
					</h2>
				</div>

				{/* Single grid of all skills with better readability */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
					{allSkills.map((skill, index) => (
						<div key={`skill-${index}-${skill}`} className="group">
							<div className="px-3 py-2 bg-white border-2 border-black text-center transition-none hover:bg-red-500 hover:text-white font-sans font-bold text-sm text-black">
								{skill}
							</div>
						</div>
					))}
				</div>

				{/* Footer stats with brutalist styling */}
				<div className="mt-6 pt-4 border-t-4 border-black flex justify-between items-center font-mono text-sm text-black font-bold">
					<span className="uppercase">Total: {allSkills.length} Skills</span>
					<span className="bg-red-500 text-white px-2 py-1 border-2 border-black uppercase">System Ready</span>
				</div>
			</div>
		</div>
	);
}