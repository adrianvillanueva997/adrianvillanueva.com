import React from "react";

export function Steps({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative ml-4 mb-8 border-l-2 border-cyan-800/30">
			{React.Children.map(children, (child, index) => (
				<div
					className="group ml-6 mt-6 relative
            first:mt-0 last:mb-0
            hover:translate-x-1 transition-transform duration-200"
				>
					{/* Connecting line */}
					<div
						className="absolute -left-[26px] top-0 h-full w-0.5
              bg-gradient-to-b from-cyan-500/20 to-transparent"
					/>

					{/* Step number circle */}
					<div
						className="absolute -left-[34px] -top-1
              bg-gray-900 p-1.5 rounded-full
              ring-2 ring-cyan-800/30 ring-offset-2 ring-offset-gray-900
              group-hover:ring-cyan-600/50 transition-all duration-200"
					>
						<div
							className="w-5 h-5 rounded-full
                bg-gradient-to-br from-cyan-900/80 to-cyan-800/30
                flex items-center justify-center
                text-xs font-medium text-cyan-100"
						>
							{index + 1}
						</div>
					</div>

					{/* Content */}
					<div
						className="p-4 rounded-lg
              bg-cyan-900/10 hover:bg-cyan-900/20
              border border-cyan-800/30 hover:border-cyan-700/50
              transition-colors duration-200"
					>
						{child}
					</div>
				</div>
			))}
		</div>
	);
}
