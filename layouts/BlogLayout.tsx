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
            {/* Cyber-Doom Hero Section */}
            <section className="relative overflow-hidden pb-8 pt-6 md:space-y-5 mb-12">
                {/* Dark atmosphere background */}
                <div className="absolute inset-0 synthwave-grid opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

                <div className="relative z-10 space-y-6 text-center">
                    {/* Cyber-Doom terminal indicator */}
                    <div className="font-mono text-xs text-gray-500 mb-4 font-bold">
                        <span className="text-[#ff3860]">⸸</span> NEURAL_COMMUNION_INITIATED <span className="text-[#ff3860]">⸸</span>
                    </div>

                    {/* Hybrid typography */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-widest text-[#ff3860] mb-4 font-mono drop-shadow-lg">
                        {title.toUpperCase().replace(/\s/g, '_')}
                    </h1>

                    {/* Cyber-Doom subtitle */}
                    <div className="font-mono text-sm text-gray-600 tracking-wider mb-2">
                        ⸸ DIGITAL VOID TRANSMISSIONS ⸸
                    </div>

                    {description && (
                        <p className="text-lg md:text-xl font-mono text-gray-300 max-w-2xl mx-auto">
                            <span className="text-[#00ff99]">[DARK_MATRIX]</span> {description}
                        </p>
                    )}

                    {/* Cyber-Doom Stats Terminal */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-mono">
                        <div className="bg-black/60 border border-[#00ff99]/50 px-4 py-2 rounded shadow-lg shadow-[#00ff99]/20">
                            <span className="text-[#00ff99]">⚡ DIGITAL_LOGS:</span>
                            <span className="text-gray-200 ml-2 font-bold">{posts.length}</span>
                        </div>
                        <div className="bg-black/60 border border-orange-900/50 px-4 py-2 rounded shadow-lg shadow-orange-900/20">
                            <span className="text-orange-400">⸸ DARK_CYCLES:</span>
                            <span className="text-gray-200 ml-2 font-bold">{years.length}</span>
                        </div>
                        <div className="bg-black/60 border border-[#ff3860]/50 px-4 py-2 rounded shadow-lg shadow-[#ff3860]/20">
                            <span className="text-[#ff3860]">◉ NEURAL_LINK:</span>
                            <span className="text-[#ff3860] ml-2 font-bold">ACTIVE</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cyber-Doom Feed Terminal */}
            <div className="mb-12 bg-black/70 border border-orange-900/30 rounded-lg p-4 shadow-2xl shadow-orange-900/10">
                <div className="flex items-center justify-center text-sm text-gray-400 font-mono">
                    <div className="flex items-center space-x-2">
                        <span className="text-orange-400">⸸</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4 text-orange-400"
                        >
                            <title>Void Stream</title>
                            <path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" />
                            <path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z" />
                            <circle cx="6" cy="18" r="2" />
                        </svg>
                        <span className="text-orange-400">⸸</span>
                    </div>
                    <span className="ml-3">
                        <span className="text-orange-400 font-bold">VOID_COMMUNION:</span> Channel the darkness through{" "}
                        <a
                            href="/feed.xml"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ff3860] hover:text-[#00ff99] transition-colors underline font-bold"
                        >
                            RSS feed
                        </a>{" "}
                        to connect our neural systems
                    </span>
                </div>
            </div>

            {/* Posts by Year */}
            <div className="space-y-12">
                {years.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="relative bg-black/80 border border-red-900/60 rounded-lg p-12 mx-auto max-w-2xl overflow-hidden shadow-2xl shadow-red-900/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black/50 to-orange-900/10" />

                            <div className="relative z-10">
                                <div className="text-6xl md:text-8xl font-mono text-[#ff3860] mb-4 opacity-90 tracking-wider font-black">
                                    ⸸ VOID ⸸
                                </div>
                                <div className="text-2xl font-bold font-mono text-gray-300 mb-2 tracking-wider">NEURAL_VOID_DETECTED</div>
                                <div className="text-gray-500 font-mono text-sm mb-6">DARK_MATRIX :: NO_RITUALS_FOUND</div>

                                <div className="bg-black/70 border border-orange-900/40 rounded p-4 font-mono text-xs text-gray-400 shadow-lg shadow-orange-900/30">
                                    <div className="flex items-center justify-center space-x-2 mb-2">
                                        <span className="text-orange-400">⸸</span>
                                        <span>Initiating dark communion...</span>
                                        <span className="text-orange-400">⸸</span>
                                    </div>
                                    <div className="text-center text-[#ff3860]">
                                        ◉ The digital void awaits your neural sacrifice ◉
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    years.map((year) => (
                        <section key={year} className="space-y-6">
                            {/* Cyber-Doom Year Node */}
                            <div className="mb-8">
                                <div className="flex items-center space-x-4">
                                    <h2 className="text-2xl md:text-3xl font-bold font-mono text-orange-400 tracking-wider">
                                        ⸸ {year} ⸸
                                    </h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-orange-900/50 via-gray-800 to-[#ff3860]/50" />
                                    <span className="text-xs font-mono text-[#ff3860] bg-black/60 px-3 py-1 rounded border border-[#ff3860]/50 shadow-lg shadow-[#ff3860]/20">
                                        ◉ {postsByYear[year].length} digital logs
                                    </span>
                                </div>
                            </div>

                            {/* Enhanced Posts List */}
                            <div className="space-y-1">
                                {postsByYear[year].map((post) => {
                                    const { slug, date, title } = post;
                                    const postDate = new Date(date);
                                    const formattedDate = `${postDate.getDate().toString().padStart(2, '0')}/${(postDate.getMonth() + 1).toString().padStart(2, '0')}/${postDate.getFullYear()}`;

                                    return (
                                        <div key={slug} className="flex items-center gap-4 py-3 px-4 hover:bg-black/40 transition-all duration-500 group rounded border border-gray-800/50 hover:border-orange-900/60 relative overflow-hidden shadow-lg hover:shadow-orange-900/20">
                                            {/* Cyber-Doom ritual flame effect */}
                                            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-400 via-[#ff3860] to-black scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

                                            {/* Date with hybrid styling */}
                                            <time
                                                dateTime={date}
                                                className="text-sm font-mono text-gray-500 group-hover:text-orange-400 min-w-[80px] text-right transition-colors duration-300 font-bold"
                                            >
                                                {formattedDate}
                                            </time>

                                            {/* Cyber-Doom separator */}
                                            <span className="text-gray-700 group-hover:text-[#ff3860] transition-colors duration-300 font-mono text-lg">⸸</span>

                                            {/* Title with hybrid styling */}
                                            <h3 className="text-gray-200 group-hover:text-white transition-colors duration-300 flex-1 font-mono tracking-wide">
                                                <Link href={`/blog/${slug}`} className="hover:text-[#00ff99] transition-all duration-300">
                                                    {title}
                                                </Link>
                                            </h3>

                                            {/* Cyber-Doom access indicator */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#ff3860] bg-black/80 px-2 py-1 rounded border border-[#ff3860]/50 shadow-lg shadow-[#ff3860]/30">
                                                <span className="font-mono text-xs">◉ Link</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))
                )}
            </div>

            {/* Cyber-Doom Ritual Complete */}
            <div className="mt-16 bg-black/80 border border-orange-900/50 rounded-lg p-8 text-center relative overflow-hidden shadow-2xl shadow-orange-900/10">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-900/5 via-black/20 to-[#ff3860]/5" />

                <div className="relative z-10">
                    <div className="font-mono text-gray-300 text-sm mb-4">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <span className="text-orange-400">⸸</span>
                            <span className="text-orange-400 font-bold tracking-wider">NEURAL_VOID_COMMUNION</span>
                            <span className="text-orange-400">⸸</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="bg-black/70 px-4 py-2 rounded border border-orange-900/50 shadow-lg shadow-orange-900/20">
                                ⚡ Information schemes: <span className="text-orange-400 font-bold">{posts.length}</span>
                            </span>
                            <span className="bg-black/70 px-4 py-2 rounded border border-[#ff3860]/50 shadow-lg shadow-[#ff3860]/20">
                                ◉ CYCLES: <span className="text-[#ff3860] font-bold">{years.length}</span>
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 text-xs text-[#ff3860] font-mono bg-black/60 px-4 py-2 rounded border border-[#ff3860]/30 shadow-lg shadow-[#ff3860]/20">
                        ⸸ Traverse the digital void pathways above ⸸
                    </div>
                </div>
            </div>
        </>
    );
}