"use client";

import { useState } from "react";
import { CollectionItem } from "@/types/collection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItemToCollection, createCollection } from "@/redux/slices/collectionsSlice";
import { toast } from "sonner";
import { FolderPlus, X, Check, FolderOpen } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    item: CollectionItem;
}

export default function AddToCollectionModal({ open, onClose, item }: Props) {
    const dispatch = useAppDispatch();
    const collections = useAppSelector((state) => state.collections.collections);
    const [newName, setNewName] = useState("");
    const [showCreate, setShowCreate] = useState(false);

    if (!open) return null;

    const handleAdd = (collectionId: string, collectionName: string) => {
        dispatch(addItemToCollection({ collectionId, item }));
        toast.success(`Added to "${collectionName}"`);
        onClose();
    };

    const handleCreate = () => {
        if (!newName.trim()) return;
        const id = crypto.randomUUID();
        dispatch(createCollection({ id, name: newName.trim(), items: [] }));
        dispatch(addItemToCollection({ collectionId: id, item }));
        toast.success(`Added to "${newName.trim()}"`);
        setNewName("");
        setShowCreate(false);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                            rounded-2xl p-6 w-full max-w-sm shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                        Add to Collection
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Item info */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 capitalize">{item.type}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>

                </div>

                {/* Collections list */}
                {collections.length > 0 ? (
                    <div className="space-y-2 max-h-52 overflow-y-auto mb-4">
                        {collections.map((collection) => {
                            const alreadyAdded = collection.items.some((i) => i.id === item.id);
                            return (
                                <button
                                    key={collection.id}
                                    disabled={alreadyAdded}
                                    onClick={() => handleAdd(collection.id, collection.name)}
                                    className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all
                                        ${alreadyAdded
                                            ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 cursor-not-allowed"
                                            : "border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <FolderOpen className={`w-4 h-4 ${alreadyAdded ? "text-green-500" : "text-gray-400"}`} />
                                        <span className={`text-sm font-medium ${alreadyAdded ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`}>
                                            {collection.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400">{collection.items.length} items</span>
                                        {alreadyAdded && <Check className="w-4 h-4 text-green-500" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 mb-4">
                        No collections yet. Create one below.
                    </p>
                )}

                {/* Create new */}
                {showCreate ? (
                    <div className="flex gap-2">
                        <input
                            autoFocus
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                            placeholder="Collection name..."
                            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600
                                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button
                            onClick={handleCreate}
                            disabled={!newName.trim()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm
                                       font-medium rounded-xl transition-colors disabled:opacity-50"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => { setShowCreate(false); setNewName(""); }}
                            className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowCreate(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                   border border-dashed border-gray-300 dark:border-gray-600
                                   text-sm text-gray-600 dark:text-gray-400
                                   hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400
                                   transition-all"
                    >
                        <FolderPlus className="w-4 h-4" />
                        Create new collection
                    </button>
                )}

                {/* Cancel */}
                <button
                    onClick={onClose}
                    className="w-full mt-3 px-4 py-2 text-sm text-gray-500 dark:text-gray-400
                               hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}