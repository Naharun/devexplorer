"use client";

import Image from "next/image";
import {
    MapPin,
    Building2,
    Link as LinkIcon,

    ExternalLink,
} from "lucide-react";
import { UserProfile } from "@/types/developer";

interface DeveloperProfileHeaderProps {
    profile: UserProfile;
}

export default function DeveloperProfileHeader({
    profile,
}: DeveloperProfileHeaderProps) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <Image
                    src={profile.avatar_url}
                    alt={profile.login}
                    width={100}
                    height={100}
                    className="rounded-full ring-4 ring-blue-100 dark:ring-blue-900 shrink-0"
                />

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {profile.name ?? profile.login}
                        </h1>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                            @{profile.login}
                        </span>
                    </div>

                    {profile.bio && (
                        <p className="text-gray-600 dark:text-gray-300 mt-1 mb-4 max-w-xl">
                            {profile.bio}
                        </p>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                        {profile.location && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {profile.location}
                            </span>
                        )}
                        {profile.company && (
                            <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {profile.company}
                            </span>
                        )}
                        {profile.blog && (
                            <a
                                href={profile.blog}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                            >
                                <LinkIcon className="w-4 h-4" />
                                Website
                            </a>
                        )}
                        {/* {profile.twitter_username && (
                            <a
                                href={`https://twitter.com/${profile.twitter_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                            >
                                <Twitter className="w-4 h-4" />@{profile.twitter_username}
                            </a>
                        )} */}
                    </div>
                </div>

                {/* GitHub Button */}
                <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:opacity-80 transition-opacity"
                >
                    <ExternalLink className="w-4 h-4" />
                    GitHub Profile
                </a>
            </div>
        </div>
    );
}