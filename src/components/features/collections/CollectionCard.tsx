"use client";

import Link from "next/link";
import type { Collection } from "@/types/collection";
import { Trash2, FolderOpen, GitBranch, BookOpen, Code2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { deleteCollection } from "@/redux/slices/collectionsSlice";

interface Props {
    collection: Collection;
}

export default function CollectionCard({ collection }: Props) {
    const dispatch = useAppDispatch();

    const repoCount = collection.items.filter((i) => i.type === "repository").length;
    const devCount = collection.items.filter((i) => i.type === "developer").length;
    const articleCount = collection.items.filter((i) => i.type === "article").length;

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteCollection(collection.id));
    };

    return (
        <Link href={`/collections/${collection.id}`}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                       rounded-xl p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600
                       transition-all duration-200 block">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {collection.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {collection.items.length} items
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
                {repoCount > 0 && (
                    <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" /> {repoCount} repos
                    </span>
                )}
                {devCount > 0 && (
                    <span className="flex items-center gap-1">
                        <Code2 className="w-3 h-3" /> {devCount} devs
                    </span>
                )}
                {articleCount > 0 && (
                    <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {articleCount} articles
                    </span>
                )}
                {collection.items.length === 0 && (
                    <span className="italic">Empty collection</span>
                )}
            </div>
        </Link>
    );
}