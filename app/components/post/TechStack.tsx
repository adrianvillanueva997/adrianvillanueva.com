export function TechStack({ technologies }: { technologies: string[] }) {
	return (
		<div className="flex flex-wrap gap-2 my-4">
			{technologies.map((tech) => (
				<span
					key={tech}
					className="px-3 py-1 rounded-full text-sm bg-cyan-900/30 border border-cyan-800/30"
				>
					{tech}
				</span>
			))}
		</div>
	);
}