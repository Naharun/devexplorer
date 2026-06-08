"use client";

import { useAppSelector } from "@/redux/hooks";

export default function CollectionsOverview() {
    const collections =
        useAppSelector(
            (state) => state.collections.collections
        );

    return (
        <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">
                Collections
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
                {collections.map((collection) => {
                    const repos =
                        collection.items.filter(
                            (i) => i.type === "repository"
                        ).length;

                    const developers =
                        collection.items.filter(
                            (i) => i.type === "developer"
                        ).length;

                    const articles =
                        collection.items.filter(
                            (i) => i.type === "article"
                        ).length;

                    return (
                        <div
                            key={collection.id}
                            className="border rounded-lg p-4"
                        >
                            <h3 className="font-semibold">
                                {collection.name}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-3">
                                {collection.items.length} items
                            </p>

                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 rounded bg-blue-100">
                                    Repo: {repos}
                                </span>

                                <span className="px-2 py-1 rounded bg-green-100">
                                    Dev: {developers}
                                </span>

                                <span className="px-2 py-1 rounded bg-purple-100">
                                    Article: {articles}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}