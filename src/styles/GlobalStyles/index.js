import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body,
    #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        overflow: hidden;
        position: relative;
    }

    html {
        --background-color: ${({ theme }) => theme.desktopColor};
        --background-color-transparent: ${({ theme }) =>
            `${theme.desktopColor}E6`};

        --windows-color: ${({ theme }) => theme.windowsColor};

        --windows-section-color: ${({ theme }) =>
            theme.darkTheme
                ? theme.darkThemeBackgroundColor
                : theme.lightThemeBackgroundColor};

        --windows-section-inverted-color: ${({ theme }) =>
            theme.darkTheme
                ? theme.lightThemeBackgroundColor
                : theme.darkThemeBackgroundColor};

        --windows-text-color: ${({ theme }) =>
            theme.darkTheme
                ? theme.darkThemeTextColor
                : theme.lightThemeTextColor};

        --windows-text-inverted-color: ${({ theme }) =>
            theme.darkTheme
                ? theme.lightThemeTextColor
                : theme.darkThemeTextColor};
    }

    body {
        font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
    }

    #root {
        touch-action: pan-x pan-y;
    }

    .goog-tooltip {
        display: none !important;
    }

    .goog-tooltip:hover {
        display: none !important;
    }

    .goog-text-highlight {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }
`;

export default GlobalStyles;
