import siteMetadata from "@/data/siteMetadata";
import { allBlogs, allNows } from "contentlayer/generated";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUrl = siteMetadata.siteUrl;

	const blogRoutes = allBlogs
		.filter((post) => !post.draft)
		.map((post) => ({
			url: `${siteUrl}/${post.path}`,
			lastModified: post.lastmod || post.date,
		}));

	// Add now page route
	const nowRoutes = allNows.map((now) => ({
		url: `${siteUrl}/now`,
		lastModified: now.lastUpdated,
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	const routes = [
		"",
		"blog",
		"projects",
		"tags",
		"contact",
		"resume",
		"about",
	].map((route) => ({
		url: `${siteUrl}/${route}`,
		lastModified: new Date().toISOString().split("T")[0],
		changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
		priority: route === "" ? 1.0 : 0.7,
	}));

	return [...routes, ...nowRoutes, ...blogRoutes];
}
