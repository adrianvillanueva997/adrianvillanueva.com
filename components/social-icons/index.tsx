import {
	Bluesky,
	Facebook,
	Github,
	Instagram,
	Linkedin,
	Mail,
	Mastodon,
	Medium,
	Threads,
	Twitter,
	X,
	Youtube,
} from "./icons";

const RssSVG = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
		>
			<path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" />
			<path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z" />
			<circle cx="6" cy="18" r="2" />
		</svg>
	);
};

const components = {
	mail: Mail,
	github: Github,
	facebook: Facebook,
	youtube: Youtube,
	linkedin: Linkedin,
	twitter: Twitter,
	x: X,
	mastodon: Mastodon,
	threads: Threads,
	instagram: Instagram,
	medium: Medium,
	bluesky: Bluesky,
	rss: RssSVG,
};

type SocialIconProps = {
	kind: keyof typeof components;
	href: string | undefined;
	size?: number;
};

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
	if (
		!href ||
		(kind === "mail" &&
			!/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
	)
		return null;

	const SocialSvg = components[kind];

	return (
		<a
			className="text-sm text-gray-500 transition hover:text-gray-600"
			target="_blank"
			rel="noopener noreferrer"
			href={href}
		>
			<span className="sr-only">{kind}</span>
			<SocialSvg
				className={`hover:text-[#00ff99] fill-current text-gray-200 h-${size} w-${size} transition-colors duration-200`}
			/>
		</a>
	);
};

export default SocialIcon;
