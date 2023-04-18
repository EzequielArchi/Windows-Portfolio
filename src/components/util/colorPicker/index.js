import React from "react";
import styled, { css } from "styled-components";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColorPickerWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 2px;
`;

const ColorSquare = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.color};
    box-shadow: ${(props) =>
        props.isSelected &&
        css`inset 0px 0px 0px 2px var(--windows-section-inverted-color)`};

    &:hover {
        box-shadow: inset 0px 0px 0px 2px var(--windows-section-inverted-color);
    }
    color: ${(props) => props.color};
`;

const StyledCheckColor = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--windows-section-inverted-color);
`;

const DEFAULT_COLORS = [
    "#FFCC00",
    "#F7630C",
    "#FF4343",
    "#E74856",
    "#B83C3A",
    "#CD5C5C",
    "#D2691E",
    "#DB3A1B",
    "#D83B01",
    "#CA5010",
    "#C30052",
    "#E3008C",
    "#EA005E",
    "#BF0077",
    "#DA3B01",
    "#EF6950",
    "#C239B3",
    "#9A0089",
    "#881798",
    "#B146C2",
    "#0078D7",
    "#2B88D9",
    "#5AC8FA",
    "#8E8CD8",
    "#5856D6",
    "#0050EF",
    "#6B69D6",
    "#3A96DD",
    "#2D7D9A",
    "#00B7C3",
    "#038387",
    "#525E54",
    "#4CD964",
    "#10893E",
    "#006B35",
    "#00B294",
    "#018574",
    "#006666",
    "#00AAAA",
    "#486860",
    "#5D4037",
    "#B77B12",
    "#C69C6D",
    "#DBB39D",
    "#8E8E93",
    "#A4A4A4",
    "#BEBEBE",
    "#D8D8D8",
];

const ColorPicker = (props) => {
    const { selectedColor, colors = DEFAULT_COLORS, onSelectColor } = props;

    const handleColorClick = (color) => {
        if (selectedColor === color) return;
        onSelectColor(color);
    };

    return (
        <ColorPickerWrapper>
            {colors.map((color) => (
                <ColorSquare
                    key={color}
                    color={color}
                    isSelected={selectedColor === color}
                    onClick={() => handleColorClick(color)}
                >
                    {selectedColor === color && (
                        <StyledCheckColor>
                            <FontAwesomeIcon icon={faCheck} />
                        </StyledCheckColor>
                    )}
                </ColorSquare>
            ))}
        </ColorPickerWrapper>
    );
};

export default ColorPicker;
