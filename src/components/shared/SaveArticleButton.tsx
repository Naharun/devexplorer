"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addArticle, removeArticle, FavoriteArticle } from "@/redux/slices/favoritesSlice";

interface Props {
    article: FavoriteArticle;
}

export default function SaveArticleButton({ article }: Props) {
    const dispatch = useAppDispatch();
    const isSaved = useAppSelector((state) =>
        state.favorites.articles.some((a) => a.id === article.id)
    );

    const toggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            dispatch(removeArticle(article.id));
        } else {
            dispatch(addArticle(article));
        }
    };

    return (
        <button
            onClick={toggle}
            title={isSaved ? "Remove from saved" : "Save article"}
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