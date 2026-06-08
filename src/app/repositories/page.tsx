"use client";

import { useState, useCallback } from "react";
import { useSearchRepositoriesQuery } from "@/redux/api/githubApi";
import RepositorySearch from "@/components/features/repositories/RepositorySearch";
import RepositoryList from "@/components/features/repositories/RepositoryList";
import useDebounce from "@/hooks/useDebounce";
import { SlidersHorizontal } from "lucide-react";

const LANGUAGES = ["All", "TypeScript", "JavaScript", "Python", "Go", "Rust", "Java", "C++"];
const SORT_OPTIONS = [
    { label: "Stars", value: "stars" },
    { label: "Forks", value: "forks" },
    { label: "Updated", value: "updated" },
];

export default function RepositoriesPage() {
    const [search, setSearch] = useState("react");
    const [language, setLanguage] = useState("All");
    const [sort, setSort] = useState("stars");

    const debouncedSearch = useDebounce(search, 500);

    const buildQuery = useCallback(() => {
        let q = debouncedSearch || "stars:>1000";
        if (language !== "All") q += `+language:${language}`;
        return q;
    }, [debouncedSearch, language]);

    const { data, isLoading, isError } = useSearchRepositoriesQuery(
        `${buildQuery()}&sort=${sort}`,
        { skip: false }
    );

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Repository Explorer
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Search and discover GitHub repositories
                </p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <RepositorySearch value={search} onChange={setSearch} />
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
                {/* Language Filter */}
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all
                                    ${language === lang
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort */}
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
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
            </div>

            {/* Result count */}
            {data && !isLoading && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Found{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {data.total_count?.toLocaleString()}
                    </span>{" "}
                    repositories
                </p>
            )}

            {/* List */}
            <RepositoryList
                repositories={data?.items ?? []}
                isLoading={isLoading}
                error={isError ? "Failed to fetch repositories." : undefined}
            />
        </main>
    );
}