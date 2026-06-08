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
                {collections.map((collection) => (
                    <div
                        key={collection.id}
                        className="border rounded-lg p-4"
                    >
                        <h3 className="font-semibold">
                            {collection.name}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            {collection.items.length} items
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}