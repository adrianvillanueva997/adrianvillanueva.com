import { BlogPosts } from "app/components/posts";

export const metadata = {
	title: "Adrian Villanueva | Blog - Software Engineering & Web Development",
	description:
		"Explore articles about software engineering, web development, JavaScript, React, and cloud technologies. Deep dives into technical concepts, best practices, and industry insights.",
	alternates: {
		canonical: "https://adrianvillanueva.com/blog",
	},
	openGraph: {
		title: "Adrian Villanueva | Blog - Software Engineering & Web Development",
		description:
			"Explore articles about software engineering, web development, JavaScript, React, and cloud technologies.",
		type: "website",
		locale: "en_US",
	},
};

export default function Page() {
  return (
			<section className="space-y-8 animate-fade-in">
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h1
							className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent
          bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600
          dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400"
						>
							Blog
						</h1>
					</div>
					<p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
						Thoughts and reasonings about many different topics, software
						development, system design, self-hosting, gaming, etc.
					</p>
				</div>

				<div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
					<BlogPosts showSummary={true} />
				</div>
			</section>
		);
}
