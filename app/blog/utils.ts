import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

interface BlogPost {
	slug: string;
	metadata: {
		readingTime: number;
		title: string;
		publishedAt: string;
		summary: string;
		image?: string;
		categories?: string[];
		draft: boolean;
	};
	content: string;
}

function parseFrontmatter(
	fileContent: string,
): Pick<BlogPost, "metadata" | "content"> {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	const frontMatterBlock = match?.[1];

	if (!frontMatterBlock) {
		throw new Error("No frontmatter found");
	}

	const content = fileContent.replace(frontmatterRegex, "").trim();
	const frontMatterLines = frontMatterBlock.trim().split("\n");
	const metadata: Partial<BlogPost["metadata"]> = {};

	for (const line of frontMatterLines) {
		const [key, ...valueArr] = line.split(": ");
		const trimmedKey = key.trim();
		let value = valueArr.join(": ").trim();
		value = value.replace(/^['"](.*)['"]$/, "$1");

		switch (trimmedKey) {
			case "categories": {
				const categoriesValue = value.replace(/[\[\]'"`]/g, "");
				metadata.categories = categoriesValue
					.split(",")
					.map((cat) => cat.trim());
				break;
			}
			case "draft":
				metadata.draft = value.toLowerCase() === "true";
				break;
			default:
				(metadata as Metadata)[trimmedKey] = value;
		}
	}

	return {
		metadata: metadata as BlogPost["metadata"],
		content,
	};
}

function getMDXFiles(dir: string): string[] {
	try {
		return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
	} catch (error) {
		console.error(`Error reading directory: ${error}`);
		return [];
	}
}

function readMDXFile(filePath: string): Pick<BlogPost, "metadata" | "content"> {
	try {
		const rawContent = fs.readFileSync(filePath, "utf-8");
		return parseFrontmatter(rawContent);
	} catch (error) {
		throw new Error(`Error reading file ${filePath}: ${error}`);
	}
}

export function getBlogPosts(): BlogPost[] {
	const postsDirectory = path.join(process.cwd(), "app/blog/posts");
	const mdxFiles = getMDXFiles(postsDirectory);

	const posts = mdxFiles.map((file): BlogPost => {
		const { metadata, content } = readMDXFile(path.join(postsDirectory, file));
		const slug = path.basename(file, path.extname(file));

		return {
			slug,
			metadata: {
				...metadata,
				draft: metadata.draft ?? false,
				readingTime: calculateReadingTime(content),
			},
			content,
		};
	});

	if (process.env.NODE_ENV === "production") {
		return posts.filter((post) => !post.metadata.draft);
	}

	return posts.sort(
		(a, b) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime(),
	);
}

function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

export function formatDate(
	date: string,
	format: "long" | "short" = "long",
): string {
	const dateObj = new Date(date);

	return dateObj.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		timeZone: "UTC",
	});
}

// Usage:
// formatDate('2024-01-15') // Returns: "15/01/2024"
// formatDate('2024-01-15', 'short') // Returns: "15/01/2024"
