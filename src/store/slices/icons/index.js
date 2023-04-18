import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: {},
};

const iconsSlice = createSlice({
    name: "icons",
    initialState,
    reducers: {
        selectIcons(state, action) {
            const ids = action.payload;
            state.selected = {};
            ids.forEach((id) => {
                state.selected[id] = true;
            });
        },
        deselectAllIcons(state) {
            if (Object.keys(state.selected).length === 0) return;
            state.selected = {};
        },
    },
});

export const { selectIcons, deselectAllIcons } = iconsSlice.actions;
export default iconsSlice.reducer;
