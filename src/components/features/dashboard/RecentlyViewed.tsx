"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearRecentlyViewed } from "@/redux/slices/recentlyViewedSlice";
import { GitBranch, Code2, BookOpen, X, Clock } from "lucide-react";

const TYPE_CONFIG = {
    repository: { icon: GitBranch, color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", label: "Repository" },
    developer: { icon: Code2, color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400", label: "Developer" },
    article: { icon: BookOpen, color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400", label: "Article" },
};

function getItemLink(type: string, id: number, title: string): string {
    if (type === "repository") return `/repositories/${title}`;
    if (type === "developer") return `/developers/${title}`;
    return "#";
}

export default function RecentlyViewed() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.recentlyViewed.items);

    if (!items.length) return null;

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Recently Viewed
                </h2>
                <button
                    onClick={() => dispatch(clearRecentlyViewed())}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                    <X className="w-3 h-3" /> Clear
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {items.map((item) => {
                    const config = TYPE_CONFIG[item.type];
                    const Icon = config.icon;
                    const href = getItemLink(item.type, item.id, item.title);

                    return (
                        <Link
                            key={`${item.type}-${item.id}`}
                            href={href}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                                        border border-gray-200 dark:border-gray-700
                                        hover:border-blue-300 dark:hover:border-blue-600
                                        transition-all ${config.color}`}
                        >
                            <Icon className="w-3 h-3" />
                            {item.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}