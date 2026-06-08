"use client";

import { useState } from "react";

import RepositorySearch from "@/components/features/repositories/RepositorySearch";
import RepositoryList from "@/components/features/repositories/RepositoryList";

import useDebounce from "@/hooks/useDebounce";

import { useSearchRepositoriesQuery } from "@/redux/api/githubApi";

export default function RepositoriesPage() {
    const [search, setSearch] =
        useState("react");

    const debouncedSearch =
        useDebounce(search);

    const {
        data,
        isLoading,
        error,
    } = useSearchRepositoriesQuery(
        debouncedSearch
    );

    return (
        <div className="max-w-5xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-5">
                Repository Explorer
            </h1>

            <RepositorySearch
                value={search}
                onChange={setSearch}
            />

            <div className="mt-6">

                {isLoading && (
                    <p>Loading repositories...</p>
                )}

                {error && (
                    <p>
                        Failed to load repositories.
                    </p>
                )}

                {data && (
                    <RepositoryList
                        repositories={data.items}
                    />
                )}

            </div>
        </div>
    );
}