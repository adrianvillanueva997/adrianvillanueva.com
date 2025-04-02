import Image from 'next/image'

interface BlogImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    caption?: string
    description?: string
    className?: string
}

export default function BlogImage({
    src,
    alt,
    width = 600,
    height = 300,
    caption,
    description,
    className = "",
}: BlogImageProps) {
    return (
        <figure className={`my-8 mx-auto ${className}`}>
            <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="relative transform transition duration-500 ease-in-out hover:scale-[1.02]">
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        quality={90}
                        className="rounded-lg"
                        priority
                    />
                </div>
            </div>
            <div className="space-y-2">
                {caption && (
                    <figcaption className="mt-3 text-center text-sm italic text-gray-600 dark:text-gray-400">
                        {caption}
                    </figcaption>
                )}
                {description && (
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </figure>
    )
}