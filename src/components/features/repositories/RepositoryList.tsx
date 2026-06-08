import { Repository } from "@/types/github";
import RepositoryCard from "./RepositoryCard";

interface Props {
    repositories: Repository[];
}

export default function RepositoryList({
    repositories,
}: Props) {
    return (
        <div className="grid gap-4">
            {repositories.map((repo) => (
                <RepositoryCard
                    key={repo.id}
                    repository={repo}
                />
            ))}
        </div>
    );
}