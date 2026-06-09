"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, Trash2, ExternalLink } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeArticle } from "@/redux/slices/favoritesSlice";

export default function SavedArticles() {
    const dispatch = useAppDispatch();
    const articles = useAppSelector((state) => state.favorites.articles);

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                Saved Articles ({articles.length})
            </h2>

            {articles.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No saved articles yet.</p>
                    <Link href="/articles" className="text-blue-500 text-sm hover:underline mt-1 inline-block">
                        Browse articles →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.slice(0, 6).map((article) => (
                        <div key={article.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                                <a href={article.url} target="_blank" rel="noopener noreferrer"
                                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 flex-1">
                                    {article.title}
                                </a>
                                <div className="flex gap-1 shrink-0">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-blue-500 transition-colors p-1">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                    <button onClick={() => dispatch(removeArticle(article.id))}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-auto">
                                <Image src={article.user.profile_image} alt={article.user.name} width={20} height={20} className="rounded-full" />
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex-1 truncate">{article.user.name}</span>
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" />{article.reading_time_minutes}m
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Heart className="w-3 h-3" />{article.positive_reactions_count}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}