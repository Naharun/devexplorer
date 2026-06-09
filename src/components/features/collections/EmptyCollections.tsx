import Link from "next/link";
import { FolderPlus } from "lucide-react";

export default function EmptyCollections() {
    return (
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <FolderPlus className="w-7 h-7 text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No collections yet</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Create your first collection to organize your saved items.
            </p>
        </div>
    );
}