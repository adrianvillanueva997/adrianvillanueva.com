import Link from "@/components/Link";
import Skills from "@/components/Skills";
import { getResumeData } from "@/utils/resumeData";
import { genPageMetadata } from "app/seo";
import { FaDownload, FaEnvelope, FaFlag, FaMapMarkerAlt } from "react-icons/fa";

export const metadata = genPageMetadata({ title: "Resume" });

export default function ResumePage() {
	const resumeData = getResumeData();

	return (
		<div className="bg-white min-h-screen">
			{/* Header */}
			<section className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
				<div className="text-center max-w-5xl mx-auto">
					<h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase mb-8">
						RESUME
					</h1>
					<div className="border-4 border-black bg-white p-8 max-w-3xl mx-auto">
						<p className="text-xl font-mono text-black leading-relaxed font-medium">
							Professional background and qualifications.
						</p>
					</div>
				</div>
			</section>

			{/* Content */}
			<div className="px-4 sm:px-6 md:px-10 bg-gray-50 py-16">
				<div className="max-w-5xl mx-auto space-y-12">

					{/* Personal Info */}
					<div className="border-4 border-black bg-white p-8">
						<h2 className="text-3xl font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
							{resumeData.personal?.name || "YOUR NAME"}
						</h2>
						<div className="mb-6">
							<p className="text-xl font-mono text-red-500 font-black uppercase mb-4">
								{resumeData.personal?.title || "Your Title"}
							</p>
							<p className="font-mono text-black leading-relaxed text-base mb-6">
								{resumeData.personal?.summary || "Your professional summary"}
							</p>
						</div>

						{/* Contact Info */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{resumeData.personal?.location && (
								<div className="flex items-center border-2 border-black bg-gray-100 p-3">
									<FaMapMarkerAlt className="text-black mr-3" />
									<span className="font-mono text-black font-medium">
										{resumeData.personal.location}
									</span>
								</div>
							)}
							{resumeData.personal?.email && (
								<div className="flex items-center border-2 border-black bg-gray-100 p-3">
									<FaEnvelope className="text-black mr-3" />
									<a
										href={`mailto:${resumeData.personal.email}`}
										className="font-mono text-black font-medium hover:text-red-500 transition-colors"
									>
										{resumeData.personal.email}
									</a>
								</div>
							)}
							{resumeData.personal?.nationality && (
								<div className="flex items-center border-2 border-black bg-gray-100 p-3 md:col-span-2">
									<FaFlag className="text-black mr-3" />
									<span className="font-mono text-black font-medium">
										{resumeData.personal.nationality}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* PDF Download Button */}
					<div className="text-center">
						<Link
							href="/static/files/resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-8 py-4 border-4 border-black bg-red-500 text-white font-mono font-black uppercase text-lg hover:bg-black transition-all duration-300"
						>
							<FaDownload className="mr-3" />
							DOWNLOAD PDF
						</Link>
					</div>

					{/* Skills Section */}
					<div className="border-4 border-black bg-white p-8">
						<h2 className="text-2xl font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
							SKILLS & TECHNOLOGIES
						</h2>
						<Skills resumeData={resumeData} />
					</div>

					{/* Experience Section */}
					{resumeData.experience && resumeData.experience.length > 0 && (
						<div className="border-4 border-black bg-white p-8">
							<h2 className="text-2xl font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
								PROFESSIONAL EXPERIENCE
							</h2>
							<div className="space-y-8">
								{resumeData.experience.map((exp, index) => (
									<div
										key={`exp-${exp.company}-${exp.position}-${index}`}
										className="border-l-4 border-red-500 pl-6 bg-gray-50 p-6"
									>
										<div className="mb-4">
											<h3 className="text-xl font-mono font-black text-black uppercase mb-2">
												{exp.position}
											</h3>
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
												<p className="text-lg font-mono text-red-500 font-black">
													{exp.company}
												</p>
												<div className="text-sm font-mono text-black bg-yellow-300 px-3 py-1 border-2 border-black">
													{exp.startDate} - {exp.endDate || "PRESENT"}
												</div>
											</div>
											<p className="text-sm font-mono text-black">
												{exp.location}
											</p>
										</div>
										<ul className="space-y-3">
											{exp.highlights?.map((highlight, i) => (
												<li
													key={`highlight-${exp.company}-${i}-${highlight.slice(0, 20)}`}
													className="flex items-start"
												>
													<span className="text-red-500 mr-3 mt-1">▪</span>
													<span className="font-mono text-black text-sm leading-relaxed">
														{highlight}
													</span>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Education Section */}
					{resumeData.education && resumeData.education.length > 0 && (
						<div className="border-4 border-black bg-white p-8">
							<h2 className="text-2xl font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
								EDUCATION
							</h2>
							<div className="space-y-6">
								{resumeData.education.map((edu, index) => (
									<div
										key={`edu-${edu.institution}-${edu.degree}-${index}`}
										className="border-l-4 border-red-500 pl-6 bg-gray-50 p-6"
									>
										<h3 className="text-xl font-mono font-black text-black uppercase mb-2">
											{edu.degree}
										</h3>
										<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
											<p className="text-lg font-mono text-red-500 font-black">
												{edu.institution}
											</p>
											<div className="text-sm font-mono text-black bg-yellow-300 px-3 py-1 border-2 border-black">
												{edu.startDate} - {edu.endDate || "Present"}
											</div>
										</div>
										{edu.description && (
											<p className="font-mono text-black text-sm leading-relaxed mt-3">
												{edu.description}
											</p>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{/* Languages Section */}
					<div className="border-4 border-black bg-white p-8">
						<h2 className="text-2xl font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
							LANGUAGES
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
							{resumeData.languages && Array.isArray(resumeData.languages) && resumeData.languages.length > 0 ? (
								resumeData.languages.map((lang, index) => (
									<div
										key={`lang-${lang.name}-${lang.level}-${index}`}
										className="border-2 border-black bg-gray-100 p-4"
									>
										<div className="text-center">
											<p className="font-mono font-black text-black uppercase text-sm mb-2">
												{lang.name || "Unknown"}
											</p>
											<p className="font-mono text-red-500 text-xs font-black uppercase">
												{lang.level || "Native"}
											</p>
										</div>
									</div>
								))
							) : (
								<div className="border-2 border-black bg-gray-100 p-4">
									<div className="text-center">
										<p className="font-mono font-black text-black uppercase text-sm mb-2">
											ENGLISH
										</p>
										<p className="font-mono text-red-500 text-xs font-black uppercase">
											NATIVE
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
