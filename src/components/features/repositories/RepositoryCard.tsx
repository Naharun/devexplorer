import { Repository } from "@/types/github";
import Link from "next/link";

interface Props {
    repository: Repository;
}

export default function RepositoryCard({
    repository,
}: Props) {
    return (
        <Link
            href={`/repositories/${repository.owner.login}/${repository.name}`}
        >
            <div className="border rounded-lg p-4 hover:shadow-lg">
                ...
            </div>
        </Link>
    );
}