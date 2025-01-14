import { ImageResponse } from "next/og";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const title =
		url.searchParams.get("title") || "Adrian Villanueva | Software Engineering";

	return new ImageResponse(
		<div tw="flex flex-col w-full h-full bg-neutral-50">
			{/* Container */}
			<div tw="flex flex-col w-full h-full items-center justify-center px-16 py-12">
				{/* Content */}
				<div tw="flex flex-col">
					<h1 tw="text-6xl font-bold tracking-tight text-neutral-900 text-left max-w-4xl">
						{title}
					</h1>
					<p tw="mt-4 text-2xl text-neutral-600">adrianvillanueva.com</p>
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Inter",
					data: await fetch(
						"https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
					).then((res) => res.arrayBuffer()),
					weight: 400,
					style: "normal",
				},
			],
		},
	);
}
