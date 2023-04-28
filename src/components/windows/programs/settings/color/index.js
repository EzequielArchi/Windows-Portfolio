import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { ThemeModifierContext } from "../../../../../App";
import ColorPicker from "../../../../common/colorPicker";
import Checkbox from "../../../../common/inputs/Checkbox";
import Select from "../../../../common/inputs/select";

const StyledColorSettings = styled.div`
    max-width: 340px;
    margin-left: 30px;
    user-select: none;
    
    .title {
        margin-top: 10px;
        font-size: 26px;
        font-weight: 400;
    }

    .subtitle {
        font-size: 22px;
        font-weight: 400;
    }

    .section-title {
        font-size: 16px;
        font-weight: 400;
    }
`;

const THEME_SELECT_OPTIONS = [
    {
        id: "light",
        value: "Light",
    },
    {
        id: "dark",
        value: "Dark",
    },
];

const StyledCheckbox = styled.div`
    margin-block: 20px;
`;

const Color = () => {
    const themeContext = useContext(ThemeContext);
    const themeModifierContext = useContext(ThemeModifierContext);

    const changeContextValues = (key, value) => {
        themeModifierContext.changeThemeColors(key, value);
    };

    const handleSelectTheme = (option) => {
        changeContextValues("darkTheme", option.id === "dark");
    };

    const handleChangeColor = (color) => {
        changeContextValues("windowsColor", color);
    };

    const handleCheckStartAndTaskbar = (value) => {
        changeContextValues("startAndTaskbar", value);
    }

    const handleCheckBarsAndBorders = (value) => {
        changeContextValues("barsAndBorders", value);
    }

    const themeSelectedOption = themeContext.darkTheme
        ? THEME_SELECT_OPTIONS[1]
        : THEME_SELECT_OPTIONS[0];

    return (
            <StyledColorSettings>
                <p className="title windows-text">Colors</p>
                <p className="section-title windows-text">Choose your color</p>
                <Select
                    options={THEME_SELECT_OPTIONS}
                    selectedOption={themeSelectedOption}
                    onSelect={handleSelectTheme}
                />
                <p className="subtitle windows-text">
                    Choose yout accent color
                </p>
                <ColorPicker
                    selectedColor={themeContext.windowsColor}
                    onSelectColor={handleChangeColor}
                />

                <p className="section-title windows-text">
                    Show accent color on the following surfaces
                </p>
                <StyledCheckbox>
                    <Checkbox
                        label="Start and Taskbar"
                        isChecked={themeContext.startAndTaskbar}
                        onChange={handleCheckStartAndTaskbar}
                    />
                </StyledCheckbox>
                <StyledCheckbox>
                    <Checkbox
                        label="Tittle bars and window borders"
                        isChecked={themeContext.barsAndBorders}
                        onChange={handleCheckBarsAndBorders}
                    />
                </StyledCheckbox>
            </StyledColorSettings>
    );
};

export default Color;
