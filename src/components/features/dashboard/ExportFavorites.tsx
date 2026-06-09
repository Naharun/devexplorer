"use client";

import { useAppSelector } from "@/redux/hooks";
import { Download } from "lucide-react";

export default function ExportFavorites() {
    const favorites = useAppSelector((state) => state.favorites);

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(favorites, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "devexplorer-favorites.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                       text-sm font-medium text-gray-600 dark:text-gray-300
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Favorites
        </button>
    );
}