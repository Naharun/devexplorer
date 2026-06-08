import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CollectionItem {
    id: string;
    type: "repository" | "developer" | "article";
}

export interface Collection {
    id: string;
    name: string;
    items: CollectionItem[];
}

interface CollectionsState {
    collections: Collection[];
}

const initialState: CollectionsState = {
    collections: [],
};

const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        createCollection: (
            state,
            action: PayloadAction<Collection>
        ) => {
            state.collections.push(action.payload);
        },

        deleteCollection: (
            state,
            action: PayloadAction<string>
        ) => {
            state.collections = state.collections.filter(
                (collection) => collection.id !== action.payload
            );
        },

        addItemToCollection: (
            state,
            action: PayloadAction<{
                collectionId: string;
                item: CollectionItem;
            }>
        ) => {
            const collection = state.collections.find(
                (item) => item.id === action.payload.collectionId
            );

            if (collection) {
                collection.items.push(action.payload.item);
            }
        },
    },
});

export const {
    createCollection,
    deleteCollection,
    addItemToCollection,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;