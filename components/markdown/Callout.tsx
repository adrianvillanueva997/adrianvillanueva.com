import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "note" | "tip";

const styles: Record<
	CalloutType,
	{ bg: string; border: string; icon: string; title: string }
> = {
	info: {
		bg: "bg-gray-950/50",
		border: "border-[#00ff99]/50",
		icon: "💡",
		title: "SYSTEM_INFO",
	},
	warning: {
		bg: "bg-gray-950/50",
		border: "border-[#ff3860]/50",
		icon: "⚠️",
		title: "CRITICAL_WARNING",
	},
	note: {
		bg: "bg-gray-950/50",
		border: "border-gray-600/50",
		icon: "📝",
		title: "DATA_NOTE",
	},
	tip: {
		bg: "bg-gray-950/50",
		border: "border-[#00ff99]/50",
		icon: "💪",
		title: "OPTIMIZATION_TIP",
	},
};

interface CalloutProps {
	type: CalloutType;
	title?: string;
	children: ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
	return (
		<div
			className={`${styles[type].bg} border-l-4 ${styles[type].border} p-4 my-6 rounded-r-lg`}
		>
			<div className="flex">
				<div className="flex-shrink-0 mr-3 mt-1">
					<span className="text-xl">{styles[type].icon}</span>
				</div>
				<div className="w-full">
					{title ? (
						<h5 className="font-mono font-medium text-lg mb-1 text-[#00ff99] uppercase tracking-wider">{title}</h5>
					) : (
						<h5 className="font-mono font-medium text-lg mb-1 text-[#00ff99] uppercase tracking-wider">{styles[type].title}</h5>
					)}
					<div className="prose dark:prose-dark max-w-none text-gray-300">{children}</div>
				</div>
			</div>
		</div>
	);
}
