import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { allNows } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { formatDate } from 'pliny/utils/formatDate'

export const metadata = genPageMetadata({
    title: 'Now',
    description: 'What I\'m currently working on and focusing my attention on right now - a living document of my current activities and interests.',
    keywords: ['current projects', 'now page', 'focus', 'learning', 'activities']
})

export default function NowPage() {
    const now = allNows[0] // Assuming there's only one now page

    if (!now) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-6">
                <div className="font-mono text-sm text-gray-500 mb-4">
                    <span className="text-orange-400">▲</span> CONTENT_ERROR <span className="text-orange-400">▲</span>
                </div>
                <h1 className="text-2xl font-gothic font-bold text-[#ff3860] uppercase tracking-wider">
                    NOW_PAGE_NOT_FOUND
                </h1>
                <div className="bg-black/60 border border-gray-800/50 rounded-lg p-6">
                    <p className="text-gray-300 font-mono text-sm">
                        <span className="text-[#00ff99]">[SYSTEM]</span> No MDX content found for the now page.
                    </p>
                    <p className="text-gray-400 font-mono text-xs mt-2">
                        Please create a file at <code>/data/now/now.mdx</code>
                    </p>
                </div>
            </div>
        )
    }

    if (!now.body?.code) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-6">
                <div className="font-mono text-sm text-gray-500 mb-4">
                    <span className="text-orange-400">▲</span> CONTENT_ERROR <span className="text-orange-400">▲</span>
                </div>
                <h1 className="text-2xl font-gothic font-bold text-[#ff3860] uppercase tracking-wider">
                    CONTENT_COMPILATION_FAILED
                </h1>
                <div className="bg-black/60 border border-gray-800/50 rounded-lg p-6">
                    <p className="text-gray-300 font-mono text-sm">
                        <span className="text-[#00ff99]">[SYSTEM]</span> MDX content could not be compiled.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="divide-y divide-gray-800/50">
                <section className="relative overflow-hidden pb-8 pt-6 md:space-y-5">
                    {/* Cyber-Doom background effects */}
                    <div className="absolute inset-0 synthwave-grid opacity-5" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

                    <div className="relative z-10 space-y-6 text-center">
                        {/* Terminal indicator */}
                        <div className="font-mono text-xs text-gray-500 mb-4 font-bold">
                            <span className="text-orange-400">▲</span> CURRENT_STATUS_PROTOCOL <span className="text-orange-400">▲</span>
                        </div>

                        <h1 className="text-3xl font-gothic font-extrabold leading-9 tracking-tight text-[#ff3860] sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                            {now.title}
                        </h1>
                        <p className="text-lg leading-7 text-gray-300 font-mono">
                            <span className="text-[#00ff99]">[SYSTEM]</span> Real-time consciousness stream...
                        </p>

                        {/* Last updated */}
                        <div className="text-sm font-mono text-orange-400 bg-black/60 border border-orange-400/30 px-4 py-2 rounded shadow-lg shadow-orange-400/10 inline-block">
                            <span className="text-gray-400">◉ LAST_SYNC:</span>
                            <span className="ml-2">{formatDate(now.lastUpdated, siteMetadata.locale)}</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* MDX Content */}
            <div className="prose prose-invert max-w-none py-8 bg-black/20 border border-gray-800/30 rounded-lg p-8 shadow-2xl shadow-black/50 mt-8">
                <MDXLayoutRenderer code={now.body.code} />
            </div>
        </>
    )
}