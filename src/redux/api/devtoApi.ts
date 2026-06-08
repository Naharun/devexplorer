import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article, Tag } from "@/types/devto";

export const devtoApi = createApi({
    reducerPath: "devtoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dev.to/api",
    }),
    endpoints: (builder) => ({
        getArticles: builder.query<
            Article[],
            { page?: number; tag?: string; per_page?: number }
        >({
            query: ({ page = 1, tag, per_page = 20 }) => {
                let url = `/articles?page=${page}&per_page=${per_page}`;
                if (tag) url += `&tag=${tag}`;
                return url;
            },
        }),

        getArticle: builder.query<Article, number>({
            query: (id) => `/articles/${id}`,
        }),

        getTags: builder.query<Tag[], void>({
            query: () => `/tags?per_page=20`,
        }),
    }),
});

export const {
    useGetArticlesQuery,
    useGetArticleQuery,
    useGetTagsQuery,
} = devtoApi;