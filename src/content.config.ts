import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				// New fields (preferred)
				date: z.coerce.date().optional(),
				summary: z.string().optional(),
				// Legacy fields for backwards compatibility
				description: z.string().optional(),
				pubDate: z.coerce.date().optional(),
				// Other fields
				tags: z.array(z.string()).optional(),
				draft: z.boolean().optional().default(false),
				updatedDate: z.coerce.date().optional(),
				heroImage: image().optional(),
			})
			.refine((data) => data.date || data.pubDate, {
				message: "Either 'date' or 'pubDate' must be provided",
			})
			.refine((data) => data.summary || data.description, {
				message: "Either 'summary' or 'description' must be provided",
			}),
});

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

export const collections = { blog, pages };
