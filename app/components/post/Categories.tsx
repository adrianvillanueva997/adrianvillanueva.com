export function Categories({ categories }: { categories?: string[] }) {
	if (!categories?.length) return null;

	return (
		<div className="flex flex-wrap gap-2 mb-6">
			{categories.map((category) => (
				<span
					key={category}
					className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800
                    rounded-full text-neutral-700 dark:text-neutral-200"
				>
					{category}
				</span>
			))}
		</div>
	);
}