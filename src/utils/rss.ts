export interface BlogPost {
	title: string;
	link: string;
	description: string;
	date: string;
}

function tag(item: string, name: string): string {
	const match = item.match(
		new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"),
	);
	let value = (match?.[1] || "")
		.replace(/^<!\[CDATA\[|\]\]>$/g, "")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&amp;/g, "&");

	let previous: string;
	do {
		previous = value;
		value = value.replace(/<[^>]+>/g, "");
	} while (value !== previous);

	return value.trim();
}

export function parseRss(xml: string): BlogPost[] {
	return Array.from(xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi))
		.map(([, item]) => ({
			title: tag(item, "title"),
			link: tag(item, "link"),
			description: tag(item, "description"),
			date: validDate(tag(item, "pubDate")),
		}))
		.filter((post) => post.title && safeLink(post.link))
		.sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
}

function safeLink(link: string): boolean {
	try {
		return ["http:", "https:"].includes(new URL(link).protocol);
	} catch {
		return false;
	}
}

function validDate(value: string): string {
	const time = Date.parse(value);
	return Number.isFinite(time) ? new Date(time).toISOString() : "";
}

export async function fetchRssPosts(url: string): Promise<BlogPost[]> {
	try {
		const response = await fetch(url, {
			signal: AbortSignal.timeout(8000),
			headers: {
				Accept: "application/rss+xml, application/xml, text/xml",
				"User-Agent": "adrianvillanueva.com RSS reader",
			},
		});
		if (!response.ok) return [];
		return parseRss(await response.text());
	} catch {
		return [];
	}
}
