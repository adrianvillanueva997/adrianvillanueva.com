import siteMetadata from "@/data/siteMetadata";
import { AlgoliaButton } from "pliny/search/AlgoliaButton";
import { KBarButton } from "pliny/search/KBarButton";

const SearchButton = () => {
	if (
		siteMetadata.search &&
		(siteMetadata.search.provider === "algolia" ||
			siteMetadata.search.provider === "kbar")
	) {
		const SearchButtonWrapper =
			siteMetadata.search.provider === "algolia" ? AlgoliaButton : KBarButton;

		return (
			<SearchButtonWrapper 
				aria-label="Search" 
				className="group relative p-2 rounded-lg border border-gray-700/50 hover:border-[#00ff99]/60 transition-all duration-300 hover:shadow-sm hover:shadow-[#00ff99]/20"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="relative z-10 h-5 w-5 text-gray-300 group-hover:text-[#00ff99] transition-all duration-300 group-hover:scale-110"
					role="img"
					aria-label="Search icon"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
				{/* Tooltip indicator */}
				<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-mono text-[#00ff99]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					⌘K
				</span>
			</SearchButtonWrapper>
		);
	}
};

export default SearchButton;
