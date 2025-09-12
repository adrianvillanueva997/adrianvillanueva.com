'use client';

import type React from 'react';

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
    return (
        <div
            className={`animate-pulse bg-gray-700/40 rounded ${className}`}
            style={{
                background: 'linear-gradient(90deg, rgba(55,65,81,0.4) 25%, rgba(75,85,99,0.6) 50%, rgba(55,65,81,0.4) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear'
            }}
        />
    );
};

export const PostCardSkeleton: React.FC = () => {
    return (
        <div className="bg-gray-900/40 border border-gray-700/50 rounded-lg p-6 space-y-4">
            {/* Scan line effect for loading */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff99]/10 to-transparent animate-pulse pointer-events-none" />

            {/* Header skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <div className="flex space-x-1">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="w-3 h-3 rounded-full" />
                </div>
            </div>

            {/* Title skeleton */}
            <Skeleton className="h-8 w-3/4" />

            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
            </div>

            {/* Content skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Footer skeleton */}
            <div className="pt-4 border-t border-gray-700/50 flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-5" />
            </div>
        </div>
    );
};

export const RecentPostSkeleton: React.FC = () => {
    return (
        <div className="py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border border-gray-700/30 rounded space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center flex-grow space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:w-40 sm:flex-shrink-0">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-5 sm:flex-grow sm:mx-4" />
            </div>
            <div className="flex items-center space-x-2 self-end sm:self-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
            </div>
        </div>
    );
};

export const BlogListSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            {Array.from({ length: 5 }, (_, i) => ({ id: `skeleton-${Date.now()}-${i}` })).map((item) => (
                <PostCardSkeleton key={item.id} />
            ))}
        </div>
    );
};

export const NowPageSkeleton: React.FC = () => {
    return (
        <>
            {/* Header Skeleton */}
            <div className="divide-y divide-gray-800/50">
                <section className="relative overflow-hidden pb-8 pt-6 md:space-y-5">
                    <div className="absolute inset-0 synthwave-grid opacity-5" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

                    <div className="relative z-10 space-y-6 text-center">
                        <Skeleton className="h-4 w-48 mx-auto" />
                        <Skeleton className="h-16 w-64 mx-auto" />
                        <Skeleton className="h-6 w-80 mx-auto" />
                        <Skeleton className="h-8 w-40 mx-auto" />
                    </div>
                </section>
            </div>

            {/* Content Skeleton */}
            <div className="bg-black/20 border border-gray-800/30 rounded-lg p-8 shadow-2xl shadow-black/50 mt-8 space-y-6">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff99]/5 to-transparent animate-pulse pointer-events-none" />

                <Skeleton className="h-8 w-48" />
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <Skeleton className="h-8 w-56" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-28" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                </div>

                <Skeleton className="h-8 w-44" />
                <div className="space-y-4">
                    <div className="border border-gray-800/50 rounded-lg p-4">
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="border border-gray-800/50 rounded-lg p-4">
                        <Skeleton className="h-6 w-36 mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </div>
        </>
    );
};

// Add the shimmer animation to the global styles
export const shimmerStyles = `
@keyframes shimmer {
	0% {
		background-position: -200% 0;
	}
	100% {
		background-position: 200% 0;
	}
}
`;