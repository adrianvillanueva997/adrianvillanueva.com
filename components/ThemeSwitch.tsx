"use client";

import { useEffect, useState } from "react";

// Doom metal themed visual indicator
const DoomIndicator = () => (
	<div className="flex items-center space-x-2 text-[#ff3860] hover:text-[#00ff99] transition-colors duration-300">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="h-5 w-5 animate-pulse"
			aria-label="Dark mode active"
		>
			<title>Dark mode active</title>
			<path d="M17.293 13.293A8 8 0 716.707 2.707a8.001 8.001 0 1010.586 10.586z" />
		</svg>
		<span className="text-xs font-mono font-bold tracking-wider uppercase">
			VOID_MODE
		</span>
		<div className="w-2 h-2 bg-[#00ff99] rounded-full animate-ping" />
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
