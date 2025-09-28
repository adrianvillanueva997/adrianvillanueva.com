"use client";

import { useEffect, useState } from "react";

// Simple brutalist theme indicator
const BrutalistIndicator = () => (
	<div className="flex items-center px-3 py-2 border-2 border-black bg-white hover:bg-red-500 hover:text-white transition-colors duration-200">
		<span className="text-xs font-mono font-black uppercase tracking-wider">
			DARK
		</span>
	</div>
);

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return null;
	}

	return null;
};

export default ThemeSwitch;
