"use client";

import Link from "next/link";
import { ExternalLink, MessageSquare, ThumbsUp, Clock } from "lucide-react";
import { HNStory } from "@/types/hackernews";

interface Props {
    story: HNStory;
    index: number;
}

function timeAgo(unix: number): string {
    const diff = Math.floor(Date.now() / 1000 - unix);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

function getDomain(url?: string): string | null {
    if (!url) return null;
    try {
        return new URL(url).hostname.replace("www.", "");
    } catch {
        return null;
    }
}

export default function StoryCard({ story, index }: Props) {
    const domain = getDomain(story.url);

    return (
        <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl p-5 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600
                        transition-all duration-200">
            <div className="flex gap-4">
                {/* Index */}
                <span className="text-2xl font-bold text-gray-200 dark:text-gray-700 w-8 shrink-0 text-center">
                    {index + 1}
                </span>

                <div className="flex-1 min-w-0">
                    {/* Title */}
                    <div className="flex items-start gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white
                                       group-hover:text-orange-600 dark:group-hover:text-orange-400
                                       transition-colors line-clamp-2 flex-1">
                            {story.url ? (
                                <a
                                    href={story.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {story.title}
                                </a>
                            ) : (
                                story.title
                            )}
                        </h3>
                        {story.url && (
                            <a
                                href={story.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-orange-500 transition-colors shrink-0"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>

                    {/* Domain */}
                    {domain && (
                        <p className="text-xs text-gray-400 mb-3">{domain}</p>
                    )}

                    {/* Footer */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-orange-400" />
                            {story.score} points
                        </span>
                        <span>by {story.by}</span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {timeAgo(story.time)}
                        </span>
                        <Link
                            href={`/news/${story.id}`}
                            className="flex items-center gap-1 hover:text-orange-500 transition-colors ml-auto"
                        >
                            <MessageSquare className="w-4 h-4" />
                            {story.descendants ?? 0} comments
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}