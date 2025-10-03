// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import tailwindcss from '@tailwindcss/vite';
import d2 from 'astro-d2';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
	site: 'https://adrianvillanueva.com',
	integrations: [
		expressiveCode(),
		mdx(),
		sitemap(),
		d2({ output: "diagrams" }),
		robotsTxt(),
		icon()
	],
	vite: {
		plugins: [tailwindcss(), pluginLineNumbers()],
	}
});