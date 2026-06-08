import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RecentlyViewedItem {
    id: number;
    title: string;
    type: "repository" | "developer" | "article";
}

interface RecentlyViewedState {
    items: RecentlyViewedItem[];
}

const initialState: RecentlyViewedState = {
    items: [],
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
        },

        clearRecentlyViewed: (state) => {
            state.items = [];
        },
    },
});

export const {
    addRecentlyViewed,
    clearRecentlyViewed,
} = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;