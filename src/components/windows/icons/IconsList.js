import React, { memo, useRef } from "react";
import { AVAILABLE_ICONS } from "./utils";
import GenericIcon from "./GenericIcon";
import styled from "styled-components";
import MouseSelector from "../../common/mouseSelector";
import { useDispatch } from "react-redux";
import { deselectAllIcons, selectIcons } from "../../../store/slices/icons";

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

const detectCollision = (square1, square2) => {
    const { left: left1, top: top1, width: width1, height: height1 } = square1;
    const { left: left2, top: top2, width: width2, height: height2 } = square2;

    return (
        left1 < left2 + width2 &&
        left1 + width1 > left2 &&
        top1 < top2 + height2 &&
        top1 + height1 > top2
    );
};

const IconsList = memo(() => {
    const containerRef = useRef(null);

    const iconsRefs = useRef({});

    const setIconRef = (id, ref) => {
        iconsRefs.current[id] = ref;
    };

    const dispatch = useDispatch();

    const handleSelectionStart = () => {
        document.activeElement.blur();
        dispatch(deselectAllIcons());
    };

    const handleSelecting = (selectRange) => {
        const selectedIcon = [];
        AVAILABLE_ICONS_ARRAY.forEach((id) => {
            const iconDom = iconsRefs.current[id];
            if (detectCollision(selectRange, iconDom.getBoundingClientRect())) {
                selectedIcon.push(id);
            }
        });
        dispatch(selectIcons(selectedIcon));
    };

    return (
        <StyledIconContainer ref={containerRef}>
            {AVAILABLE_ICONS_ARRAY.map((id, index) => (
                <GenericIcon
                    key={id}
                    ref={(ref) => setIconRef(id, ref)}
                    index={index}
                    {...AVAILABLE_ICONS[id]}
                />
            ))}
            <MouseSelector
                containerRef={containerRef}
                onSelectionStart={handleSelectionStart}
                onSelecting={handleSelecting}
            />
        </StyledIconContainer>
    );
});

export default IconsList;
