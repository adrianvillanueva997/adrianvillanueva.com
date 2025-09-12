import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
	return (
		<section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-5xl xl:px-0">
			{children}
		</section>
	);
}
