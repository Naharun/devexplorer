"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { createCollection } from "@/redux/slices/collectionsSlice";

export default function CreateCollectionForm() {
    const [name, setName] = useState("");

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (!name.trim()) return;

        dispatch(
            createCollection({
                id: crypto.randomUUID(),
                name,
                items: [],
            })
        );

        setName("");
    };

    return (
        <div className="flex gap-3">
            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                placeholder="Collection name"
                className="flex-1 rounded-lg border px-3 py-2"
            />

            <button
                onClick={handleSubmit}
                className="rounded-lg border px-4 py-2"
            >
                Create
            </button>
        </div>
    );
}