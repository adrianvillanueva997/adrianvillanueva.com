import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { loadWriting } from "../utils/writing";

export async function GET(context) {
	const posts = await loadWriting();

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
