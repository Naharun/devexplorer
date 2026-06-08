import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    owner: {
        login: string;
        avatar_url: string;
    };
}

export interface FavoriteDeveloper {
    id: number;
    login: string;
    avatar_url: string;
    type: string;
}

export interface FavoriteArticle {
    id: number;
    title: string;
    url: string;
    cover_image: string | null;
    reading_time_minutes: number;
    positive_reactions_count: number;
    user: {
        name: string;
        profile_image: string;
    };
    tag_list: string[];
}

interface FavoritesState {
    repositories: FavoriteRepository[];
    developers: FavoriteDeveloper[];
    articles: FavoriteArticle[];
}

function loadFromStorage(): FavoritesState {
    if (typeof window === "undefined") {
        return { repositories: [], developers: [], articles: [] };
    }
    try {
        const saved = localStorage.getItem("devexplorer_favorites");
        return saved ? JSON.parse(saved) : { repositories: [], developers: [], articles: [] };
    } catch {
        return { repositories: [], developers: [], articles: [] };
    }
}

function saveToStorage(state: FavoritesState) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem("devexplorer_favorites", JSON.stringify(state));
    } catch {
        // ignore
    }
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: loadFromStorage,
    reducers: {
        addRepository: (state, action: PayloadAction<FavoriteRepository>) => {
            if (!state.repositories.find((r) => r.id === action.payload.id)) {
                state.repositories.push(action.payload);
                saveToStorage(state);
            }
        },
        removeRepository: (state, action: PayloadAction<number>) => {
            state.repositories = state.repositories.filter((r) => r.id !== action.payload);
            saveToStorage(state);
        },
        addDeveloper: (state, action: PayloadAction<FavoriteDeveloper>) => {
            if (!state.developers.find((d) => d.id === action.payload.id)) {
                state.developers.push(action.payload);
                saveToStorage(state);
            }
        },
        removeDeveloper: (state, action: PayloadAction<number>) => {
            state.developers = state.developers.filter((d) => d.id !== action.payload);
            saveToStorage(state);
        },
        addArticle: (state, action: PayloadAction<FavoriteArticle>) => {
            if (!state.articles.find((a) => a.id === action.payload.id)) {
                state.articles.push(action.payload);
                saveToStorage(state);
            }
        },
        removeArticle: (state, action: PayloadAction<number>) => {
            state.articles = state.articles.filter((a) => a.id !== action.payload);
            saveToStorage(state);
        },
        clearAll: (state) => {
            state.repositories = [];
            state.developers = [];
            state.articles = [];
            saveToStorage(state);
        },
    },
});

export const {
    addRepository, removeRepository,
    addDeveloper, removeDeveloper,
    addArticle, removeArticle,
    clearAll,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;