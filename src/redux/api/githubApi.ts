import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contributor, RepositoryLanguage, SearchRepositoriesResponse } from "@/types/github";
import { SearchUsersResponse, UserProfile } from "@/types/developer";

export const githubApi = createApi({
    reducerPath: "githubApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com",
    }),

    endpoints: (builder) => ({
        searchRepositories: builder.query<
            SearchRepositoriesResponse,
            string
        >({
            query: (searchTerm) =>
                `/search/repositories?q=${searchTerm}&sort=stars&order=desc&per_page=20`,
        }),
        getRepositoryDetails: builder.query({
            query: ({
                owner,
                repo,
            }: {
                owner: string;
                repo: string;
            }) => `/repos/${owner}/${repo}`,
        }),

        getRepositoryLanguages: builder.query<
            RepositoryLanguage,
            {
                owner: string;
                repo: string;
            }
        >({
            query: ({ owner, repo }) =>
                `/repos/${owner}/${repo}/languages`,
        }),

        getContributors: builder.query<
            Contributor[],
            {
                owner: string;
                repo: string;
            }
        >({
            query: ({ owner, repo }) =>
                `/repos/${owner}/${repo}/contributors`,
        }),

        getReadme: builder.query<
            { content: string },
            {
                owner: string;
                repo: string;
            }
        >({
            query: ({ owner, repo }) =>
                `/repos/${owner}/${repo}/readme`,
        }),
        searchUsers: builder.query<
            SearchUsersResponse,
            string
        >({
            query: (username) =>
                `/search/users?q=${username}&per_page=20`,
        }),

        getUserProfile: builder.query<
            UserProfile,
            string
        >({
            query: (username) =>
                `/users/${username}`,
        }),

        getUserEvents: builder.query<
            unknown[],
            string
        >({
            query: (username) =>
                `/users/${username}/events`,
        }),
    }),

});

export const {
    useSearchRepositoriesQuery,
    useGetRepositoryDetailsQuery,
    useGetRepositoryLanguagesQuery,
    useGetContributorsQuery,
    useGetReadmeQuery,
    useSearchUsersQuery,
    useGetUserProfileQuery,
    useGetUserEventsQuery,
} = githubApi;