"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const navItems = {
	"/": {
		name: "home",
		ariaLabel: "Navigate to home page",
	},
	"/blog": {
		name: "blog",
		ariaLabel: "Navigate to blog posts",
	},
	"/contact": {
		name: "contact",
		ariaLabel: "Navigate to contact page",
	},
	"/resume": {
		name: "resume",
		ariaLabel: "Navigate to resume",
	},
	"/knowledge-graph": {
		name: "knowledge graph",
		ariaLabel: "Navigate to knowledge graph",
	},
};

export function Navbar() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Initial mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// Close menu on navigation
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, []);

	// Handle outside clicks and escape key
	useEffect(() => {
		if (!isMobileMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMobileMenuOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isMobileMenuOpen]);

	if (!mounted) return null;

	const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

	return (
		<aside className="mb-16 tracking-tight" ref={menuRef}>
			<div className="md:hidden absolute right-4 top-4">
				<button
					type="button"
					onClick={toggleMenu}
					className="p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700"
					aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
					aria-expanded={isMobileMenuOpen}
				>
					{isMobileMenuOpen ? (
						<HiX className="w-6 h-6" />
					) : (
						<HiMenu className="w-6 h-6" />
					)}
				</button>
			</div>

			<nav
				className={`
          flex flex-col md:flex-row items-start md:items-center
          justify-start relative px-4 md:px-0 py-2
          ${isMobileMenuOpen ? "block" : "hidden md:flex"}
        `}
			>
				<div className="flex flex-col md:flex-row items-start md:items-center gap-2">
					{Object.entries(navItems).map(([path, { name, ariaLabel }]) => {
						const isActive = pathname === path;

						return (
							<Link
								key={path}
								href={path}
								aria-label={ariaLabel}
								aria-current={isActive ? "page" : undefined}
								className={`
                  relative rounded-full px-3 py-1 text-sm transition-all
                  hover:bg-neutral-200 dark:hover:bg-neutral-700
                  focus:outline-none focus:ring-2 focus:ring-neutral-400
                  ${
										isActive
											? "text-neutral-800 dark:text-neutral-200"
											: "text-neutral-600 dark:text-neutral-400"
									}
                `}
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
