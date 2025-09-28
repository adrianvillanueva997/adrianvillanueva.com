import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "note" | "tip";

const styles: Record<
	CalloutType,
	{ bg: string; border: string; icon: string; title: string }
> = {
	info: {
		bg: "bg-blue-50",
		border: "border-black",
		icon: "💡",
		title: "SYSTEM_INFO",
	},
	warning: {
		bg: "bg-yellow-50",
		border: "border-black",
		icon: "⚠️",
		title: "CRITICAL_WARNING",
	},
	note: {
		bg: "bg-gray-50",
		border: "border-black",
		icon: "📝",
		title: "DATA_NOTE",
	},
	tip: {
		bg: "bg-green-50",
		border: "border-black",
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
			className={`${styles[type].bg} border-4 ${styles[type].border} p-4 my-6`}
		>
			<div className="flex">
				<div className="flex-shrink-0 mr-3 mt-1">
					<span className="text-xl">{styles[type].icon}</span>
				</div>
				<div className="w-full">
					{title ? (
						<h5 className="font-mono font-black text-lg mb-1 text-black uppercase tracking-wider">{title}</h5>
					) : (
						<h5 className="font-mono font-black text-lg mb-1 text-black uppercase tracking-wider">{styles[type].title}</h5>
					)}
					<div className="prose max-w-none text-black font-mono">{children}</div>
				</div>
			</div>
		</div>
	);
}
