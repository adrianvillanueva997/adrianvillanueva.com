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
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />
    </section>
  )
}
