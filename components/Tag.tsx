import { slug } from "github-slugger";
import Link from "next/link";

interface Props {
	text: string;
}

const Tag = ({ text }: Props) => {
	return (
		<Link
			href={`/tags/${slug(text)}`}
			className="inline-block mr-2 mb-2 px-3 py-1 text-xs md:text-sm font-mono font-black bg-white border-2 border-black text-black hover:bg-red-500 hover:text-white transition-all duration-200 uppercase"
		>
			{text.split(" ").join("_")}
		</Link>
	);
};

export default Tag;
