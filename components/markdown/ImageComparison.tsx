interface ImageComparisonProps {
    beforeSrc: string;
    afterSrc: string;
    beforeAlt: string;
    afterAlt: string;
    title?: string;
}

export default function ImageComparison({
    beforeSrc,
    afterSrc,
    beforeAlt,
    afterAlt,
    title,
}: ImageComparisonProps) {
    return (
        <div className="my-8 rounded-xl border border-gray-700 bg-gray-950/30 overflow-hidden">
            {title && (
                <div className="px-4 py-3 border-b border-gray-700 bg-gray-900/50">
                    <h3 className="text-lg font-mono font-semibold text-[#00ff99] uppercase tracking-wide">
                        {title}
                    </h3>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Before Image */}
                <div className="group relative">
                    <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-[#ff3860] text-white text-xs font-mono font-bold uppercase rounded">
                        BEFORE
                    </div>
                    <img
                        src={beforeSrc}
                        alt={beforeAlt}
                        className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff3860]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* After Image */}
                <div className="group relative border-t md:border-t-0 md:border-l border-gray-700">
                    <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-[#00ff99] text-gray-900 text-xs font-mono font-bold uppercase rounded">
                        AFTER
                    </div>
                    <img
                        src={afterSrc}
                        alt={afterAlt}
                        className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#00ff99]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>

            {/* VS Divider */}
            <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-12 z-20">
                <div className="bg-gray-800 border-2 border-gray-600 rounded-full p-2">
                    <span className="text-xs font-mono font-bold text-gray-300 uppercase">VS</span>
                </div>
            </div>
        </div>
    );
}