import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CollectionItem {
    id: string;
    type: "repository" | "developer" | "article";
    title: string;
    slug?: string;
}

export interface Collection {
    id: string;
    name: string;
    items: CollectionItem[];
}

interface CollectionsState {
    collections: Collection[];
}

function loadCollections(): Collection[] {
    if (typeof window === "undefined") return [];
    try {
        const data = localStorage.getItem("devexplorer_collections");
        return data ? JSON.parse(data) : [];
    } catch { return []; }
}

function saveCollections(collections: Collection[]) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem("devexplorer_collections", JSON.stringify(collections));
    } catch { }
}

const initialState: CollectionsState = {
    collections: loadCollections(),
};

const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        createCollection: (state, action: PayloadAction<Collection>) => {
            state.collections.push(action.payload);
            saveCollections(state.collections);
        },
        deleteCollection: (state, action: PayloadAction<string>) => {
            state.collections = state.collections.filter((c) => c.id !== action.payload);
            saveCollections(state.collections);
        },
        addItemToCollection: (state, action: PayloadAction<{ collectionId: string; item: CollectionItem }>) => {
            const collection = state.collections.find((c) => c.id === action.payload.collectionId);
            if (!collection) return;
            const exists = collection.items.some(
                (i) => i.id === action.payload.item.id && i.type === action.payload.item.type
            );
            if (!exists) {
                collection.items.push(action.payload.item);
                saveCollections(state.collections);
            }
        },
        removeItemFromCollection: (state, action: PayloadAction<{ collectionId: string; itemId: string }>) => {
            const collection = state.collections.find((c) => c.id === action.payload.collectionId);
            if (!collection) return;
            collection.items = collection.items.filter((i) => i.id !== action.payload.itemId);
            saveCollections(state.collections);
        },
    },
});

export const { createCollection, deleteCollection, addItemToCollection, removeItemFromCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;