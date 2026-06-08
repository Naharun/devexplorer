
"use client";

import { useGetUserEventsQuery } from "@/redux/api/githubApi";
import { GitCommit, Star, GitFork, AlertCircle, Loader2 } from "lucide-react";

interface DeveloperActivityProps {
    username: string;
}

interface GitHubEvent {
    id: string;
    type: string;
    repo: { name: string };
    created_at: string;
    payload: {
        action?: string;
        ref?: string;
        commits?: { message: string }[];
    };
}

function getEventInfo(event: GitHubEvent): {
    icon: React.ReactNode;
    text: string;
    color: string;
} {
    switch (event.type) {
        case "PushEvent":
            return {
                icon: <GitCommit className="w-4 h-4" />,
                text: `Pushed to ${event.repo.name}`,
                color: "text-green-500",
            };
        case "WatchEvent":
            return {
                icon: <Star className="w-4 h-4" />,
                text: `Starred ${event.repo.name}`,
                color: "text-yellow-500",
            };
        case "ForkEvent":
            return {
                icon: <GitFork className="w-4 h-4" />,
                text: `Forked ${event.repo.name}`,
                color: "text-blue-500",
            };
        case "IssuesEvent":
            return {
                icon: <AlertCircle className="w-4 h-4" />,
                text: `${event.payload.action} an issue in ${event.repo.name}`,
                color: "text-red-400",
            };
        default:
            return {
                icon: <GitCommit className="w-4 h-4" />,
                text: `Activity on ${event.repo.name}`,
                color: "text-gray-400",
            };
    }
}

function timeAgo(dateStr: string): string {
    const diff = Math.floor(
        (Date.now() - new Date(dateStr).getTime()) / 1000
    );
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function DeveloperActivity({ username }: DeveloperActivityProps) {
    const { data, isLoading, isError } = useGetUserEventsQuery(username);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                </h2>
                <div className="flex items-center justify-center py-10 text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            </div>
        );
    }

    if (isError || !data || data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                </h2>
                <p className="text-gray-500 text-sm text-center py-6">
                    No recent activity found.
                </p>
            </div>
        );
    }

    const events = (data as GitHubEvent[]).slice(0, 10);

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
            </h2>
            <ul className="space-y-3">
                {events.map((event) => {
                    const { icon, text, color } = getEventInfo(event);
                    return (
                        <li
                            key={event.id}
                            className="flex items-start gap-3 text-sm"
                        >
                            <span className={`mt-0.5 shrink-0 ${color}`}>{icon}</span>
                            <span className="text-gray-700 dark:text-gray-300 flex-1 truncate">
                                {text}
                            </span>
                            <span className="text-gray-400 shrink-0 text-xs">
                                {timeAgo(event.created_at)}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}