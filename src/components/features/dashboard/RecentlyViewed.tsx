"use client";

import { useAppSelector } from "@/redux/hooks";

export default function RecentlyViewed() {
    const items = useAppSelector(
        (state) => state.recentlyViewed.items
    );

    if (!items.length) return null;

    return (
        <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">
                Recently Viewed
            </h2>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={`${item.type}-${item.id}`}
                        className="flex items-center justify-between border rounded-lg p-3"
                    >
                        <div>
                            <p className="font-medium">
                                {item.title}
                            </p>

                            <p className="text-xs text-muted-foreground capitalize">
                                {item.type}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}