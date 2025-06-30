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
			{/* Hero Section */}
			<section className="relative overflow-hidden mb-20 p-10 border border-[#ff3860] bg-white dark:bg-[#0f0f0f] shadow-[0_0_20px_rgba(255,56,96,0.1)] dark:shadow-[0_0_20px_rgba(255,56,96,0.2)]">
				<div className="relative z-10 grid md:grid-cols-5 gap-10 items-center">
					<div className="md:col-span-3 space-y-6">
						<h1 className="text-5xl font-gothic tracking-tight text-[#ff3860] leading-tight">
							{resumeData.personal.name}
						</h1>
						<p className="text-lg sm:text-xl text-gray-800 dark:text-gray-300 font-mono max-w-xl">
							Engineer of systems, structure and sound.
							<br />
							I build resilient, high-performance data systems using Python, Rust, and cloud infrastructure, with the same obsession I bring to crafting synthwave and doom metal.
							<br />
							<span className="text-[#00aa66] dark:text-[#00ff99]">
								Born in {resumeData.personal.nationality}, living in {resumeData.personal.location}.
							</span>
						</p>
						<div className="flex space-x-4 pt-2">
							<Link
								href="/about"
								className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-500 transition-colors duration-200"
							>
								About Me
							</Link>

							<Link
								href="/projects"
								className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 dark:text-primary-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
							>
								My Projects
							</Link>
						</div>
					</div>
					<div className="md:col-span-2 flex justify-center">
						<div className="w-48 h-48 md:w-64 md:h-64 relative overflow-hidden border-4 border-[#ff3860] shadow-md">
							<Image
								src="/static/images/me/me.jpeg"
								alt="Profile"
								className="object-cover grayscale dark:grayscale-0 contrast-125"
								fill
								sizes="(max-width: 768px) 192px, 256px"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Work Section */}
			{featuredPosts.length > 0 && (
				<section className="mb-16">
					<h2 className="text-3xl font-gothic text-[#ff3860] mb-6">Featured Work</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{featuredPosts.map(({ slug, date, title, summary, tags }) => (
							<Link key={slug} href={`/blog/${slug}`} className="group">
								<div className="h-full p-6 bg-white dark:bg-[#121212] border border-[#ff3860] shadow hover:shadow-lg font-mono text-gray-900 dark:text-gray-100">
									<div className="flex flex-col h-full">
										<time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
											{formatDate(date, siteMetadata.locale)}
										</time>
										<h3 className="text-2xl font-bold text-[#ff3860] mb-2 group-hover:text-[#00aa66] dark:group-hover:text-[#00ff99]">
											{title}
										</h3>
										<div className="flex flex-wrap mb-4">
											{tags.map((tag) => (
												<span key={tag} className="mr-2 mb-2 px-2 py-1 text-xs bg-[#f1f1f1] dark:bg-[#1a1a1a] text-[#00aa66] dark:text-[#00ff99] border border-[#00aa66] dark:border-[#00ff99]">
													{tag}
												</span>
											))}
										</div>
										<p className="text-gray-700 dark:text-gray-300 flex-grow">{summary}</p>
										<div className="mt-4 text-[#00aa66] dark:text-[#00ff99] font-medium">Read more →</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Recent Posts Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-gothic text-[#ff3860] mb-6">Recent Posts</h2>
				<div>
					{!regularPosts.length && <p className="py-4 text-gray-500 dark:text-gray-400">No posts found.</p>}
					{regularPosts.map(({ slug, date, title }) => (
						<article key={slug} className="py-4 flex items-center justify-between border-b border-[#ccc] dark:border-[#333] hover:text-[#ff3860] font-mono px-2">
							<time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400 w-32 md:w-40">
								{formatDate(date, siteMetadata.locale)}
							</time>
							<h3 className="text-base md:text-lg font-medium flex-grow px-2">
								<Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100 hover:text-[#00aa66] dark:hover:text-[#00ff99]">
									{title}
								</Link>
							</h3>
							<Link href={`/blog/${slug}`} className="text-[#00aa66] dark:text-[#00ff99] font-bold">
								→
							</Link>
						</article>
					))}
				</div>
			</section>

			{/* Skills Section */}
			<section className="mb-16">
				<h2 className="text-3xl font-gothic text-[#ff3860] mb-6">Skills</h2>
				<Skills />
			</section>

			{/* Newsletter Section (optional) */}
			{siteMetadata.newsletter?.provider && (
				<div className="mt-20 p-8 bg-[#f1f1f1] dark:bg-[#121212] border border-[#ff3860]">
					<h2 className="text-2xl font-gothic text-center mb-4 text-[#ff3860]">
						Subscribe to my newsletter
					</h2>
					<p className="text-center mb-6 text-gray-600 dark:text-gray-400">
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