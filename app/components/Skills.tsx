interface SkillsProps {
	skills: string[];
}

export function Skills({ skills }: SkillsProps) {
	const pillStyle =
		"px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400";

	return (
		<section>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill) => (
					<span key={skill} className={pillStyle}>
						{skill}
					</span>
				))}
			</div>
		</section>
	);
}