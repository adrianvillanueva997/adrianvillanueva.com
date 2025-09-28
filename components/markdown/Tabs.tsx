"use client";

import { useState } from "react";

interface TabItem {
	id: string;
	title: string;
	content: React.ReactNode;
}

interface TabsProps {
	items: TabItem[];
	defaultTab?: string;
}

export default function Tabs({ items, defaultTab }: TabsProps) {
	const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

	return (
		<div className="my-8 rounded-xl border border-gray-700 bg-gray-950/30 overflow-hidden">
			{/* Tab Headers */}
			<div className="flex border-b border-gray-700 bg-gray-900/50 overflow-x-auto">
				{items.map((item) => (
					<button
						key={item.id}
						type="button"
						onClick={() => setActiveTab(item.id)}
						className={`px-6 py-4 font-mono text-sm font-black uppercase tracking-wide transition-all duration-200 whitespace-nowrap border-b-4 ${activeTab === item.id
							? "border-black text-black bg-white"
							: "border-transparent text-black hover:text-red-500 hover:border-red-500"
							}`}
					>
						{item.title}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="p-6">
				{items.map((item) => (
					<div
						key={item.id}
						className={`transition-all duration-300 ${activeTab === item.id
							? "block opacity-100"
							: "hidden opacity-0"
							}`}
					>
						{item.content}
					</div>
				))}
			</div>
		</div>
	);
}