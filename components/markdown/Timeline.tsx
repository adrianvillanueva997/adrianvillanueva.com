interface TimelineItem {
    title: string;
    date: string;
    description?: string;
    status?: "completed" | "current" | "upcoming";
}

interface TimelineProps {
    items: TimelineItem[];
    title?: string;
}

export default function Timeline({ items, title }: TimelineProps) {
    return (
        <div className="my-8 rounded-xl border border-gray-700 bg-gray-950/30 overflow-hidden">
            {title && (
                <div className="px-6 py-4 border-b border-gray-700 bg-gray-900/50">
                    <h3 className="text-xl font-mono font-bold text-[#00ff99] uppercase tracking-wide">
                        {title}
                    </h3>
                </div>
            )}

            <div className="p-6">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff3860] via-gray-600 to-[#00ff99]" />

                    {items.map((item, index) => {
                        const statusStyles = {
                            completed: {
                                dot: "bg-[#00ff99] border-[#00ff99] shadow-[#00ff99]/50",
                                text: "text-gray-100",
                                date: "text-[#00ff99]",
                            },
                            current: {
                                dot: "bg-[#ff3860] border-[#ff3860] shadow-[#ff3860]/50 animate-pulse",
                                text: "text-gray-100",
                                date: "text-[#ff3860]",
                            },
                            upcoming: {
                                dot: "bg-gray-700 border-gray-600 shadow-gray-600/20",
                                text: "text-gray-400",
                                date: "text-gray-500",
                            },
                        };

                        const style = statusStyles[item.status || "completed"];

                        return (
                            <div key={`${item.title}-${item.date}-${index}`} className="relative flex items-start pb-8 last:pb-0">
                                {/* Timeline dot */}
                                <div
                                    className={`relative z-10 w-4 h-4 rounded-full border-2 shadow-lg ${style.dot} flex-shrink-0`}
                                >
                                    {item.status === "completed" && (
                                        <svg
                                            className="w-2 h-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="ml-6 flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <h4
                                            className={`font-mono font-semibold text-lg ${style.text} mb-1 sm:mb-0`}
                                        >
                                            {item.title}
                                        </h4>
                                        <time
                                            className={`font-mono text-sm font-bold uppercase tracking-wider ${style.date}`}
                                        >
                                            {item.date}
                                        </time>
                                    </div>

                                    {item.description && (
                                        <p className="mt-2 text-gray-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}