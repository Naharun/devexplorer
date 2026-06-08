import CreateCollectionForm from "@/components/features/collections/CreateCollectionForm";
import CollectionsList from "@/components/features/collections/CollectionsList";

export default function CollectionsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Collections
                </h1>

                <p className="text-muted-foreground">
                    Organize repositories,
                    developers and articles.
                </p>
            </div>

            <CreateCollectionForm />

            <CollectionsList />
        </div>
    );
}