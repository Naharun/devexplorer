"use client";

import { useAppSelector } from "@/redux/hooks";

export default function RecentlyViewed() {
    const items = useAppSelector(
        (state) => state.recentlyViewed.items
    );

    if (!items.length) {
        return (
            <div className="rounded-xl border p-6">
                <h2 className="mb-4 text-lg font-semibold">
                    Recently Viewed
                </h2>

                <p className="text-sm text-muted-foreground">
                    No recently viewed items.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border p-6">
            <h2 className="mb-4 text-lg font-semibold">
                Recently Viewed
            </h2>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={`${item.type}-${item.id}`}
                        className="rounded-lg border p-3"
                    >
                        <p className="font-medium">
                            {item.title}
                        </p>

                        <p className="text-xs capitalize text-muted-foreground">
                            {item.type}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}