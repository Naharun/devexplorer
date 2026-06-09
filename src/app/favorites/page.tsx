import SavedRepositories from "@/components/features/dashboard/SavedRepositories";
import SavedDevelopers from "@/components/features/dashboard/SavedDevelopers";
import SavedArticles from "@/components/features/dashboard/SavedArticles";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function FavoritesPage() {
    return (
        <ProtectedRoute>
            <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Favorites
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        All your saved resources.
                    </p>
                </div>
                <SavedRepositories />
                <SavedDevelopers />
                <SavedArticles />
            </main>
        </ProtectedRoute>
    );
}