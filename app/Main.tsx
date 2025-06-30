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
	const featuredPosts = posts
		.filter((post) => post.tags.includes("featured"))
		.slice(0, 2);
	const regularPosts = posts
		.filter((post) => !post.tags.includes("featured"))
		.slice(0, MAX_DISPLAY);

	return (
		<>
			{/* Hero Section */}
			<section className="relative overflow-hidden rounded-2xl mb-12 p-10 border border-primary-300 dark:border-primary-800 bg-white dark:bg-gray-950 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
				<div className="grid md:grid-cols-5 gap-10 items-center">
					<div className="md:col-span-3 space-y-6">
						<h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
							<span className="text-primary-600 dark:text-primary-400">{resumeData.personal.name}</span>
						</h1>
						<p className="text-lg sm:text-xl text-gray-800 dark:text-gray-300 leading-relaxed max-w-xl">
							Engineer. Artist. Ritualist.<br />
							Crafting systems in code, sound, and silence.
							<br />
							Originally from <span className="font-medium">{resumeData.personal.nationality}</span>, currently based in <span className="font-medium">{resumeData.personal.location}</span>.
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
						<div className="w-48 h-48 md:w-64 md:h-64 relative bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
							<Image
								src="/static/images/me/me.jpeg"
								alt="Profile"
								className="object-cover"
								fill
								sizes="(max-width: 768px) 192px, 256px"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Work Section */}
			{featuredPosts.length > 0 && (
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
						Featured Work
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{featuredPosts.map((post) => {
							const { slug, date, title, summary, tags } = post;
							return (
								<Link key={slug} href={`/blog/${slug}`} className="group">
									<div className="h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
										<div className="flex flex-col h-full">
											<div className="mb-4">
												<time
													dateTime={date}
													className="text-sm text-gray-500 dark:text-gray-400"
												>
													{formatDate(date, siteMetadata.locale)}
												</time>
											</div>
											<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors duration-200">
												{title}
											</h3>
											<div className="flex flex-wrap mb-4">
												{tags.map((tag) => (
													<span
														key={tag}
														className="mr-2 mb-2 px-2 py-1 text-xs rounded-md bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
													>
														{tag}
													</span>
												))}
											</div>
											<p className="text-gray-600 dark:text-gray-300 flex-grow">
												{summary}
											</p>
											<div className="mt-4 text-primary-600 dark:text-primary-400 font-medium">
												Read more →
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</section>
			)}

			{/* Recent Posts Section */}
			<section>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
						Recent Posts
					</h2>
					{posts.length > MAX_DISPLAY && (
						<Link
							href="/blog"
							className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
						>
							View All →
						</Link>
					)}
				</div>

				<div className="border-t border-gray-200 dark:border-gray-700">
					{!regularPosts.length && <p className="py-4">No posts found.</p>}

					{regularPosts.map((post) => {
						const { slug, date, title } = post;
						return (
							<article
								key={slug}
								className="py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-2 rounded"
							>
								<time
									dateTime={date}
									className="text-sm text-gray-500 dark:text-gray-400 w-32 md:w-40"
								>
									{formatDate(date, siteMetadata.locale)}
								</time>

								<h3 className="text-base md:text-lg font-medium flex-grow px-2">
									<Link
										href={`/blog/${slug}`}
										className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
									>
										{title}
									</Link>
								</h3>

								<Link
									href={`/blog/${slug}`}
									className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 shrink-0"
									aria-label={`Read "${title}"`}
								>
									<span aria-hidden="true">→</span>
								</Link>
							</article>
						);
					})}
				</div>
			</section>
			{/* Skills Section */}
			<section className="mb-12">
				<h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
					Skills
				</h2>
				<Skills />
			</section>
			{/* Newsletter Section */}
			{siteMetadata.newsletter?.provider && (
				<div className="mt-12 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
					<h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
						Subscribe to my newsletter
					</h2>
					<p className="text-center mb-6 text-gray-600 dark:text-gray-300">
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
