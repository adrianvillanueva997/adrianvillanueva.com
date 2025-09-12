interface TableWrapperProps {
	children: React.ReactNode;
	title?: string;
}

const TableWrapper = ({ children, title }: TableWrapperProps) => {
	return (
		<div className="my-6 rounded-xl border border-gray-700 bg-gray-950/30 overflow-hidden">
			{title && (
				<div className="px-4 py-3 border-b border-gray-700 bg-gray-900/50">
					<h3 className="text-lg font-mono font-semibold text-[#00ff99] uppercase tracking-wide">
						{title}
					</h3>
				</div>
			)}
			<div className="w-full overflow-x-auto">
				<table className="w-full text-sm font-mono">
					{children}
				</table>
			</div>
		</div>
	);
};

export default TableWrapper;
