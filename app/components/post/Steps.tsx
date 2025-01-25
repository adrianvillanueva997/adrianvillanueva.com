import React from "react";

export function Steps({ children }: { children: React.ReactNode }) {
	return (
		<div className="ml-4 mb-4 border-l-2 border-cyan-800/30">
			{React.Children.map(children, (child, index) => (
				<div className="ml-4 mt-4 relative">
					<div className="absolute -left-[21px] -top-1 bg-gray-900 p-1 rounded-full">
						<div className="w-4 h-4 rounded-full bg-cyan-900/30 flex items-center justify-center text-xs">
							{index + 1}
						</div>
					</div>
					{child}
				</div>
			))}
		</div>
	);
}