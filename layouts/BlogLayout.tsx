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
            <section className="px-4 sm:px-6 md:px-10 bg-white py-8 border-b-2 border-black relative overflow-hidden">
                {/* Brutalist decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500 transform rotate-45 translate-x-8 -translate-y-8" />
                <div className="absolute top-4 left-1/3 w-2 h-8 bg-black" />
                <div className="absolute bottom-4 right-1/4 w-8 h-2 bg-black" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 relative z-10">
                    <div className="flex-grow">
                        <div className="relative">
                            <h1 className="text-4xl md:text-5xl font-black font-mono text-black uppercase mb-6 relative">
                                {title}
                                {/* Underline accent */}
                                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-red-500" />
                                {/* Corner accent */}
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-black transform rotate-45" />
                            </h1>
                        </div>
                        {description && (
                            <div className="relative border-l-4 border-black pl-6">
                                <p className="text-lg text-black font-mono max-w-2xl leading-relaxed">
                                    {description}
                                </p>
                                {/* Small accent square */}
                                <div className="absolute -left-2 top-0 w-4 h-4 bg-red-500" />
                            </div>
                        )}
                    </div>

                    {/* RSS Icon */}
                    <div className="flex-shrink-0">
                        <a
                            href="/feed.xml"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block p-3 border-2 border-black bg-white hover:bg-red-500 text-black hover:text-white transition-colors duration-200"
                            aria-label="RSS Feed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
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
            <div className="px-4 sm:px-6 md:px-10 bg-white pt-8 pb-12">
                {posts.length === 0 ? (
                    <div className="border-2 border-black bg-white p-8 text-center">
                        <h2 className="text-2xl font-black font-mono text-black mb-2">NO POSTS</h2>
                        <p className="font-mono text-black">Nothing here yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {posts.map((post, index) => {
                            const { slug, date, title } = post;
                            const postDate = new Date(date);
                            const formattedDate = `${postDate.getFullYear()}.${(postDate.getMonth() + 1).toString().padStart(2, '0')}.${postDate.getDate().toString().padStart(2, '0')}`;

                            return (
                                <Link key={slug} href={`/blog/${slug}`}>
                                    <article className="border-2 border-black bg-white hover:bg-red-500 transition-colors duration-200 p-5">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                            <time
                                                dateTime={date}
                                                className="text-sm font-mono font-black text-black hover:text-white flex-shrink-0 order-2 sm:order-1"
                                            >
                                                {formattedDate}
                                            </time>
                                            <h3 className="text-lg font-black font-mono uppercase text-black hover:text-white leading-tight order-1 sm:order-2">
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