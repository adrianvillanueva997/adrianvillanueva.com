import headerNavLinks from "@/data/headerNavLinks";
import Image from "next/image";
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
	const headerClass =
		"sticky top-0 z-50 flex items-center w-full bg-white justify-between px-4 sm:px-6 py-4 md:py-5 border-b-4 border-black";

	return (
		<header className={headerClass}>
			<Link href="/" aria-label="Adrian Villanueva Martinez - Software Engineer">
				<div className="flex items-center group">
					<div className="relative mr-6">
						<Image
							src="/logo.png"
							alt="AVM Logo"
							width={48}
							height={48}
							priority
							className="brightness-100 contrast-100"
						/>
						<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500" />
					</div>
					<div className="flex flex-col">
						<div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-black uppercase font-mono">
							AVM
						</div>
						<div className="hidden sm:block text-xs font-mono text-black uppercase tracking-widest font-bold border-l-4 border-red-500 pl-2">
							SOFTWARE ENGINEER
						</div>
					</div>
				</div>
			</Link>
			<div className="flex items-center space-x-3 sm:space-x-4 leading-5">
				{/* Desktop Navigation */}
				<nav className="hidden lg:flex items-center gap-x-4">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.map((link) => (
							<Link
								key={link.title}
								href={link.href}
								className="brutalist-nav-link"
							>
								{link.title}
							</Link>
						))}
				</nav>

				{/* Medium Screen Navigation - Compact */}
				<nav className="hidden md:flex lg:hidden items-center gap-x-2">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.slice(0, 3)
						.map((link) => (
							<Link
								key={link.title}
								href={link.href}
								className="brutalist-nav-link text-xs px-3 py-2"
							>
								{link.title}
							</Link>
						))}
				</nav>

				{/* Action buttons */}
				<div className="flex items-center space-x-2 sm:space-x-3 ml-4 pl-4 border-l-4 border-black">
					<SearchButton />
					<ThemeSwitch />
					<MobileNav />
				</div>
			</div>
		</header>
	);
};

export default Header;
