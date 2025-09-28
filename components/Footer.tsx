"use client";

import SocialIcon from "@/components/social-icons";
import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";

export default function Footer() {
	const handleScrollToTop = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "auto" });
	};

	return (
		<footer className="py-8 px-4 border-t-4 border-black bg-white">
			{/* Social Icons */}
			<div className="flex justify-center space-x-6 mb-6">
				<SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
				<SocialIcon kind="github" href={siteMetadata.github} size={5} />
				<SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
				<SocialIcon kind="rss" href={siteMetadata.rss} size={5} />
			</div>

			{/* Disclaimer */}
			<div className="text-center text-sm text-black mb-4 max-w-2xl mx-auto font-mono">
				<span className="text-red-500 font-bold uppercase">Disclaimer:</span> Any and all opinions listed here are my own and not representative of any of my employers, past, future, and/or present.
			</div>

			{/* Human Written Badge */}
			<div className="flex justify-center mb-6">
				<Link
					href="https://notbyai.fyi/"
					className="inline-flex items-center text-black hover:text-red-500 font-mono font-bold uppercase border-2 border-black px-4 py-2 hover:border-red-500 transition-colors duration-200"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="/static/images/footer/Written-By-a-Human-Not-By-AI-Badge-black.svg"
						alt="Written by Human, Not by AI"
						className="h-6 w-auto mr-3"
					/>
				</Link>
			</div>

			{/* Copyright */}
			<div className="text-center text-black font-mono font-bold text-sm mb-4">
				© {new Date().getFullYear()} {siteMetadata.author}
			</div>

			{/* Simple Links */}
			<div className="flex justify-center space-x-4 text-sm">
				<Link
					href={siteMetadata.siteRepo}
					className="text-black hover:text-red-500 font-mono font-bold uppercase transition-colors duration-200"
					target="_blank"
				>
					Source
				</Link>
				<button
					type="button"
					onClick={handleScrollToTop}
					className="text-black hover:text-red-500 font-mono font-bold uppercase transition-colors duration-200"
				>
					↑ Top
				</button>
			</div>
		</footer>
	);
}
