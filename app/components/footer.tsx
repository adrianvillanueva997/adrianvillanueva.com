import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siGithub, siRss } from "simple-icons";

export default function Footer() {
	return (
		<footer className="mb-16">
			<ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
				<li>
					<a
						className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
						rel="noopener noreferrer"
						target="_blank"
						href="/rss"
					>
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							role="img"
							viewBox="0 0 24 24"
							className="h-4 w-4"
							fill="currentColor"
						>
							<path d={siRss.path} />
						</svg>
						<p className="ml-2 h-7">rss</p>
					</a>
				</li>
				<li>
					<a
						className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/adrianvillanueva997"
					>
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							role="img"
							viewBox="0 0 24 24"
							className="h-4 w-4"
							fill="currentColor"
						>
							<path d={siGithub.path} />
						</svg>
						<p className="ml-2 h-7">GitHub</p>
					</a>
				</li>
				<li>
					<a
						className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
						rel="noopener noreferrer"
						target="_blank"
						href="https://www.linkedin.com/in/adrian-villanueva-martinez/"
					>
						<FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
						<p className="ml-2 h-7">LinkedIn</p>
					</a>
				</li>
			</ul>
			<p className="mt-8 text-neutral-600 dark:text-neutral-300">
				© {new Date().getFullYear()} GNU GPLv3 Licensed
			</p>
		</footer>
	);
}
