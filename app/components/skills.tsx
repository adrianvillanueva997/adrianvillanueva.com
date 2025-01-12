const skills = [
	"TypeScript",
	"Python",
	"Go",
	"SQL",
	"React",
	"Next.js",
	"Node.js",
	"FastAPI",
	"PostgreSQL",
	"Redis",
	"AWS",
	"Docker",
	"Kubernetes",
	"Terraform",
	"Git",
	"Linux",
	"Rust",
	"C",
	"Java",
	"Databricks",
].sort();

export default function Skills() {
	return (
		<div className="my-8">
			<div className="flex flex-wrap gap-2">
				{skills.map((skill) => (
					<span
						key={skill}
						className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800
                      rounded-full text-neutral-700 dark:text-neutral-200
                      hover:bg-neutral-200 dark:hover:bg-neutral-700
                      transition-colors"
					>
						{skill}
					</span>
				))}
			</div>
		</div>
	);
}
