import { FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { socialLinks } from "../config/social";

const iconMap = {
	FaRss,
	FaGithub,
	FaLinkedin,
} as const;

export default function Footer() {
	return (
		<footer className="mb-16 animate-fade-in">
			<ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
				{socialLinks
					.filter(({ name }) => name !== "Email")
					.map(({ name, url, icon, external }) => {
						const Icon = iconMap[icon as keyof typeof iconMap];
						return (
							<li key={name}>
								<a
									href={url}
									className="group flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
									rel={external ? "noopener noreferrer" : undefined}
									target={external ? "_blank" : undefined}
									aria-label={`Visit ${name}`}
								>
									<Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
									<span className="ml-2 h-7 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all group-hover:after:w-full">
										{name}
									</span>
								</a>
							</li>
						);
					})}
			</ul>
			<div className="mt-8 space-y-2 text-neutral-600 dark:text-neutral-300">
				<p>
					© {new Date().getFullYear()} GNU GPLv3 Licensed •{" "}
					<a
						href="https://github.com/adrianvillanueva997/adrianvillanueva.com"
						className="hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						Source
					</a>
				</p>
				<p className="text-sm text-neutral-500 dark:text-neutral-400">
					Any and all opinions listed here are my own and not representative of
					any of my employers, past, future, and/or present.
				</p>
			</div>
		</footer>
	);
}
