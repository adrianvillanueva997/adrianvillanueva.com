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
            bg: "bg-red-500",
            gradient: "from-red-500 to-red-400",
            shadow: "shadow-red-500/20",
        },
        green: {
            bg: "bg-green-500",
            gradient: "from-green-500 to-green-400",
            shadow: "shadow-green-500/20",
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
        <div className="my-6 p-4 border-4 border-black bg-white">
            {label && (
                <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-sm text-black font-black">
                        {label}
                    </span>
                    {showPercentage && (
                        <span className="font-mono text-sm text-black font-black">
                            {percentage.toFixed(1)}%
                        </span>
                    )}
                </div>
            )}

            <div className="relative w-full h-3 bg-gray-200 border-4 border-black overflow-hidden">
                {/* Progress bar */}
                <div
                    className={`relative h-full ${style} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Value display */}
            <div className="flex justify-between items-center mt-2 text-xs font-mono text-black">
                <span>0</span>
                <span className="font-black text-black">
                    {value} / {max}
                </span>
                <span>{max}</span>
            </div>
        </div>
    );
}