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
	return (match?.[1] || "")
		.replace(/^<!\[CDATA\[|\]\]>$/g, "")
		.replace(/<[^>]+>/g, "")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.trim();
}

export function parseRss(xml: string): BlogPost[] {
	return Array.from(xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi))
		.map(([, item]) => ({
			title: tag(item, "title"),
			link: tag(item, "link"),
			description: tag(item, "description"),
			date: tag(item, "pubDate"),
		}))
		.filter((post) => post.title && post.link)
		.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function fetchRssPosts(url: string): Promise<BlogPost[]> {
	try {
		const response = await fetch(url, {
			headers: {
				Accept: "application/rss+xml, application/xml, text/xml",
				"User-Agent": "adrianvillanueva.com RSS reader",
			},
		});
		const xml = await response.text();
		return response.ok ? parseRss(xml) : [];
	} catch {
		return [];
	}
}
