import Link from "@/components/Link";
import Skills from "@/components/Skills";
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
			{/* Hero Section with Brutalist Aesthetic - Responsive */}
			<section className="relative overflow-hidden mb-12 md:mb-20 px-4 sm:px-6 md:px-10 py-8 md:py-12 lg:py-16 bg-white">
				{/* Geometric shapes background */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-10 left-10 w-20 h-20 bg-black" />
					<div className="absolute top-40 right-20 w-32 h-4 bg-red-500" />
					<div className="absolute bottom-20 left-1/3 w-16 h-16 bg-black" />
				</div>

				<div className="relative z-10 grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 items-center">
					<div className="lg:col-span-3 space-y-4 md:space-y-6 text-center lg:text-left">
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-tight uppercase text-black">
							Adrian Villanueva Martinez
						</h1>

						<div className="font-mono text-lg text-red-500 font-bold uppercase">
							SOFTWARE ENGINEER
						</div>
						<p className="text-base sm:text-lg md:text-xl text-gray-800 font-mono max-w-2xl mx-auto lg:mx-0">
							<span className="text-black font-bold">Engineer of systems</span>, structure and sound.
							<br className="hidden sm:block" />
							I build <span className="text-red-500 font-bold">resilient, high-performance</span> data systems using Python, Rust, and cloud infrastructure, with the same <span className="text-black font-bold">obsession</span> I bring to crafting synthwave and doom metal.
							<br className="hidden sm:block" />
							<span className="text-black font-bold uppercase">
								Born in {resumeData.personal.nationality}, living in {resumeData.personal.location}.
							</span>
						</p>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
							<Link
								href="/about"
								className="brutalist-button"
							>
								About Me
							</Link>

							<Link
								href="/projects"
								className="brutalist-button"
							>
								Projects
							</Link>
						</div>
					</div>
					<div className="lg:col-span-2 flex justify-center order-first lg:order-last">
						<div className="relative group">
							<div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-68 lg:h-68 relative overflow-hidden brutalist-box">
								<Image
									src="/static/images/me/me.jpeg"
									alt="Profile"
									className="object-cover"
									fill
									sizes="(max-width: 768px) 192px, 272px"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Work Section */}
			{featuredPosts.length > 0 && (
				<section className="relative mb-8 md:mb-16 overflow-hidden">
					<div className="flex items-center mb-6">
						<h2 className="text-2xl md:text-3xl font-heading font-black text-black uppercase tracking-wide border-b-4 border-red-500 pb-2">
							Featured Work
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
						{featuredPosts.map(({ slug, date, title, summary, tags }) => (
							<Link key={slug} href={`/blog/${slug}`} className="group">
								<div className="brutalist-card">
									<div className="flex flex-col h-full">
										<time dateTime={date} className="text-xs font-mono text-gray-600 mb-2 block uppercase font-bold">
											{formatDate(date, siteMetadata.locale)}
										</time>
										<h3 className="text-xl md:text-2xl font-mono font-black text-black mb-3 uppercase tracking-tight">
											{title}
										</h3>

										{/* Tags with brutalist styling */}
										<div className="flex flex-wrap gap-2 mb-4">
											{tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 text-xs font-mono bg-white text-black border-2 border-black font-bold uppercase tracking-wider"
												>
													#{tag}
												</span>
											))}
										</div>

										<p className="text-sm md:text-base text-gray-800 leading-relaxed flex-grow mb-4">
											{summary}
										</p>

										<div className="mt-auto pt-4 border-t-2 border-black">
											<div className="flex items-center justify-between">
												<span className="font-mono text-sm font-bold text-black uppercase tracking-wider">
													READ MORE
												</span>
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}>
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