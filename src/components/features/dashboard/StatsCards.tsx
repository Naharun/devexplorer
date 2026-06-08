"use client";

import { useAppSelector } from "@/redux/hooks";

export default function StatsCards() {
    const repos =
        useAppSelector(
            (state) => state.favorites.repositories
        );

    const developers =
        useAppSelector(
            (state) => state.favorites.developers
        );

    const articles =
        useAppSelector(
            (state) => state.favorites.articles
        );

    const collections =
        useAppSelector(
            (state) => state.collections.collections
        );

    const cards = [
        {
            title: "Repositories",
            value: repos.length,
        },
        {
            title: "Developers",
            value: developers.length,
        },
        {
            title: "Articles",
            value: articles.length,
        },
        {
            title: "Collections",
            value: collections.length,
        },
    ];

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="bg-card rounded-xl p-6 border"
                >
                    <h3 className="text-sm text-muted-foreground">
                        {card.title}
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {card.value}
                    </p>
                </div>
            ))}
        </div>
    );
}