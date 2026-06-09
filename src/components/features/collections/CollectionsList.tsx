"use client";

import { useAppSelector } from "@/redux/hooks";
import CollectionCard from "./CollectionCard";
import EmptyCollections from "./EmptyCollections";

export default function CollectionsList() {
    const collections = useAppSelector((state) => state.collections.collections);

    if (!collections.length) return <EmptyCollections />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </div>
    );
}