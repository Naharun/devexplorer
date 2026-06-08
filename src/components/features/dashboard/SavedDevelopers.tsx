"use client";

import { useAppSelector } from "@/redux/hooks";

export default function SavedDevelopers() {
    const developers =
        useAppSelector(
            (state) => state.favorites.developers
        );

    return (
        <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">
                Saved Developers
            </h2>

            <div className="space-y-3">
                {developers.slice(0, 5).map((dev) => (
                    <div
                        key={dev.id}
                        className="flex items-center gap-3"
                    >
                        <img
                            src={dev.avatar_url}
                            alt=""
                            className="w-10 h-10 rounded-full"
                        />

                        <span>{dev.login}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}