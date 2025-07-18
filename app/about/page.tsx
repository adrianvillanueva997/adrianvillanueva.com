import { genPageMetadata } from "app/seo";
import { type Authors, allAuthors } from "contentlayer/generated";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import { coreContent } from "pliny/utils/contentlayer";
import AuthorLayout from "@/layouts/AuthorLayout";

export const metadata = genPageMetadata({ title: "About" });

export default function Page() {
	const author = allAuthors.find((p) => p.slug === "default") as Authors;
	const mainContent = coreContent(author);

	return (
		<AuthorLayout content={mainContent}>
			<MDXLayoutRenderer code={author.body.code} />
		</AuthorLayout>
	);
}
