interface Project {
	title: string;
	description: string;
	href?: string;
	imgSrc?: string;
	categories?: string[];
	featured?: boolean;
	isOpenSource?: boolean;
	repoUrl?: string; // URL to the source code repository
}

const projectsData: Project[] = [
	// {
	// 	title: "Your Featured Project",
	// 	description:
	// 		"This is your featured project that will be showcased at the top of the page.",
	// 	imgSrc: "/static/images/featured-project.jpg",
	// 	href: "/blog/featured-project",
	// 	categories: ["Web", "Frontend"],
	// 	featured: true,
	// 	isOpenSource: true,
	// 	repoUrl: "https://github.com/yourusername/featured-project",
	// },
	// {
	// 	title: "A Web Development Project",
	// 	description:
	// 		"This project demonstrates my skills in modern web development technologies.",
	// 	imgSrc: "/static/images/web-project.jpg",
	// 	href: "/blog/web-project",
	// 	categories: ["Web", "React"],
	// 	isOpenSource: true,
	// 	repoUrl: "https://github.com/yourusername/web-project",
	// },
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
