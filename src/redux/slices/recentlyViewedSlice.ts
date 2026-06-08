import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RecentlyViewedItem {
    id: number;
    title: string;
    type: "repository" | "developer" | "article";
}

interface RecentlyViewedState {
    items: RecentlyViewedItem[];
}

function loadRecentlyViewed(): RecentlyViewedItem[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const data = localStorage.getItem(
            "devexplorer_recently_viewed"
        );

        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveRecentlyViewed(
    items: RecentlyViewedItem[]
) {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(
            "devexplorer_recently_viewed",
            JSON.stringify(items)
        );
    } catch {
        // ignore
    }
}

const initialState: RecentlyViewedState = {
    items: loadRecentlyViewed(),
};

const recentlyViewedSlice = createSlice({
    name: "recentlyViewed",
    initialState,
    reducers: {
        addRecentlyViewed: (
            state,
            action: PayloadAction<RecentlyViewedItem>
        ) => {
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.id === action.payload.id &&
                        item.type === action.payload.type
                    )
            );

            state.items.unshift(action.payload);

            if (state.items.length > 10) {
                state.items.pop();
            }

            saveRecentlyViewed(state.items);
        },

        clearRecentlyViewed: (state) => {
            state.items = [];

            saveRecentlyViewed([]);
        },
    },
});

export const {
    addRecentlyViewed,
    clearRecentlyViewed,
} = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;