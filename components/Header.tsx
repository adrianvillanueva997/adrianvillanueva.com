import headerNavLinks from "@/data/headerNavLinks";
import Image from "next/image"; // ✅ Add this
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
	const headerClass =
		"sticky top-0 z-50 flex items-center w-full bg-gray-950 justify-between px-4 sm:px-6 py-4 sm:py-6 md:py-8 lg:py-10 border-b border-gray-700 backdrop-blur-sm";

	return (
		<header className={headerClass}>
			<Link href="/" aria-label="AVM">
				<div className="flex items-center">
					<div className="mr-3 p-1 rounded-lg border border-[#00ff99] hover:border-[#ff3860] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff3860]/20">
						<Image
							src="/logo.png"
							alt="AVM Logo"
							width={32}
							height={32}
							priority
							className="brightness-110 contrast-125"
						/>
					</div>
					<div className="text-lg sm:text-xl md:text-2xl font-gothic font-bold tracking-tight text-[#ff3860] uppercase">
						AVM
					</div>
				</div>
			</Link>
			<div className="flex items-center space-x-2 sm:space-x-4 leading-5">
				{/* Desktop Navigation */}
				<div className="hidden lg:flex items-center gap-x-6">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.map((link) => (
							<Link
								key={link.title}
								href={link.href}
								className="font-mono font-medium text-sm text-gray-300 hover:text-[#00ff99] uppercase tracking-wide transition-all duration-300 border-b-2 border-transparent hover:border-[#00ff99] whitespace-nowrap"
							>
								{link.title}
							</Link>
						))}
				</div>

				{/* Medium Screen Navigation - Compact */}
				<div className="hidden md:flex lg:hidden items-center gap-x-3">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.slice(0, 3) // Show only first 3 items on medium screens
						.map((link) => (
							<Link
								key={link.title}
								href={link.href}
								className="font-mono font-medium text-xs text-gray-300 hover:text-[#00ff99] uppercase tracking-wide transition-all duration-300 px-2 py-1 rounded border border-transparent hover:border-[#00ff99]"
							>
								{link.title}
							</Link>
						))}
				</div>

				<SearchButton />
				<ThemeSwitch />
				<MobileNav />
			</div>
		</header>
	);
};

export default Header;
