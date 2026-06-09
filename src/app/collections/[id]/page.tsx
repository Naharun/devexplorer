import CollectionDetails from "@/components/features/collections/CollectionDetails";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function CollectionPage({
    params,
}: Props) {
    const { id } = await params;

    return <CollectionDetails id={id} />;
}
