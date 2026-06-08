export default function EmptyCollectionItems() {
    return (
        <div className="rounded-xl border border-dashed p-12 text-center">
            <h3 className="font-semibold">
                No items yet
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
                Add repositories,
                developers or articles
                to this collection.
            </p>
        </div>
    );
}