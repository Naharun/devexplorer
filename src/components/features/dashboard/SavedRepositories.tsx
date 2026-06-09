"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, GitFork, Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeRepository } from "@/redux/slices/favoritesSlice";

function formatCount(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function SavedRepositories() {
    const dispatch = useAppDispatch();
    const repositories = useAppSelector((state) => state.favorites.repositories);

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                Saved Repositories ({repositories.length})
            </h2>

            {repositories.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No saved repositories yet.</p>
                    <Link href="/repositories" className="text-blue-500 text-sm hover:underline mt-1 inline-block">
                        Browse repositories →
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {repositories.slice(0, 5).map((repo) => (
                        <div key={repo.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <Image src={repo.owner.avatar_url} alt={repo.owner.login} width={32} height={32} className="rounded-full shrink-0" />
                            <div className="flex-1 min-w-0">
                                <Link href={`/repositories/${repo.owner.login}/${repo.name}`}
                                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate block">
                                    {repo.full_name}
                                </Link>
                                <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
                                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />{formatCount(repo.stargazers_count)}</span>
                                    <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{formatCount(repo.forks_count)}</span>
                                </div>
                            </div>
                            <button onClick={() => dispatch(removeRepository(repo.id))}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}