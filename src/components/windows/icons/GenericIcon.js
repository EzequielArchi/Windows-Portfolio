import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { addProgram } from "../../../store/slices/programs";
import { selectIcons } from "../../../store/slices/icons";

const StyledIcon = styled.div`
    display: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 80px;
    height: 80px;
    padding: 5px;
    user-select: none;
    outline: none;
    border: none;

    ${({ isSelected }) =>
        isSelected
            ? css`
                  box-shadow: inset 0px 0px 0px 1px #acc8d7bb;
                  background-color: #acc8d780;
              `
            : css`
                  :hover {
                      background-color: #acc8d760;
                      box-shadow: inset 0px 0px 0px 1px #acc8d7a0;
                  }

                  :focus {
                      outline: none;
                      border: none;
                      background-color: #acc8d760;
                      box-shadow: inset 0px 0px 0px 1px #acc8d7a0;
                  }
              `}
`;

const StyledImg = styled.img`
    width: 45px;
    height: 45px;
`;

const StyledTitle = styled.div`
    width: 100%;
    text-align: center;
    word-wrap: break-word;
    font-size: 12px;
    text-shadow: 1px 0px 1px #000000, -1px 0px 1px #000000, 0px 2px 1px #000000,
        0px -1px 1px #000000;
    color: #ffffff;
    cursor: default;
`;

const GenericIcon = forwardRef((props, ref) => {
    const { id, image, title, index } = props;

    const selectedIcons = useSelector(({ icons }) => icons.selected);
    const isSelected = selectedIcons[id];

    const dispatch = useDispatch();

    const handleSelect = (event) => {
        window.focus();
        document.activeElement.blur();
        if (event.ctrlKey) {
            const selectedIconArray = Object.keys(selectedIcons);
            if (isSelected) {
                const newSelectedIcon = selectedIconArray.filter(
                    (icon) => icon !== id
                );
                dispatch(selectIcons(newSelectedIcon));
            } else {
                dispatch(selectIcons([...selectedIconArray, id]));
            }
        } else {
            dispatch(selectIcons([id]));
        }
    };

    const openProgram = () => {
        dispatch(selectIcons([]));
        dispatch(addProgram({ id }));
    };

    return (
        <StyledIcon
            ref={ref}
            isSelected={isSelected}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSelect}
            onTouchStart={openProgram}
            onDoubleClick={openProgram}
            tabIndex={index + 1}
            id={id}
        >
            <StyledImg src={image} alt="" />
            <StyledTitle>{title}</StyledTitle>
        </StyledIcon>
    );
});

export default GenericIcon;
