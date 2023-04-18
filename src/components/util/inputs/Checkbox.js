import React from "react";
import styled from "styled-components";

const StyledLabelContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const StyledCheckbox = styled.input`
    position: relative;
    height: 25px;
    width: 25px;
    border: 2px solid var(--windows-section-inverted-color);
    background: none;
    -webkit-appearance: none;
    margin: 0;
    line-height: 0;
    outline: 0;
    padding: 0;
    opacity: 0.8;

    :hover {
        opacity: 1;
    }

    :checked {
        background-color: var(--windows-color);
        border: none;
        :hover {
            border: 2px solid var(--windows-section-inverted-color);
        }
        opacity: 1;

        :before {
            content: "";
            position: absolute;
            width: 5px;
            height: 16px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -60%) rotate(45deg);
            border: solid #ffffff;
            border-width: 0 2px 2px 0;
            z-index: 2;
        }
    }
`;

const Checkbox = (props) => {
    const { isChecked, onChange, label } = props;

    const handleChange = (event) => {
        if (onChange) onChange(event.target.checked);
    };

    return (
        <StyledLabelContainer>
            <StyledCheckbox
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
            />
            <span className="windows-text">{label}</span>
        </StyledLabelContainer>
    );
};

export default Checkbox;
