import Link from "@/components/Link";
import Image from "next/image";

interface CardProps {
	title: string;
	description: string;
	imgSrc?: string;
	href?: string;
	children?: React.ReactNode;
	className?: string;
}

export default function Card({
	title,
	description,
	imgSrc,
	href,
	children,
	className,
}: CardProps) {
	return (
		<div className={`group relative overflow-hidden ${className || ""}`}>
			{/* Animated border effect */}
			<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00ff99]/20 via-[#ff3860]/20 to-[#00ff99]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

			{/* Scan line effect */}
			<div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00ff99] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
			<div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff3860] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 delay-150" />

			<div className="relative h-full rounded-lg border border-gray-700/60 dark:border-gray-700 bg-gray-900/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg group-hover:shadow-xl group-hover:shadow-[#00ff99]/10 transition-all duration-500 overflow-hidden group-hover:border-[#00ff99]/60">
				{imgSrc && (
					<div className="relative h-48 overflow-hidden">
						{/* Image overlay effect */}
						<div className="absolute inset-0 bg-gradient-to-br from-[#ff3860]/20 via-transparent to-[#00ff99]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
						<Image
							alt={title}
							src={imgSrc}
							layout="fill"
							objectFit="cover"
							className="transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-125"
						/>
						{/* Corner accents */}
						<div className="absolute top-2 right-2 w-3 h-3 bg-[#00ff99] rotate-45 opacity-0 group-hover:opacity-80 transition-opacity duration-300 delay-200" />
						<div className="absolute bottom-2 left-2 w-3 h-3 bg-[#ff3860] rotate-45 opacity-0 group-hover:opacity-80 transition-opacity duration-300 delay-300" />
					</div>
				)}
				<div className="relative p-5">
					{/* Terminal-style header */}
					<div className="flex items-center mb-2 font-mono text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<span className="text-[#00ff99] mr-2">❯</span>
						<span>loading project data...</span>
						<div className="ml-auto flex space-x-1">
							<div className="w-1.5 h-1.5 rounded-full bg-[#00ff99] animate-pulse" />
							<div className="w-1.5 h-1.5 rounded-full bg-[#ffff00] animate-pulse delay-150" />
							<div className="w-1.5 h-1.5 rounded-full bg-[#ff3860] animate-pulse delay-300" />
						</div>
					</div>

					<h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-[#00ff99] transition-colors duration-300">
						{href ? (
							<Link href={href} aria-label={`Link to ${title}`} className="font-mono uppercase tracking-wide">
								{title}
							</Link>
						) : (
							<span className="font-mono uppercase tracking-wide">{title}</span>
						)}
					</h2>
					<p className="text-gray-400 dark:text-gray-400 mb-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
						{description}
					</p>
					{children}
					{href && (
						<div className="mt-4 pt-3 border-t border-gray-700/50 group-hover:border-[#00ff99]/30 transition-colors duration-300">
							<Link
								href={href}
								className="inline-flex items-center text-[#00ff99] hover:text-[#ff3860] font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 group-hover:scale-105"
								aria-label={`Link to ${title}`}
							>
								<span className="mr-2">&gt;</span>
								INITIALIZE_PROTOCOL
								<svg
									className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									role="img"
									aria-label="Arrow right icon"
								>
									<path
										fillRule="evenodd"
										d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
