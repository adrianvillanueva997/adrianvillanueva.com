interface TableWrapperProps {
	children: React.ReactNode;
	title?: string;
}

const TableWrapper = ({ children, title }: TableWrapperProps) => {
	return (
		<div className="my-6 border-4 border-black bg-white overflow-hidden">
			{title && (
				<div className="px-4 py-3 border-b-4 border-black bg-white">
					<h3 className="text-lg font-mono font-black text-black uppercase tracking-wide">
						{title}
					</h3>
				</div>
			)}
			<div className="w-full overflow-x-auto">
				<table className="w-full text-sm font-mono text-black">
					{children}
				</table>
			</div>
		</div>
	);
};

export default TableWrapper;
