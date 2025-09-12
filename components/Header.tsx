import headerNavLinks from "@/data/headerNavLinks";
import Image from "next/image";
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
	const headerClass =
		"sticky top-0 z-50 flex items-center w-full bg-gray-950/95 justify-between px-4 sm:px-6 py-3 sm:py-4 md:py-5 lg:py-6 border-b border-gray-700/60 backdrop-blur-md backdrop-saturate-150 shadow-lg shadow-gray-950/20";

	return (
		<header className={headerClass}>
			<Link href="/" aria-label="Adrian Villanueva Martinez - Software Engineer">
				<div className="flex items-center group">
					<div className="relative mr-3 p-1.5 rounded-xl border-2 border-[#00ff99]/60 hover:border-[#ff3860] transition-all duration-500 hover:shadow-lg hover:shadow-[#ff3860]/30 hover:scale-105 group-hover:rotate-3">
						<Image
							src="/logo.png"
							alt="AVM Logo"
							width={36}
							height={36}
							priority
							className="brightness-110 contrast-125 transition-transform duration-300 group-hover:brightness-125"
						/>
					</div>
					<div className="flex flex-col">
						<div className="text-lg sm:text-xl md:text-2xl font-heading font-bold tracking-tight text-[#ff3860] uppercase transition-all duration-300 group-hover:text-[#ff3860]/90 group-hover:tracking-wide">
							AVM
						</div>
						<div className="hidden sm:block text-xs font-mono text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
							Software Engineer
						</div>
					</div>
				</div>
			</Link>
			<div className="flex items-center space-x-3 sm:space-x-4 leading-5">
				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center gap-x-8">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.map((link, index) => (
							<Link
								key={link.title}
								href={link.href}
								className="group relative font-mono font-medium text-sm text-gray-300 hover:text-[#00ff99] uppercase tracking-wide transition-all duration-300 whitespace-nowrap py-2 px-1"
							>
								{/* Animated underline */}
								<span className="relative z-10">{link.title}</span>
								<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00ff99] to-[#ff3860] group-hover:w-full transition-all duration-500 ease-out" />
								{/* Index indicator */}
								<span className="absolute -top-1 -right-1 text-xs font-mono text-[#00ff99]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									{String(index + 1).padStart(2, '0')}
								</span>
							</Link>
						))}
				</nav>

				{/* Medium Screen Navigation - Compact */}
				<nav className="hidden md:flex lg:hidden items-center gap-x-2">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.slice(0, 3) // Show only first 3 items on medium screens
						.map((link) => (
							<Link
								key={link.title}
								href={link.href}
								className="group font-mono font-medium text-xs text-gray-300 hover:text-[#00ff99] uppercase tracking-wide transition-all duration-300 px-3 py-2 rounded-lg border border-gray-700/50 hover:border-[#00ff99]/60 hover:bg-[#00ff99]/5 hover:shadow-sm hover:shadow-[#00ff99]/20"
							>
								{link.title}
							</Link>
						))}
				</nav>

				{/* Action buttons with enhanced styling */}
				<div className="flex items-center space-x-2 sm:space-x-3 ml-4 pl-4 border-l border-gray-700/50">
					<SearchButton />
					<ThemeSwitch />
					<MobileNav />
				</div>
			</div>
		</header>
	);
};

export default Header;
