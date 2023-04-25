// Prevent size issues with the keyboard and input focus on mobile
const setHeightInMobileScreens = () => {
    if (window === window.top && "ontouchstart" in window) {
        document.body.style.height = `${window.innerHeight}px`;
    }
};

export const mountGlobalEvents = () => {
    setHeightInMobileScreens();
};

export const unmountGlobalEvents = () => {};
