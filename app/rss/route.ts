import { getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";

export async function GET() {
	const allBlogs = await getBlogPosts();

	const itemsXml = allBlogs
		.sort((a, b) => {
			if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
				return -1;
			}
			return 1;
		})
		.map(
			(post) =>
				`<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ""}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
          <guid>${baseUrl}/blog/${post.slug}</guid>
        </item>`,
		)
		.join("\n");

	const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Adrian Villanueva | Software Engineering Blog</title>
    <link>${baseUrl}</link>
    <description>Articles and insights about software engineering, web development, cloud technologies and system design by Adrian Villanueva. Exploring technical concepts, best practices, and industry insights.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

	return new Response(rssFeed, {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "s-maxage=3600, stale-while-revalidate",
		},
	});
}