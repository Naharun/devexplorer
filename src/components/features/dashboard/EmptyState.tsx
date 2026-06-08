interface EmptyStateProps {
    title: string;
    description: string;
}

export default function EmptyState({
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="rounded-xl border p-10 text-center">
            <h3 className="font-semibold">{title}</h3>

            <p className="mt-2 text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}