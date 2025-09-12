"use client";

import siteMetadata from "@/data/siteMetadata";
import { useEffect, useState } from "react";

const ScrollTopAndComment = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleWindowScroll = () => {
			if (window.scrollY > 50) setShow(true);
			else setShow(false);
		};

		window.addEventListener("scroll", handleWindowScroll);
		return () => window.removeEventListener("scroll", handleWindowScroll);
	}, []);

	const handleScrollTop = () => {
		window.scrollTo({ top: 0 });
	};
	const handleScrollToComment = () => {
		document.getElementById("comment")?.scrollIntoView();
	};
	return (
		<div
			className={`fixed right-8 bottom-8 hidden flex-col gap-3 z-50 ${show ? "md:flex" : "md:hidden"}`}
		>
			{siteMetadata.comments?.provider && (
				<button
					aria-label="Scroll To Comment"
					onClick={handleScrollToComment}
					className="group rounded-full bg-gray-800 border border-[#00ff99] p-3 text-[#00ff99] transition-all duration-300 hover:bg-gray-700 hover:border-[#ff3860] hover:text-[#ff3860] hover:shadow-lg hover:shadow-[#ff3860]/20 hover:scale-110"
				>
					<svg className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fillRule="evenodd"
							d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			)}
			<button
				aria-label="Scroll To Top"
				onClick={handleScrollTop}
				className="group rounded-full bg-gray-800 border border-[#ff3860] p-3 text-[#ff3860] transition-all duration-300 hover:bg-gray-700 hover:border-[#00ff99] hover:text-[#00ff99] hover:shadow-lg hover:shadow-[#00ff99]/20 hover:scale-110"
			>
				<svg className="h-5 w-5 transition-transform group-hover:-translate-y-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						fillRule="evenodd"
						d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
};

export default ScrollTopAndComment;
