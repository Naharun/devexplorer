// "use client";

// import { useState } from "react";

// import DeveloperSearch from "@/components/features/developers/DeveloperSearch";

// import {
//     useSearchUsersQuery,
// } from "@/redux/api/githubApi";

// export default function DevelopersPage() {
//     const [search, setSearch] =
//         useState("react");

//     const {
//         data,
//         isLoading,
//         error,
//     } = useSearchUsersQuery(search);

//     return (
//         <div className="mx-auto max-w-6xl p-5">
//             <h1 className="mb-6 text-4xl font-bold">
//                 Developer Explorer
//             </h1>

//             <DeveloperSearch
//                 value={search}
//                 onChange={setSearch}
//             />

//             <div className="mt-6 grid gap-4 md:grid-cols-2">
//                 {isLoading && (
//                     <p>Loading developers...</p>
//                 )}

//                 {error && (
//                     <p>Failed to load developers.</p>
//                 )}

//                 {data?.items.map((user) => (
//                     <div
//                         key={user.id}
//                         className="rounded-xl border p-5"
//                     >
//                         <img
//                             src={user.avatar_url}
//                             alt={user.login}
//                             className="h-16 w-16 rounded-full"
//                         />

//                         <h2 className="mt-3 text-xl font-bold">
//                             {user.login}
//                         </h2>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
"use client";

import { useState, useCallback } from "react";
import { useSearchUsersQuery } from "@/redux/api/githubApi";
import DeveloperSearch from "@/components/features/developers/DeveloperSearch";
import DeveloperList from "@/components/features/developers/DeveloperList";

export default function DevelopersPage() {
    const [query, setQuery] = useState("javascript");

    const { data, isLoading, isError } = useSearchUsersQuery(query, {
        skip: query.trim().length === 0,
    });

    const handleSearch = useCallback((value: string) => {
        if (value.trim()) setQuery(value);
    }, []);

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Developer Explorer
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Search and discover GitHub developers
                </p>
            </div>

            {/* Search */}
            <div className="mb-8">
                <DeveloperSearch onSearch={handleSearch} />
            </div>

            {/* Result count */}
            {data && !isLoading && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Found{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {data.total_count.toLocaleString()}
                    </span>{" "}
                    developers for &quot;{query}&quot;
                </p>
            )}

            {/* List */}
            <DeveloperList
                users={data?.items ?? []}
                isLoading={isLoading}
                error={isError ? "Failed to fetch developers. Check your connection." : undefined}
            />
        </main>
    );
}