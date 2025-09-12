import { getResumeData } from "@/utils/resumeData";

export default function Skills() {
	const resumeData = getResumeData();

	if (!resumeData || !resumeData.skills) {
		return (
			<div className="p-6 border border-gray-700 rounded-xl">
				<p className="text-gray-400">Skills data not available</p>
			</div>
		);
	}

	const {
		languages = [],
		frameworks = [],
		cloud = [],
		tools = [],
		mlops = [],
		databases = [],
		monitoring = [],
		["CI/CD"]: cicd = [],
		other = [],
	} = resumeData.skills;

	const allSkills = [
		...languages,
		...frameworks,
		...cloud,
		...tools,
		...mlops,
		...databases,
		...monitoring,
		...cicd,
		...other,
	];

	return (
		<div className="p-3 md:p-4 border border-gray-700 rounded-xl bg-gray-950/50">
			<div className="flex flex-wrap gap-1.5 md:gap-2">
				{allSkills.map((skill, index) => (
					<span
						key={`${skill}-${// biome-ignore lint/suspicious/noArrayIndexKey:
							index}`}
						className="px-2 md:px-3 py-1 bg-gray-800 text-gray-100 rounded-full text-xs md:text-sm border border-gray-600 hover:border-[#00ff99] hover:text-[#00ff99] transition-colors duration-200"
					>
						{skill}
					</span>
				))}
			</div>
		</div>
	);
}