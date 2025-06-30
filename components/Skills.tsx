import { getResumeData } from "@/utils/resumeData";

export default function Skills() {
	const resumeData = getResumeData();

	// Check if skills exist before accessing them
	if (!resumeData || !resumeData.skills) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
				<p className="text-gray-500 dark:text-gray-400">
					Skills data not available
				</p>
			</div>
		);
	}

	// Create arrays safely with fallbacks
	const languages = resumeData.skills.languages || [];
	const frameworks = resumeData.skills.frameworks || [];
	const cloud = resumeData.skills.cloud || [];
	const tools = resumeData.skills.tools || [];
	const mlops = resumeData.skills.mlops || [];
	const databases = resumeData.skills.databases || [];
	const monitoring = resumeData.skills.monitoring || [];
	const cicd = resumeData.skills["CI/CD"] || [];
	const other = resumeData.skills.other || [];

	// Combine all skills into one array
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
		<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
			<div className="flex flex-wrap gap-2">
				{allSkills.map((skill, index) => (
					<span
						key={`${skill}-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							index}`}
						className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
					>
						{skill}
					</span>
				))}
			</div>
		</div>
	);
}
