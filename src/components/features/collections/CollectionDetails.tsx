"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import CollectionStats from "./CollectionStats";
import EmptyCollectionItems from "./EmptyCollectionItems";
import CollectionItemCard from "./CollectionItemCard";

interface Props {
    id: string;
}

export default function CollectionDetails({ id }: Props) {
    const collection = useAppSelector((state) =>
        state.collections.collections.find((c) => c.id === id)
    );

    if (!collection) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-16 text-center">
                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Collection not found
                </p>
                <Link href="/collections" className="inline-flex items-center gap-2 text-blue-500 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Collections
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
            <Link href="/collections"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Collections
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {collection.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {collection.items.length} items
                </p>
            </div>

            <CollectionStats items={collection.items} />

            {collection.items.length === 0 ? (
                <EmptyCollectionItems />
            ) : (
                <div className="space-y-3">
                    {collection.items.map((item) => (
                        <CollectionItemCard
                            key={`${item.type}-${item.id}`}
                            item={item}
                            collectionId={collection.id}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}