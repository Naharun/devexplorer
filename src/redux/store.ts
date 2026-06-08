import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./api/githubApi";
import { devtoApi } from "./api/devtoApi";
import { hackerNewsApi } from "./api/hackerNewsApi";
import { stackExchangeApi } from "./api/stackExchangeApi";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        [devtoApi.reducerPath]: devtoApi.reducer,
        [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
        [stackExchangeApi.reducerPath]: stackExchangeApi.reducer,
        favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(githubApi.middleware)
            .concat(devtoApi.middleware)
            .concat(hackerNewsApi.middleware)
            .concat(stackExchangeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;