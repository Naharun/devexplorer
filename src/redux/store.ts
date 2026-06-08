import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./api/githubApi";
import { devtoApi } from "./api/devtoApi";

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        [devtoApi.reducerPath]: devtoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(githubApi.middleware)
            .concat(devtoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;