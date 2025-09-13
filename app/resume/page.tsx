import Link from "@/components/Link";
import Skills from "@/components/Skills";
import { getResumeData } from "@/utils/resumeData";
import { genPageMetadata } from "app/seo";

export const metadata = genPageMetadata({ title: "Resume" });

export default function ResumePage() {
	const resumeData = getResumeData();

	return (
		<>
			{/* Header Section - Doom Style */}
			<div className="divide-y divide-gray-700">
				<section className="relative overflow-hidden pb-8 pt-6 md:space-y-5">
					<div className="absolute inset-0 synthwave-grid opacity-10" />
					<div className="relative z-10 space-y-2">
						<h1 className="text-3xl font-gothic font-extrabold leading-9 tracking-tight text-[#ff3860] sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
							RESUME_DATA
						</h1>
						<p className="text-lg leading-7 text-gray-300 font-mono">
							<span className="text-[#00ff99]">[SYSTEM]</span> Professional background and qualifications archive
						</p>
					</div>
				</section>
			</div>

			{/* Personal Info Section */}
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
					{resumeData.personal?.name || "Your Name"}
				</h2>
				<p className="text-xl text-[#00ff99] mb-4 font-mono">
					{resumeData.personal?.title || "Your Title"}
				</p>
				<div className="prose dark:prose-dark max-w-none mb-4">
					<p>{resumeData.personal?.summary || "Your professional summary"}</p>
				</div>
				<div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 dark:text-gray-400">
					{resumeData.personal?.location && (
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-labelledby="location-icon-title"
							>
								<title id="location-icon-title">Location</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span>{resumeData.personal.location}</span>
						</div>
					)}
					{resumeData.personal?.email && (
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-labelledby="email-icon-title-resume"
							>
								<title id="email-icon-title-resume">Email</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<a href={`mailto:${resumeData.personal.email}`}>
								{resumeData.personal.email}
							</a>
						</div>
					)}
				</div>
			</div>

			{/* PDF Button - Modified to open in new tab */}
			<div className="mb-8 flex">
				<Link
					href="/static/files/resume.pdf"
					className="px-4 py-2 text-sm font-mono font-medium text-gray-900 bg-[#00ff99] rounded-md hover:bg-[#ff3860] hover:text-white transition-all duration-300 shadow-lg shadow-[#00ff99]/20 hover:shadow-[#ff3860]/20"
					aria-label="View PDF Resume"
					target="_blank"
					rel="noopener noreferrer"
				>
					DOWNLOAD_RESUME.PDF
				</Link>
			</div>

			{/* Skills Section */}
			<div className="mb-8">
				<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
					Skills & Technologies
				</h2>
				<Skills resumeData={resumeData} />
			</div>

			{/* Experience Section */}
			{resumeData.experience && resumeData.experience.length > 0 && (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
						Professional Experience
					</h2>
					<div className="space-y-6">
						{resumeData.experience.map((exp, index) => (
							<div
								key={`exp-${exp.company}-${exp.position}-${index}`}
								className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2"
							>
								<div className="flex flex-col sm:flex-row sm:justify-between">
									<h3 className="text-lg font-medium text-gray-100">
										{exp.position} •{" "}
										<span className="text-[#00ff99] font-mono">
											{exp.company}
										</span>
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
										{exp.startDate} - {exp.endDate || "Present"}
									</p>
								</div>
								<p className="mt-2 text-gray-600 dark:text-gray-400">
									{exp.location}
								</p>
								<ul className="mt-2 list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
									{exp.highlights?.map((highlight, i) => (
										<li key={`highlight-${exp.company}-${i}-${highlight.slice(0, 20)}`}>{highlight}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Education Section */}
			{resumeData.education && resumeData.education.length > 0 && (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
						Education
					</h2>
					<div className="space-y-4">
						{resumeData.education.map((edu, index) => (
							<div
								key={`edu-${edu.institution}-${edu.degree}-${index}`}
								className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2"
							>
								<div className="flex flex-col sm:flex-row sm:justify-between">
									<h3 className="text-lg font-medium text-gray-100">
										{edu.degree} •{" "}
										<span className="text-[#00ff99] font-mono">
											{edu.institution}
										</span>
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
										{edu.startDate} - {edu.endDate || "Present"}
									</p>
								</div>
								{edu.description && (
									<p className="mt-2 text-gray-600 dark:text-gray-400">
										{edu.description}
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Languages Section */}
			{resumeData.languages &&
				Array.isArray(resumeData.languages) &&
				resumeData.languages.length > 0 ? (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
						Languages
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{resumeData.languages.map((lang, index) => (
							<div
								key={`lang-${lang.name}-${lang.level}-${index}`}
								className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md p-3"
							>
								<span className="font-medium text-gray-900 dark:text-gray-100 mr-2">
									{lang.name || "Unknown"}:
								</span>
								<span className="text-gray-600 dark:text-gray-400">
									{lang.level || "Native"}
								</span>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
						Languages
					</h2>
					<div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
						<p className="text-gray-600 dark:text-gray-400">English (Native)</p>
					</div>
				</div>
			)}
		</>
	);
}
