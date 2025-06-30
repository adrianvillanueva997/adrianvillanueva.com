import headerNavLinks from "@/data/headerNavLinks";
import Logo from "@/data/logo.svg";
import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
	const headerClass = "sticky top-0 z-50 flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10 border-b border-gray-200 dark:border-gray-800";

	return (
		<header className={headerClass}>
			<Link href="/" aria-label={siteMetadata.headerTitle}>
				<div className="flex items-center justify-between">
					<div className="mr-3">
						<Logo />
					</div>
					{typeof siteMetadata.headerTitle === "string" ? (
						<div className="hidden sm:block text-xl sm:text-2xl font-semibold tracking-tight text-primary-700 dark:text-primary-300">
							{siteMetadata.headerTitle}
						</div>
					) : (
						siteMetadata.headerTitle
					)}
				</div>
			</Link>
			<div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
				<div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.map((link) => (
							<Link
								key={link.title}
								href={link.href}
								className="m-1 font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 hover:underline hover:tracking-wide transition-all duration-150"
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