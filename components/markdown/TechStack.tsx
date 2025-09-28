import type { IconType } from "react-icons";
import {
	SiDjango,
	SiDocker,
	SiFastapi,
	SiFlask,
	SiGit,
	SiGo,
	SiGooglecloud,
	SiGraphql,
	SiJavascript,
	SiKubernetes,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiPrisma,
	SiPython,
	SiReact,
	SiRedis,
	SiRust,
	SiTailwindcss,
	SiTerraform,
	SiTypescript,
	SiVercel,
} from "react-icons/si";

const techIcons: Record<string, IconType> = {
	// Frontend
	React: SiReact,
	"Next.js": SiNextdotjs,
	TypeScript: SiTypescript,
	JavaScript: SiJavascript,
	Tailwind: SiTailwindcss,

	// Backend
	Prisma: SiPrisma,
	"Node.js": SiNodedotjs,
	Python: SiPython,
	Rust: SiRust,
	Go: SiGo,
	Django: SiDjango,
	FastAPI: SiFastapi,
	Flask: SiFlask,

	// Databases
	PostgreSQL: SiPostgresql,
	MongoDB: SiMongodb,
	Redis: SiRedis,
	GraphQL: SiGraphql,

	// DevOps & Cloud
	Git: SiGit,
	Docker: SiDocker,
	Kubernetes: SiKubernetes,
	GCP: SiGooglecloud,
	Terraform: SiTerraform,
	Vercel: SiVercel,
};

interface TechStackProps {
	technologies: string[];
	showLabels?: boolean;
}

export function TechStack({ technologies, showLabels = true }: TechStackProps) {
	// Process the tech names to handle case variations
	const processedTechs = technologies.map((tech) => {
		// Find a case-insensitive match in our icons
		const key =
			Object.keys(techIcons).find(
				(iconKey) => iconKey.toLowerCase() === tech.toLowerCase(),
			) || tech;

		return {
			name: tech,
			iconKey: key,
			hasIcon: !!techIcons[key],
		};
	});

	return (
		<div className="flex flex-wrap gap-3 my-6">
			{processedTechs.map(({ name, iconKey, hasIcon }) => {
				const Icon = hasIcon ? techIcons[iconKey] : null;

				return (
					<span
						key={name}
						className="group flex items-center gap-2 px-4 py-2
              border-4 border-black text-sm font-mono font-black
              bg-white
              text-black
              hover:bg-red-500
              hover:text-white
              transition-all duration-200 ease-in-out
              cursor-default"
					>
						{Icon && <Icon className="w-4 h-4" />}
						{showLabels && name}
					</span>
				);
			})}
		</div>
	);
}
