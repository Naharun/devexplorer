"use client";

import { useAppSelector } from "@/redux/hooks";
import { GitBranch, Code2, BookOpen, FolderOpen, LayoutGrid } from "lucide-react";

export default function StatsCards() {
    const repos = useAppSelector((state) => state.favorites.repositories);
    const developers = useAppSelector((state) => state.favorites.developers);
    const articles = useAppSelector((state) => state.favorites.articles);
    const collections = useAppSelector((state) => state.collections.collections);
    const total = repos.length + developers.length + articles.length;

    const cards = [
        { title: "Repositories", value: repos.length, icon: GitBranch, color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
        { title: "Developers", value: developers.length, icon: Code2, color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
        { title: "Articles", value: articles.length, icon: BookOpen, color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
        { title: "Collections", value: collections.length, icon: FolderOpen, color: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" },
        { title: "Total Saved", value: total, icon: LayoutGrid, color: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            {cards.map(({ title, value, icon: Icon, color }) => (
                <div key={title} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                </div>
            ))}
        </div>
    );
}