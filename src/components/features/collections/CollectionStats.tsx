import { CollectionItem } from "@/redux/slices/collectionsSlice";

interface Props {
    items: CollectionItem[];
}

export default function CollectionStats({
    items,
}: Props) {
    const repositories =
        items.filter(
            (i) => i.type === "repository"
        ).length;

    const developers =
        items.filter(
            (i) => i.type === "developer"
        ).length;

    const articles =
        items.filter(
            (i) => i.type === "article"
        ).length;

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
                <p className="text-sm text-muted-foreground">
                    Repositories
                </p>

                <h3 className="text-2xl font-bold">
                    {repositories}
                </h3>
            </div>

            <div className="rounded-xl border p-5">
                <p className="text-sm text-muted-foreground">
                    Developers
                </p>

                <h3 className="text-2xl font-bold">
                    {developers}
                </h3>
            </div>

            <div className="rounded-xl border p-5">
                <p className="text-sm text-muted-foreground">
                    Articles
                </p>

                <h3 className="text-2xl font-bold">
                    {articles}
                </h3>
            </div>
        </div>
    );
}