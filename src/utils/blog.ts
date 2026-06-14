export interface BlogPost {
	title: string;
	pubDate?: string;
	description?: string;
}

let cachedPost: BlogPost | null | undefined;
let lastFetch = 0;
const CACHE_TTL = 60_000;

export async function getLatestBlogPost(): Promise<BlogPost | null> {
	if (cachedPost !== undefined && Date.now() - lastFetch < CACHE_TTL) {
		return cachedPost;
	}

	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 2000);
		const response = await fetch("https://metalops.dev/api/v1/blog/latest", {
			signal: controller.signal,
		});
		clearTimeout(timeout);
		if (!response.ok) throw new Error("Failed to fetch latest blog post");

		const data = await response.json();

		if (data && data.title) {
			cachedPost = {
				title: data.title,
				pubDate: data.pubDate,
				description: data.description,
			};
		}
	} catch (error) {
		console.error("Failed to fetch latest blog post:", error);
		cachedPost = null;
	}

	lastFetch = Date.now();
	return cachedPost;
}

export function formatDate(dateString: string): string {
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	} catch {
		return dateString;
	}
}
