"use client";

import { useAppSelector } from "@/redux/hooks";
import CollectionCard from "./CollectionCard";
import EmptyCollections from "./EmptyCollections";

export default function CollectionsList() {
    const collections = useAppSelector(
        (state) => state.collections.collections
    );

    if (!collections.length) {
        return <EmptyCollections />;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection) => (
                <CollectionCard
                    key={collection.id}
                    collection={collection}
                />
            ))}
        </div>
    );
}