import { useState } from "react";
import styled from "styled-components";
import Options from "./options";
import ClickAwayListener from "../../clickAwayListener";

const StyledSelectContainer = styled.div`
    position: relative;
    width: 285px;
`;

const StyledSelect = styled.span`
    width: 280px;
    height: 32px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: Segoe UI, sans-serif;
    color: var(--windows-text-color);
    padding-left: 10px;
    border: 2px solid ${({ theme }) =>
        theme.darkTheme
            ? theme.lightThemeBackgroundColor
            : theme.darkThemeBackgroundColor}CC;
    border-radius: 4px;
    background-color: transparent;
    display: flex;
    align-items: center;

    &:focus {
        outline: none;
        box-shadow: 0 0 3px 2px rgba(50, 100, 220, 0.2);
    }

    &:hover {
        border-color: var(--windows-section-inverted-color);
    }
`;

const Select = (props) => {
    const {
        selectedOption = {},
        options = [],
        idKey = "id",
        valueKey = "value",
        startOpen,
        onSelect,
    } = props;

    const [showOptions, setShowOptions] = useState(startOpen);

    const selectedOptionValue = selectedOption[valueKey];
    const selectedOptionKey = selectedOption[idKey];

    const handleOptionSelect = (option) => {
        if (onSelect) onSelect(option);
        setShowOptions(false);
    };

    const handleClickSelect = () => {
        setShowOptions(true);
    };

    const handleClickAway = (e) => {
        setShowOptions(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <StyledSelectContainer>
                <StyledSelect onClick={handleClickSelect}>
                    {selectedOptionValue}
                </StyledSelect>
                {showOptions && options.length > 0 && (
                    <Options
                        options={options}
                        selectedId={selectedOptionKey}
                        idKey={idKey}
                        valueKey={valueKey}
                        onSelect={handleOptionSelect}
                    />
                )}
            </StyledSelectContainer>
        </ClickAwayListener>
    );
};

export default Select;
