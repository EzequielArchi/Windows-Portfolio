import React, { createContext, useLayoutEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import Windows from "./components/windows";
import { defaultTheme } from "./theme";

export const ThemeModifierContext = createContext({});

const completeColorHex = (match, red, green, blue) => {
    return `#${red}${red}${green}${green}${blue}${blue}`;
};

const App = () => {
    const [appTheme, setAppTheme] = useState(defaultTheme);

    const changeThemeColors = (key, value) => {
        if (Object.keys(appTheme).includes(key)) {
            if (
                typeof value === "string" &&
                value.length === 4 &&
                value[0] === "#"
            ) {
                value = value.replace(
                    /^#?([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,
                    completeColorHex
                );
            }
            const newTheme = { ...appTheme, [key]: value };
            setAppTheme(newTheme);
            localStorage.setItem("theme", JSON.stringify(newTheme));
        }
    };

    useLayoutEffect(() => {
        const storageTheme = localStorage.getItem("theme");

        if (storageTheme) {
            const parsedStorageTheme = JSON.parse(storageTheme);
            const storageThemeKeys = Object.keys(parsedStorageTheme);
            const themeKeys = Object.keys(defaultTheme);

            if (
                storageThemeKeys.some(
                    (value, index) => value !== themeKeys[index]
                )
            ) {
                localStorage.removeItem("theme");
                return;
            }

            setAppTheme(parsedStorageTheme);
        }

        const windowHeight = window.innerHeight;
        document.body.style.height = `${windowHeight}px`;
    }, []);

    return (
        <ThemeModifierContext.Provider value={{ changeThemeColors }}>
            <ThemeProvider theme={appTheme}>
                <Windows />
            </ThemeProvider>
        </ThemeModifierContext.Provider>
    );
};

export default App;
