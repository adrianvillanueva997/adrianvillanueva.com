interface QuoteProps {
    children: React.ReactNode;
    author?: string;
    source?: string;
    type?: "default" | "warning" | "success" | "error";
}

export default function Quote({
    children,
    author,
    source,
    type = "default",
}: QuoteProps) {
    const typeStyles = {
        default: {
            border: "border-gray-600",
            accent: "text-gray-400",
            bg: "bg-gray-950/30",
            icon: "#6b7280",
        },
        warning: {
            border: "border-yellow-600",
            accent: "text-yellow-400",
            bg: "bg-yellow-950/20",
            icon: "#fbbf24",
        },
        success: {
            border: "border-[#00ff99]",
            accent: "text-[#00ff99]",
            bg: "bg-[#00ff99]/10",
            icon: "#00ff99",
        },
        error: {
            border: "border-[#ff3860]",
            accent: "text-[#ff3860]",
            bg: "bg-[#ff3860]/10",
            icon: "#ff3860",
        },
    };

    const style = typeStyles[type];

    return (
        <div
            className={`my-6 relative rounded-xl border-l-4 ${style.border} ${style.bg} pl-6 pr-4 py-4 overflow-hidden`}
        >
            {/* Quote Icon */}
            <svg
                className="absolute top-4 right-4 w-8 h-8 opacity-30"
                fill={style.icon}
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>

            {/* Content */}
            <div className="relative z-10">
                <blockquote className="text-gray-100 font-medium leading-relaxed italic mb-4">
                    "{children}"
                </blockquote>

                {(author || source) && (
                    <footer className="border-t border-gray-700 pt-3">
                        <cite className={`font-mono text-sm not-italic ${style.accent}`}>
                            {author && <span className="font-semibold">{author}</span>}
                            {author && source && <span className="mx-2">—</span>}
                            {source && <span>{source}</span>}
                        </cite>
                    </footer>
                )}
            </div>
        </div>
    );
}