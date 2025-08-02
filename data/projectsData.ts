interface Project {
	title: string;
	description: string;
	href?: string;
	imgSrc?: string;
	categories?: string[];
	featured?: boolean;
	isOpenSource?: boolean;
	repoUrl?: string;
}

const projectsData: Project[] = [
	{
		title: "adrianvillanueva.com",
		description: "This website.",
		imgSrc: "/static/images/logo.png",
		// href: "/blog/featured-project",
		categories: ["Web"],
		featured: true,
		isOpenSource: true,
		repoUrl: "https://github.com/adrianvillanueva997/adrianvillanueva.com",
	},
	{
		title: "Shinigami",
		featured: false,
		description:
			"Closed-source Telegram bot that automatically converts shared links into referral links. Tracks link performance in a database and visualizes real-time metrics via Grafana dashboards. Supports Amazon, Aliexpress, and other major stores",
		imgSrc: "/static/images/projects/shinigami.png",
		categories: ["Telegram", "Python", "Postgres", "Freelancing"],
		isOpenSource: false,
	},
	// {
	// 	title: "Machine Learning Implementation",
	// 	description:
	// 		"An exploration of machine learning algorithms and their applications.",
	// 	imgSrc: "/static/images/ml-project.jpg",
	// 	href: "/blog/ml-project",
	// 	categories: ["AI", "Machine Learning"],
	// 	isOpenSource: false,
	// },
	// {
	// 	title: "A Search Engine",
	// 	description: `What if you could look up any information in the world? Webpages, images, videos
	//   and more. Google has many features to help you find exactly what you're looking
	//   for.`,
	// 	imgSrc: "/static/images/google.png",
	// 	href: "https://www.google.com",
	// 	categories: [],
	// 	isOpenSource: false,
	// },
	// {
	// 	title: "The Time Machine",
	// 	description: `Imagine being able to travel back in time or to the future. Simple turn the knob
	//   to the desired date and press "Go". No more worrying about lost keys or
	//   forgotten headphones with this simple yet affordable solution.`,
	// 	imgSrc: "/static/images/time-machine.jpg",
	// 	href: "/blog/the-time-machine",
	// 	categories: [],
	// 	isOpenSource: true,
	// 	repoUrl: "https://github.com/yourusername/time-machine",
	// },
];

export default projectsData;
