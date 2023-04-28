import React from "react";
import styled from "styled-components";
import ScrollbarContainer from "../../../../../styles/ScrollbarContainer";
import { AVAILABLE_ICONS } from "../../../icons/utils";
import { addProgram } from "../../../../../store/slices/programs";
import { toggleWindowsMenu } from "../../../../../store/slices/popups";
import { useDispatch } from "react-redux";

const StyledProgramList = styled(ScrollbarContainer)`
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 100%;
    font-size: 12px;
    overflow-y: overlay;
    gap: 10px;
    padding-bottom: 20px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 160px;
    }

    ::-webkit-scrollbar {
        width: 3px;
    }
`;

const StyledProgramItem = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 10px);
    height: 40px;
    flex-shrink: 0;
    gap: 10px;
    padding-left: 5px;
    box-sizing: border-box;

    &:hover {
        background-color: #cccccc40;
    }
`;

const StyledImg = styled.img`
    width: 25px;
`;

const StartProgramList = () => {
    const dispatch = useDispatch();

    const availableIconsArray = Object.keys(AVAILABLE_ICONS).sort();

    const openProgram = (id) => {
        dispatch(addProgram({ id }));
        dispatch(toggleWindowsMenu());
    };

    return (
        <StyledProgramList>
            {availableIconsArray.map((id) => {
                const { image, title } = AVAILABLE_ICONS[id];
                return (
                    <StyledProgramItem key={id} onClick={() => openProgram(id)}>
                        <StyledImg alt="" src={image} />
                        <span>{title}</span>
                    </StyledProgramItem>
                );
            })}
        </StyledProgramList>
    );
};

export default StartProgramList;
