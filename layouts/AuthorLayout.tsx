import Image from "@/components/Image";
import SocialIcon from "@/components/social-icons";
import siteMetadata from '@/data/siteMetadata';
import type { Authors } from "contentlayer/generated";
import Script from "next/script";
import type { ReactNode } from "react";
import { FaBuilding, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";

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
		<div className="bg-white min-h-screen">
			<Script id="author-jsonld" type="application/ld+json" strategy="afterInteractive">
				{JSON.stringify(personSchema)}
			</Script>

			{/* Header */}
			<section className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
				<div className="text-center max-w-5xl mx-auto">
					<h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase mb-8">
						ABOUT
					</h1>
					<div className="border-4 border-black bg-white p-8 max-w-3xl mx-auto">
						<p className="text-xl font-mono text-black leading-relaxed font-medium">
							Software Engineer & Systems Designer building cloud-native data platforms.
						</p>
					</div>
				</div>
			</section>

			{/* Content */}
			<div className="px-4 sm:px-6 md:px-10 bg-gray-50 py-16">
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

					{/* Profile Section */}
					<div className="lg:col-span-1">
						<div className="border-4 border-black bg-white p-8 sticky top-8">
							{/* Avatar */}
							{avatar && (
								<div className="text-center mb-8">
									<div className="inline-block border-4 border-black">
										<Image
											src={avatar}
											alt="Profile"
											width={200}
											height={200}
											className="w-full h-auto"
										/>
									</div>
								</div>
							)}

							{/* Name */}
							<div className="text-center mb-8">
								<h2 className="text-2xl font-black font-mono text-black uppercase mb-4 border-b-4 border-black pb-4">
									{name}
								</h2>
							</div>

							{/* Info Cards */}
							<div className="space-y-4">
								<div className="border-2 border-black bg-gray-100 p-4">
									<div className="flex items-center mb-2">
										<FaUserTie className="text-red-500 mr-3" />
										<h3 className="font-mono font-black text-black uppercase text-sm">
											OCCUPATION
										</h3>
									</div>
									<p className="font-mono text-black">
										{occupation}
									</p>
								</div>

								{company && (
									<div className="border-2 border-black bg-gray-100 p-4">
										<div className="flex items-center mb-2">
											<FaBuilding className="text-red-500 mr-3" />
											<h3 className="font-mono font-black text-black uppercase text-sm">
												COMPANY
											</h3>
										</div>
										<p className="font-mono text-black">
											{company}
										</p>
									</div>
								)}

								<div className="border-2 border-black bg-yellow-300 p-4">
									<div className="flex items-center mb-2">
										<FaMapMarkerAlt className="text-red-500 mr-3" />
										<h3 className="font-mono font-black text-black uppercase text-sm">
											LOCATION
										</h3>
									</div>
									<p className="font-mono text-black">
										Tokyo, Japan 🇯🇵
									</p>
								</div>
							</div>

							{/* Social Links */}
							<div className="mt-8 pt-8 border-t-4 border-black">
								<h3 className="font-mono font-black text-black uppercase text-sm mb-4">
									CONNECT
								</h3>
								<div className="flex flex-wrap gap-3">
									{email && (
										<div className="border-2 border-black bg-gray-100 p-2 hover:bg-red-500 hover:text-white transition-colors">
											<SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
										</div>
									)}
									{github && (
										<div className="border-2 border-black bg-gray-100 p-2 hover:bg-red-500 hover:text-white transition-colors">
											<SocialIcon kind="github" href={github} size={5} />
										</div>
									)}
									{linkedin && (
										<div className="border-2 border-black bg-gray-100 p-2 hover:bg-red-500 hover:text-white transition-colors">
											<SocialIcon kind="linkedin" href={linkedin} size={5} />
										</div>
									)}
									{twitter && (
										<div className="border-2 border-black bg-gray-100 p-2 hover:bg-red-500 hover:text-white transition-colors">
											<SocialIcon kind="x" href={twitter} size={5} />
										</div>
									)}
									{bluesky && (
										<div className="border-2 border-black bg-gray-100 p-2 hover:bg-red-500 hover:text-white transition-colors">
											<SocialIcon kind="bluesky" href={bluesky} size={5} />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Content Section */}
					<div className="lg:col-span-2">
						<div className="border-4 border-black bg-white p-8">
							<div className="prose prose-lg max-w-none
								prose-headings:font-mono prose-headings:font-black prose-headings:uppercase prose-headings:text-black prose-headings:border-b-4 prose-headings:border-black prose-headings:pb-4 prose-headings:mb-6
								prose-p:font-mono prose-p:text-black prose-p:leading-relaxed
								prose-strong:font-black prose-strong:text-black
								prose-code:font-mono prose-code:bg-yellow-300 prose-code:text-black prose-code:px-2 prose-code:py-1 prose-code:border prose-code:border-black prose-code:rounded-none prose-code:before:content-none prose-code:after:content-none
								prose-pre:bg-black prose-pre:text-green-400 prose-pre:border-4 prose-pre:border-black prose-pre:p-6 prose-pre:font-mono
								prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:bg-gray-100 prose-blockquote:p-4 prose-blockquote:font-mono prose-blockquote:text-black prose-blockquote:italic-0
								prose-ul:font-mono prose-ul:text-black
								prose-li:text-black prose-li:font-mono
								prose-a:text-red-500 prose-a:font-mono prose-a:font-black prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-4 prose-a:transition-all
								prose-hr:border-4 prose-hr:border-black prose-hr:my-8
							">
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
