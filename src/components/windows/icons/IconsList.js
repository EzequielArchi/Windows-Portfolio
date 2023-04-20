import React, { useRef } from "react";
import { AVAILABLE_ICONS } from "./utils";
import GenericIcon from "./GenericIcon";
import styled from "styled-components";
import MouseSelector from "../../common/mouseSelector";
import { useDispatch } from "react-redux";
import { deselectAllIcons } from "../../../store/slices/icons";

const StyledIconContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    align-content: flex-start;
`;

const AVAILABLE_ICONS_ARRAY = Object.keys(AVAILABLE_ICONS);

const IconsList = () => {
    const containerRef = useRef(null);

    const dispatch = useDispatch();

    const handleSelectionStart = (event) => {
        dispatch(deselectAllIcons());
    };

    return (
        <StyledIconContainer ref={containerRef}>
            {AVAILABLE_ICONS_ARRAY.map((id) => (
                <GenericIcon key={id} {...AVAILABLE_ICONS[id]} />
            ))}
            <MouseSelector
                containerRef={containerRef}
                onSelectionStart={handleSelectionStart}
            />
        </StyledIconContainer>
    );
};

export default IconsList;
