'use client';

import SocialIcon from '@/components/social-icons';
import siteMetadata from '@/data/siteMetadata';
import Link from './Link';

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-4 flex flex-col items-center text-center">
      {/* Social Icons */}
      <div className="flex space-x-5 mb-6">
        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
        <SocialIcon kind="github" href={siteMetadata.github} size={5} />
        <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
        <SocialIcon kind="rss" href={siteMetadata.rss} size={5} aria-label="RSS Feed" />
      </div>

      {/* Legal Text */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-2xl">
        Any and all opinions listed here are my own and not representative of any of my employers, past, future, and/or present.
      </div>

      {/* Copyright and Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>© {new Date().getFullYear()}</span>
          <span className="mx-2">•</span>
          <span>{siteMetadata.author}</span>
        </div>

        <Link
          href={siteMetadata.siteRepo}
          className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition duration-150 ease-in-out"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Source Code
        </Link>

        <button
          onClick={handleScrollToTop}
          className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition duration-150 ease-in-out bg-transparent border-none cursor-pointer"
        >
          Back to top
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
