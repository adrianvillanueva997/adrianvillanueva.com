interface PostTitleProps {
	title: string;
	draft?: boolean;
}

export function PostTitle({ title, draft }: PostTitleProps) {
	return (
		<h1 className="text-3xl font-bold tracking-tight mb-4">
			{draft && (
				<span className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-md mr-2">
					Draft
				</span>
			)}
			{title}
		</h1>
	);
}