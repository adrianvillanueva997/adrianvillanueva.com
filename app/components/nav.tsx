"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
	"/": {
		name: "home",
	},
	"/blog": {
		name: "blog",
	},
	"/contact": {
		name: "contact",
	},
	"/resume": {
		name: "resume",
	},
};

export function Navbar() {
	const pathname = usePathname();

	return (
		<aside className="mb-16 tracking-tight">
			<nav className="flex items-center justify-start relative px-4 md:px-0 py-2">
				<div className="flex items-center gap-2">
					{Object.entries(navItems).map(([path, { name }]) => {
						const isActive = pathname === path;

						return (
							<Link
								key={path}
								href={path}
								className={`relative rounded-full px-3 py-1 text-sm transition-all
                  hover:bg-neutral-200 dark:hover:bg-neutral-700
                  ${
										isActive
											? "text-neutral-800 dark:text-neutral-200"
											: "text-neutral-600 dark:text-neutral-400"
									}`}
							>
								<span className="relative z-10">{name}</span>
								{isActive && (
									<motion.div
										layoutId="navbar"
										className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full z-0"
										transition={{
											type: "spring",
											stiffness: 350,
											damping: 30,
										}}
									/>
								)}
							</Link>
						);
					})}
				</div>
			</nav>
		</aside>
	);
}
