import BlogLayout from "@/layouts/BlogLayout";
import { genPageMetadata } from "app/seo";
import { allBlogs } from "contentlayer/generated";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";

export const metadata = genPageMetadata({ title: "Blog" });

export default async function BlogPage() {
	const posts = allCoreContent(sortPosts(allBlogs));

	return (
		<BlogLayout
			posts={posts}
			title="NEURAL_ARCHIVE"
			description="Data streams from the silicon underground. Digital consciousness fragments encoded in neon."
		/>
	);
}
