interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "error" | "warning" | "info";
    size?: "sm" | "md" | "lg";
}

interface BadgeGroupProps {
    badges: string[];
    variant?: "default" | "success" | "error" | "warning" | "info";
    title?: string;
}

function Badge({ children, variant = "default", size = "md" }: BadgeProps) {
    const variants = {
        default: "bg-gray-800 text-gray-200 border-gray-600",
        success: "bg-[#00ff99]/20 text-[#00ff99] border-[#00ff99]",
        error: "bg-[#ff3860]/20 text-[#ff3860] border-[#ff3860]",
        warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
        info: "bg-blue-500/20 text-blue-400 border-blue-500",
    };

    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
    };

    return (
        <span
            className={`inline-flex items-center font-mono font-medium rounded-full border transition-all duration-300 hover:scale-105 ${variants[variant]} ${sizes[size]}`}
        >
            {children}
        </span>
    );
}

export default function BadgeGroup({ badges, variant = "default", title }: BadgeGroupProps) {
    return (
        <div className="my-6 p-4 rounded-xl border border-gray-700 bg-gray-950/30">
            {title && (
                <h3 className="text-lg font-mono font-semibold text-[#00ff99] uppercase tracking-wide mb-4">
                    {title}
                </h3>
            )}
            <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                    <Badge key={badge} variant={variant}>
                        {badge}
                    </Badge>
                ))}
            </div>
        </div>
    );
}

export { Badge };
