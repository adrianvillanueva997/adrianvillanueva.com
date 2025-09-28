"use client";

import Link from "@/components/Link";
import type { Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";

interface BlogLayoutProps {
    posts: CoreContent<Blog>[];
    title: string;
    description?: string;
}

export default function BlogLayout({
    posts,
    title,
    description,
}: BlogLayoutProps) {
    return (
        <>
            {/* Simple Header */}
            <section className="mb-12 px-4 sm:px-6 md:px-10 bg-white py-8">
                <div className="flex items-start justify-between">
                    <div className="flex-grow">
                        <h1 className="text-4xl md:text-5xl font-black font-mono text-black uppercase mb-6">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-lg text-black font-mono mb-8 max-w-2xl">
                                {description}
                            </p>
                        )}
                    </div>
                    
                    {/* RSS Icon in corner */}
                    <div className="ml-8 mt-2">
                        <a
                            href="/feed.xml"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 border-2 border-black bg-white hover:bg-red-500 text-black hover:text-white transition-colors duration-200"
                            aria-label="RSS Feed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                            >
                                <title>RSS Feed</title>
                                <path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" />
                                <path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z" />
                                <circle cx="6" cy="18" r="2" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Posts List */}
            <div className="px-4 sm:px-6 md:px-10 bg-white">
                {posts.length === 0 ? (
                    <div className="border-2 border-black bg-white p-8 text-center">
                        <h2 className="text-2xl font-black font-mono text-black mb-2">NO POSTS</h2>
                        <p className="font-mono text-black">Nothing here yet.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {posts.map((post) => {
                            const { slug, date, title } = post;
                            const postDate = new Date(date);
                            const formattedDate = `${postDate.getFullYear()}.${(postDate.getMonth() + 1).toString().padStart(2, '0')}.${postDate.getDate().toString().padStart(2, '0')}`;

                            return (
                                <Link key={slug} href={`/blog/${slug}`}>
                                    <article className="border-2 border-black bg-white hover:bg-red-500 transition-colors duration-200 p-5">
                                        <div className="flex items-center">
                                            <time
                                                dateTime={date}
                                                className="text-sm font-mono font-bold text-black hover:text-white mr-8 flex-shrink-0 w-24"
                                            >
                                                {formattedDate}
                                            </time>
                                            <h3 className="text-lg font-black font-mono uppercase text-black hover:text-white leading-tight">
                                                {title}
                                            </h3>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}