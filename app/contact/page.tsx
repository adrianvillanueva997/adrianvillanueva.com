"use client";

import siteMetadata from "@/data/siteMetadata";
import { genPageMetadata } from "app/seo";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const _metadata = genPageMetadata({ title: "Contact" });

export default function ContactPage() {
	return (
		<div className="bg-white min-h-screen">
			{/* Header */}
			<section className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
				<div className="text-center max-w-5xl mx-auto">
					<h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase mb-8">
						CONTACT
					</h1>
					<div className="border-4 border-black bg-white p-8 max-w-3xl mx-auto">
						<p className="text-xl font-mono text-black leading-relaxed font-medium">
							Get in touch. I'm always open to interesting conversations and opportunities.
						</p>
					</div>
				</div>
			</section>

			{/* Content */}
			<div className="px-4 sm:px-6 md:px-10 bg-gray-50 py-16">
				<div className="max-w-4xl mx-auto">
					{/* Contact Information */}
					<div className="space-y-8">
						<div className="border-4 border-black bg-white p-8">
							<h2 className="text-2xl font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
								CONTACT CHANNELS
							</h2>

							<div className="space-y-6">
								{siteMetadata.email && (
									<div className="flex items-center border-2 border-black bg-gray-100 p-4">
										<FaEnvelope className="text-red-500 text-xl mr-4" />
										<div>
											<h3 className="font-mono font-black text-black uppercase text-sm mb-1">
												EMAIL
											</h3>
											<a
												href={`mailto:${siteMetadata.email}`}
												className="font-mono text-black hover:text-red-500 transition-colors"
											>
												{siteMetadata.email}
											</a>
										</div>
									</div>
								)}

								{siteMetadata.github && (
									<div className="flex items-center border-2 border-black bg-gray-100 p-4">
										<FaGithub className="text-red-500 text-xl mr-4" />
										<div>
											<h3 className="font-mono font-black text-black uppercase text-sm mb-1">
												GITHUB
											</h3>
											<a
												href={siteMetadata.github}
												target="_blank"
												rel="noopener noreferrer"
												className="font-mono text-black hover:text-red-500 transition-colors"
											>
												{siteMetadata.github.replace("https://github.com/", "@")}
											</a>
										</div>
									</div>
								)}

								{siteMetadata.linkedin && (
									<div className="flex items-center border-2 border-black bg-gray-100 p-4">
										<FaLinkedin className="text-red-500 text-xl mr-4" />
										<div>
											<h3 className="font-mono font-black text-black uppercase text-sm mb-1">
												LINKEDIN
											</h3>
											<a
												href={siteMetadata.linkedin}
												target="_blank"
												rel="noopener noreferrer"
												className="font-mono text-black hover:text-red-500 transition-colors"
											>
												Connect on LinkedIn
											</a>
										</div>
									</div>
								)}

								{siteMetadata.twitter && (
									<div className="flex items-center border-2 border-black bg-gray-100 p-4">
										<FaTwitter className="text-red-500 text-xl mr-4" />
										<div>
											<h3 className="font-mono font-black text-black uppercase text-sm mb-1">
												TWITTER
											</h3>
											<a
												href={siteMetadata.twitter}
												target="_blank"
												rel="noopener noreferrer"
												className="font-mono text-black hover:text-red-500 transition-colors"
											>
												{siteMetadata.twitter.replace("https://twitter.com/", "@")}
											</a>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Quick Info */}
						<div className="border-4 border-black bg-white p-8">
							<h2 className="text-2xl font-black font-mono text-black uppercase mb-6 border-b-4 border-black pb-4">
								QUICK INFO
							</h2>
							<div className="space-y-4">
								<div className="border-2 border-black bg-yellow-300 p-4">
									<p className="font-mono font-black text-black uppercase text-sm mb-2">
										LOCATION
									</p>
									<p className="font-mono text-black">
										Tokyo, Japan 🇯🇵
									</p>
								</div>
								<div className="border-2 border-black bg-yellow-300 p-4">
									<p className="font-mono font-black text-black uppercase text-sm mb-2">
										RESPONSE TIME
									</p>
									<p className="font-mono text-black">
										Usually within 24 hours
									</p>
								</div>
							</div>
						</div>


					</div>
				</div>
			</div>
		</div>
	);
}
