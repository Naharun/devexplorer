import CreateCollectionForm from "@/components/features/collections/CreateCollectionForm";
import CollectionsList from "@/components/features/collections/CollectionsList";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function CollectionsPage() {
    return (
        <ProtectedRoute>
            <main className="max-w-6xl mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Collections
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Organize repositories, developers and articles into groups.
                    </p>
                </div>
                <div className="mb-8">
                    <CreateCollectionForm />
                </div>
                <CollectionsList />
            </main>
        </ProtectedRoute>
    );
}