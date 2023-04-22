import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { addProgram } from "../../../store/slices/programs";
import { selectIcons } from "../../../store/slices/icons";

const StyledIconContainer = styled.div`
    display: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 80px;
    height: 80px;
    padding: 5px;
    background-color: ${({ isSelected }) => isSelected && "#acc8d780"};
    ${({ isSelected }) =>
        isSelected &&
        css`
            box-shadow: 0px 0px 0px 1px #acc8d7bb;
        `}
    :hover {
        background-color: #acc8d780;
        box-shadow: 0px 0px 0px 1px #acc8d7bb;
    }
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
    const { id, image, title } = props;

    const isSelected = useSelector(({ icons }) => icons.selected[id]);

    const dispatch = useDispatch();

    const handleSelect = () => {
        dispatch(selectIcons([id]));
    };

    const openProgram = () => {
        dispatch(selectIcons([]));
        dispatch(addProgram({ id }));
    };

    return (
        <StyledIconContainer
            ref={ref}
            isSelected={isSelected}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSelect}
            onTouchStart={openProgram}
            onDoubleClick={openProgram}
        >
            <StyledImg src={image} alt="" />
            <StyledTitle>{title}</StyledTitle>
        </StyledIconContainer>
    );
});

export default GenericIcon;
