"use client";

import DeveloperCard from "./DeveloperCard";
import { GitHubUser } from "@/types/developer";

// Skeleton
function DeveloperCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl p-5 animate-pulse">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            </div>
        </div>
    );
}

interface DeveloperListProps {
    users: GitHubUser[];
    isLoading: boolean;
    error?: string;
}

export default function DeveloperList({ users, isLoading, error }: DeveloperListProps) {
    // Loading state
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                    <DeveloperCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="text-center py-16 text-red-500">
                <p className="text-lg font-medium">Something went wrong</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        );
    }

    // Empty state
    if (users.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium">No developers found</p>
                <p className="text-sm mt-1">Try a different search term</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
                <DeveloperCard key={user.id} user={user} />
            ))}
        </div>
    );
}