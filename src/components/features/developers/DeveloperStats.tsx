"use client";

import { UserProfile } from "@/types/developer";
import { Users, BookOpen, UserCheck, GitFork } from "lucide-react";

interface DeveloperStatsProps {
    profile: UserProfile;
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number;
}

function StatCard({ icon, label, value }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col items-center gap-2">
            <div className="text-blue-500">{icon}</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {value.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </div>
    );
}

export default function DeveloperStats({ profile }: DeveloperStatsProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
                icon={<Users className="w-6 h-6" />}
                label="Followers"
                value={profile.followers}
            />
            <StatCard
                icon={<UserCheck className="w-6 h-6" />}
                label="Following"
                value={profile.following}
            />
            <StatCard
                icon={<BookOpen className="w-6 h-6" />}
                label="Repositories"
                value={profile.public_repos}
            />
            <StatCard
                icon={<GitFork className="w-6 h-6" />}
                label="Member Since"
                value={new Date(profile.created_at).getFullYear()}
            />
        </div>
    );
}