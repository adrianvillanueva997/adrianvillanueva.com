import fs from "node:fs";
import path from "node:path";

type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
	categories?: string[]; // Optional categories array
};

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	const frontMatterBlock = match?.[1];

	const content = fileContent.replace(frontmatterRegex, "").trim();
	const frontMatterLines = (frontMatterBlock ?? "").trim().split("\n");
	const metadata: Partial<Metadata> = {};

	for (const line of frontMatterLines) {
		const [key, ...valueArr] = line.split(": ");
		const trimmedKey = key.trim() as keyof Metadata;
		let value = valueArr.join(": ").trim();
		value = value.replace(/^['"](.*)['"]$/, "$1");

		if (trimmedKey === "categories") {
			const categoriesValue = value.replace(/[\[\]'"`]/g, "");
			metadata[trimmedKey] = categoriesValue.split(",").map((cat) => cat.trim());
		} else {
			metadata[trimmedKey] = value;
		}
	}

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
	const rawContent = fs.readFileSync(filePath, "utf-8");
	return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
	const mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const readingTime = Math.ceil(words / wordsPerMinute);
	return readingTime;
}

export async function getBlogPosts() {
	const posts = getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
	return posts.map((post) => ({
		...post,
		metadata: {
			...post.metadata,
			readingTime: calculateReadingTime(post.content),
		},
	}));
}

export function formatDate(date: string, includeTime = false) {
	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	};

	return new Date(date).toLocaleDateString("en-GB", options);
}
