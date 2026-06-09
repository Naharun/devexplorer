"use client";

import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { Mail, User } from "lucide-react";

export default function UserProfileCard() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-4">
                {user?.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt={user.displayName ?? "User"}
                        width={64}
                        height={64}
                        className="rounded-full ring-4 ring-blue-100 dark:ring-blue-900"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-blue-100 dark:ring-blue-900">
                        {user?.displayName?.[0] ?? user?.email?.[0] ?? "U"}
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {user?.displayName ?? "Developer"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4" />
                        {user?.email ?? "No email"}
                    </p>
                </div>
            </div>
        </div>
    );
}