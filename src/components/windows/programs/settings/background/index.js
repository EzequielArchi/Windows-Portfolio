import React, { useContext, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { ThemeModifierContext } from "../../../../../App";
import ColorPicker from "../../../../common/colorPicker";
import Text from "../../../../common/inputs/Text";

const StyledBackgroundSettings = styled.div`
    max-width: 340px;
    margin-left: 30px;

    p {
        user-select: none;
    }
    
    .title {
        margin-top: 10px;
        font-size: 26px;
        font-weight: 400;
    }

    .section-title {
        font-size: 16px;
        font-weight: 400;
    }
`;

const StyledCustomColor = styled.div`
    position: relative;
`;

const StyledNumerSign = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(10px, -50%);
    color: var(--windows-text-color);
    font-size: 20px;
`;

const BACKGROUND_COLORS = [
    "#FFCC00",
    "#F7630C",
    "#EA005E",
    "#E3008C",
    "#BF0077",
    "#9A0089",
    "#B146C2",
    "#5856D6",
    "#6B69D6",
    "#8E8CD8",
    "#2B88D9",
    "#0078D7",
    "#3A96DD",
    "#038387",
    "#00B294",
    "#00AAAA",
    "#4CD964",
    "#006666",
    "#486860",
    "#5D4037",
    "#B77B12",
    "#C69C6D",
    "#8E8E93",
    "#A4A4A4",
];

const removeNumberSignFromColor = (color) => {
    if (color[0] !== "#") return color;
    return color.substring(1, color.lenght);
};

const Background = () => {
    const themeContext = useContext(ThemeContext);
    const themeModifierContext = useContext(ThemeModifierContext);

    const [customColorValue, setCustomColorValue] = useState(
        removeNumberSignFromColor(themeContext.desktopColor)
    );

    const customColorRef = useRef(null);

    const changeContextValues = (key, value) => {
        themeModifierContext.changeThemeColors(key, value);
    };

    const handleChangeBackgroundColor = (color) => {
        changeContextValues("desktopColor", color);
        setCustomColorValue(removeNumberSignFromColor(color));
    };

    const handleCustomColorClick = () => {
        customColorRef.current.focus();
    };

    const handleCustomColorChange = (event) => {
        const color = event.target.value;

        const hexColorRegex = /^([0-9a-fA-F]{6})$/;

        if (!hexColorRegex.test(color)) {
            setCustomColorValue(color);
            return;
        }

        handleChangeBackgroundColor(`#${color}`);
    };

    return (
        <StyledBackgroundSettings>
            <p className="title windows-text">Background</p>
            <p className="section-title windows-text">
                Choose yout background color
            </p>
            <ColorPicker
                colors={BACKGROUND_COLORS}
                selectedColor={themeContext.desktopColor}
                onSelectColor={handleChangeBackgroundColor}
            />
            <p className="section-title windows-text">Custom color</p>
            <StyledCustomColor onClick={handleCustomColorClick}>
                <Text
                    ref={customColorRef}
                    value={customColorValue}
                    onChange={handleCustomColorChange}
                    style={{ paddingLeft: "25px" }}
                />
                <StyledNumerSign>#</StyledNumerSign>
            </StyledCustomColor>
        </StyledBackgroundSettings>
    );
};

export default Background;
