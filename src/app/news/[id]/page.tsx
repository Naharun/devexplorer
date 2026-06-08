"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ThumbsUp, Clock, MessageSquare, Loader2 } from "lucide-react";
import { useGetStoryQuery } from "@/redux/api/hackerNewsApi";
import CommentItem from "@/components/features/news/CommentItem";

interface PageProps {
    params: Promise<{ id: string }>;
}

function timeAgo(unix: number): string {
    const diff = Math.floor(Date.now() / 1000 - unix);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function NewsDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const { data: story, isLoading } = useGetStoryQuery(Number(id));

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!story) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Story not found
                </p>
                <Link href="/news" className="inline-flex items-center gap-2 text-orange-500 hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Back to News
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
            {/* Back */}
            <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to News
            </Link>

            {/* Story Header */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {story.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4 text-orange-400" />
                        {story.score} points
                    </span>
                    <span>by {story.by}</span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {timeAgo(story.time)}
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {story.descendants ?? 0} comments
                    </span>
                </div>

                {story.url && (
                    <a
                        href={story.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                   bg-orange-500 hover:bg-orange-600 text-white text-sm
                                   font-medium transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Read Article
                    </a>
                )}
            </div>

            {/* Comments */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Comments ({story.descendants ?? 0})
                </h2>
                {story.kids && story.kids.length > 0 ? (
                    <div className="space-y-2">
                        {story.kids.slice(0, 10).map((id) => (
                            <CommentItem key={id} id={id} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No comments yet.</p>
                )}
            </div>
        </main>
    );
}