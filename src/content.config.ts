import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
	// Load Markdown files for static pages like about, now, etc.
	loader: glob({ base: "./src/content", pattern: "*.md" }),
	schema: z.object({
		name: z.string().optional(),
		avatar: z.string().optional(),
		occupation: z.string().optional(),
		email: z.string().optional(),
		linkedin: z.string().optional(),
		github: z.string().optional(),
	}),
});

export const collections = { pages };
