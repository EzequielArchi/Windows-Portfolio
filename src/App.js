import React, { createContext, useLayoutEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import Windows from "./components/windows";
import { defaultTheme } from "./theme";
import { loadThemeFromStorage, saveThemeToStorage } from "./util/themeHandler";
import { mountGlobalEvents, unmountGlobalEvents } from "./util/eventsHandlers";
import GlobalStyles from "./styles/GlobalStyles";

export const ThemeModifierContext = createContext({});

const App = () => {
    const [appTheme, setAppTheme] = useState(defaultTheme);

    const changeThemeColors = (key, value) => {
        const newTheme = saveThemeToStorage(key, value, appTheme);

        if (newTheme) setAppTheme(newTheme);
    };

    useLayoutEffect(() => {
        const storageTheme = loadThemeFromStorage(defaultTheme);

        if (storageTheme) setAppTheme(storageTheme);

       mountGlobalEvents();
        return () => {
            unmountGlobalEvents();
        };
    }, []);

    return (
        <ThemeModifierContext.Provider value={{ changeThemeColors }}>
            <ThemeProvider theme={appTheme}>
                <GlobalStyles/>
                <Windows />
            </ThemeProvider>
        </ThemeModifierContext.Provider>
    );
};

export default App;
