"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addRepository, removeRepository, FavoriteRepository } from "@/redux/slices/favoritesSlice";

interface Props {
    repository: FavoriteRepository;
}

export default function SaveRepositoryButton({ repository }: Props) {
    const dispatch = useAppDispatch();
    const isSaved = useAppSelector((state) =>
        state.favorites.repositories.some((r) => r.id === repository.id)
    );

    const toggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            dispatch(removeRepository(repository.id));
        } else {
            dispatch(addRepository(repository));
        }
    };

    return (
        <button
            onClick={toggle}
            title={isSaved ? "Remove from saved" : "Save repository"}
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