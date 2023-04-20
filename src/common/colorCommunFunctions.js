export const shadeColor = (color, percent) => {
    let red = parseInt(color.substring(1, 3), 16);
    let green = parseInt(color.substring(3, 5), 16);
    let blue = parseInt(color.substring(5, 7), 16);

    red = parseInt((red * (100 + percent)) / 100);
    green = parseInt((green * (100 + percent)) / 100);
    blue = parseInt((blue * (100 + percent)) / 100);

    red = red < 255 ? red : 255;
    green = green < 255 ? green : 255;
    blue = blue < 255 ? blue : 255;

    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);

    const hexRed =
        red.toString(16).length === 1
            ? "0" + red.toString(16)
            : red.toString(16);
    const HexGreen =
        green.toString(16).length === 1
            ? "0" + green.toString(16)
            : green.toString(16);
    const hexBlue =
        blue.toString(16).length === 1
            ? "0" + blue.toString(16)
            : blue.toString(16);

    return `#${hexRed}${HexGreen}${hexBlue}`;
}

export const completeColorHex = (match, red, green, blue) => {
    return `#${red}${red}${green}${green}${blue}${blue}`;
};