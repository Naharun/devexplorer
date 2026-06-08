"use client";

import { useAppSelector } from "@/redux/hooks";

export default function UserProfileCard() {
    const user = useAppSelector(
        (state) => state.auth.user
    );

    return (
        <div className="rounded-xl border bg-background p-6">
            <div className="flex items-center gap-4">
                <img
                    src={
                        user?.photoURL ??
                        "https://ui-avatars.com/api/?name=User"
                    }
                    alt="Profile"
                    className="h-16 w-16 rounded-full border"
                />

                <div>
                    <h2 className="text-lg font-semibold">
                        {user?.displayName ?? "Developer"}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {user?.email ?? "No Email"}
                    </p>
                </div>
            </div>
        </div>
    );
}