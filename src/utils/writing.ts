import snapshot from "../data/metalops.json" with { type: "json" };
import { type BlogPost, fetchRssPosts } from "./rss.ts";

export const METALOPS_URL = "https://metalops.dev";
export const METALOPS_RSS = `${METALOPS_URL}/rss.xml`;
let writing: Promise<BlogPost[]> | undefined;

// One build-time request shared by the homepage, indexes, and RSS; never a browser dependency.
export function loadWriting(): Promise<BlogPost[]> {
	if (!writing) {
		writing = fetchRssPosts(METALOPS_RSS).then((posts) => {
			const published = posts.filter(
				(post) =>
					post.date &&
					post.description &&
					new URL(post.link).origin === METALOPS_URL,
			);
			if (published.length) return published;
			console.warn(
				"MetalOps RSS unavailable or invalid; using the checked-in article snapshot.",
			);
			return snapshot;
		});
	}
	return writing;
}

export function formatPostDate(date: string): string {
	return date
		? new Intl.DateTimeFormat("en-GB", {
				day: "numeric",
				month: "short",
				year: "numeric",
				timeZone: "UTC",
			}).format(new Date(date))
		: "Undated";
}
