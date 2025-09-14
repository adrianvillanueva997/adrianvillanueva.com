import Link from "@/components/Link";
import ParticleField from "@/components/ParticleField";
import Skills from "@/components/Skills";
import TypewriterText from "@/components/TypewriterText";
import siteMetadata from "@/data/siteMetadata";
import { getResumeData } from "@/utils/resumeData";
import Image from "next/image";
import NewsletterForm from "pliny/ui/NewsletterForm";
import { formatDate } from "pliny/utils/formatDate";

const MAX_DISPLAY = 5;

export default function Home({ posts }) {
	const resumeData = getResumeData();
	const featuredPosts = posts.filter((post) => post.tags.includes("featured")).slice(0, 2);
	const regularPosts = posts.filter((post) => !post.tags.includes("featured")).slice(0, MAX_DISPLAY);

	return (
		<>
			{/* Hero Section with Doom/Synthwave Aesthetic - Responsive */}
			<section className="cyber-doom-hero relative overflow-hidden mb-12 md:mb-20 px-4 sm:px-6 md:px-10 py-8 md:py-12 lg:py-16 bg-gray-950">
				{/* Particle Field Background */}
				<ParticleField />

				{/* Synthwave Grid Background */}
				<div className="synthwave-grid absolute inset-0 opacity-20">
					<div className="absolute inset-0" style={{
						backgroundImage: `
							linear-gradient(rgba(0, 255, 153, 0.1) 1px, transparent 1px),
							linear-gradient(90deg, rgba(0, 255, 153, 0.1) 1px, transparent 1px)
						`,
						backgroundSize: '40px 40px'
					}} />
				</div>

				{/* Animated Scan Lines */}
				<div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#00ff99] to-transparent animate-pulse" />
				<div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#ff3860] to-transparent animate-pulse delay-500" />
				<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff99] to-transparent animate-pulse delay-1000" />
				<div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff3860] to-transparent animate-pulse delay-1500" />

				<div className="relative z-10 grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 items-center">
					<div className="lg:col-span-3 space-y-4 md:space-y-6 text-center lg:text-left">
						{/* Terminal Header */}
						<div className="font-mono text-sm text-gray-500 mb-4 opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards]">
							<span className="text-[#00ff99]">❯</span> initializing_profile.sh...
							<div className="inline-block ml-2 w-2 h-4 bg-[#00ff99] animate-pulse" />
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight">
							<TypewriterText
								text="Adrian Villanueva Martinez"
								className="text-[#ff3860] drop-shadow-lg"
								speed={80}
								delay={1500}
							/>
						</h1>

						{/* Animated subtitle */}
						<div className="font-mono text-lg text-[#00ff99] opacity-0 animate-[fadeIn_1s_ease-in_3s_forwards]">
							&gt; SOFTWARE_ENGINEER.sh loaded successfully
						</div>
						<p className="text-base sm:text-lg md:text-xl text-gray-300 font-mono max-w-2xl mx-auto lg:mx-0">
							<span className="text-neon-cyan">Engineer of systems</span>, structure and sound.
							<br className="hidden sm:block" />
							I build <span className="text-primary-400">resilient, high-performance</span> data systems using Python, Rust, and cloud infrastructure, with the same <span className="text-neon-purple">obsession</span> I bring to crafting synthwave and doom metal.
							<br className="hidden sm:block" />
							<span className="text-neon-yellow font-bold">
								Born in {resumeData.personal.nationality}, living in {resumeData.personal.location}.
							</span>
						</p>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
							<Link
								href="/about"
								className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 border border-primary-500 text-sm sm:text-base font-medium rounded-md shadow-sm text-primary-400 bg-gray-900 hover:bg-primary-900 hover:text-primary-300 transition-all duration-300 doom-glow"
							>
								<span className="font-doom">Initialize_Profile</span>
							</Link>

							<Link
								href="/projects"
								className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 border border-neon-cyan text-sm sm:text-base font-medium rounded-md text-neon-cyan bg-gray-900 hover:bg-gray-800 hover:synthwave-glow transition-all duration-300"
							>
								<span className="font-doom">Load_Projects</span>
							</Link>
						</div>
					</div>
					<div className="lg:col-span-2 flex justify-center order-first lg:order-last">
						<div className="relative group">
							{/* Outer glowing ring */}
							<div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-72 lg:h-72 rounded-full absolute -inset-2 bg-gradient-to-r from-primary-500 via-neon-cyan to-primary-500 opacity-75 group-hover:opacity-100 blur-sm group-hover:blur transition-all duration-500 animate-doom-pulse" />

							{/* Middle ring */}
							<div className="w-34 h-34 sm:w-42 sm:h-42 md:w-50 md:h-50 lg:w-70 lg:h-70 rounded-full absolute -inset-1 bg-gradient-to-r from-neon-purple via-primary-400 to-neon-cyan opacity-50 group-hover:opacity-75 transition-all duration-300" />

							{/* Photo container */}
							<div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-68 lg:h-68 relative overflow-hidden rounded-full border-2 border-gray-900 shadow-2xl group-hover:shadow-primary-500/50 transition-all duration-300">
								<Image
									src="/static/images/me/me.jpeg"
									alt="Profile"
									className="object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-500 tzeentchian-photo"
									fill
									sizes="(max-width: 768px) 192px, 272px"
								/>

								{/* Cyberpunk overlay effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-neon-cyan/20 group-hover:from-primary-500/20 group-hover:to-neon-purple/30 transition-all duration-500" />

								{/* Scan line effect */}
								<div className="absolute top-0 left-0 w-full h-0.5 bg-neon-cyan opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300" />
								<div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 delay-150" />
							</div>

							{/* Hexagonal accent corners */}
							<div className="absolute top-2 right-2 w-3 h-3 bg-neon-cyan rotate-45 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
							<div className="absolute bottom-2 left-2 w-3 h-3 bg-primary-500 rotate-45 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
						</div>
					</div>
				</div>
			</section>

			{/* Featured Work Section */}
			{featuredPosts.length > 0 && (
				<section className="relative mb-8 md:mb-16 overflow-hidden">
					{/* Section header with program loading styling */}
					<div className="flex items-center mb-6">
						<div className="font-mono text-sm text-[#00ff99] mr-4">
							<span className="animate-pulse">▶</span> featured_work.sh
						</div>
						<h2 className="text-2xl md:text-3xl font-heading font-bold text-[#ff3860] uppercase tracking-wide">
							Featured_Work
						</h2>
						<div className="flex-1 ml-4 h-px bg-gradient-to-r from-[#ff3860] to-transparent" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
						{featuredPosts.map(({ slug, date, title, summary, tags }, index) => (
							<Link key={slug} href={`/blog/${slug}`} className="group">
								<div className="relative h-full p-6 bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-[#ff3860]/20 transition-all duration-500 hover:border-[#ff3860]/60 hover:-translate-y-2">
									{/* Program header */}
									<div className="flex items-center justify-between mb-3 font-mono text-xs">
										<div className="flex items-center">
											<span className="text-[#00ff99] mr-2">▶</span>
											<span className="text-gray-500">project_{index + 1}.exe</span>
										</div>
										<div className="flex space-x-1">
											<div className="w-2 h-2 rounded-full bg-[#ff3860] animate-pulse" />
											<div className="w-2 h-2 rounded-full bg-[#ffff00] animate-pulse delay-150" />
											<div className="w-2 h-2 rounded-full bg-[#00ff99] animate-pulse delay-300" />
										</div>
									</div>

									{/* Scan line effect */}
									<div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff3860] to-transparent opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />

									<div className="flex flex-col h-full">
										<time dateTime={date} className="text-xs font-mono text-[#00ff99]/80 mb-2 block">
											{formatDate(date, siteMetadata.locale)}
										</time>
										<h3 className="text-xl md:text-2xl font-mono font-bold text-[#ff3860] mb-3 group-hover:text-[#00ff99] transition-colors duration-300 uppercase tracking-wide">
											{title}
										</h3>

										{/* Tags with enhanced styling */}
										<div className="flex flex-wrap gap-2 mb-4">
											{tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 text-xs font-mono bg-gray-800/60 text-[#00ff99] border border-[#00ff99]/30 rounded font-bold uppercase tracking-wider hover:bg-[#00ff99]/10 hover:border-[#00ff99] transition-all duration-200"
												>
													#{tag}
												</span>
											))}
										</div>

										<p className="text-sm md:text-base text-gray-400 leading-relaxed flex-grow mb-4 group-hover:text-gray-300 transition-colors duration-300">
											{summary}
										</p>

										{/* Enhanced call-to-action */}
										<div className="mt-auto pt-4 border-t border-gray-700/50 group-hover:border-[#ff3860]/30 transition-colors duration-300">
											<div className="flex items-center justify-between">
												<span className="font-mono text-sm font-bold text-[#00ff99] uppercase tracking-wider group-hover:text-[#ff3860] transition-colors duration-300">
													▶ Run_Program
												</span>
												<svg
													className="w-5 h-5 text-[#00ff99] group-hover:text-[#ff3860] group-hover:translate-x-1 transition-all duration-300"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													role="img"
													aria-label="Arrow right"
												>
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
												</svg>
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Recent Posts Section with Program Loading */}
			<section className="mb-8 md:mb-16">
				<div className="bg-gray-900/30 border border-gray-700/50 rounded-lg p-6">
					{/* Program Loading Header */}
					<div className="flex items-center space-x-2 pb-4 mb-6 border-b border-[#00ff99]/20">
						<span className="font-mono text-[#00ff99] font-bold text-lg">▶</span>
						<span className="font-mono text-gray-300 text-lg">Running blog_reader.sh</span>
						<div className="flex space-x-1 ml-auto">
							<div className="w-3 h-3 rounded-full bg-[#00ff99] animate-pulse" />
							<div className="w-3 h-3 rounded-full bg-[#ffaa00] opacity-60" />
							<div className="w-3 h-3 rounded-full bg-[#ff3860] opacity-40" />
						</div>
					</div>

					<div className="space-y-3">
						{!regularPosts.length && (
							<div className="bg-gray-800/60 border border-[#ff3860]/30 rounded p-4">
								<p className="text-[#ff3860] font-mono text-center">ERROR: blog_reader.exe crashed - No posts loaded</p>
							</div>
						)}

						{regularPosts.map(({ slug, date, title }, index) => (
							<Link key={slug} href={`/blog/${slug}`}>
								<article className="group py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border border-gray-700/30 rounded hover:border-[#00ff99]/50 hover:bg-gray-800/40 transition-all duration-300 font-mono">
									<div className="flex flex-col sm:flex-row sm:items-center flex-grow">
										<div className="flex items-center space-x-3 sm:w-32 sm:flex-shrink-0 mb-2 sm:mb-0">
											<span className="text-[#00ff99]/60 text-xs font-bold">
												#{String(index + 1).padStart(2, '0')}
											</span>
											<time dateTime={date} className="text-xs text-[#00ff99]/80 bg-gray-800/60 px-2 py-1 rounded border border-gray-600/50 whitespace-nowrap">
												{new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' })}
											</time>
										</div>
										<h3 className="text-sm md:text-base font-medium sm:flex-grow sm:px-4 text-gray-300 group-hover:text-[#ff3860] transition-colors duration-300 uppercase tracking-wide">
											{title}
										</h3>
									</div>
									<div className="flex items-center space-x-2 self-end sm:self-center mt-2 sm:mt-0">
										<span className="text-[#00ff99] font-bold text-sm uppercase tracking-wider group-hover:text-[#ff3860] transition-colors duration-300">
											Run
										</span>
										<svg
											className="w-4 h-4 text-[#00ff99] group-hover:text-[#ff3860] group-hover:translate-x-1 transition-all duration-300"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											role="img"
											aria-label="Arrow right"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
										</svg>
									</div>
								</article>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section className="mb-8 md:mb-16">
				<Skills resumeData={resumeData} />
			</section>

			{/* Newsletter Section (optional) */}
			{siteMetadata.newsletter?.provider && (
				<div className="mt-12 md:mt-20 p-4 md:p-8 bg-[#f1f1f1] dark:bg-[#121212] border border-[#ff3860]">
					<h2 className="text-xl md:text-2xl font-gothic text-center mb-3 md:mb-4 text-[#ff3860]">
						Subscribe to my newsletter
					</h2>
					<p className="text-center mb-4 md:mb-6 text-sm md:text-base text-gray-600 dark:text-gray-400">
						Get notified when I publish new content. No spam, ever.
					</p>
					<div className="max-w-md mx-auto">
						<NewsletterForm />
					</div>
				</div>
			)}
		</>
	);
}