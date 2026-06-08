"use client";

import { Article } from "@/types/devto";
import ArticleCard from "./ArticleCard";

function ArticleCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl overflow-hidden animate-pulse">
            <div className="w-full h-40 bg-gray-200 dark:bg-gray-700" />
            <div className="p-5 space-y-3">
                <div className="flex gap-2">
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
                <div className="flex items-center gap-3 pt-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                </div>
            </div>
        </div>
    );
}

interface Props {
    articles: Article[];
    isLoading?: boolean;
    error?: string;
}

export default function ArticleList({ articles, isLoading, error }: Props) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => (
                    <ArticleCardSkeleton key={i} />
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

    if (articles.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium">No articles found</p>
                <p className="text-sm mt-1">Try a different tag</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}