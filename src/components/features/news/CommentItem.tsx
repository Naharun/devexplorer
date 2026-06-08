"use client";

import { useGetCommentQuery } from "@/redux/api/hackerNewsApi";

interface Props {
    id: number;
    depth?: number;
}

function timeAgo(unix: number): string {
    const diff = Math.floor(Date.now() / 1000 - unix);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function CommentItem({ id, depth = 0 }: Props) {
    const { data: comment, isLoading } = useGetCommentQuery(id);

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-2 py-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
            </div>
        );
    }

    if (!comment || comment.deleted || comment.dead || !comment.text) return null;

    return (
        <div className={`border-l-2 border-gray-200 dark:border-gray-700 pl-4 ${depth > 0 ? "mt-3" : "mt-4"}`}>
            <div className="flex items-center gap-2 mb-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">{comment.by}</span>
                <span>{timeAgo(comment.time)}</span>
            </div>
            <div
                className="text-sm text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none
                           [&_a]:text-blue-500 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: comment.text }}
            />
            {/* Nested comments — max depth 2 */}
            {depth < 2 && comment.kids?.slice(0, 3).map((kidId) => (
                <CommentItem key={kidId} id={kidId} depth={depth + 1} />
            ))}
        </div>
    );
}