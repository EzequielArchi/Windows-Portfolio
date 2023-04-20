import React from "react";
import styled from "styled-components";

const StyledCheckbox = styled.input`
    position: relative;
    width: 45px;
    height: 20px;
    background: transparent;
    -webkit-appearance: none;
    background-color: transparent;
    outline: none;
    border-radius: 30px;
    box-shadow: inset 0px 0px 0px 2px var(--windows-section-inverted-color);

    :checked {
        background-color: var(--windows-color);
        box-shadow: none;
    }

    :before {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        top: 5px;
        left: 5px;
        border-radius: 50%;
        transform: scale(1.1);
        transition: left 0.5s;
    }

    :not(checked):before {
        background-color: var(--windows-section-inverted-color);
    }

    :checked:before {
        left: 30px;
        background-color: #ffffff;
    }
`;

const Toggle = (props) => {
    const { isChecked, onChange } = props;

    const handleChange = (event) => {
        if (onChange) onChange(event.target.checked);
    };

    return (
        <StyledCheckbox
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
        />
    );
};

export default Toggle;
