// Variables
let lastMobileSize = window.innerHeight;

export const mountGlobalEvents = () => {
    // Mobile listener
    if ("ontouchstart" in window) {
        window.addEventListener("resize", handleMobileFixFunction);
    }
};

export const unmountGlobalEvents = () => {
    // Mobile listener
    if ("ontouchstart" in window) {
        window.removeEventListener("resize", handleMobileFixFunction);
    }
};

const handleMobileFixFunction = (event) => {
    if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
    ) {
        document.body.style.height = `${lastMobileSize}px`;
    } else {
        lastMobileSize = window.innerHeight;
    }
};