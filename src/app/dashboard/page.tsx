import DashboardHeader from "@/components/features/dashboard/DashboardHeader";
import UserProfileCard from "@/components/features/dashboard/UserProfileCard";
import StatsCards from "@/components/features/dashboard/StatsCards";
import ActivityChart from "@/components/features/dashboard/ActivityChart";
import SavedRepositories from "@/components/features/dashboard/SavedRepositories";
import SavedDevelopers from "@/components/features/dashboard/SavedDevelopers";
import SavedArticles from "@/components/features/dashboard/SavedArticles";
import CollectionsOverview from "@/components/features/dashboard/CollectionsOverview";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
                <DashboardHeader />
                <UserProfileCard />
                <StatsCards />
                <ActivityChart />
                <div className="grid gap-6 lg:grid-cols-2">
                    <SavedRepositories />
                    <SavedDevelopers />
                </div>
                <SavedArticles />
                <CollectionsOverview />
            </main>
        </ProtectedRoute>
    );
}