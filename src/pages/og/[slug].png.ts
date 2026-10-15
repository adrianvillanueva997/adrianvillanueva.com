import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute, GetStaticPaths } from "astro";
import satori from "satori";

const pages: Record<string, { title: string; description: string }> = {
	index: {
		title: "Adrian Villanueva Martinez",
		description: "Software engineer · Data infrastructure & systems · Tokyo",
	},
	about: {
		title: "About",
		description: "Adrian Villanueva Martinez · Software engineer",
	},
	contact: {
		title: "Contact",
		description: "Get in touch with Adrian Villanueva Martinez",
	},
	now: {
		title: "Now",
		description: "What I’m learning, reading, and building",
	},
	projects: { title: "Work", description: "Systems, tools, and experiments" },
	resume: { title: "Résumé", description: "Experience, skills, and education" },
	writing: {
		title: "MetalOps",
		description: "Technical writing by Adrian Villanueva",
	},
	music: {
		title: "Music",
		description: "Albums, artists, and listening notes",
	},
	uses: { title: "Uses", description: "Hardware, software, and tools" },
};

export const getStaticPaths: GetStaticPaths = () =>
	Object.keys(pages).map((slug) => ({ params: { slug } }));

const fonts = Promise.all([
	readFile("src/assets/fonts/anton.ttf"),
	readFile("src/assets/fonts/ibm-plex-mono.ttf"),
]);

export const GET: APIRoute = async ({ params }) => {
	const page = pages[params.slug ?? ""];
	if (!page) return new Response("Not found", { status: 404 });
	const [display, mono] = await fonts;
	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					width: 1200,
					height: 630,
					display: "flex",
					flexDirection: "column",
					padding: "50px 65px",
					background: "#1b1915",
					color: "#eee1c4",
					borderBottom: "14px solid #a54e2e",
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								fontFamily: "Mono",
								fontSize: 21,
								color: "#d4a463",
								marginBottom: "auto",
							},
							children: "AVM / TOKYO, JAPAN",
						},
					},
					{
						type: "div",
						props: {
							style: {
								fontFamily: "Display",
								textTransform: "uppercase",
								fontSize: 105,
								lineHeight: 1.12,
								marginBottom: 22,
							},
							children: page.title,
						},
					},
					{
						type: "div",
						props: {
							style: {
								fontFamily: "Mono",
								fontSize: 22,
								color: "#c1b69f",
								marginBottom: "auto",
								lineHeight: 1.6,
							},
							children: page.description,
						},
					},
					{
						type: "div",
						props: {
							style: {
								fontFamily: "Mono",
								fontSize: 17,
								color: "#ad9e85",
								paddingTop: 25,
								borderTop: "1px solid #685740",
							},
							children: "adrianvillanueva.com",
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: "Display", data: display, weight: 400, style: "normal" },
				{ name: "Mono", data: mono, weight: 400, style: "normal" },
			],
		},
	);
	const png = new Resvg(svg).render().asPng();
	return new Response(new Uint8Array(png), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
