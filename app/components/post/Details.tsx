export function Details({
	summary,
	children,
}: { summary: string; children: React.ReactNode }) {
	return (
		<details className="my-4 group border border-cyan-800/30 rounded-lg">
			<summary className="px-4 py-2 cursor-pointer bg-cyan-900/20 hover:bg-cyan-900/30 rounded-lg transition">
				{summary}
			</summary>
			<div className="p-4">{children}</div>
		</details>
	);
}
