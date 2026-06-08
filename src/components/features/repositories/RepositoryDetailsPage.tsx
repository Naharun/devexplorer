"use client";

import { useParams } from "next/navigation";

import {
    useGetRepositoryDetailsQuery,
    useGetRepositoryLanguagesQuery,
    useGetContributorsQuery,
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

    return (
        <div className="max-w-6xl mx-auto p-5">

            <h1 className="text-3xl font-bold">
                {repository?.name}
            </h1>

            <p>{repository?.description}</p>

            <div className="mt-5">
                <p>
                    ⭐ {repository?.stargazers_count}
                </p>

                <p>
                    🍴 {repository?.forks_count}
                </p>
            </div>

            <div className="mt-10">
                <h2 className="font-bold text-xl">
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

            <div className="mt-10">
                <h2 className="font-bold text-xl">
                    Contributors
                </h2>

                {contributors?.slice(0, 10).map(
                    (contributor) => (
                        <div
                            key={contributor.id}
                        >
                            {contributor.login}
                        </div>
                    )
                )}
            </div>

        </div>
    );
}