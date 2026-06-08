"use client";

import Link from "next/link";
import { CheckCircle, MessageSquare, Eye, ThumbsUp } from "lucide-react";
import { SOQuestion } from "@/types/stackoverflow";

interface Props {
    question: SOQuestion;
}

function timeAgo(unix: number): string {
    const diff = Math.floor(Date.now() / 1000 - unix);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function QuestionCard({ question }: Props) {
    return (
        <Link href={`/questions/${question.question_id}`}>
            <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                            rounded-xl p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600
                            transition-all duration-200">
                <div className="flex gap-4">
                    {/* Stats column */}
                    <div className="flex flex-col items-center gap-3 shrink-0 text-center w-14">
                        <div className={`flex flex-col items-center text-xs rounded-lg px-2 py-1
                            ${question.is_answered
                                ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                            }`}>
                            {question.is_answered && (
                                <CheckCircle className="w-3 h-3 mb-0.5" />
                            )}
                            <span className="font-bold">{question.answer_count}</span>
                            <span>answers</span>
                        </div>
                        <div className="flex flex-col items-center text-xs text-gray-500 dark:text-gray-400">
                            <ThumbsUp className="w-3 h-3 mb-0.5" />
                            <span className="font-semibold">{question.score}</span>
                            <span>votes</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2
                                       group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {question.title}
                        </h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                            {question.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30
                                               text-blue-600 dark:text-blue-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {question.view_count.toLocaleString()} views
                            </span>
                            <span>by {question.owner.display_name}</span>
                            <span>{timeAgo(question.creation_date)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}