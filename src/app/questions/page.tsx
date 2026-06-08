"use client";

import { useState, useCallback } from "react";
import { useGetQuestionsQuery, useSearchQuestionsQuery } from "@/redux/api/stackExchangeApi";
import { Search, X } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import QuestionList from "@/components/features/questions/QuestionList";

const POPULAR_TAGS = [
    "javascript", "typescript", "react", "nextjs",
    "python", "node.js", "css", "html", "git", "docker",
];

const SORT_OPTIONS = [
    { label: "Activity", value: "activity" },
    { label: "Votes", value: "votes" },
    { label: "Newest", value: "creation" },
];

export default function QuestionsPage() {
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [sort, setSort] = useState("activity");

    const debouncedSearch = useDebounce(search, 500);
    const isSearching = debouncedSearch.trim().length > 0;

    const { data: browseData, isLoading: browseLoading, isError: browseError } =
        useGetQuestionsQuery(
            { tag: selectedTag || undefined, sort },
            { skip: isSearching }
        );

    const { data: searchData, isLoading: searchLoading, isError: searchError } =
        useSearchQuestionsQuery(debouncedSearch, { skip: !isSearching });

    const questions = isSearching
        ? searchData?.items ?? []
        : browseData?.items ?? [];

    const isLoading = isSearching ? searchLoading : browseLoading;
    const isError = isSearching ? searchError : browseError;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Stack Overflow Explorer
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Search and browse developer Q&amp;A
                </p>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-2xl mx-auto mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search questions..."
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

            {/* Filters — only show when not searching */}
            {!isSearching && (
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 flex-1">
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
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700
                                   bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Result count */}
            {!isLoading && questions.length > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Showing{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {questions.length}
                    </span>{" "}
                    questions{selectedTag && !isSearching && ` tagged [${selectedTag}]`}
                </p>
            )}

            {/* List */}
            <QuestionList
                questions={questions}
                isLoading={isLoading}
                error={isError ? "Failed to fetch questions. API quota may be exceeded." : undefined}
            />
        </main>
    );
}