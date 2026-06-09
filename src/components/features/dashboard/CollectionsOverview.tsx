"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { FolderOpen, GitBranch, Code2, BookOpen, ArrowRight } from "lucide-react";

export default function CollectionsOverview() {
    const collections = useAppSelector((state) => state.collections.collections);

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                    Collections ({collections.length})
                </h2>
                <Link href="/collections" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                    Manage <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            {collections.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No collections yet.</p>
                    <Link href="/collections" className="text-blue-500 text-sm hover:underline mt-1 inline-block">
                        Create a collection →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {collections.map((collection) => {
                        const repos = collection.items.filter((i) => i.type === "repository").length;
                        const devs = collection.items.filter((i) => i.type === "developer").length;
                        const articles = collection.items.filter((i) => i.type === "article").length;

                        return (
                            <Link key={collection.id} href={`/collections/${collection.id}`}
                                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
                                <div className="flex items-center gap-2 mb-3">
                                    <FolderOpen className="w-4 h-4 text-blue-500" />
                                    <h3 className="font-medium text-gray-900 dark:text-white truncate">{collection.name}</h3>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{collection.items.length} items</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {repos > 0 && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                            <GitBranch className="w-3 h-3" />{repos}
                                        </span>
                                    )}
                                    {devs > 0 && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                            <Code2 className="w-3 h-3" />{devs}
                                        </span>
                                    )}
                                    {articles > 0 && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                            <BookOpen className="w-3 h-3" />{articles}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}