"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addDeveloper, removeDeveloper, FavoriteDeveloper } from "@/redux/slices/favoritesSlice";

interface Props {
    developer: FavoriteDeveloper;
}

export default function SaveDeveloperButton({ developer }: Props) {
    const dispatch = useAppDispatch();
    const isSaved = useAppSelector((state) =>
        state.favorites.developers.some((d) => d.id === developer.id)
    );

    const toggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            dispatch(removeDeveloper(developer.id));
        } else {
            dispatch(addDeveloper(developer));
        }
    };

    return (
        <button
            onClick={toggle}
            title={isSaved ? "Remove from saved" : "Save developer"}
            className={`p-1.5 rounded-lg transition-all
                ${isSaved
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                    : "text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
        >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
    );
}