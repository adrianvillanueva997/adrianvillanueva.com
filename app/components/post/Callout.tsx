import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "note" | "tip";

const styles: Record<
	CalloutType,
	{ bg: string; border: string; icon: string }
> = {
	info: { bg: "bg-blue-50/10", border: "border-blue-500/50", icon: "💡" },
	warning: { bg: "bg-yellow-50/10", border: "border-yellow-500/50", icon: "⚠️" },
	note: { bg: "bg-purple-50/10", border: "border-purple-500/50", icon: "📝" },
	tip: { bg: "bg-green-50/10", border: "border-green-500/50", icon: "💪" },
};

export function Callout({
	type,
	children,
}: { type: CalloutType; children: ReactNode }) {
	return (
		<div
			className={`${styles[type].bg} border-l-4 ${styles[type].border} p-4 my-4 rounded-r-lg`}
		>
			<div className="flex items-start">
				<span className="mr-3">{styles[type].icon}</span>
				<div>{children}</div>
			</div>
		</div>
	);
}
