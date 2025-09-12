"use client";

import SocialIcon from "@/components/social-icons";
import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";

export default function Footer() {
	const handleScrollToTop = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="py-6 md:py-8 px-4 flex flex-col items-center text-center border-t border-gray-800/50 bg-black/40 relative overflow-hidden">
			{/* Cyber-doom background effects */}
			<div className="absolute inset-0 synthwave-grid opacity-5" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

			{/* Terminal indicator */}
			<div className="relative z-10 font-mono text-xs text-gray-500 mb-4 font-bold">
				<span className="text-orange-400">▲</span> TERMINAL_FOOTER <span className="text-orange-400">▲</span>
			</div>

			{/* Social Icons */}
			<div className="relative z-10 flex space-x-4 md:space-x-5 mb-4 md:mb-6 bg-black/60 border border-gray-800/50 rounded-lg px-6 py-3 shadow-lg">
				<SocialIcon
					kind="mail"
					href={`mailto:${siteMetadata.email}`}
					size={4}
				/>
				<SocialIcon
					kind="github"
					href={siteMetadata.github}
					size={4}
				/>
				<SocialIcon
					kind="linkedin"
					href={siteMetadata.linkedin}
					size={4}
				/>
				<SocialIcon
					kind="rss"
					href={siteMetadata.rss}
					size={4}
					aria-label="RSS Feed"
				/>
			</div>

			{/* Legal Text */}
			<div className="relative z-10 text-xs md:text-sm text-gray-400 mb-3 md:mb-4 max-w-2xl px-2 font-mono leading-relaxed bg-black/40 border border-gray-800/30 rounded p-4">
				<span className="text-orange-400">◉ DISCLAIMER:</span> Any and all opinions listed here are my own and not representative of
				any of my employers, past, future, and/or present.
			</div>

			{/* Copyright and Links */}
			<div className="relative z-10 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs md:text-sm">
				<div className="flex items-center text-gray-300 font-mono font-medium bg-black/60 border border-gray-800/50 rounded px-4 py-2">
					<span className="text-orange-400">▲</span>
					<span className="mx-2">© {new Date().getFullYear()}</span>
					<span className="mx-2 text-[#ff3860] animate-pulse">•</span>
					<span>{siteMetadata.author}</span>
					<span className="ml-2 text-orange-400">▲</span>
				</div>

				<Link
					href={siteMetadata.siteRepo}
					className="inline-flex items-center text-gray-400 hover:text-[#00ff99] transition duration-150 ease-in-out font-mono bg-black/60 border border-gray-800/50 rounded px-3 py-2 hover:border-[#00ff99]/50 shadow-lg"
					target="_blank"
					rel="noopener noreferrer"
				>
					<svg
						className="h-3 w-3 md:h-4 md:w-4 mr-1"
						fill="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clipRule="evenodd"
						/>
					</svg>
					◉ Source Matrix
				</Link>

				<button
					type="button"
					onClick={handleScrollToTop}
					className="inline-flex items-center text-gray-400 hover:text-[#ff3860] transition duration-150 ease-in-out bg-black/60 border border-gray-800/50 rounded px-3 py-2 hover:border-[#ff3860]/50 shadow-lg cursor-pointer font-mono"
				>
					▲ Return to Nexus
					<svg
						className="ml-1 h-3 w-3 md:h-4 md:w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 10l7-7m0 0l7 7m-7-7v18"
						/>
					</svg>
				</button>
			</div>
		</footer>
	);
}
