import { baseUrl } from "app/sitemap";

export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/private/", "/api/", "/*.json$", "/*.xml$"],
				crawlDelay: 10,
			},
			{
				userAgent: "GPTBot",
				disallow: "/",
			},
			{
				userAgent: "CCBot",
				disallow: "/",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
