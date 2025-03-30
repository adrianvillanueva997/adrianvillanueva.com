/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
	title: "Adrian Villanueva Martinez | Software Engineer",
	author: "Adrian Villanueva Martinez",
	headerTitle: "Adrian Villanueva Martinez",
	description:
		"Personal website and technical blog of Adrian Villanueva Martinez. Projects, articles, and software engineering resources.",
	language: "en-us",
	theme: "system", // system, dark or light
	siteUrl: "https://adrianvillanueva.com",
	siteRepo: "https://github.com/adrianvillanueva997/adrianvillanueva.com",
	siteLogo: `${process.env.BASE_PATH || ""}/static/images/logo.png`,
	socialBanner: `${process.env.BASE_PATH || ""}/static/images/twitter-card.png`,
	// mastodon: 'https://mastodon.social/@mastodonuser',
	email: "adrian.villanueva.martinez@outlook.com",
	github: "https://github.com/adrianvillanueva997",
	// x: 'https://twitter.com/x',
	// twitter: 'https://twitter.com/Twitter',
	// facebook: 'https://facebook.com',
	// youtube: 'https://youtube.com',
	linkedin: "https://linkedin.com/in/adrian-villanueva-martinez",
	// threads: 'https://www.threads.net',
	// instagram: 'https://www.instagram.com',
	// medium: 'https://medium.com',
	// bluesky: 'https://bsky.app/',
	locale: "en-US",
	// set to true if you want a navbar fixed to the top
	stickyNav: false,
	analytics: {
		// If you want to use an analytics provider you have to add it to the
		// content security policy in the `next.config.js` file.
		// supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
		umamiAnalytics: {
			// We use an env variable for this site to avoid other users cloning our analytics ID
			umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
			// You may also need to overwrite the script if you're storing data in the US - ex:
			// src: 'https://us.umami.is/script.js'
			// Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
		},
		// plausibleAnalytics: {
		//   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
		// If you are hosting your own Plausible.
		//   src: '', // e.g. https://plausible.my-domain.com/js/script.js
		// },
		// simpleAnalytics: {},
		// posthogAnalytics: {
		//   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
		// },
		// googleAnalytics: {
		//   googleAnalyticsId: '', // e.g. G-XXXXXXX
		// },
	},
	newsletter: {
		// Temporarily disabled - set to empty string
		provider: "",
	},
	comments: {
		provider: "", // Set to empty string to disable
	},
	// RSS feed configuration
	rss: "/feed.xml",
	search: {
		provider: "kbar", // kbar or algolia
		kbarConfig: {
			searchDocumentsPath: `${process.env.BASE_PATH || ""}/search.json`, // path to load documents to search
		},
	},
};

module.exports = siteMetadata;
