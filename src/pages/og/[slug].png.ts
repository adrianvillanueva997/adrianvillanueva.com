import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute, GetStaticPaths } from "astro";
import type { ReactNode } from "react";
import satori from "satori";

interface OGSettings {
	title: string;
	description?: string;
}

const OG_PAGES: Record<string, OGSettings> = {
	index: {
		title: "Adrian Villanueva Martinez",
		description: "Senior Software Engineer",
	},
	about: {
		title: "About",
		description: "Adrian Villanueva Martinez",
	},
	contact: {
		title: "Contact",
		description: "Get in touch",
	},
	now: {
		title: "Now",
		description: "What I'm doing right now",
	},
	projects: {
		title: "Projects",
		description: "Things I've built",
	},
	resume: {
		title: "Resume",
		description: "Download my CV",
	},
};

export const getStaticPaths: GetStaticPaths = async () => {
	return Object.keys(OG_PAGES).map((slug) => ({ params: { slug } }));
};

const FONT_CACHE = path.join(process.cwd(), "node_modules", ".og-font-cache");

async function loadFont(name: string, weight: number): Promise<ArrayBuffer> {
	const cacheKey = name.replace(/\s+/g, "_") + "-" + weight;
	const cacheFile = path.join(FONT_CACHE, cacheKey);

	if (existsSync(cacheFile)) {
		return readFile(cacheFile);
	}

	const family = name.replace(/\s+/g, "+");
	const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`;
	const css = await fetch(url).then((r) => r.text());
	const match = css.match(/url\(([^)]+)\)/);
	if (!match) throw new Error(`Could not resolve font URL for ${name}`);
	const data = await fetch(match[1]).then((r) => r.arrayBuffer());

	await mkdir(FONT_CACHE, { recursive: true });
	await writeFile(cacheFile, Buffer.from(data));

	return data;
}

async function getFonts() {
	const [jetBrainsMono, cinzel] = await Promise.all([
		loadFont("JetBrains Mono", 700),
		loadFont("Cinzel", 700),
	]);
	return { jetBrainsMono, cinzel };
}

export const GET: APIRoute = async ({ params }) => {
	const { slug } = params;
	const page = OG_PAGES[slug ?? ""];
	if (!page) return new Response("Not Found", { status: 404 });

	const fonts = await getFonts();

	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					width: 1200,
					height: 630,
					background: "#08090a",
					display: "flex",
					flexDirection: "column" as const,
					padding: "60px 80px",
					position: "relative" as const,
					overflow: "hidden",
				},
				children: [
					// Top gradient bar
					{
						type: "div",
						props: {
							style: {
								position: "absolute" as const,
								top: 0,
								left: 0,
								right: 0,
								height: 4,
								background: "linear-gradient(90deg, #00e68a, #00b8d4, #00e68a)",
							},
						},
					},
					// AVM/ monogram
					{
						type: "div",
						props: {
							style: {
								fontFamily: '"JetBrains Mono"',
								fontSize: 24,
								fontWeight: 700,
								color: "#00e68a",
								marginBottom: "auto",
							},
							children: "AVM/",
						},
					},
					// Page title
					{
						type: "div",
						props: {
							style: {
								fontFamily: '"Cinzel"',
								fontSize: 72,
								fontWeight: 700,
								color: "#ffffff",
								lineHeight: 1.1,
								marginBottom: 16,
							},
							children: page.title,
						},
					},
					// Description
					page.description
						? {
								type: "div",
								props: {
									style: {
										fontFamily: '"JetBrains Mono"',
										fontSize: 28,
										color: "#8892a4",
									},
									children: page.description,
								},
							}
						: null,
					// Bottom: domain
					{
						type: "div",
						props: {
							style: {
								fontFamily: '"JetBrains Mono"',
								fontSize: 18,
								color: "#4a5568",
								marginTop: "auto",
							},
							children: "adrianvillanueva.com",
						},
					},
				].filter(Boolean),
			},
		} as unknown as ReactNode,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "JetBrains Mono",
					data: fonts.jetBrainsMono,
					weight: 700,
					style: "normal",
				},
				{ name: "Cinzel", data: fonts.cinzel, weight: 700, style: "normal" },
			],
		},
	);

	const resvg = new Resvg(svg, {
		fitTo: { mode: "width", value: 1200 },
	});
	const png = resvg.render().asPng();

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Content-Length": png.length.toString(),
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
