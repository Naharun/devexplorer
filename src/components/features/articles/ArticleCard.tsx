"use client";

import Image from "next/image";
import { Clock, Heart, MessageCircle } from "lucide-react";
import { Article } from "@/types/devto";
import SaveArticleButton from "@/components/shared/SaveArticleButton";

interface Props {
    article: Article;
}

function timeAgo(dateStr: string): string {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function ArticleCard({ article }: Props) {
    return (
        <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                       rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300
                       dark:hover:border-blue-600 transition-all duration-200 flex flex-col">
            {/* Cover Image */}
            {article.cover_image && (
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <div className="relative w-full h-40 overflow-hidden">
                        <Image
                            src={article.cover_image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </a>
            )}

            <div className="p-5 flex flex-col flex-1">
                {/* Tags */}
                {article.tag_list.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {article.tag_list.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2
                                   group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                        {article.description}
                    </p>
                </a>

                {/* Footer */}
                <div className="flex items-center gap-3 mt-auto">
                    <Image
                        src={article.user.profile_image}
                        alt={article.user.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-1 truncate">
                        {article.user.name}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{article.reading_time_minutes}m
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />{article.positive_reactions_count}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />{article.comments_count}
                        </span>
                        <SaveArticleButton
                            article={{
                                id: article.id,
                                title: article.title,
                                url: article.url,
                                cover_image: article.cover_image,
                                reading_time_minutes: article.reading_time_minutes,
                                positive_reactions_count: article.positive_reactions_count,
                                user: article.user,
                                tag_list: article.tag_list,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}