import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import { astroImageTools } from 'astro-imagetools';
import { defineConfig } from 'astro/config';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://adrianvillanueva.com',
  integrations: [
    astroImageTools,
    tailwind(),
    compress(),
    sitemap(),
    robotsTxt(),
  ],
});
