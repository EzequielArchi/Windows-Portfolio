import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useRequestAnimationFrame from "../../../hooks/useRequestAnimationFrame";
import { getCoordinatesOfDomEvent } from "../../../common/eventsCommonFunctions";

const StyledSelector = styled.div`
    visibility: hidden;
    position: absolute;
    box-shadow: inset 0px 0px 0px 1px ${({ borderColor }) => borderColor};
    background-color: ${({ backgroundColor }) => backgroundColor};
`;

// Draw a area using mouse inputs
const MouseSelector = (props) => {
    const {
        containerRef,
        onSelectionStart,
        onSelecting,
        onSelectionEnd,
        backgroundColor = "#1870d540",
        borderColor = "#1870d5",
    } = props;

    const selectorRef = useRef(null);
    const initialPosition = useRef(null);
    const currentPosition = useRef(null);
    const selectionCoordinates = useRef(null);

    useEffect(() => {
        if (!containerRef?.current) return;

        const domContainer = containerRef.current;

        const parentOffsetLeft = domContainer.offsetLeft;
        const parentOffsetTop = domContainer.offsetTop;

        const handleStart = (event) => {
            if (domContainer !== event.target) return;

            event.preventDefault();
            event.stopPropagation();

            const {x: eventX, y: eventY} = getCoordinatesOfDomEvent(event);

            const x = eventX - parentOffsetLeft;
            const y = eventY - parentOffsetTop;

            initialPosition.current = {
                x,
                y,
            };
            
            if (onSelectionStart) onSelectionStart(initialPosition.current);
        };

        const handleMove = (event) => {
            if (initialPosition.current) {
                const {x: eventX, y: eventY} = getCoordinatesOfDomEvent(event);
                
                const x = eventX - parentOffsetLeft;
                const y = eventY - parentOffsetTop;

                currentPosition.current = {
                    x,
                    y,
                };
            }
        };

        const handleEnd = () => {
            if (onSelectionEnd) onSelectionEnd(selectionCoordinates.current);

            selectorRef.current.style.cssText = `
                left: 0px; 
                top: 0px;
                width: 0px;
                height: 0px;
                visibility: hidden;
            `;

            initialPosition.current = null;
            currentPosition.current = null;
            selectionCoordinates.current = null;
        };

        domContainer.addEventListener("mousedown", handleStart);
        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleEnd);

        domContainer.addEventListener("touchstart", handleStart, {passive: true});
        document.addEventListener("touchmove", handleMove);
        document.addEventListener("touchend", handleEnd);
        return () => {
            domContainer.removeEventListener("mousedown", handleStart);
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseup", handleEnd);

            domContainer.removeEventListener("touchstart", handleStart, {passive: true});
            document.removeEventListener("touchmove", handleMove);
            document.removeEventListener("touchend", handleEnd);
        };
    }, [containerRef, onSelectionStart, onSelectionEnd]);

    useRequestAnimationFrame(() => {
        if (currentPosition.current) {
            const { x: initX, y: initY } = initialPosition.current;
            const { x: currentX, y: currentY } = currentPosition.current;

            const left = Math.min(initX, currentX);
            const top = Math.min(initY, currentY);
            const width = Math.max(initX, currentX) - left;
            const height = Math.max(initY, currentY) - top;

            selectorRef.current.style.cssText = `
                left: ${left}px; 
                top: ${top}px;
                width: ${width}px;
                height: ${height}px;
                visibility: visible;
            `;

            selectionCoordinates.current = { left, top, width, height };
            currentPosition.current = null;
            if (onSelecting) onSelecting(selectionCoordinates.current);
        }
    }, [onSelecting]);

    return (
        <StyledSelector
            ref={selectorRef}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
        />
    );
};

export default MouseSelector;
