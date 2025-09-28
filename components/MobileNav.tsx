"use client";

import headerNavLinks from "@/data/headerNavLinks";
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import {
	clearAllBodyScrollLocks,
	disableBodyScroll,
	enableBodyScroll,
} from "body-scroll-lock";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "./Link";

const MobileNav = () => {
	const [navShow, setNavShow] = useState(false);
	const navRef = useRef(null);

	const onToggleNav = () => {
		setNavShow((status) => {
			if (status) {
				enableBodyScroll(navRef.current);
			} else {
				// Prevent scrolling
				disableBodyScroll(navRef.current);
			}
			return !status;
		});
	};

	useEffect(() => {
		return clearAllBodyScrollLocks;
	});

	return (
		<>
			<button
				type="button"
				aria-label="Toggle Menu"
				onClick={onToggleNav}
				className="group sm:hidden relative p-3 border-4 border-black bg-white hover:bg-red-500 hover:text-white transition-all duration-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="relative z-10 h-5 w-5 text-black group-hover:text-white transition-colors duration-200"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
				</svg>
				{/* Menu indicator */}
				<span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-black font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
					MENU
				</span>
			</button>
			<Transition appear show={navShow} as={Fragment} unmount={false}>
				<Dialog as="div" onClose={onToggleNav} unmount={false}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						unmount={false}
					>
						<div className="fixed inset-0 z-60 bg-black/80" />
					</TransitionChild>

					<TransitionChild
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="translate-x-full opacity-0"
						enterTo="translate-x-0 opacity-95"
						leave="transition ease-in duration-200 transform"
						leaveFrom="translate-x-0 opacity-95"
						leaveTo="translate-x-full opacity-0"
						unmount={false}
					>
						<DialogPanel className="fixed top-0 left-0 z-70 h-full w-full bg-white border-r-4 border-black">
							<nav
								ref={navRef}
								className="mt-16 flex h-full basis-0 flex-col items-start overflow-y-auto pt-8 pl-8 pr-4 text-left"
							>
								{headerNavLinks.map((link) => (
									<Link
										key={link.title}
										href={link.href}
										className="mb-6 py-4 pr-4 text-2xl md:text-3xl font-mono font-black tracking-tight text-black hover:text-red-500 transition-colors border-b-4 border-black hover:border-red-500 w-full uppercase"
										onClick={onToggleNav}
									>
										{link.title}
									</Link>
								))}

								{/* Simple status indicator */}
								<div className="mt-8 w-full border-t-2 border-black pt-4">
									<div className="text-black font-mono text-sm font-bold uppercase">Menu</div>
								</div>
							</nav>

							<button
								type="button"
								className="fixed top-4 right-4 z-80 h-12 w-12 p-2 text-black hover:text-white bg-white hover:bg-red-500 border-4 border-black transition-colors"
								aria-label="Close Menu"
								onClick={onToggleNav}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</DialogPanel>
					</TransitionChild>
				</Dialog>
			</Transition>
		</>
	);
};

export default MobileNav;
