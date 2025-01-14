import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import "./global.css";
import { baseUrl } from "./sitemap";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
	preload: true,
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Adrian Villanueva | Software Engineer",
		template: "%s | Adrian Villanueva",
	},
	description:
		"Software Engineer specializing in web development, cloud architecture, and system design. Discover technical articles, engineering projects, and professional insights.",
	keywords: [
		"software engineer",
		"full stack developer",
		"rust",
		"python",
		"data engineer",
		"traveling",
		"cloud architect",
		"node.js",
		"aws",
		"system design",
		"technical blog",
	],
	openGraph: {
		title: "Adrian Villanueva | Software Engineer",
		description:
			"Software Engineer specializing in web development, cloud architecture, and system design. Discover technical articles, engineering projects, and professional insights.",
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
				"scroll-smooth",
				"selection:bg-neutral-200 selection:dark:bg-neutral-800",
				"text-black bg-white dark:text-white dark:bg-black",
				inter.variable,
			)}
		>
			<body className="antialiased min-h-screen flex flex-col">
				<div className="fixed inset-0 grid grid-cols-[1fr,min(640px,100%),1fr] pointer-events-none">
					<div className="border-r border-neutral-100 dark:border-neutral-900" />
					<div className="border-x border-neutral-100 dark:border-neutral-900" />
					<div className="border-l border-neutral-100 dark:border-neutral-900" />
				</div>

				<div className="px-4 flex-grow max-w-2xl mx-auto w-full relative">
					<main className="flex-auto min-w-0 mt-6 flex flex-col gap-16 px-2 md:px-0">
						<Navbar />
						<div className="animate-fade-in">{children}</div>
						<Footer />
					</main>
				</div>
				<SpeedInsights />
			</body>
		</html>
	);
}
