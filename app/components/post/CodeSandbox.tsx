export function CodeSandbox({ id }: { id: string }) {
	return (
		<iframe
			title="CodeSandbox"
			src={`https://codesandbox.io/embed/${id}`}
			className="w-full h-[500px] rounded-lg border border-cyan-800/30"
			allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
			sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"
		/>
	);
}