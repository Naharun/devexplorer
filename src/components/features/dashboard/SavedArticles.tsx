"use client";

import { useAppSelector } from "@/redux/hooks";

export default function SavedArticles() {
    const articles =
        useAppSelector(
            (state) => state.favorites.articles
        );

    return (
        <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">
                Saved Articles
            </h2>

            <div className="space-y-3">
                {articles.slice(0, 6).map((article) => (
                    <div
                        key={article.id}
                        className="border rounded-lg p-3"
                    >
                        <p>{article.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}