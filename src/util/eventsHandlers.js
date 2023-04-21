// Variables
let lastMobileHeight = window.innerHeight;
const defaultMobileHeight = document.body.style.height;

let lastMobileWidth = window.innerHeight;
const defaultMobileWidth = document.body.style.height;

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
        document.body.style.height = `${lastMobileHeight}px`;
        document.body.style.width = `${lastMobileWidth}px`;
    } else {
        document.body.style.height = defaultMobileHeight;
        document.body.style.width = defaultMobileWidth;

        lastMobileHeight = window.innerHeight;
        lastMobileWidth = window.innerWidth;
    }
};