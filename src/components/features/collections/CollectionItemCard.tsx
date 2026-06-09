"use client";

import Link from "next/link";
import { Trash2, GitBranch, Code2, BookOpen, ExternalLink } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { CollectionItem, removeItemFromCollection } from "@/redux/slices/collectionsSlice";

interface Props {
    item: CollectionItem;
    collectionId: string;
}

const TYPE_CONFIG = {
    repository: { icon: GitBranch, color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", label: "Repository" },
    developer: { icon: Code2, color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400", label: "Developer" },
    article: { icon: BookOpen, color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400", label: "Article" },
};

function getItemLink(item: CollectionItem): string {
    if (item.type === "repository") return `/repositories/${item.slug ?? item.id}`;
    if (item.type === "developer") return `/developers/${item.slug ?? item.id}`;
    return "#";
}

export default function CollectionItemCard({ item, collectionId }: Props) {
    const dispatch = useAppDispatch();
    const config = TYPE_CONFIG[item.type];
    const Icon = config.icon;

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl px-5 py-4 flex items-center gap-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${config.color}`}>
                    {config.label}
                </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {item.type === "article" ? (
                    <a
                        href={item.slug ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                ) : (
                    <Link
                        href={getItemLink(item)}
                        className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                )}
                <button
                    onClick={() => dispatch(removeItemFromCollection({ collectionId, itemId: item.id }))}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}