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
        default: "bg-white text-black border-black",
        success: "bg-green-50 text-green-600 border-black",
        error: "bg-red-50 text-red-600 border-black",
        warning: "bg-yellow-50 text-yellow-600 border-black",
        info: "bg-blue-50 text-blue-600 border-black",
    };

    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
    };

    return (
        <span
            className={`inline-flex items-center font-mono font-black border-4 transition-all duration-200 hover:bg-red-500 hover:text-white ${variants[variant]} ${sizes[size]}`}
        >
            {children}
        </span>
    );
}

export default function BadgeGroup({ badges, variant = "default", title }: BadgeGroupProps) {
    return (
        <div className="my-6 p-4 border-4 border-black bg-white">
            {title && (
                <h3 className="text-lg font-mono font-black text-black uppercase tracking-wide mb-4">
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
