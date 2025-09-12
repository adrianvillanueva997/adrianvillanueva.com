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
		<div className="divide-y divide-primary-700">
			<Script id="author-jsonld" type="application/ld+json" strategy="afterInteractive">
				{JSON.stringify(personSchema)}
			</Script>
			<section className="relative overflow-hidden pt-6 pb-8 md:space-y-5">
				<div className="absolute inset-0 synthwave-grid opacity-10" />
				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent animate-pulse" />
				<div className="relative z-10 space-y-2">
					<div className="font-mono text-xs text-primary-500 mb-2 opacity-70">
						&gt; ACCESSING PERSONNEL FILES... [████████████] 100%
					</div>
					<h1 className="text-3xl leading-9 font-doom font-extrabold tracking-tight text-primary-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 glow-text-subtle animate-doom-pulse">
						PROFILE_DATA
					</h1>
					<div className="font-mono text-xs text-green-400 opacity-60">
						&gt; CLEARANCE_LEVEL: LAMBDA | STATUS: [ACTIVE]
					</div>
				</div>
			</section>
			<div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
				<div className="flex flex-col items-center space-x-2 pt-8">
					{avatar && (
						<div className="relative group">
							<div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-green-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur animate-pulse" />
							<Image
								src={avatar}
								alt="avatar"
								width={192}
								height={192}
								className="relative h-48 w-48 rounded-full border-2 border-primary-500 border-glow grayscale contrast-125 hover:contrast-150 transition-all duration-300"
							/>
							<div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-900/20 via-transparent to-primary-500/20" />
							<div className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
						</div>
					)}
					<div className="font-mono text-xs text-green-400 mt-2 opacity-70">
						&gt; BIOMETRIC_SCAN: [VERIFIED]
					</div>
					<h3 className="pt-2 pb-2 text-2xl leading-8 font-doom font-bold tracking-tight text-primary-400 uppercase">
						{name}
					</h3>
					<div className="text-gray-300 font-mono text-center text-sm">
						<span className="text-primary-400">[CLASSIFICATION]</span> {occupation}
					</div>
					<div className="text-gray-300 font-mono text-center text-sm">
						<span className="text-primary-400">[FACILITY]</span> {company}
					</div>
					<div className="font-mono text-xs text-orange-400 mt-1 opacity-60">
						&gt; SECURITY_CLEARANCE: LAMBDA
					</div>
					<div className="flex space-x-3 pt-6">
						<SocialIcon kind="mail" href={`mailto:${email}`} />
						<SocialIcon kind="github" href={github} />
						<SocialIcon kind="linkedin" href={linkedin} />
						<SocialIcon kind="x" href={twitter} />
						<SocialIcon kind="bluesky" href={bluesky} />
					</div>
				</div>
				<div className="prose prose-invert max-w-none pt-8 pb-8 xl:col-span-2 bg-gray-950 border border-primary-700 rounded-lg p-6 border-glow-subtle relative overflow-hidden">
					<div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 via-green-400 to-primary-600 animate-pulse" />
					<div className="absolute bottom-0 right-0 w-20 h-20 bg-primary-900/10 rounded-tl-full" />
					<div className="font-mono text-xs text-primary-500 mb-4 opacity-70">
						&gt; ACCESSING_DATABASE... [████████████] 100%
					</div>
					{children}
					<div className="font-mono text-xs text-primary-500 mt-6 opacity-50 border-t border-primary-800 pt-2">
						&gt; END_OF_FILE
					</div>
				</div>
			</div>
		</div>
	);
}
