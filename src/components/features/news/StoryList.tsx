"use client";

import { useGetStoryQuery } from "@/redux/api/hackerNewsApi";
import StoryCard from "./StoryCard";

function StoryCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl p-5 animate-pulse">
            <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                    <div className="flex gap-4">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StoryItemProps {
    id: number;
    index: number;
}

function StoryItem({ id, index }: StoryItemProps) {
    const { data: story, isLoading } = useGetStoryQuery(id);

    if (isLoading) return <StoryCardSkeleton />;
    if (!story || story.type !== "story" || !story.title) return null;

    return <StoryCard story={story} index={index} />;
}

interface Props {
    ids: number[];
    isLoading?: boolean;
}

export default function StoryList({ ids, isLoading }: Props) {
    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                    <StoryCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {ids.slice(0, 20).map((id, index) => (
                <StoryItem key={id} id={id} index={index} />
            ))}
        </div>
    );
}