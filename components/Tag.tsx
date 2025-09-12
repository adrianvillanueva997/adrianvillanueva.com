import { slug } from "github-slugger";
import Link from "next/link";

interface Props {
	text: string;
}

const Tag = ({ text }: Props) => {
	return (
		<Link
			href={`/tags/${slug(text)}`}
			className="inline-block mr-2 mb-2 px-3 py-1 text-xs md:text-sm font-mono font-medium bg-gray-900 border border-gray-600 text-[#00ff99] hover:text-[#ff3860] hover:border-[#ff3860] hover:bg-gray-800 transition-all duration-200 rounded-md hover:shadow-md hover:shadow-[#ff3860]/20"
		>
			{text.split(" ").join("_").toUpperCase()}
		</Link>
	);
};

export default Tag;
