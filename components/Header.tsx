import headerNavLinks from "@/data/headerNavLinks";
import Image from "next/image";
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
	const headerClass =
		"sticky top-0 z-50 flex items-center w-full bg-white justify-between px-4 sm:px-6 py-3 sm:py-4 md:py-5 lg:py-6 brutalist-header";

	return (
		<header className={headerClass}>
			<Link href="/" aria-label="Adrian Villanueva Martinez - Software Engineer">
				<div className="flex items-center group">
					<div className="relative mr-3 p-1.5 brutalist-box">
						<Image
							src="/logo.png"
							alt="AVM Logo"
							width={36}
							height={36}
							priority
							className="brightness-100 contrast-100"
						/>
					</div>
					<div className="flex flex-col">
						<div className="text-lg sm:text-xl md:text-2xl font-heading font-black tracking-tight text-black uppercase">
							AVM
						</div>
						<div className="hidden sm:block text-xs font-mono text-gray-600 uppercase tracking-widest font-bold">
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
