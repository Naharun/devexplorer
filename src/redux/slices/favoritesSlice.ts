import { createSlice } from "@reduxjs/toolkit";

interface FavoritesState {
    repositories: string[];
}

const initialState: FavoritesState =
{
    repositories: [],
};

const favoritesSlice =
    createSlice({
        name: "favorites",

        initialState,

        reducers: {
            addFavorite: (
                state,
                action
            ) => {
                state.repositories.push(
                    action.payload
                );
            },

            removeFavorite: (
                state,
                action
            ) => {
                state.repositories =
                    state.repositories.filter(
                        (id) =>
                            id !==
                            action.payload
                    );
            },
        },
    });

export const {
    addFavorite,
    removeFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;