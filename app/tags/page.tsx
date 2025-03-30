import { genPageMetadata } from "app/seo";
import tagData from "app/tag-data.json";
import { allBlogs } from "contentlayer/generated";
import { allCoreContent } from "pliny/utils/contentlayer";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import TagGraph from "@/components/TagGraph";

export const metadata = genPageMetadata({ title: "Tags" });

export default async function Page() {
	const sortedTags = Object.keys(tagData).sort(
		(a, b) => tagData[b] - tagData[a],
	);
	const posts = allCoreContent(allBlogs);

	return (
		<>
			<div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
				<div className="space-x-2 pb-8 pt-6 md:space-y-5">
					<h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
						Tags
					</h1>
				</div>
				<div className="flex max-w-lg flex-wrap">
					{!sortedTags.length && "No tags found."}
					{sortedTags.map((t) => {
						return (
							<div key={t} className="mb-2 mr-5 mt-2">
								<Tag text={t} />
								<Link
									href={`/tags/${t}`}
									className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
									aria-label={`View posts tagged ${t}`}
								>
									{` (${tagData[t]})`}
								</Link>
							</div>
						);
					})}
				</div>
			</div>

			{/* Add the knowledge graph component */}
			<TagGraph posts={posts} />

			<div className="mt-4 text-sm text-gray-500">
				<p>
					<strong>How to use:</strong> Drag nodes to rearrange, scroll to zoom,
					click a tag to explore related content.
				</p>
			</div>
		</>
	);
}
