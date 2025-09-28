import Link from "@/components/Link";
import Image from "next/image";
import { FaGithub, FaLock, FaUnlockAlt } from "react-icons/fa";

interface CardProps {
	title: string;
	description: string;
	imgSrc?: string;
	href?: string;
	children?: React.ReactNode;
	className?: string;
	isOpenSource?: boolean;
	repoUrl?: string;
}

export default function Card({
	title,
	description,
	imgSrc,
	href,
	children,
	className,
	isOpenSource,
	repoUrl,
}: CardProps) {
	return (
		<div className={`group relative ${className || ""}`}>
			<div className="relative h-full border-4 border-black bg-white hover:bg-gray-50 transition-all duration-300 overflow-hidden">
				{imgSrc && (
					<div className="relative h-48 overflow-hidden border-b-4 border-black">
						<Image
							alt={title}
							src={imgSrc}
							className="object-cover object-center w-full h-full"
							width={544}
							height={306}
						/>
					</div>
				)}
				<div className="p-6">
					<div className="mb-4">
						<div className="mb-3">
							{href ? (
								<Link href={href}>
									<h2 className="text-xl font-black font-mono text-black hover:text-red-500 transition-colors uppercase leading-tight">
										{title}
									</h2>
								</Link>
							) : (
								<h2 className="text-xl font-black font-mono text-black uppercase leading-tight">
									{title}
								</h2>
							)}
						</div>
						{/* Open Source Icon */}
						<div className="flex items-center gap-2">
							{isOpenSource ? (
								<div className="flex items-center gap-2">
									<div
										title="Open Source"
										className="w-8 h-8 bg-green-500 border-2 border-black flex items-center justify-center"
									>
										<FaUnlockAlt className="text-white text-sm" />
									</div>
									{repoUrl && (
										<Link href={repoUrl}>
											<div
												title="View Source Code"
												className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center hover:bg-red-500 transition-colors"
											>
												<FaGithub className="text-white text-sm" />
											</div>
										</Link>
									)}
								</div>
							) : (
								<div
									title="Closed Source"
									className="w-8 h-8 bg-red-500 border-2 border-black flex items-center justify-center"
								>
									<FaLock className="text-white text-sm" />
								</div>
							)}
						</div>
					</div>
					<p className="font-mono text-black text-sm leading-relaxed mb-4">
						{description}
					</p>
					{children}
				</div>
			</div>
		</div>
	);
}