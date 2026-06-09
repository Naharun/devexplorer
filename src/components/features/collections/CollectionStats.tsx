import { CollectionItem } from "@/redux/slices/collectionsSlice";
import { Code2, BookOpen, GitBranch } from "lucide-react";

interface Props {
    items: CollectionItem[];
}

export default function CollectionStats({ items }: Props) {
    const repos = items.filter((i) => i.type === "repository").length;
    const devs = items.filter((i) => i.type === "developer").length;
    const articles = items.filter((i) => i.type === "article").length;

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{repos}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Repositories</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{devs}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Developers</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{articles}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Articles</p>
                </div>
            </div>
        </div>
    );
}