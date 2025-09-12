"use client";

import { useEffect, useState } from "react";

// Doom metal themed visual indicator
const DoomIndicator = () => (
	<div className="group flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-700/50 hover:border-[#ff3860]/60 transition-all duration-300 hover:shadow-sm hover:shadow-[#ff3860]/20">
		<div className="flex items-center space-x-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="h-4 w-4 text-[#ff3860] group-hover:text-[#00ff99] transition-all duration-300 animate-pulse group-hover:animate-none group-hover:scale-110"
				aria-label="Dark mode active"
				role="img"
			>
				<path d="M17.293 13.293A8 8 0 716.707 2.707a8.001 8.001 0 1010.586 10.586z" />
			</svg>
			<span className="hidden sm:block text-xs font-mono font-bold tracking-wider uppercase text-[#ff3860] group-hover:text-[#00ff99] transition-colors duration-300">
				VOID_MODE
			</span>
			<div className="w-1.5 h-1.5 bg-[#00ff99] rounded-full animate-ping group-hover:animate-pulse" />
		</div>
	</div>
);

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <div className="h-6 w-20" />; // Placeholder while mounting
	}

	return <DoomIndicator />;
};

export default ThemeSwitch;
