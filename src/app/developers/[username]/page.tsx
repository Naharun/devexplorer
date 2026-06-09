"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useGetUserProfileQuery } from "@/redux/api/githubApi";
import { useAppDispatch } from "@/redux/hooks";
import { addRecentlyViewed } from "@/redux/slices/recentlyViewedSlice";
import DeveloperProfileHeader from "@/components/features/developers/DeveloperProfileHeader";
import DeveloperStats from "@/components/features/developers/DeveloperStats";
import DeveloperActivity from "@/components/features/developers/DeveloperActivity";

interface PageProps {
    params: Promise<{ username: string }>;
}

export default function DeveloperProfilePage({ params }: PageProps) {
    const { username } = use(params);
    const dispatch = useAppDispatch();
    const { data: profile, isLoading, isError } = useGetUserProfileQuery(username);

    useEffect(() => {
        if (profile) {
            dispatch(addRecentlyViewed({
                id: profile.id,
                title: profile.login,
                type: "developer",
            }));
        }
    }, [profile, dispatch]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (isError || !profile) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    User not found
                </p>
                <p className="text-gray-500 mb-6">&quot;{username}&quot; does not exist on GitHub.</p>
                <Link href="/developers" className="inline-flex items-center gap-2 text-blue-500 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Developers
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
            <Link href="/developers"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Developers
            </Link>
            <DeveloperProfileHeader profile={profile} />
            <DeveloperStats profile={profile} />
            <DeveloperActivity username={username} />
        </main>
    );
}