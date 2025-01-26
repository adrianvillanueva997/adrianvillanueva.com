import type { IconType } from "react-icons";
import {
	SiAew,
	SiDocker,
	SiGit,
	SiJavascript,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiPrisma,
	SiReact,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from "react-icons/si";

const techIcons: Record<string, IconType> = {
	React: SiReact,
	"Next.js": SiNextdotjs,
	TypeScript: SiTypescript,
	JavaScript: SiJavascript,
	Tailwind: SiTailwindcss,
	Prisma: SiPrisma,
	"Node.js": SiNodedotjs,
	PostgreSQL: SiPostgresql,
	Git: SiGit,
	Docker: SiDocker,
	AWS: SiAew,
	Vercel: SiVercel,
};

export function TechStack({ technologies }: { technologies: string[] }) {
	return (
		<div className="flex flex-wrap gap-3 my-6">
			{technologies.map((tech) => {
				const Icon = techIcons[tech];

				return (
					<span
						key={tech}
						className="group flex items-center gap-2 px-4 py-2
              rounded-full text-sm font-medium
              bg-cyan-900/20 hover:bg-cyan-800/30
              border border-cyan-800/30 hover:border-cyan-700/50
              text-cyan-100/80 hover:text-cyan-100
              transition-all duration-300 ease-in-out
              hover:translate-y-[-2px]
              cursor-default"
					>
						{Icon && <Icon className="w-4 h-4" />}
						{tech}
					</span>
				);
			})}
		</div>
	);
}