"use client";

import { useAppSelector } from "@/redux/hooks";

export default function ExportFavorites() {
    const favorites = useAppSelector(
        (state) => state.favorites
    );

    const handleExport = () => {
        const blob = new Blob(
            [JSON.stringify(favorites, null, 2)],
            {
                type: "application/json",
            }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "favorites.json";

        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            className="rounded-lg border px-4 py-2"
        >
            Export Favorites
        </button>
    );
}