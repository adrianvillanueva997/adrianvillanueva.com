import Link from "next/link";

export default function NotFound() {
  return (
			<section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
				<h1 className="text-6xl font-bold tracking-tighter mb-4 animate-fade-in">
					404
				</h1>
				<h2 className="text-2xl font-medium mb-8 text-neutral-800 dark:text-neutral-200">
					Oops! Page Not Found
				</h2>
				<p className="mb-8 text-neutral-600 dark:text-neutral-400 max-w-md">
					Sorry, the page you're looking for seems to have wandered off. Let's
					get you back on track.
				</p>
				<Link
					href="/"
					className="px-6 py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100
                   text-neutral-100 dark:text-neutral-900 hover:opacity-90
                   transition-opacity"
				>
					Return Home
				</Link>
			</section>
		);
}
