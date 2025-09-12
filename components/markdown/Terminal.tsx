"use client";

import { useState } from "react";

interface TerminalCommand {
	command: string;
	output?: string;
	error?: boolean;
	loading?: boolean;
	timing?: string;
	prompt?: string;
}

export function Terminal({
	commands,
	shell = "bash",
}: {
	commands: TerminalCommand[];
	shell?: "bash" | "zsh" | "fish";
}) {
	const [copied, setCopied] = useState(false);
	const shellPrompts = {
		bash: "$",
		zsh: "%",
		fish: "~>",
	};

	const handleCopy = async () => {
		const text = commands.map((cmd) => cmd.command).join("\n");
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="rounded-lg p-4 my-4 font-mono text-sm relative group bg-black border border-gray-700 shadow-lg shadow-[#00ff99]/10">
			{/* Terminal Header with Doom Aesthetic */}
			<div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
				<div className="flex items-center space-x-2">
					<div className="w-3 h-3 rounded-full bg-[#ff3860] animate-pulse" />
					<div className="w-3 h-3 rounded-full bg-yellow-500" />
					<div className="w-3 h-3 rounded-full bg-[#00ff99]" />
					<span className="text-xs font-mono text-[#00ff99] ml-3 font-bold tracking-wider uppercase">
						SYSTEM_TERMINAL
					</span>
				</div>
				<span className="text-xs text-gray-500 font-mono">[{shell.toUpperCase()}]</span>
			</div>

			<button
				type="button"
				onClick={handleCopy}
				className="absolute right-4 top-4 p-2 rounded-md
        opacity-0 group-hover:opacity-100 transition-all duration-300
        hover:bg-gray-800/50 text-[#00ff99] hover:text-[#ff3860]
        border border-transparent hover:border-[#00ff99]"
				aria-label={copied ? "Copied" : "Copy commands"}
			>
				{copied ? (
					<CheckIcon className="w-5 h-5" />
				) : (
					<CopyIcon className="w-5 h-5" />
				)}
			</button>

			{commands.map((cmd, index) => (
				<div key={`${cmd.command}-${index}`} className="space-y-1 mb-4">
					<div className="flex items-start space-x-2">
						<span className="text-[#ff3860] font-bold">
							{cmd.prompt || `${shellPrompts[shell]} `}
						</span>
						<span className={`${cmd.error ? "text-red-400" : "text-gray-100"} font-semibold`}>
							{cmd.command}
						</span>
						{cmd.timing && (
							<span className="text-gray-500 text-xs ml-2 font-mono">[{cmd.timing}]</span>
						)}
					</div>

					{cmd.loading && (
						<div className="flex items-center space-x-2 text-[#00ff99]">
							<LoadingSpinner />
							<span className="font-mono font-bold tracking-wider uppercase">PROCESSING...</span>
						</div>
					)}

					{cmd.output && (
						<div
							className={`pl-6 ${cmd.error ? "text-red-400" : "text-gray-300"
								}`}
						>
							{cmd.output}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

function CopyIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={className}
		>
			<title>Copy Icon</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
			/>
		</svg>
	);
}

function CheckIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={className}
			aria-hidden="true"
		>
			<title>Check Icon</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 12.75l6 6 9-13.5"
			/>
		</svg>
	);
}

function LoadingSpinner() {
	return (
		<svg
			className="animate-spin h-4 w-4"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>Loading</title>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
				fill="none"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);
}
