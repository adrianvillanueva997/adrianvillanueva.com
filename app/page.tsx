import { BlogPosts } from "app/components/posts";
import { Skills } from "./components/Skills";
import { getResumeData } from "./utils/resume";

export default async function Page() {
	const resume = await getResumeData();
	const flattenedSkills = Object.values(resume.skills).flat();

	return (
		<section className="space-y-12 animate-fade-in">
			<div className="space-y-4">
				<h1
					className="text-4xl font-bold tracking-tight bg-clip-text text-transparent
          bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600
          dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400
          animate-gradient-x"
				>
					Adrian Villanueva Martinez
				</h1>
				<h2 className="text-xl text-neutral-800 dark:text-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-3">
					Senior Software Engineer
					<span
						className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-neutral-100
            dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700
            transition-colors duration-200 whitespace-nowrap"
					>
						🇪🇸 → 🇯🇵 Japan
					</span>
				</h2>
			</div>

			<div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
				<p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
					I'm a Software Engineer passionate about data engineering, cloud
					architecture, systems design and technical writing.
				</p>
				<p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
					I enjoy experimenting with new technologies and finding creative ways
					to combine them to create cool solutions. This is my personal space on
					the internet to share my thoughts and technical writings.
				</p>
			</div>

			<div className="space-y-6">
				<h3
					className="text-2xl font-medium text-neutral-900 dark:text-neutral-100
          border-b border-neutral-200 dark:border-neutral-800 pb-2"
				>
					Recent Posts
				</h3>
				<BlogPosts limit={5} showSummary={true} />
			</div>

			<div className="space-y-6">
				<h3
					className="text-2xl font-medium text-neutral-900 dark:text-neutral-100
          border-b border-neutral-200 dark:border-neutral-800 pb-2"
				>
					Technical Skills
				</h3>
				<Skills skills={flattenedSkills} />
			</div>
		</section>
	);
}
