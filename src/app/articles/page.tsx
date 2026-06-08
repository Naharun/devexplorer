"use client";

import { useState } from "react";
import { useGetArticlesQuery, useGetTagsQuery } from "@/redux/api/devtoApi";
import { Search, X } from "lucide-react";
import ArticleList from "@/components/features/articles/ArticleList";
import useDebounce from "@/hooks/useDebounce";

const POPULAR_TAGS = [
    "javascript", "typescript", "react", "nextjs",
    "python", "webdev", "beginners", "css", "node",
    "devops", "opensource", "ai",
];

export default function ArticlesPage() {
    const [selectedTag, setSelectedTag] = useState("");
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);

    const { data: articles, isLoading, isError } = useGetArticlesQuery({
        tag: selectedTag || undefined,
        per_page: 21,
    });

    const filtered = articles?.filter((a) =>
        debouncedSearch
            ? a.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            a.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
            : true
    ) ?? [];

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Article Explorer
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Discover developer articles from Dev.to
                </p>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-2xl mx-auto mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                               placeholder:text-gray-400 focus:outline-none focus:ring-2
                               focus:ring-blue-500 transition-all"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Tag filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                <button
                    onClick={() => setSelectedTag("")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all
                        ${selectedTag === ""
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                >
                    All
                </button>
                {POPULAR_TAGS.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all
                            ${selectedTag === tag
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                    >
                        #{tag}
                    </button>
                ))}
            </div>

            {/* Result count */}
            {!isLoading && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Showing{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {filtered.length}
                    </span>{" "}
                    articles{selectedTag && ` in #${selectedTag}`}
                </p>
            )}

            {/* List */}
            <ArticleList
                articles={filtered}
                isLoading={isLoading}
                error={isError ? "Failed to fetch articles." : undefined}
            />
        </main>
    );
}