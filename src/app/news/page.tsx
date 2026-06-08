"use client";

import { useState } from "react";
import {
    useGetTopStoryIdsQuery,
    useGetNewStoryIdsQuery,
    useGetBestStoryIdsQuery,
} from "@/redux/api/hackerNewsApi";
import { Flame, Sparkles, Star } from "lucide-react";
import StoryList from "@/components/features/news/StoryList";

const TABS = [
    { label: "Top", value: "top", icon: Flame },
    { label: "New", value: "new", icon: Sparkles },
    { label: "Best", value: "best", icon: Star },
] as const;

type TabType = "top" | "new" | "best";

export default function NewsPage() {
    const [activeTab, setActiveTab] = useState<TabType>("top");

    const { data: topIds, isLoading: topLoading } = useGetTopStoryIdsQuery();
    const { data: newIds, isLoading: newLoading } = useGetNewStoryIdsQuery();
    const { data: bestIds, isLoading: bestLoading } = useGetBestStoryIdsQuery();

    const currentIds =
        activeTab === "top" ? topIds :
            activeTab === "new" ? newIds :
                bestIds;

    const isLoading =
        activeTab === "top" ? topLoading :
            activeTab === "new" ? newLoading :
                bestLoading;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Tech News
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Latest stories from Hacker News
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit mx-auto">
                {TABS.map(({ label, value, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => setActiveTab(value)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all
                            ${activeTab === value
                                ? "bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-sm"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Stories */}
            <StoryList ids={currentIds ?? []} isLoading={isLoading} />
        </main>
    );
}