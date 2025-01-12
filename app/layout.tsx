import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import "./global.css";
import { baseUrl } from "./sitemap";

const inter = Inter({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Adrian Villanueva | Software Engineer",
		template: "%s | Adrian Villanueva - Engineering Portfolio",
	},
	description:
		"Software Engineer specializing in web development, cloud architecture, and system design. Discover technical articles, engineering projects, and professional insights.",
	keywords: [
		"software engineer",
		"web development",
		"cloud architecture",
		"system design",
		"technical blog",
		"engineering portfolio",
	],
	openGraph: {
		title: "Adrian Villanueva | Software Engineering Portfolio",
		description:
			"Software Engineer specializing in web development, cloud architecture, and system design. Discover technical articles and engineering projects.",
		url: baseUrl,
		siteName: "Adrian Villanueva",
		locale: "en_US",
		type: "website",
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
	alternates: {
		canonical: baseUrl,
	},
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	manifest: "/site.webmanifest",
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={cx(
				"text-black bg-white dark:text-white dark:bg-black",
				inter.variable,
			)}
		>
			<body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
				<main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
					<Navbar />
					{children}
					<Footer />
					<SpeedInsights />
				</main>
			</body>
		</html>
	);
}
