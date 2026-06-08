"use client";

import { use } from "react";
import Link from "next/link";
import {
    ArrowLeft, CheckCircle, ThumbsUp,
    Eye, Clock, ExternalLink, Loader2, MessageSquare
} from "lucide-react";
import { useGetQuestionsQuery, useGetQuestionAnswersQuery } from "@/redux/api/stackExchangeApi";

interface PageProps {
    params: Promise<{ id: string }>;
}

function timeAgo(unix: number): string {
    const diff = Math.floor(Date.now() / 1000 - unix);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function QuestionDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const questionId = Number(id);

    const { data: questionsData, isLoading: qLoading } = useGetQuestionsQuery({});
    const question = questionsData?.items.find((q) => q.question_id === questionId);

    const { data: answersData, isLoading: aLoading } = useGetQuestionAnswersQuery(questionId);

    if (qLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
            {/* Back */}
            <Link
                href="/questions"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Questions
            </Link>

            {/* Question */}
            {question && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex-1">
                            {question.title}
                        </h1>
                        <a
                            href={question.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                        {question.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30
                                           text-blue-600 dark:text-blue-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" /> {question.score} votes
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" /> {question.view_count.toLocaleString()} views
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" /> {question.answer_count} answers
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {timeAgo(question.creation_date)}
                        </span>
                        <span>by {question.owner.display_name}</span>
                    </div>

                    {/* Body */}
                    {question.body && (
                        <div
                            className="prose prose-sm dark:prose-invert max-w-none
                                       [&_pre]:bg-gray-100 [&_pre]:dark:bg-gray-900 [&_pre]:p-3 [&_pre]:rounded-lg
                                       [&_code]:text-blue-600 [&_code]:dark:text-blue-400"
                            dangerouslySetInnerHTML={{ __html: question.body }}
                        />
                    )}
                </div>
            )}

            {/* Answers */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Answers ({answersData?.items.length ?? 0})
                </h2>

                {aLoading && (
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    </div>
                )}

                {answersData?.items.map((answer) => (
                    <div
                        key={answer.answer_id}
                        className={`bg-white dark:bg-gray-800 border rounded-2xl p-6
                            ${answer.is_accepted
                                ? "border-green-400 dark:border-green-600"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                    >
                        {/* Answer header */}
                        <div className="flex items-center gap-3 mb-4">
                            {answer.is_accepted && (
                                <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                                    <CheckCircle className="w-4 h-4" />
                                    Accepted Answer
                                </span>
                            )}
                            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ml-auto">
                                <ThumbsUp className="w-4 h-4" /> {answer.score}
                            </span>
                        </div>

                        {/* Answer body */}
                        <div
                            className="prose prose-sm dark:prose-invert max-w-none
                                       [&_pre]:bg-gray-100 [&_pre]:dark:bg-gray-900 [&_pre]:p-3 [&_pre]:rounded-lg
                                       [&_code]:text-blue-600 [&_code]:dark:text-blue-400"
                            dangerouslySetInnerHTML={{ __html: answer.body }}
                        />

                        {/* Answer footer */}
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700
                                        text-xs text-gray-400 flex items-center gap-3">
                            <span>by {answer.owner.display_name}</span>
                            {answer.owner.reputation && (
                                <span>{answer.owner.reputation.toLocaleString()} rep</span>
                            )}
                            <span>{timeAgo(answer.creation_date)}</span>
                        </div>
                    </div>
                ))}

                {!aLoading && answersData?.items.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-8">
                        No answers yet.
                    </p>
                )}
            </div>
        </main>
    );
}