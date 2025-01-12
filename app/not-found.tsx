import Link from "next/link";

export default function NotFound() {
	return (
		<section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
			<div className="animate-bounce mb-8 text-8xl">☠️</div>
			<h1 className="text-7xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text animate-fade-in">
				YOU DIED
			</h1>
			<h2 className="text-3xl font-medium mb-8 text-neutral-800 dark:text-neutral-200 animate-fade-in [animation-delay:200ms]">
				404 - PAGE NOT FOUND
			</h2>
			<p className="mb-8 text-neutral-600 dark:text-neutral-400 max-w-md animate-fade-in [animation-delay:400ms]">
				Tarnished, it seems you've wandered into the Lands Between. This path
				leads only to darkness.
			</p>
			<Link
				href="/"
				className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-700
                 text-white font-medium hover:scale-105 transition-all duration-200
                 animate-fade-in [animation-delay:600ms] hover:shadow-lg"
			>
				<span className="relative z-10">← Return to Site of Grace</span>
			</Link>
		</section>
	);
}