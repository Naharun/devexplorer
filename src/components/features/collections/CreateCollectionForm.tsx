"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { createCollection } from "@/redux/slices/collectionsSlice";
import { FolderPlus } from "lucide-react";

export default function CreateCollectionForm() {
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(createCollection({
            id: crypto.randomUUID(),
            name: name.trim(),
            items: [],
        }));
        setName("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New collection name..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           placeholder:text-gray-400 focus:outline-none focus:ring-2
                           focus:ring-blue-500 transition-all text-sm"
            />
            <button
                type="submit"
                disabled={!name.trim()}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700
                           text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
            >
                <FolderPlus className="w-4 h-4" />
                Create
            </button>
        </form>
    );
}