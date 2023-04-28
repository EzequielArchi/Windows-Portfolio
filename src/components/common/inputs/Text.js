import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    width: 280px;
    height: 32px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: Segoe UI, sans-serif;
    color: var(--windows-text-color);
    padding-left: 10px;
    border: 2px solid
        ${({ theme }) =>
            theme.darkTheme
                ? theme.lightThemeBackgroundColor
                : theme.darkThemeBackgroundColor}CC;
    border-radius: 4px;
    background-color: transparent;

    &:focus {
        outline: none;
        box-shadow: 0 0 3px 2px rgba(50, 100, 220, 0.2);
    }

    &:hover {
        border-color: var(--windows-section-inverted-color);
    }
`;

const Text = forwardRef((props, ref) => {
    const { value, onChange, style } = props;

    return (
        <StyledInput value={value} ref={ref} style={style} onChange={onChange}/>
    );
});

export default Text;
