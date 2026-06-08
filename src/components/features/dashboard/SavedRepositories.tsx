"use client";

import { useAppSelector } from "@/redux/hooks";

export default function SavedRepositories() {
    const repositories =
        useAppSelector(
            (state) => state.favorites.repositories
        );

    return (
        <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">
                Saved Repositories
            </h2>

            <div className="space-y-3">
                {repositories.slice(0, 5).map((repo) => (
                    <div
                        key={repo.id}
                        className="border rounded-lg p-3"
                    >
                        <p className="font-medium">
                            {repo.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            ⭐ {repo.stargazers_count}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}