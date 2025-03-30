import Image from "next/image";
import Link from "@/components/Link";

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
		<div className={`relative overflow-hidden ${className || ""}`}>
			<div className="h-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md overflow-hidden">
				{imgSrc && (
					<div className="relative h-48 overflow-hidden">
						<Image
							alt={title}
							src={imgSrc}
							layout="fill"
							objectFit="cover"
							className="transition-transform duration-500 hover:scale-105"
						/>
					</div>
				)}
				<div className="p-5">
					<h2 className="text-xl font-bold leading-tight mb-2">
						{href ? (
							<Link href={href} aria-label={`Link to ${title}`}>
								{title}
							</Link>
						) : (
							title
						)}
					</h2>
					<p className="text-gray-700 dark:text-gray-300 mb-3">{description}</p>
					{children}
					{href && (
						<Link
							href={href}
							className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2"
							aria-label={`Link to ${title}`}
						>
							Learn more
							<svg
								className="ml-1 w-5 h-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
