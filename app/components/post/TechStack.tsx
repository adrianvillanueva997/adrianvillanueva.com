import type { IconType } from "react-icons";
import {
	SiAew,
	SiDocker,
	SiGit,
	SiGrafana,
	SiGraphql,
	SiJavascript,
	SiMinio,
	SiMlflow,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiPrisma,
	SiPrometheus,
	SiPython,
	SiReact,
	SiRust,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from "react-icons/si";
import { IconDeviconPlainGrpc } from "./customIcons/grpc";

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
	Minio: SiMinio,
	MlFlow: SiMlflow,
	GraphQL: SiGraphql,
	gRPC: IconDeviconPlainGrpc,
	Prometheus: SiPrometheus,
	Grafana: SiGrafana,
	Rust: SiRust,
	Python: SiPython,
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
              bg-neutral-100 dark:bg-neutral-800/30
              border border-neutral-200 dark:border-neutral-700
              text-neutral-600 dark:text-neutral-300
              hover:bg-neutral-200 dark:hover:bg-neutral-700/50
              hover:border-neutral-300 dark:hover:border-neutral-600
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
