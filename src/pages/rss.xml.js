import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('blog', ({ data }) => {
		// Only include published posts in RSS feed
		return data.draft !== true;
	});
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
