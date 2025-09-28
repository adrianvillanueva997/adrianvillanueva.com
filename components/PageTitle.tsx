import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function PageTitle({ children }: Props) {
	return (
		<h1 className="text-3xl leading-9 font-mono font-black tracking-tight text-black sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 uppercase border-b-4 border-black pb-4 mb-8">
			{children}
		</h1>
	);
}
