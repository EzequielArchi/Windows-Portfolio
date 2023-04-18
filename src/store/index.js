import { configureStore } from "@reduxjs/toolkit";
import programs from "./slices/programs";
import icons from "./slices/icons";
import popups from "./slices/popups";

const store = configureStore({
    reducer: {
        programs,
        icons,
        popups,
    },
});

export default store;
