"use client";

import { Repository } from "@/types/github";
import RepositoryCard from "./RepositoryCard";

function RepositoryCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl p-5 animate-pulse h-40 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-1 flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36" />
                </div>
            </div>
            <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
            </div>
            <div className="flex gap-4 mt-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
        </div>
    );
}

interface Props {
    repositories: Repository[];
    isLoading?: boolean;
    error?: string;
}

export default function RepositoryList({ repositories, isLoading, error }: Props) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                    <RepositoryCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16 text-red-500">
                <p className="text-lg font-medium">Something went wrong</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        );
    }

    if (repositories.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium">No repositories found</p>
                <p className="text-sm mt-1">Try a different search term</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repositories.map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} />
            ))}
        </div>
    );
}