import SavedRepositories from "@/components/features/dashboard/SavedRepositories";
import SavedDevelopers from "@/components/features/dashboard/SavedDevelopers";
import SavedArticles from "@/components/features/dashboard/SavedArticles";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function FavoritesPage() {
    return (
        <ProtectedRoute>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Favorites
                    </h1>

                    <p className="text-muted-foreground">
                        All your saved resources.
                    </p>
                </div>

                <SavedRepositories />

                <SavedDevelopers />

                <SavedArticles />
            </div>
        </ProtectedRoute>
    );
}