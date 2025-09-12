interface ProgressBarProps {
    value: number;
    max?: number;
    label?: string;
    color?: "red" | "green" | "blue" | "yellow";
    showPercentage?: boolean;
    animated?: boolean;
}

export default function ProgressBar({
    value,
    max = 100,
    label,
    color = "green",
    showPercentage = true,
    animated = true,
}: ProgressBarProps) {
    const percentage = Math.min((value / max) * 100, 100);

    const colorStyles = {
        red: {
            bg: "bg-[#ff3860]",
            gradient: "from-[#ff3860] to-red-400",
            shadow: "shadow-[#ff3860]/20",
        },
        green: {
            bg: "bg-[#00ff99]",
            gradient: "from-[#00ff99] to-green-400",
            shadow: "shadow-[#00ff99]/20",
        },
        blue: {
            bg: "bg-blue-500",
            gradient: "from-blue-500 to-blue-400",
            shadow: "shadow-blue-500/20",
        },
        yellow: {
            bg: "bg-yellow-500",
            gradient: "from-yellow-500 to-yellow-400",
            shadow: "shadow-yellow-500/20",
        },
    };

    const style = colorStyles[color];

    return (
        <div className="my-6 p-4 rounded-xl border border-gray-700 bg-gray-950/30">
            {label && (
                <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-sm text-gray-300 font-medium">
                        {label}
                    </span>
                    {showPercentage && (
                        <span className="font-mono text-sm text-gray-400 font-bold">
                            {percentage.toFixed(1)}%
                        </span>
                    )}
                </div>
            )}

            <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full" />

                {/* Progress bar */}
                <div
                    className={`relative h-full bg-gradient-to-r ${style.gradient} rounded-full transition-all duration-1000 ease-out ${animated ? "animate-pulse" : ""
                        } shadow-lg ${style.shadow}`}
                    style={{ width: `${percentage}%` }}
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />

                    {/* Animated stripe effect */}
                    {animated && (
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full animate-ping"
                            style={{
                                backgroundSize: "30px 30px",
                                backgroundImage:
                                    "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)",
                                animation: "move 2s linear infinite",
                            }}
                        />
                    )}
                </div>

                {/* Value indicator */}
                {percentage > 0 && (
                    <div
                        className="absolute top-0 h-full w-px bg-white/50 z-10 transition-all duration-1000"
                        style={{ left: `${percentage}%` }}
                    />
                )}
            </div>

            {/* Value display */}
            <div className="flex justify-between items-center mt-2 text-xs font-mono text-gray-500">
                <span>0</span>
                <span className="font-bold text-gray-300">
                    {value} / {max}
                </span>
                <span>{max}</span>
            </div>
        </div>
    );
}