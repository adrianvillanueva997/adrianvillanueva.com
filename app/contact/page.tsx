"use client";

import { genPageMetadata } from "app/seo";
import { useState } from "react";
import siteMetadata from "@/data/siteMetadata";

const _metadata = genPageMetadata({ title: "Contact" });

export default function ContactPage() {
	const [_name, _setName] = useState("");
	const [_email, _setEmail] = useState("");
	const [_subject, _setSubject] = useState("");
	const [_message, _setMessage] = useState("");
	const [_submitted, _setSubmitted] = useState(false);
	const [_submitting, _setSubmitting] = useState(false);
	const [_error, _setError] = useState("");

	return (
		<>
			<div className="divide-y divide-gray-200 dark:divide-gray-700">
				<div className="space-y-2 pb-8 pt-6 md:space-y-5">
					<h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
						Contact
					</h1>
					<p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
						I'd love to hear from you!
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Contact Information */}
				<div>
					<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
						Get in Touch
					</h2>

					<div className="space-y-4 mb-6">
						{siteMetadata.email && (
							<div className="flex items-start">
								<div className="text-primary-500 mt-1 mr-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<div>
									<h3 className="text-md font-medium text-gray-900 dark:text-gray-100">
										Email
									</h3>
									<p className="text-gray-600 dark:text-gray-400">
										<a
											href={`mailto:${siteMetadata.email}`}
											className="hover:text-primary-500"
										>
											{siteMetadata.email}
										</a>
									</p>
								</div>
							</div>
						)}

						{siteMetadata.github && (
							<div className="flex items-start">
								<div className="text-primary-500 mt-1 mr-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
								</div>
								<div>
									<h3 className="text-md font-medium text-gray-900 dark:text-gray-100">
										GitHub
									</h3>
									<p className="text-gray-600 dark:text-gray-400">
										<a
											href={siteMetadata.github}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary-500"
										>
											{siteMetadata.github.replace("https://github.com/", "@")}
										</a>
									</p>
								</div>
							</div>
						)}

						{siteMetadata.linkedin && (
							<div className="flex items-start">
								<div className="text-primary-500 mt-1 mr-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
									</svg>
								</div>
								<div>
									<h3 className="text-md font-medium text-gray-900 dark:text-gray-100">
										LinkedIn
									</h3>
									<p className="text-gray-600 dark:text-gray-400">
										<a
											href={siteMetadata.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary-500"
										>
											Connect on LinkedIn
										</a>
									</p>
								</div>
							</div>
						)}

						{siteMetadata.twitter && (
							<div className="flex items-start">
								<div className="text-primary-500 mt-1 mr-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
									</svg>
								</div>
								<div>
									<h3 className="text-md font-medium text-gray-900 dark:text-gray-100">
										Twitter
									</h3>
									<p className="text-gray-600 dark:text-gray-400">
										<a
											href={siteMetadata.twitter}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary-500"
										>
											{siteMetadata.twitter.replace(
												"https://twitter.com/",
												"@",
											)}
										</a>
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
