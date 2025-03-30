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
    SiVercel
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
    const processedTechs = technologies.map(tech => {
        // Find a case-insensitive match in our icons
        const key = Object.keys(techIcons).find(
            iconKey => iconKey.toLowerCase() === tech.toLowerCase()
        ) || tech;

        return {
            name: tech,
            iconKey: key,
            hasIcon: !!techIcons[key]
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
                        {showLabels && name}
                    </span>
                );
            })}
        </div>
    );
}
