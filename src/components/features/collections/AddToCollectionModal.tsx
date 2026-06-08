"use client";

import { CollectionItem } from "@/types/collection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItemToCollection } from "@/redux/slices/collectionsSlice";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onClose: () => void;
    item: CollectionItem;
}

export default function AddToCollectionModal({
    open,
    onClose,
    item,
}: Props) {
    const dispatch = useAppDispatch();

    const collections = useAppSelector(
        (state) => state.collections.collections
    );

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-background rounded-xl p-6 w-full max-w-md">
                <h2 className="font-bold text-lg mb-4">
                    Add to Collection
                </h2>

                <div className="space-y-2">
                    {collections.map((collection) => (
                        <button
                            key={collection.id}
                            className="w-full border rounded-lg p-3 text-left hover:bg-muted"
                            onClick={() => {
                                dispatch(
                                    addItemToCollection({
                                        collectionId:
                                            collection.id,
                                        item,
                                    })
                                );

                                toast.success(
                                    `Added to ${collection.name}`
                                );

                                onClose();
                            }}
                        >
                            {collection.name}
                        </button>
                    ))}
                </div>

                <button
                    className="mt-4 w-full border rounded-lg p-2"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}