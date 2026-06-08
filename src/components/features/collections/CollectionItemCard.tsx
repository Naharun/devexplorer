"use client";

import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import {
    CollectionItem,
    removeItemFromCollection,
} from "@/redux/slices/collectionsSlice";

interface Props {
    item: CollectionItem;
    collectionId: string;
}

export default function CollectionItemCard({
    item,
    collectionId,
}: Props) {
    const dispatch = useAppDispatch();

    return (
        <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
                <h3 className="font-medium">
                    {item.title}
                </h3>

                <div className="mt-2">
                    {item.type ===
                        "repository" && (
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs">
                                Repository
                            </span>
                        )}

                    {item.type ===
                        "developer" && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs">
                                Developer
                            </span>
                        )}

                    {item.type ===
                        "article" && (
                            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs">
                                Article
                            </span>
                        )}
                </div>
            </div>

            <button
                onClick={() =>
                    dispatch(
                        removeItemFromCollection({
                            collectionId,
                            itemId: item.id,
                        })
                    )
                }
                className="text-red-500"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}