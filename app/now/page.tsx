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
            <div className="bg-white min-h-screen">
                <section className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase mb-8">
                            ERROR
                        </h1>
                        <div className="border-4 border-black bg-red-500 p-8">
                            <p className="text-xl font-mono text-white font-black uppercase">
                                NOW PAGE NOT FOUND
                            </p>
                            <p className="text-sm font-mono text-white mt-4">
                                Create /data/now/now.mdx
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    if (!now.body?.code) {
        return (
            <div className="bg-white min-h-screen">
                <section className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase mb-8">
                            ERROR
                        </h1>
                        <div className="border-4 border-black bg-red-500 p-8">
                            <p className="text-xl font-mono text-white font-black uppercase">
                                CONTENT COMPILATION FAILED
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <section className="px-4 sm:px-6 md:px-10 bg-white py-16 border-b-4 border-black">
                <div className="text-center max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black font-mono text-black uppercase mb-8">
                        NOW
                    </h1>
                    <div className="border-4 border-black bg-white p-8 max-w-3xl mx-auto mb-8">
                        <p className="text-xl font-mono text-black leading-relaxed font-medium">
                            What I'm focused on right now. Updated regularly.
                        </p>
                    </div>

                    {/* Last Updated Badge */}
                    <div className="inline-block border-4 border-black bg-yellow-300 px-6 py-3">
                        <p className="text-sm font-mono text-black font-black uppercase">
                            LAST UPDATED: {formatDate(now.lastUpdated, siteMetadata.locale)}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="px-4 sm:px-6 md:px-10 bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="border-4 border-black bg-white">
                        {/* MDX Content with Brutalist Styling */}
                        <div className="p-8 md:p-12">
                            <div className="prose prose-black max-w-none
                                prose-headings:font-mono prose-headings:font-black prose-headings:text-black prose-headings:uppercase prose-headings:border-b-2 prose-headings:border-black prose-headings:pb-2 prose-headings:mb-6
                                prose-h2:text-2xl prose-h2:mt-12 prose-h2:first:mt-0
                                prose-h3:text-xl prose-h3:mt-8
                                prose-p:font-mono prose-p:text-black prose-p:leading-relaxed prose-p:text-base
                                prose-strong:font-black prose-strong:text-black prose-strong:bg-yellow-300 prose-strong:px-1
                                prose-code:font-mono prose-code:bg-gray-200 prose-code:border prose-code:border-black prose-code:px-2 prose-code:py-1 prose-code:text-black prose-code:font-black
                                prose-ul:font-mono prose-ul:text-black
                                prose-li:mb-2
                                prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-gray-100 prose-blockquote:font-mono prose-blockquote:italic prose-blockquote:pl-6 prose-blockquote:py-4
                                prose-a:text-black prose-a:underline prose-a:decoration-4 prose-a:decoration-red-500 prose-a:font-black hover:prose-a:bg-red-500 hover:prose-a:text-white prose-a:transition-all prose-a:duration-300"
                            >
                                <MDXLayoutRenderer code={now.body.code} />
                            </div>
                        </div>
                    </div>

                    {/* Now Page Movement Info */}
                    <div className="mt-12 border-4 border-black bg-gray-100 p-6">
                        <h3 className="text-lg font-mono font-black text-black uppercase mb-4 border-b-2 border-black pb-2">
                            ABOUT NOW PAGES
                        </h3>
                        <p className="font-mono text-black text-sm leading-relaxed">
                            This follows the{' '}
                            <a
                                href="https://nownownow.com/about"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black underline decoration-4 decoration-red-500 font-black hover:bg-red-500 hover:text-white transition-all duration-300"
                            >
                                now page movement
                            </a>
                            {' '}— a simple way to share what I'm focused on at this point in my life.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}