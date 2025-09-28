import "css/brutalist.css";
import "css/performance.css";
import "pliny/search/algolia.css";
import "remark-github-blockquote-alert/alert.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import siteMetadata from "@/data/siteMetadata";
import type { Metadata } from "next";
import { Archivo_Black, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Plausible } from "pliny/analytics";
import { type SearchConfig, SearchProvider } from "pliny/search";
import { ThemeProviders } from "./theme-providers";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
	weight: ["400", "700", "900"],
});

const jetbrains_mono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono",
});

const archivo_black = Archivo_Black({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading",
	weight: "400",
});

export const metadata: Metadata = {
	metadataBase: new URL(siteMetadata.siteUrl),
	title: {
		default: siteMetadata.title,
		template: `%s | ${siteMetadata.title}`,
	},
	description: siteMetadata.description,
	openGraph: {
		title: siteMetadata.title,
		description: siteMetadata.description,
		url: "./",
		siteName: siteMetadata.title,
		images: [siteMetadata.socialBanner],
		locale: "en_US",
		type: "website",
	},
	alternates: {
		canonical: "./",
		types: {
			"application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
		},
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: siteMetadata.title,
		card: "summary_large_image",
		images: [siteMetadata.socialBanner],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const basePath = process.env.BASE_PATH || "";
	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteMetadata.title,
		url: siteMetadata.siteUrl,
		potentialAction: {
			"@type": "SearchAction",
			target: `${siteMetadata.siteUrl}/search?q={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	};
	return (
		<html
			lang={siteMetadata.language}
			className={`${inter.variable} ${jetbrains_mono.variable} ${archivo_black.variable} scroll-smooth brutalist-theme`}
			suppressHydrationWarning
		>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href={`${basePath}/static/favicons/apple-touch-icon.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href={`${basePath}/static/favicons/favicon-32x32.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href={`${basePath}/static/favicons/favicon-16x16.png`}
			/>
			<link
				rel="manifest"
				href={`${basePath}/static/favicons/site.webmanifest`}
			/>
			<link
				rel="mask-icon"
				href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
				color="#5bbad5"
			/>
			<Script id="website-jsonld" type="application/ld+json" strategy="afterInteractive">
				{JSON.stringify(websiteSchema)}
			</Script>
			<meta name="msapplication-TileColor" content="#000000" />
			<meta name="theme-color" content="#000" />
			<link
				rel="alternate"
				type="application/rss+xml"
				href={`${basePath}/feed.xml`}
			/>
			<body className="dark bg-gray-950 pl-[calc(100vw-100%)] text-white antialiased">
				<ThemeProviders>
					<Plausible
						plausibleDataDomain={siteMetadata.analytics?.plausibleAnalytics?.plausibleDataDomain ?? ''}
						src={siteMetadata.analytics?.plausibleAnalytics?.src ?? 'https://analytics.thexiao77.com/js/script.js'}
					/>
					<SectionContainer>
						<SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
							<Header />
							<main className="mb-auto">{children}</main>
						</SearchProvider>
						<Footer />
					</SectionContainer>
				</ThemeProviders>
			</body>
		</html>
	);
}
