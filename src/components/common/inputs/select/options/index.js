import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled, { css } from "styled-components";

const StyledOptions = styled.div`
    position: absolute;
    width: 105%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 5px 2px;
    background-color: ${({ theme }) =>
        theme.darkTheme ? "#242424" : "#efefef"};
`;

const StyledOption = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 32px;
    background-color: ${({ isSelected, theme }) =>
        isSelected && theme.windowsColor}CC;
    :hover {
        background-color: #dddddd40;
        background-color: ${({ isSelected }) =>
            isSelected && css`var(--windows-color)`};
    }
    cursor: default;
`;

const Options = (props) => {
    const {
        style,
        optionStyle,
        options,
        idKey = "id",
        valueKey = "value",
        iconKey = "icon",
        selectedId,
        onSelect,
    } = props;
    return (
        <StyledOptions style={style}>
            {options.map((option) => (
                <StyledOption
                    className="windows-text"
                    style={optionStyle}
                    key={option[idKey]}
                    isSelected={selectedId === option[idKey]}
                    onClick={() => onSelect(option)}
                >
                    {option[iconKey] && (
                        <FontAwesomeIcon icon={option[iconKey]} />
                    )}
                    {option[valueKey]}
                </StyledOption>
            ))}
        </StyledOptions>
    );
};

export default Options;
