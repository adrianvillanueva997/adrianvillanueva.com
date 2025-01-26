"use client";

import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	oneDark,
	oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
	children: string;
	language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div className="relative group my-8">
			{language && (
				<div
					className="absolute -top-3 right-12 z-10 px-3 py-1 text-xs font-mono
          rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm
          text-neutral-600 dark:text-neutral-400
          border border-neutral-200/50 dark:border-neutral-700/50
          shadow-sm"
				>
					{language}
				</div>
			)}

			<CopyButton text={children} />

			<div
				className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-400/50
        dark:scrollbar-thumb-neutral-600/50 scrollbar-track-transparent"
			>
				<SyntaxHighlighter
					language={language || "text"}
					style={isDark ? oneDark : oneLight}
					showLineNumbers={true}
					lineNumberStyle={{
						minWidth: "3.5em",
						paddingRight: "1.5em",
						color: isDark ? "#666" : "#999",
						textAlign: "right",
						userSelect: "none",
						borderRight: isDark ? "1px solid #333" : "1px solid #eee",
						marginRight: "1.5em",
						fontFamily: "JetBrains Mono, monospace",
						fontSize: "0.85em",
					}}
					customStyle={{
						margin: 0,
						borderRadius: "0.75rem",
						padding: "1.75rem",
						fontSize: "0.9rem",
						backgroundColor: isDark ? "#1a1b26" : "#ffffff",
						border: isDark ? "1px solid #2d2d2d" : "1px solid #eaeaea",
						boxShadow: isDark
							? "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
							: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
						minWidth: "min-content",
						fontFamily: "JetBrains Mono, monospace",
					}}
					wrapLines={false}
				>
					{children}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
