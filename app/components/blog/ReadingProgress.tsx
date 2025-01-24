"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			const scrolled = window.scrollY;
			const height = document.documentElement.scrollHeight - window.innerHeight;
			const progress = (scrolled / height) * 100;
			setProgress(progress);
		};

		window.addEventListener("scroll", updateProgress);
		return () => window.removeEventListener("scroll", updateProgress);
	}, []);

	return (
		<div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-800 z-50">
			<div
				className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}