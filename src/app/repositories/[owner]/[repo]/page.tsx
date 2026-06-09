"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, GitFork, ExternalLink, Loader2, Users, Circle } from "lucide-react";
import {
    useGetRepositoryDetailsQuery,
    useGetRepositoryLanguagesQuery,
    useGetContributorsQuery,
    useGetReadmeQuery,
} from "@/redux/api/githubApi";
import { useAppDispatch } from "@/redux/hooks";
import { addRecentlyViewed } from "@/redux/slices/recentlyViewedSlice";
import LanguageChart from "@/components/features/repositories/LanguageChart";
import ReactMarkdown from "react-markdown";

interface PageProps {
    params: Promise<{ owner: string; repo: string }>;
}

function formatCount(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

export default function RepositoryDetailsPage({ params }: PageProps) {
    const { owner, repo } = use(params);
    const dispatch = useAppDispatch();

    const { data: repository, isLoading } = useGetRepositoryDetailsQuery({ owner, repo });
    const { data: languages } = useGetRepositoryLanguagesQuery({ owner, repo });
    const { data: contributors } = useGetContributorsQuery({ owner, repo });
    const { data: readme } = useGetReadmeQuery({ owner, repo });

    const decodedReadme = readme?.content
        ? atob(readme.content.replace(/\n/g, ""))
        : "";

    useEffect(() => {
        if (repository) {
            dispatch(addRecentlyViewed({
                id: repository.id,
                title: `${owner}/${repo}`,
                type: "repository",
            }));
        }
    }, [repository, dispatch, owner, repo]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!repository) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Repository not found</p>
                <Link href="/repositories" className="inline-flex items-center gap-2 text-blue-500 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Repositories
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
            <Link href="/repositories"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Repositories
            </Link>

            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <Image src={repository.owner.avatar_url} alt={repository.owner.login}
                        width={64} height={64} className="rounded-full ring-4 ring-blue-100 dark:ring-blue-900" />
                    <div className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{repository.owner.login}</p>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{repository.name}</h1>
                        {repository.description && (
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{repository.description}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                {formatCount(repository.stargazers_count)} stars
                            </span>
                            <span className="flex items-center gap-1">
                                <GitFork className="w-4 h-4 text-blue-400" />
                                {formatCount(repository.forks_count)} forks
                            </span>
                            {repository.language && (
                                <span className="flex items-center gap-1">
                                    <Circle className="w-3 h-3 fill-current text-blue-500" />
                                    {repository.language}
                                </span>
                            )}
                        </div>
                    </div>
                    <a href={`https://github.com/${owner}/${repo}`} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white
                                   text-white dark:text-gray-900 text-sm font-medium hover:opacity-80 transition-opacity">
                        <ExternalLink className="w-4 h-4" /> GitHub
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left */}
                <div className="space-y-6">
                    {languages && Object.keys(languages).length > 0 && (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Languages</h2>
                            <LanguageChart languages={languages} />
                        </div>
                    )}
                    {contributors && contributors.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5" /> Contributors
                            </h2>
                            <ul className="space-y-3">
                                {contributors.slice(0, 8).map((c) => (
                                    <li key={c.id} className="flex items-center gap-3">
                                        <Image src={c.avatar_url} alt={c.login} width={32} height={32} className="rounded-full" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 truncate">{c.login}</span>
                                        <span className="text-xs text-gray-400">{c.contributions}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* README */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">README</h2>
                    {decodedReadme ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none overflow-auto">
                            <ReactMarkdown>{decodedReadme}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No README available.</p>
                    )}
                </div>
            </div>
        </main>
    );
}