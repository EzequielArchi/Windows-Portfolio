import React, { createContext, useLayoutEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import Windows from "./components/windows";
import { defaultTheme } from "./theme";
import { loadThemeFromStorage, saveThemeToStorage } from "./util/themeHandler";
import { mountGlobalEvents, unmountGlobalEvents } from "./util/eventsHandlers";
import GlobalStyles from "./styles/GlobalStyles";
import { addProgram } from "./store/slices/programs";
import { useDispatch } from "react-redux";

export const ThemeModifierContext = createContext({});

const App = () => {
    const [appTheme, setAppTheme] = useState(defaultTheme);

    const dispatch = useDispatch();

    const hasShownWelcome = useRef(false);

    const changeThemeColors = (key, value) => {
        const newTheme = saveThemeToStorage(key, value, appTheme);

        if (newTheme) setAppTheme(newTheme);
    };

    useLayoutEffect(() => {
        const showWelcomeMessage = () => {
            const sawWelcomeMessage = localStorage.getItem("sawWelcomeMessage");
            if (sawWelcomeMessage !== "1" && !hasShownWelcome.current) {
                dispatch(addProgram({ id: "welcome" }));
                hasShownWelcome.current = true;
            }
        };
        
        const storageTheme = loadThemeFromStorage(defaultTheme);

        if (storageTheme) setAppTheme(storageTheme);

        showWelcomeMessage();
        
        mountGlobalEvents();
        return () => {
            unmountGlobalEvents();
        };
    }, [dispatch]);

    return (
        <ThemeModifierContext.Provider value={{ changeThemeColors }}>
            <ThemeProvider theme={appTheme}>
                <GlobalStyles />
                <Windows />
            </ThemeProvider>
        </ThemeModifierContext.Provider>
    );
};

export default App;
