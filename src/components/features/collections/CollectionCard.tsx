"use client";

import Link from "next/link";
import type { Collection } from "@/types/collection";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { deleteCollection } from "@/redux/slices/collectionsSlice";

interface Props {
    collection: Collection;
}

export default function CollectionCard({ collection }: Props) {
    const dispatch = useAppDispatch();

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(deleteCollection(collection.id));
    };

    return (
        <Link
            href={`/collections/${collection.id}`}
            className="block rounded-xl border p-5 hover:bg-muted/50 transition"
        >
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                    {collection.name}
                </h3>

                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
                {collection.items.length} items
            </p>
        </Link>
    );
}