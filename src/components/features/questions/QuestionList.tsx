"use client";

import { SOQuestion } from "@/types/stackoverflow";
import QuestionCard from "./QuestionCard";

function QuestionCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl p-5 animate-pulse">
            <div className="flex gap-4">
                <div className="w-14 space-y-2">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
                <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
                    <div className="flex gap-2">
                        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="flex gap-4">
                        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Props {
    questions: SOQuestion[];
    isLoading?: boolean;
    error?: string;
}

export default function QuestionList({ questions, isLoading, error }: Props) {
    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                    <QuestionCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16 text-red-500">
                <p className="text-lg font-medium">Something went wrong</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium">No questions found</p>
                <p className="text-sm mt-1">Try a different search or tag</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {questions.map((q) => (
                <QuestionCard key={q.question_id} question={q} />
            ))}
        </div>
    );
}