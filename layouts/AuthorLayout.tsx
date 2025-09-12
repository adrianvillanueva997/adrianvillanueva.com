import Image from "@/components/Image";
import SocialIcon from "@/components/social-icons";
import siteMetadata from '@/data/siteMetadata';
import type { Authors } from "contentlayer/generated";
import Script from "next/script";
import type { ReactNode } from "react";
interface Props {
	children: ReactNode;
	content: Omit<Authors, "_id" | "_raw" | "body">;
}

export default function AuthorLayout({ children, content }: Props) {
	const {
		name,
		avatar,
		occupation,
		company,
		email,
		twitter,
		bluesky,
		linkedin,
		github,
	} = content;

	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: name,
		image: avatar,
		jobTitle: occupation,
		worksFor: company ? { "@type": "Organization", name: company } : undefined,
		email: email ? `mailto:${email}` : undefined,
		sameAs: [twitter, linkedin, github, bluesky].filter(Boolean),
		url: `${siteMetadata.siteUrl}/about`,
	};

	return (
		<div className="divide-y divide-primary-700/30">
			<Script id="author-jsonld" type="application/ld+json" strategy="afterInteractive">
				{JSON.stringify(personSchema)}
			</Script>
			<section className="relative overflow-hidden pt-6 pb-8 md:space-y-5">
				{/* Enhanced background effects */}
				<div className="absolute inset-0 synthwave-grid opacity-5" />
				<div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-blue-900/10" />

				{/* Animated scan lines */}
				<div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse" />
				<div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse delay-700" />

				{/* Floating particles effect */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-500/40 rounded-full animate-ping delay-1000" />
					<div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-500/40 rounded-full animate-ping delay-2000" />
					<div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-green-500/40 rounded-full animate-ping delay-3000" />
				</div>

				<div className="relative z-10 space-y-4">
					<div className="font-mono text-xs text-orange-400/80 mb-2 flex items-center space-x-2">
						<span className="animate-pulse">&gt;</span>
						<span>ACCESSING PERSONNEL FILES...</span>
						<div className="flex space-x-1">
							<div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
							<div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse delay-100" />
							<div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse delay-200" />
						</div>
						<span className="text-green-400">[████████████] 100%</span>
					</div>
					<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 drop-shadow-lg">
						PROFILE_DATA
					</h1>
					<div className="font-mono text-xs text-green-400/80 flex items-center space-x-4">
						<span>&gt; CLEARANCE_LEVEL: <span className="text-orange-400 font-bold">LAMBDA</span></span>
						<span className="text-blue-400">|</span>
						<span>STATUS: <span className="text-green-500 animate-pulse">[ACTIVE]</span></span>
					</div>
				</div>
			</section>
			<div className="items-start space-y-8 xl:grid xl:grid-cols-3 xl:gap-x-12 xl:space-y-0">
				<div className="flex flex-col items-center pt-8">
					{avatar && (
						<div className="relative group mb-6">
							{/* Enhanced glow effect */}
							<div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 via-red-500/20 to-blue-500/30 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-500 blur-lg animate-pulse" />
							<div className="absolute -inset-1 bg-gradient-to-r from-orange-600/50 to-blue-600/50 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-300 blur" />

							{/* Main avatar */}
							<Image
								src={avatar}
								alt="avatar"
								width={192}
								height={192}
								className="relative h-48 w-48 rounded-full border-2 border-orange-500/60 shadow-2xl shadow-orange-500/20 filter grayscale contrast-125 hover:contrast-150 hover:grayscale-0 transition-all duration-500"
							/>

							{/* Overlay effects */}
							<div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-900/10 via-transparent to-blue-900/10" />
							<div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 border border-green-300" />

							{/* Scanning line effect */}
							<div className="absolute inset-0 rounded-full overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse group-hover:animate-none" />
							</div>
						</div>
					)}

					{/* Status indicators */}
					<div className="space-y-3 text-center">
						<div className="font-mono text-xs text-green-400/80 bg-gray-950/50 px-3 py-1 rounded border border-green-500/20">
							&gt; BIOMETRIC_SCAN: <span className="text-green-400 font-bold">[VERIFIED]</span>
						</div>

						<h3 className="text-2xl leading-8 font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 uppercase">
							{name}
						</h3>

						<div className="space-y-2 text-sm">
							<div className="text-gray-300 font-mono bg-gray-950/30 px-3 py-1 rounded border border-orange-500/20">
								<span className="text-orange-400">[ROLE]</span> {occupation}
							</div>
							{company && (
								<div className="text-gray-300 font-mono bg-gray-950/30 px-3 py-1 rounded border border-blue-500/20">
									<span className="text-blue-400">[FACILITY]</span> {company}
								</div>
							)}
						</div>

						<div className="font-mono text-xs text-orange-400/60 bg-gray-950/50 px-3 py-1 rounded border border-orange-500/20">
							&gt; SECURITY_CLEARANCE: <span className="text-orange-400 font-bold">LAMBDA</span>
						</div>
					</div>

					{/* Social links with enhanced styling */}
					<div className="flex space-x-4 pt-6">
						<SocialIcon kind="mail" href={`mailto:${email}`} />
						<SocialIcon kind="github" href={github} />
						<SocialIcon kind="linkedin" href={linkedin} />
						<SocialIcon kind="x" href={twitter} />
						<SocialIcon kind="bluesky" href={bluesky} />
					</div>
				</div>
				<div className="prose prose-invert max-w-none pt-8 pb-8 xl:col-span-2 bg-gradient-to-br from-gray-950 via-gray-950 to-gray-900 border border-orange-500/20 rounded-xl p-8 relative overflow-hidden shadow-2xl shadow-orange-500/10">
					{/* Enhanced background effects */}
					<div className="absolute inset-0 bg-gradient-to-br from-orange-900/5 via-transparent to-blue-900/5" />
					<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-orange-500/60 via-yellow-400/40 to-orange-500/60 animate-pulse" />
					<div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-blue-500/60 via-purple-400/40 to-blue-500/60 animate-pulse delay-1000" />

					{/* Corner decorative elements */}
					<div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full" />
					<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full" />

					{/* Floating particles */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-1/3 left-1/4 w-0.5 h-0.5 bg-orange-400/60 rounded-full animate-ping delay-500" />
						<div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-blue-400/60 rounded-full animate-ping delay-1500" />
						<div className="absolute bottom-1/3 left-2/3 w-0.5 h-0.5 bg-green-400/60 rounded-full animate-ping delay-2500" />
					</div>

					{/* Header */}
					<div className="relative z-10 font-mono text-xs text-orange-400/80 mb-6 flex items-center space-x-2 bg-gray-950/50 px-4 py-2 rounded border border-orange-500/20">
						<span className="animate-pulse">&gt;</span>
						<span>ACCESSING_DATABASE...</span>
						<div className="flex space-x-1 ml-2">
							<div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
							<div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse delay-100" />
							<div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse delay-200" />
						</div>
						<span className="text-green-400 font-bold">[████████████] 100%</span>
					</div>

					{/* Content area with enhanced styling */}
					<div className="relative z-10">
						{children}
					</div>

					{/* Footer */}
					<div className="relative z-10 font-mono text-xs text-orange-400/50 mt-8 pt-4 border-t border-orange-500/20 bg-gray-950/30 px-4 py-2 rounded">
						&gt; END_OF_TRANSMISSION
					</div>
				</div>
			</div>
		</div>
	);
}
