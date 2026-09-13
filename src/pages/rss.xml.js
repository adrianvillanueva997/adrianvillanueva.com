import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { fetchRssPosts } from "../utils/rss";

export async function GET(context) {
	const posts = await fetchRssPosts("https://metalops.dev/rss.xml");

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: post.date ? new Date(post.date) : undefined,
			link: post.link,
		})),
	});
}
