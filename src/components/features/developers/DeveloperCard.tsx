"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, BookOpen, ExternalLink } from "lucide-react";
import { GitHubUser } from "@/types/developer";

interface DeveloperCardProps {
    user: GitHubUser;
}

export default function DeveloperCard({ user }: DeveloperCardProps) {
    return (
        <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
            <div className="flex items-center gap-4">

                <Link href={`/developers/${user.login}`}>
                    <Image
                        src={user.avatar_url}
                        alt={user.login}
                        width={56}
                        height={56}
                        className="rounded-full ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-blue-300 transition-all"
                    />
                </Link>

                <div className="flex-1 min-w-0">
                    <Link
                        href={`/developers/${user.login}`}
                        className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block"
                    >
                        {user.login}
                    </Link>
                    <span className="text-xs text-gray-500 capitalize">{user.type}</span>
                </div>

                <a
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>

            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    GitHub User
                </span>
                <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    View Profile
                </span>
            </div>
        </div>
    );
}
