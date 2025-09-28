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
			{/* Hero Section with Brutalist Aesthetic */}
			<section className="relative overflow-hidden mb-16 md:mb-24 brutalist-section bg-white">
				{/* Enhanced geometric shapes background */}
				<div className="absolute inset-0 opacity-8">
					<div className="absolute top-10 left-10 w-24 h-24 bg-black rotate-12" />
					<div className="absolute top-40 right-20 w-40 h-6 bg-red-500 -rotate-3" />
					<div className="absolute bottom-20 left-1/3 w-20 h-20 bg-black rotate-45" />
					<div className="absolute top-1/2 right-1/4 w-8 h-32 bg-red-500 rotate-12" />
				</div>

				<div className="relative z-10 grid lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16 items-center">
					<div className="lg:col-span-3 space-y-6 md:space-y-8 text-center lg:text-left">
						<h1 className="brutalist-heading-xl text-black">
							Adrian Villanueva Martinez
						</h1>

						<div className="font-mono text-xl md:text-2xl brutalist-text-accent font-black uppercase tracking-wide border-l-4 border-red-500 pl-4">
							Software Engineer
						</div>

						<p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-sans max-w-3xl mx-auto lg:mx-0 leading-relaxed">
							<span className="text-black font-bold">Engineer of systems</span>, structure and sound.
							<br className="hidden sm:block" />
							I build <span className="brutalist-text-accent font-bold">resilient, high-performance</span> data systems using Python, Rust, and cloud infrastructure, with the same <span className="text-black font-bold">obsession</span> I bring to crafting synthwave and doom metal.
							<br className="hidden sm:block" />
							<span className="text-black font-bold uppercase text-base">
								Born in {resumeData.personal.nationality}, living in {resumeData.personal.location}.
							</span>
						</p>

						<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 justify-center lg:justify-start">
							<Link href="/about" className="brutalist-button">
								About Me
							</Link>
							<Link href="/projects" className="brutalist-button">
								View Projects
							</Link>
						</div>
					</div>

					<div className="lg:col-span-2 flex justify-center order-first lg:order-last">
						<div className="relative group">
							<div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-80 lg:h-80 relative overflow-hidden brutalist-box">
								<Image
									src="/static/images/me/me.jpeg"
									alt="Profile"
									className="object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
									fill
									sizes="(max-width: 768px) 240px, 320px"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Work Section */}
			{featuredPosts.length > 0 && (
				<section className="relative mb-16 md:mb-24 overflow-hidden brutalist-section">
					<div className="flex items-center mb-8 md:mb-12">
						<h2 className="brutalist-heading-lg text-black border-b-4 border-red-500 pb-3">
							Featured Work
						</h2>
					</div>

					<div className="brutalist-grid">
						{featuredPosts.map(({ slug, date, title, summary, tags }) => (
							<Link key={slug} href={`/blog/${slug}`} className="group">
								<article className="brutalist-card h-full">
									<div className="flex flex-col h-full">
										<time dateTime={date} className="text-sm font-mono text-gray-600 mb-6 block uppercase font-bold tracking-wide">
											{formatDate(date, siteMetadata.locale)}
										</time>
										<h3 className="text-base md:text-lg font-heading font-black text-black mb-4 uppercase tracking-normal leading-relaxed">
											{title}
										</h3>

										{/* Enhanced tags with better spacing */}
										<div className="flex flex-wrap gap-3 mb-6">
											{tags.map((tag) => (
												<span
													key={tag}
													className="px-3 py-2 text-sm font-mono bg-white text-black border-2 border-black font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white transition-colors duration-150"
												>
													#{tag}
												</span>
											))}
										</div>

										<p className="text-base md:text-lg text-gray-800 leading-relaxed flex-grow mb-6 font-sans">
											{summary}
										</p>

										<div className="mt-auto pt-6 border-t-3 border-black">
											<div className="flex items-center justify-between">
												<span className="font-mono text-base font-black text-black uppercase tracking-wider">
													Read Article
												</span>
												<svg
													className="w-6 h-6 text-black group-hover:text-red-500 transition-colors duration-150"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													aria-hidden="true"
												>
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
												</svg>
											</div>
										</div>
									</div>
								</article>
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Recent Posts Section */}
			<section className="mb-8 md:mb-16 px-4 sm:px-6 md:px-10">
				<div className="brutalist-box p-8">
					<div className="flex items-center space-x-4 pb-6 mb-8 border-b-4 border-black">
						<h2 className="brutalist-heading-lg text-black uppercase">Recent Posts</h2>
					</div>

					<div className="space-y-4">
						{!regularPosts.length && (
							<div className="brutalist-box-red p-6">
								<p className="text-white font-mono text-center uppercase font-bold text-lg">No posts found</p>
							</div>
						)}

						{regularPosts.map(({ slug, date, title }, index) => (
							<Link key={slug} href={`/blog/${slug}`}>
								<article className="group py-4 px-4 border-2 border-black bg-white hover:bg-red-500 hover:text-white transition-all duration-200">
									<div className="flex items-center justify-between">
										<div className="flex-grow">
											<h3 className="text-base font-black text-black group-hover:text-white uppercase mb-2">
												{title}
											</h3>
											<time dateTime={date} className="text-sm text-gray-600 group-hover:text-white font-mono">
												{new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' })}
											</time>
										</div>
										<div className="text-black group-hover:text-white font-bold text-sm ml-4">
											→
										</div>
									</div>
								</article>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section className="mb-8 md:mb-16 px-4 sm:px-6 md:px-10">
				<Skills resumeData={resumeData} />
			</section>

			{/* Newsletter Section */}
			{siteMetadata.newsletter?.provider && (
				<div className="mt-12 md:mt-20 mx-4 sm:mx-6 md:mx-10 brutalist-box-red p-10">
					<h2 className="brutalist-heading-lg text-center mb-4 md:mb-6 text-white uppercase">
						Subscribe to Newsletter
					</h2>
					<p className="text-center mb-6 md:mb-8 text-base md:text-lg text-white font-mono font-bold uppercase tracking-wide">
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