import Link from "@/components/Link"

export default function NotFound() {
	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden bg-gray-950">
			{/* Synthwave grid background */}
			<div className="absolute inset-0 synthwave-grid opacity-20" />

			{/* Animated scanning lines */}
			<div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan to-transparent animate-synthwave-scan" />
			<div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent animate-synthwave-scan delay-1000" />

			{/* Glitch overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-neon-cyan/10 animate-doom-pulse" />

			<div className="relative z-10 space-y-8 max-w-4xl">
				{/* 404 with glitch effect */}
				<div className="relative">
					<h1 className="text-8xl md:text-[12rem] lg:text-[16rem] font-doom font-black tracking-tight text-primary-500 animate-doom-pulse drop-shadow-2xl">
						404
					</h1>
					{/* Glitch layers */}
					<h1 className="absolute top-0 left-0 text-8xl md:text-[12rem] lg:text-[16rem] font-doom font-black tracking-tight text-neon-cyan opacity-30 transform translate-x-1 translate-y-1 animate-pulse">
						404
					</h1>
					<h1 className="absolute top-0 left-0 text-8xl md:text-[12rem] lg:text-[16rem] font-doom font-black tracking-tight text-neon-purple opacity-20 transform -translate-x-1 -translate-y-1 animate-pulse delay-150">
						404
					</h1>
				</div>

				{/* Error messages with terminal styling */}
				<div className="space-y-6 font-mono">
					<div className="border border-primary-500 bg-gray-950/80 p-6 rounded-lg border-glow-subtle">
						<p className="text-primary-400 text-sm mb-2">[ERROR] SYSTEM_FAILURE</p>
						<p className="text-2xl md:text-3xl font-bold text-neon-cyan mb-4">
							VOID.EXE HAS CONSUMED THIS PAGE
						</p>
						<p className="text-gray-300 text-lg">
							The requested resource has been <span className="text-primary-500 font-bold">TERMINATED</span> or never existed in this reality.
						</p>
					</div>

					<div className="text-left space-y-2 text-sm text-gray-400">
						<p><span className="text-neon-cyan">&gt;</span> Checking backup dimensions... <span className="text-primary-500">[FAILED]</span></p>
						<p><span className="text-neon-cyan">&gt;</span> Consulting the code gods... <span className="text-primary-500">[NO RESPONSE]</span></p>
						<p><span className="text-neon-cyan">&gt;</span> Reality integrity... <span className="text-neon-green">[STABLE]</span></p>
					</div>
				</div>

				{/* Navigation buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
					<Link
						href="/"
						className="group inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-400 font-doom font-bold uppercase tracking-wide rounded-lg hover:bg-primary-500 hover:text-gray-900 transition-all duration-300 doom-glow"
					>
						<span className="mr-2">&lt;</span>
						RETURN_TO_ORIGIN
						<span className="ml-2 group-hover:translate-x-1 transition-transform">/&gt;</span>
					</Link>

					<Link
						href="/blog"
						className="group inline-flex items-center px-6 py-3 border-2 border-neon-cyan text-neon-cyan font-doom font-bold uppercase tracking-wide rounded-lg hover:bg-neon-cyan hover:text-gray-900 transition-all duration-300 synthwave-glow"
					>
						<span className="mr-2">[</span>
						BROWSE_ARCHIVES
						<span className="ml-2 group-hover:translate-x-1 transition-transform">]</span>
					</Link>
				</div>

				{/* Terminal cursor */}
				<div className="flex justify-center items-center pt-8">
					<span className="text-neon-cyan font-mono text-xl animate-pulse">_</span>
				</div>
			</div>
		</div>
	)
}