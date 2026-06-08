import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SOQuestion, SOAnswer, SOResponse } from "@/types/stackoverflow";

export const stackExchangeApi = createApi({
    reducerPath: "stackExchangeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.stackexchange.com/2.3",
    }),
    endpoints: (builder) => ({
        getQuestions: builder.query<
            SOResponse<SOQuestion>,
            { page?: number; tag?: string; sort?: string }
        >({
            query: ({ page = 1, tag, sort = "activity" }) => {
                let url = `/questions?order=desc&sort=${sort}&site=stackoverflow&page=${page}&pagesize=20&filter=withbody`;
                if (tag) url += `&tagged=${tag}`;
                return url;
            },
        }),

        searchQuestions: builder.query<
            SOResponse<SOQuestion>,
            string
        >({
            query: (q) =>
                `/search/advanced?q=${encodeURIComponent(q)}&site=stackoverflow&order=desc&sort=relevance&pagesize=20&filter=withbody`,
        }),

        getQuestionAnswers: builder.query<
            SOResponse<SOAnswer>,
            number
        >({
            query: (id) =>
                `/questions/${id}/answers?site=stackoverflow&order=desc&sort=votes&filter=withbody`,
        }),
    }),
});

export const {
    useGetQuestionsQuery,
    useSearchQuestionsQuery,
    useGetQuestionAnswersQuery,
} = stackExchangeApi;