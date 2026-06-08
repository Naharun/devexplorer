"use client";

import { useAppSelector } from "@/redux/hooks";
import CollectionStats from "./CollectionStats";
import EmptyCollectionItems from "./EmptyCollectionItems";
import CollectionItemCard from "./CollectionItemCard";


interface Props {
    id: string;
}

export default function CollectionDetails({
    id,
}: Props) {
    const collection = useAppSelector((state) =>
        state.collections.collections.find(
            (c) => c.id === id
        )
    );

    if (!collection) {
        return (
            <div className="text-center py-20">
                Collection not found
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    {collection.name}
                </h1>

                <p className="text-muted-foreground">
                    {collection.items.length} items
                </p>
            </div>

            <CollectionStats
                items={collection.items}
            />

            {collection.items.length === 0 ? (
                <EmptyCollectionItems />
            ) : (
                <div className="grid gap-4">
                    {collection.items.map((item) => (
                        <CollectionItemCard
                            key={`${item.type}-${item.id}`}
                            item={item}
                            collectionId={collection.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}