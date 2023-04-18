function randomUUID() {
    let date = new Date().getTime();
    let date2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (character) {
            let random = Math.random() * 16;
            if (date > 0) {
                random = (date + random) % 16 | 0;
                date = Math.floor(date / 16);
            } else {
                random = (date2 + random) % 16 | 0;
                date2 = Math.floor(date2 / 16);
            }
            return (character === "x" ? random : (random & 0x3) | 0x8).toString(
                16
            );
        }
    );
}

export const uuid = () => {
    try {
        return crypto.randomUUID();
    } catch {
        return randomUUID();
    }
};
