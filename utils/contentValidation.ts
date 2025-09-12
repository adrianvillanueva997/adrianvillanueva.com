/**
 * Content validation utilities for MDX files
 */

import { z } from "zod";
import sanitizeHtml from "sanitize-html";
// Schema for Now page frontmatter
export const nowPageSchema = z.object({
	title: z.string().min(1, "Title is required"),
	lastUpdated: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "Invalid date format for lastUpdated",
	}),
});

// Schema for blog post frontmatter
export const blogPostSchema = z.object({
	title: z.string().min(1, "Title is required"),
	date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
	tags: z.array(z.string()).optional(),
	draft: z.boolean().optional(),
	summary: z.string().optional(),
	images: z.array(z.string()).optional(),
	authors: z.array(z.string()).optional(),
	layout: z.string().optional(),
	bibliography: z.string().optional(),
	canonicalUrl: z.string().url().optional(),
});

// Validate content function
export function validateContent(content: unknown, schema: z.ZodSchema) {
	try {
		return schema.parse(content);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error("Content validation failed:", error.errors);
			return null;
		}
		throw error;
	}
}

// Content sanitization
export function sanitizeContent(content: string): string {
	// Use a well-tested library to sanitize HTML and remove harmful markup
	return sanitizeHtml(content);
}

// Check if content is safe to render
export function isContentSafe(content: string): boolean {
	const dangerousPatterns = [
		/<script/i,
		/javascript:/i,
		/on\w+\s*=/i,
		/<iframe/i,
		/<object/i,
		/<embed/i,
		/data:.*base64/i,
	];

	return !dangerousPatterns.some((pattern) => pattern.test(content));
}

export type NowPageData = z.infer<typeof nowPageSchema>;
export type BlogPostData = z.infer<typeof blogPostSchema>;
