import ExportFavorites from "./ExportFavorites";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Dashboard
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Your saved resources and collections
                </p>
            </div>
            <ExportFavorites />
        </div>
    );
}