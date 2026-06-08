import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HNStory, HNComment } from "@/types/hackernews";

export const hackerNewsApi = createApi({
    reducerPath: "hackerNewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://hacker-news.firebaseio.com/v0",
    }),
    endpoints: (builder) => ({
        getTopStoryIds: builder.query<number[], void>({
            query: () => "/topstories.json",
        }),
        getNewStoryIds: builder.query<number[], void>({
            query: () => "/newstories.json",
        }),
        getBestStoryIds: builder.query<number[], void>({
            query: () => "/beststories.json",
        }),
        getStory: builder.query<HNStory, number>({
            query: (id) => `/item/${id}.json`,
        }),
        getComment: builder.query<HNComment, number>({
            query: (id) => `/item/${id}.json`,
        }),
    }),
});

export const {
    useGetTopStoryIdsQuery,
    useGetNewStoryIdsQuery,
    useGetBestStoryIdsQuery,
    useGetStoryQuery,
    useGetCommentQuery,
} = hackerNewsApi;