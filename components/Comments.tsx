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
		<div className="mt-12 border-t-4 border-black pt-8">
			{loadComments ? (
				<div className="relative">
					<div className="absolute -top-4 left-0 w-16 h-1 bg-red-500" />
					<CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
				</div>
			) : (
				<div className="text-center">
					<button
						type="button"
						onClick={() => setLoadComments(true)}
						className="group inline-flex items-center px-6 py-3 bg-white hover:bg-red-500 border-4 border-black text-black hover:text-white font-mono text-sm uppercase tracking-wide transition-all duration-200 font-black"
					>
						<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
						</svg>
						LOAD COMMENTS
					</button>
				</div>
			)}
		</div>
	);
}
