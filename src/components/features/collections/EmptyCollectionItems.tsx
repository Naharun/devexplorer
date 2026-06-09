import { BookmarkPlus } from "lucide-react";

export default function EmptyCollectionItems() {
    return (
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <BookmarkPlus className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No items yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Add repositories, developers or articles to this collection using the
                <span className="font-medium text-gray-700 dark:text-gray-300"> folder icon</span> on any card.
            </p>
        </div>
    );
}