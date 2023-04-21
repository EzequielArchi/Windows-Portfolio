export const requestFullScreen = (element) => {
    const requestMethod =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullScreen;

    if (requestMethod) {
        requestMethod.call(element);
    }
}

export const getCoordinatesOfDomEvent = (event) => {
    let x;
    let y;
    if (
        [
            "touchstart",
            "touchend",
            "touchcancel",
            "touchleave",
            "touchmove",
        ].includes(event.type)
    ) {
        const touch = event.touches[0] || event.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }

    return { x, y };
};
