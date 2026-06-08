"use client";

import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

import {
    useGetRepositoryDetailsQuery,
    useGetRepositoryLanguagesQuery,
    useGetContributorsQuery,
    useGetReadmeQuery,
} from "@/redux/api/githubApi";

export default function RepositoryDetailsPage() {
    const params = useParams();

    const owner = params.owner as string;
    const repo = params.repo as string;

    const { data: repository } =
        useGetRepositoryDetailsQuery({
            owner,
            repo,
        });

    const { data: languages } =
        useGetRepositoryLanguagesQuery({
            owner,
            repo,
        });

    const { data: contributors } =
        useGetContributorsQuery({
            owner,
            repo,
        });

    const { data: readme } =
        useGetReadmeQuery({
            owner,
            repo,
        });

    const decodedReadme =
        readme?.content
            ? atob(readme.content)
            : "";

    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-3xl font-bold">
                {repository?.name}
            </h1>

            <p className="mt-2">
                {repository?.description}
            </p>

            <div className="mt-5 flex gap-4">
                <p>
                    ⭐ {repository?.stargazers_count}
                </p>

                <p>
                    🍴 {repository?.forks_count}
                </p>
            </div>

            {/* Languages */}
            <div className="mt-10">
                <h2 className="text-xl font-bold">
                    Languages
                </h2>

                <pre>
                    {JSON.stringify(
                        languages,
                        null,
                        2
                    )}
                </pre>
            </div>

            {/* Contributors */}
            <div className="mt-10">
                <h2 className="text-xl font-bold">
                    Contributors
                </h2>

                {contributors
                    ?.slice(0, 10)
                    .map((contributor) => (
                        <div
                            key={contributor.id}
                        >
                            {contributor.login}
                        </div>
                    ))}
            </div>

            {/* README */}
            <div className="mt-10">
                <h2 className="text-xl font-bold">
                    README
                </h2>

                <div className="prose max-w-none">
                    <ReactMarkdown>
                        {decodedReadme}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}