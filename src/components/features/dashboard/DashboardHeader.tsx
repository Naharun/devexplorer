import ExportFavorites from "./ExportFavorites";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Developer analytics overview
                </p>
            </div>

            <ExportFavorites />
        </div>
    );
}