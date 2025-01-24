"use client";

import { useEffect, useState } from "react";

interface TOCItem {
	id: string;
	title: string;
	level: number;
}

export function TableOfContents() {
	const [activeId, setActiveId] = useState<string>("");
	const [items, setItems] = useState<TOCItem[]>([]);

	useEffect(() => {
		const headings = document.querySelectorAll("h2, h3");
		const tocItems = Array.from(headings).map((heading) => ({
			id: heading.id,
			title: heading.textContent || "",
			level: Number(heading.tagName.charAt(1)),
		}));
		setItems(tocItems);
	}, []);

	return (
		<nav className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto">
			<h2 className="font-semibold mb-4">Table of Contents</h2>
			<ul className="space-y-2">
				{items.map((item) => (
					<li key={item.id} className={`${item.level === 3 ? "ml-4" : ""}`}>
						<a
							href={`#${item.id}`}
							className={`text-sm hover:text-neutral-900 dark:hover:text-neutral-100
                ${activeId === item.id ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-600 dark:text-neutral-400"}`}
						>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}