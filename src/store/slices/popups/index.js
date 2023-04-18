import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCalendar: false, showWindowsMenu: false };

const popupsSlice = createSlice({
    name: "popups",
    initialState,
    reducers: {
        toggleCalendar(state, action) {
            state.showCalendar = !state.showCalendar;
        },
        toggleWindowsMenu(state, action) {
            state.showWindowsMenu = !state.showWindowsMenu;
        },
    },
});

export const { toggleCalendar, toggleWindowsMenu } = popupsSlice.actions;
export default popupsSlice.reducer;
