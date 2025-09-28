"use client";

import { useState } from "react";

interface AlertProps {
	type: "info" | "success" | "warning" | "error";
	title?: string;
	children: React.ReactNode;
	dismissible?: boolean;
}

export default function Alert({ type, title, children, dismissible = false }: AlertProps) {
	const [dismissed, setDismissed] = useState(false);

	if (dismissed) return null;

	const alertStyles = {
		info: {
			container: "border-blue-500 bg-blue-50",
			icon: "text-blue-500",
			title: "text-blue-700",
			text: "text-blue-800",
			iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
		},
		success: {
			container: "border-green-500 bg-green-50",
			icon: "text-green-500",
			title: "text-green-700",
			text: "text-green-800",
			iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
		},
		warning: {
			container: "border-yellow-500 bg-yellow-50",
			icon: "text-yellow-500",
			title: "text-yellow-700",
			text: "text-yellow-800",
			iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z",
		},
		error: {
			container: "border-red-500 bg-red-50",
			icon: "text-red-500",
			title: "text-red-700",
			text: "text-red-800",
			iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
		},
	};

	const style = alertStyles[type];

	return (
		<div className={`my-6 border-4 ${style.container} p-6 relative`}>
			<div className="flex items-start">
				{/* Icon */}
				<div className="flex-shrink-0">
					<svg
						className={`w-6 h-6 ${style.icon}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={3}
							d={style.iconPath}
						/>
					</svg>
				</div>

				{/* Content */}
				<div className="ml-4 flex-1">
					{title && (
						<h3 className={`font-mono text-sm font-black ${style.title} uppercase tracking-wide mb-2`}>
							{title}
						</h3>
					)}
					<div className={`text-sm ${style.text} leading-relaxed font-mono`}>
						{children}
					</div>
				</div>

				{/* Dismiss Button */}
				{dismissible && (
					<button
						type="button"
						onClick={() => setDismissed(true)}
						className={`ml-4 flex-shrink-0 p-1 border-2 border-current ${style.icon} hover:bg-current hover:text-white transition-all`}
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
}