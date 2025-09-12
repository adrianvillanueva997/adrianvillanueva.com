"use client";

import siteMetadata from "@/data/siteMetadata";
import { Comments as CommentsComponent } from "pliny/comments";
import { useState } from "react";

export default function Comments({ slug }: { slug: string }) {
	const [loadComments, setLoadComments] = useState(false);

	if (!siteMetadata.comments?.provider) {
		return null;
	}
	return (
		<div className="mt-12 border-t border-gray-700 pt-8">
			{loadComments ? (
				<div className="relative">
					<div className="absolute -top-4 left-0 w-16 h-px bg-gradient-to-r from-[#ff3860] to-transparent" />
					<CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
				</div>
			) : (
				<div className="text-center">
					<button
						type="button"
						onClick={() => setLoadComments(true)}
						className="group inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-[#00ff99] hover:border-[#ff3860] text-[#00ff99] hover:text-[#ff3860] rounded-lg font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#ff3860]/20"
					>
						<svg className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
						</svg>
						Load Comments
					</button>
				</div>
			)}
		</div>
	);
}
