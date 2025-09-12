import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function PageTitle({ children }: Props) {
	return (
		<h1 className="text-3xl leading-9 font-gothic font-extrabold tracking-tight text-[#ff3860] sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 uppercase">
			{children}
		</h1>
	);
}
