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
        <div className="my-8 border-4 border-black bg-white overflow-hidden">
            {title && (
                <div className="px-4 py-3 border-b-4 border-black bg-white">
                    <h3 className="text-lg font-mono font-black text-black uppercase tracking-wide">
                        {title}
                    </h3>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Before Image */}
                <div className="group relative">
                    <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-red-500 text-white text-xs font-mono font-black uppercase">
                        BEFORE
                    </div>
                    <img
                        src={beforeSrc}
                        alt={beforeAlt}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* After Image */}
                <div className="group relative border-t-4 md:border-t-0 md:border-l-4 border-black">
                    <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-green-500 text-white text-xs font-mono font-black uppercase">
                        AFTER
                    </div>
                    <img
                        src={afterSrc}
                        alt={afterAlt}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* VS Divider */}
            <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-12 z-20">
                <div className="bg-white border-4 border-black p-2">
                    <span className="text-xs font-mono font-black text-black uppercase">VS</span>
                </div>
            </div>
        </div>
    );
}