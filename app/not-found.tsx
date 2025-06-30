import Link from "@/components/Link"

export default function NotFound() {
	return (
		<div className="relative min-h-[60vh] flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-16 text-center md:text-left overflow-hidden bg-gray-50 dark:bg-gray-950">
			{/* Animated void background */}
			<div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-70 animate-voidPulse blur-3xl" />

			<div className="relative z-10 md:border-r-2 md:pr-8 border-gray-200 dark:border-gray-700">
				<h1 className="text-7xl md:text-9xl font-extrabold tracking-tight text-primary-600 dark:text-primary-500 animate-pulse drop-shadow-lg">
					404
				</h1>
			</div>

			<div className="relative z-10 max-w-lg space-y-4">
				<p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
					The void has consumed this page.
				</p>
				<p className="text-gray-600 dark:text-gray-400">
					Either it never existed, or it’s been sacrificed to the code gods.
				</p>

				<Link
					href="/"
					className="inline-block mt-4 px-6 py-2 rounded-md bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-500 text-white font-medium transition-all duration-200 shadow-md"
				>
					Return to the realm
				</Link>
			</div>
		</div>
	)
}