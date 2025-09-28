"use client";

import { useEffect, useState } from "react";

// Brutalist theme indicator - shows current theme state
const BrutalistThemeIndicator = () => (
	<div className="flex items-center px-3 py-2 border-4 border-black bg-white hover:bg-red-500 hover:text-white transition-colors duration-200">
		<span className="text-xs font-mono font-black uppercase tracking-wider">
			LIGHT
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

	// For brutalist design, we're keeping it simple with just a light theme indicator
	// This can be expanded later if dark mode is needed
	return <BrutalistThemeIndicator />;
};

export default ThemeSwitch;
