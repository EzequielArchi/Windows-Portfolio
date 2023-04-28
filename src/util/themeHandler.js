import { completeColorHex } from "../common/colorCommonFunctions";

export const saveThemeToStorage = (key, value, currentTheme) => {
    if (Object.keys(currentTheme).includes(key)) {
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
        const newTheme = { ...currentTheme, [key]: value };
        localStorage.setItem("theme", JSON.stringify(newTheme));
        return newTheme;
    }
}

export const loadThemeFromStorage = (defaultTheme) => {
    const storageTheme = localStorage.getItem("theme");

    if (!storageTheme) return null;

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

    return parsedStorageTheme;
}