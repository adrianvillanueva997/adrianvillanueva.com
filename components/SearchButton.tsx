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
				className="group p-3 border-2 border-black bg-white hover:bg-red-500 hover:text-white transition-colors duration-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="h-5 w-5 text-black group-hover:text-white transition-colors duration-200"
					role="img"
					aria-label="Search icon"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</SearchButtonWrapper>
		);
	}
};

export default SearchButton;
