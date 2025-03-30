import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "note" | "tip";

const styles: Record<
	CalloutType,
	{ bg: string; border: string; icon: string; title: string }
> = {
	info: {
		bg: "bg-blue-50 dark:bg-blue-900/20",
		border: "border-blue-500/50",
		icon: "💡",
		title: "Information",
	},
	warning: {
		bg: "bg-yellow-50 dark:bg-yellow-900/20",
		border: "border-yellow-500/50",
		icon: "⚠️",
		title: "Warning",
	},
	note: {
		bg: "bg-purple-50 dark:bg-purple-900/20",
		border: "border-purple-500/50",
		icon: "📝",
		title: "Note",
	},
	tip: {
		bg: "bg-green-50 dark:bg-green-900/20",
		border: "border-green-500/50",
		icon: "💪",
		title: "Tip",
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
						<h5 className="font-medium text-lg mb-1">{title}</h5>
					) : (
						<h5 className="font-medium text-lg mb-1">{styles[type].title}</h5>
					)}
					<div className="prose dark:prose-dark max-w-none">{children}</div>
				</div>
			</div>
		</div>
	);
}
