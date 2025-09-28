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
            {/* Simple Brutalist Header */}
            <section className="px-4 sm:px-6 md:px-10 bg-white py-8 border-b-2 border-black">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black font-mono text-black uppercase mb-6">
                        {title}
                    </h1>
                    {description && (
                        <div className="border-l-4 border-black pl-6">
                            <p className="text-lg font-mono text-black leading-relaxed">
                                {description}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Simple Posts List */}
            <div className="px-4 sm:px-6 md:px-10 bg-white pt-8 pb-12">
                <div className="max-w-4xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="border-2 border-black bg-white p-8 text-center">
                            <h2 className="text-2xl font-black font-mono text-black mb-2 uppercase">NO POSTS</h2>
                            <p className="font-mono text-black">Nothing here yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {posts.map((post) => {
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
            </div>


        </>
    );
}