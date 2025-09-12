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
			{/* Hero Section with Doom/Synthwave Aesthetic - Responsive */}
			<section className="relative overflow-hidden mb-12 md:mb-20 px-4 sm:px-6 md:px-10 py-8 md:py-12 lg:py-16 bg-gray-950 doom-gradient">
				{/* Synthwave Grid Background */}
				<div className="absolute inset-0 synthwave-grid" />

				{/* Animated Scan Line */}
				<div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan to-transparent animate-synthwave-scan" />

				<div className="relative z-10 grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 items-center">
					<div className="lg:col-span-3 space-y-4 md:space-y-6 text-center lg:text-left">
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-doom tracking-tight text-primary-500 leading-tight text-glow animate-doom-pulse">
							Adrian Villanueva Martinez
						</h1>
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
									className="object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-500"
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
				<section className="mb-8 md:mb-16">
					<h2 className="text-2xl md:text-3xl font-gothic text-[#ff3860] mb-4 md:mb-6">Featured Work</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
						{featuredPosts.map(({ slug, date, title, summary, tags }) => (
							<Link key={slug} href={`/blog/${slug}`} className="group">
								<div className="h-full p-4 md:p-6 bg-gray-950 border border-primary-500 shadow-lg hover:shadow-primary-500/20 font-mono text-gray-100 transition-all duration-300 hover:border-glow">
									<div className="flex flex-col h-full">
										<time dateTime={date} className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
											{formatDate(date, siteMetadata.locale)}
										</time>
										<h3 className="text-lg md:text-2xl font-bold text-[#ff3860] mb-2 group-hover:text-[#00aa66] dark:group-hover:text-[#00ff99]">
											{title}
										</h3>
										<div className="flex flex-wrap mb-3 md:mb-4">
											{tags.map((tag) => (
												<span key={tag} className="mr-2 mb-2 px-1.5 md:px-2 py-1 text-xs bg-[#f1f1f1] dark:bg-[#1a1a1a] text-[#00aa66] dark:text-[#00ff99] border border-[#00aa66] dark:border-[#00ff99]">
													{tag}
												</span>
											))}
										</div>
										<p className="text-sm md:text-base text-gray-700 dark:text-gray-300 flex-grow">{summary}</p>
										<div className="mt-3 md:mt-4 text-[#00aa66] dark:text-[#00ff99] font-medium text-sm md:text-base">Read more →</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Recent Posts Section */}
			<section className="mb-8 md:mb-16">
				<h2 className="text-2xl md:text-3xl font-gothic text-[#ff3860] mb-4 md:mb-6">Recent Posts</h2>
				<div>
					{!regularPosts.length && <p className="py-4 text-gray-500 dark:text-gray-400">No posts found.</p>}
					{regularPosts.map(({ slug, date, title }) => (
						<article key={slug} className="py-3 md:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#ccc] dark:border-[#333] hover:text-[#ff3860] font-mono px-2">
							<div className="flex flex-col sm:flex-row sm:items-center flex-grow">
								<time dateTime={date} className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1 sm:mb-0 sm:w-32 md:w-40 sm:flex-shrink-0">
									{formatDate(date, siteMetadata.locale)}
								</time>
								<h3 className="text-sm md:text-base lg:text-lg font-medium sm:flex-grow sm:px-2">
									<Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100 hover:text-[#00aa66] dark:hover:text-[#00ff99]">
										{title}
									</Link>
								</h3>
							</div>
							<Link href={`/blog/${slug}`} className="text-[#00aa66] dark:text-[#00ff99] font-bold text-sm md:text-base self-end sm:self-center mt-1 sm:mt-0">
								→
							</Link>
						</article>
					))}
				</div>
			</section>

			{/* Skills Section */}
			<section className="mb-8 md:mb-16">
				<h2 className="text-2xl md:text-3xl font-gothic text-[#ff3860] mb-4 md:mb-6">Skills</h2>
				<Skills />
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