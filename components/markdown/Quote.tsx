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
            border: "border-black",
            accent: "text-black",
            bg: "bg-white",
            icon: "#000000",
        },
        warning: {
            border: "border-black",
            accent: "text-yellow-600",
            bg: "bg-yellow-50",
            icon: "#d97706",
        },
        success: {
            border: "border-black",
            accent: "text-green-600",
            bg: "bg-green-50",
            icon: "#059669",
        },
        error: {
            border: "border-black",
            accent: "text-red-600",
            bg: "bg-red-50",
            icon: "#dc2626",
        },
    };

    const style = typeStyles[type];

    return (
        <div
            className={`my-6 relative border-4 ${style.border} ${style.bg} pl-6 pr-4 py-4 overflow-hidden`}
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
                <blockquote className="text-black font-mono font-medium leading-relaxed italic mb-4">
                    "{children}"
                </blockquote>

                {(author || source) && (
                    <footer className="border-t-4 border-black pt-3">
                        <cite className={`font-mono text-sm not-italic font-black ${style.accent}`}>
                            {author && <span className="font-black">{author}</span>}
                            {author && source && <span className="mx-2">—</span>}
                            {source && <span>{source}</span>}
                        </cite>
                    </footer>
                )}
            </div>
        </div>
    );
}