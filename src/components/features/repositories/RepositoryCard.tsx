"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, GitFork, Circle } from "lucide-react";
import { Repository } from "@/types/github";
import SaveRepositoryButton from "@/components/shared/SaveRepositoryButton";
import { useState } from "react";
import AddToCollectionModal from "@/components/features/collections/AddToCollectionModal";
import { FolderPlus } from "lucide-react";

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
    Rust: "#dea584", Go: "#00ADD8", Java: "#b07219", "C++": "#f34b7d",
    C: "#555555", Ruby: "#701516", Swift: "#F05138", Kotlin: "#A97BFF",
    PHP: "#4F5D95", CSS: "#563d7c", HTML: "#e34c26", Shell: "#89e051",
};

function formatCount(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

interface Props {
    repository: Repository;
}

export default function RepositoryCard({ repository }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const langColor = repository.language
        ? LANGUAGE_COLORS[repository.language] ?? "#8b949e"
        : null;

    return (
        <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600
                        transition-all duration-200 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <Link href={`/repositories/${repository.owner.login}/${repository.name}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <Image
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                        width={32}
                        height={32}
                        className="rounded-full shrink-0"
                    />
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {repository.owner.login}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white truncate
                                      group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {repository.name}
                        </p>
                    </div>
                </Link>
                <SaveRepositoryButton
                    repository={{
                        id: repository.id,
                        name: repository.name,
                        full_name: `${repository.owner.login}/${repository.name}`,
                        description: repository.description,
                        stargazers_count: repository.stargazers_count,
                        forks_count: repository.forks_count,
                        language: repository.language,
                        owner: repository.owner,
                    }}
                />
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    <FolderPlus size={16} />
                </button>
            </div>

            {/* Description */}
            <Link href={`/repositories/${repository.owner.login}/${repository.name}`} className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                    {repository.description ?? "No description available."}
                </p>
            </Link>

            {/* Footer */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                {langColor && (
                    <span className="flex items-center gap-1">
                        <Circle className="w-3 h-3 fill-current" style={{ color: langColor }} />
                        <span>{repository.language}</span>
                    </span>
                )}
                <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {formatCount(repository.stargazers_count)}
                </span>
                <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {formatCount(repository.forks_count)}
                </span>
            </div>
            <AddToCollectionModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                item={{
                    id: repository.id.toString(),
                    type: "repository",
                    title: repository.name,
                    slug: `${repository.owner.login}/${repository.name}`
                }}
            />
        </div>

    );

}