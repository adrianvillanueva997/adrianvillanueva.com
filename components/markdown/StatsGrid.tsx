interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: {
        direction: "up" | "down" | "neutral";
        value: string;
    };
    color?: "red" | "green" | "blue" | "yellow";
}

interface StatsGridProps {
    title?: string;
    stats: StatCardProps[];
    columns?: 1 | 2 | 3 | 4;
}

function StatCard({ title, value, subtitle, trend, color = "green" }: StatCardProps) {
    const colorStyles = {
        red: {
            accent: "text-[#ff3860]",
            border: "border-[#ff3860]/30",
            bg: "bg-[#ff3860]/5",
        },
        green: {
            accent: "text-[#00ff99]",
            border: "border-[#00ff99]/30",
            bg: "bg-[#00ff99]/5",
        },
        blue: {
            accent: "text-blue-400",
            border: "border-blue-400/30",
            bg: "bg-blue-400/5",
        },
        yellow: {
            accent: "text-yellow-400",
            border: "border-yellow-400/30",
            bg: "bg-yellow-400/5",
        },
    };

    const style = colorStyles[color];

    const getTrendIcon = () => {
        if (!trend) return null;

        const iconClass = "w-4 h-4";

        switch (trend.direction) {
            case "up":
                return (
                    <svg className={`${iconClass} text-[#00ff99]`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                );
            case "down":
                return (
                    <svg className={`${iconClass} text-[#ff3860]`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                );
            case "neutral":
                return (
                    <svg className={`${iconClass} text-gray-400`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`p-6 rounded-xl border ${style.border} ${style.bg} bg-gray-950/50 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="font-mono text-sm text-gray-400 uppercase tracking-wider mb-2">
                        {title}
                    </p>
                    <p className={`text-3xl font-bold font-mono ${style.accent} mb-1`}>
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-sm text-gray-500 font-mono">{subtitle}</p>
                    )}
                </div>

                {trend && (
                    <div className="flex items-center space-x-1 text-sm font-mono">
                        {getTrendIcon()}
                        <span className={
                            trend.direction === "up" ? "text-[#00ff99]" :
                                trend.direction === "down" ? "text-[#ff3860]" :
                                    "text-gray-400"
                        }>
                            {trend.value}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function StatsGrid({ title, stats, columns = 3 }: StatsGridProps) {
    const columnClass = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <div className="my-8">
            {title && (
                <h3 className="text-2xl font-mono font-bold text-[#00ff99] uppercase tracking-wide mb-6">
                    {title}
                </h3>
            )}
            <div className={`grid ${columnClass[columns]} gap-6`}>
                {stats.map((stat, index) => (
                    <StatCard key={`${stat.title}-${index}`} {...stat} />
                ))}
            </div>
        </div>
    );
}