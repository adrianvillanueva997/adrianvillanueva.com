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
    // Group posts by year
    const postsByYear = posts.reduce((acc, post) => {
        const year = new Date(post.date).getFullYear().toString();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {} as Record<string, CoreContent<Blog>[]>);

    const years = Object.keys(postsByYear).sort((a, b) => Number.parseInt(b) - Number.parseInt(a)); // Latest year first

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden pb-8 pt-6 md:space-y-5 mb-12">
                <div className="absolute inset-0 synthwave-grid opacity-10" />
                <div className="relative z-10 space-y-4 text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-gothic font-bold text-[#ff3860] mb-4 tracking-wide">
                        {title.toUpperCase().replace(/\s/g, '_')}
                    </h1>
                    {description && (
                        <p className="text-lg md:text-xl font-mono text-gray-300 max-w-2xl mx-auto">
                            <span className="text-[#00ff99]">[SYSTEM]</span> {description}
                        </p>
                    )}
                    {/* Stats Bar */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-mono">
                        <div className="bg-gray-900/50 border border-gray-700 px-3 py-2 rounded">
                            <span className="text-[#00ff99]">ENTRIES:</span>
                            <span className="text-gray-300 ml-2">{posts.length}</span>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 px-3 py-2 rounded">
                            <span className="text-[#ff3860]">YEARS:</span>
                            <span className="text-gray-300 ml-2">{years.length}</span>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 px-3 py-2 rounded">
                            <span className="text-[#00ff99]">STATUS:</span>
                            <span className="text-gray-300 ml-2">ACTIVE</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* RSS Feed Notice */}
            <div className="mb-12 bg-gray-950/30 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-center text-sm text-gray-400 font-mono">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 mr-2 text-[#ff3860]"
                    >
                        <title>RSS Feed</title>
                        <path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" />
                        <path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z" />
                        <circle cx="6" cy="18" r="2" />
                    </svg>
                    <span>
                        <span className="text-[#ff3860]">FEED_ACTIVE:</span> Subscribe via{" "}
                        <a
                            href="/feed.xml"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00ff99] hover:text-[#ff3860] transition-colors underline"
                        >
                            RSS
                        </a>{" "}
                        for real-time updates
                    </span>
                </div>
            </div>

            {/* Posts by Year */}
            <div className="space-y-12">
                {years.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="relative">
                            <div className="text-6xl md:text-8xl font-mono text-[#ff3860] mb-4 opacity-50">
                                404
                            </div>
                            <div className="text-2xl font-gothic text-gray-400 mb-2">NO_POSTS_FOUND</div>
                            <div className="text-gray-600 font-mono text-sm">VOID_STATE :: ARCHIVE_EMPTY</div>
                            <div className="mt-8 text-xs text-gray-700 font-mono">
                                &gt; Initializing content matrix...
                                <br />
                                &gt; Please stand by for data injection
                            </div>
                        </div>
                    </div>
                ) : (
                    years.map((year) => (
                        <section key={year} className="space-y-6">
                            {/* Year Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-gothic font-bold text-[#ff3860] mb-4">
                                    {year}
                                </h2>
                            </div>

                            {/* Posts List */}
                            <div className="space-y-2">
                                {postsByYear[year].map((post) => {
                                    const { slug, date, title } = post;
                                    const postDate = new Date(date);
                                    const formattedDate = `${postDate.getDate().toString().padStart(2, '0')}/${(postDate.getMonth() + 1).toString().padStart(2, '0')}/${postDate.getFullYear()}`;

                                    return (
                                        <div key={slug} className="flex items-center gap-4 py-2 px-2 hover:bg-gray-900/20 transition-colors duration-200 group rounded">
                                            {/* Date */}
                                            <time
                                                dateTime={date}
                                                className="text-sm font-mono text-gray-500 min-w-[80px] text-right"
                                            >
                                                {formattedDate}
                                            </time>

                                            {/* Separator */}
                                            <span className="text-gray-600">—</span>

                                            {/* Title */}
                                            <h3 className="text-gray-100 group-hover:text-[#00ff99] transition-colors duration-200">
                                                <Link href={`/blog/${slug}`} className="hover:text-[#ff3860]">
                                                    {title}
                                                </Link>
                                            </h3>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))
                )}
            </div>

            {/* Archive Footer */}
            <div className="mt-16 bg-gray-950/30 border border-gray-800 rounded-lg p-6 text-center">
                <div className="font-mono text-gray-400 text-sm">
                    <span className="text-[#ff3860]">ARCHIVE_COMPLETE</span> • Total entries: {posts.length} • Years active: {years.length}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                    Navigate through the temporal fragments of knowledge above
                </div>
            </div>
        </>
    );
}