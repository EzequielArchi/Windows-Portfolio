import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import useRequestAnimationFrame from "../../../hooks/useRequestAnimationFrame";
import { getCoordinatesOfDomEvent } from "../../../utils/eventsCommunFunctions";

const StyledDraggable = styled.div`
    position: absolute;
`;

function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}

// Wrapper that allows children to have drag and drop functionality
const Draggable = memo(
    forwardRef((props, ref) => {
        const {
            children,
            position = { x: 0, y: 0 },
            onDragStart,
            onDrag,
            onDragEnd,
            style,
            cancel,
            preventOverflow,
        } = props;

        const draggableRef = useRef(null);
        const initialPosition = useRef(null);
        const previusPosition = useRef(null);
        const currentPosition = useRef(null);

        const deltaXAccumulator = useRef(0);
        const deltaYAccumulator = useRef(0);

        const handleStart = (event) => {
            if (event.target.closest(cancel)) return;

            event.preventDefault();
            event.stopPropagation();

            const draggableDOM = draggableRef.current;
            const { left, top } = draggableDOM.getBoundingClientRect();

            const parentOffsetLeft = draggableDOM.offsetParent.offsetLeft;
            const parentOffsetTop = draggableDOM.offsetParent.offsetTop;

            const {x: eventX, y: eventY} = getCoordinatesOfDomEvent(event);

            const x = eventX - parentOffsetLeft;
            const y = eventY - parentOffsetTop;
            const offsetX = x - (left - parentOffsetLeft);
            const offsetY = y - (top - parentOffsetTop);

            initialPosition.current = {
                x: x - offsetX,
                y: y - offsetY,
                offsetX,
                offsetY,
            };
            previusPosition.current = initialPosition.current;

            if (onDragStart) onDragStart(initialPosition.current);
        };

        useRequestAnimationFrame(() => {
            if (currentPosition.current) {
                if (onDrag)
                    onDrag({
                        ...currentPosition.current,
                        deltaX: deltaXAccumulator.current,
                        deltaY: deltaYAccumulator.current,
                    });

                previusPosition.current = currentPosition.current;
                currentPosition.current = null;
                deltaXAccumulator.current = 0;
                deltaYAccumulator.current = 0;
            }
        }, [onDrag]);

        useEffect(() => {
            const handleMove = (event) => {
                if (initialPosition.current) {
                    const draggableDOM = draggableRef.current;
                    const containerDOM = draggableDOM.offsetParent;

                    const parentOffsetLeft = draggableDOM.offsetParent.offsetLeft;
                    const parentOffsetTop = draggableDOM.offsetParent.offsetTop;

                    const {x: eventX, y: eventY} = getCoordinatesOfDomEvent(event);

                    let x;
                    let y;
                    if (preventOverflow) {
                        x = clamp(
                            eventX - parentOffsetLeft - initialPosition.current.offsetX,
                            containerDOM.offsetLeft,
                            containerDOM.offsetLeft +
                                containerDOM.offsetWidth -
                                draggableDOM.offsetWidth
                        );
                        y = clamp(
                            eventY - parentOffsetTop - initialPosition.current.offsetY,
                            containerDOM.offsetTop,
                            containerDOM.offsetTop +
                                containerDOM.offsetHeight -
                                draggableDOM.offsetHeight
                        );
                    } else {
                        x = eventX - parentOffsetLeft - initialPosition.current.offsetX;
                        y = eventY - parentOffsetTop - initialPosition.current.offsetY;
                    }

                    deltaXAccumulator.current += x - previusPosition.current.x;
                    deltaYAccumulator.current += y - previusPosition.current.y;

                    currentPosition.current = {
                        x,
                        y,
                    };
                }
            };

            const handleEnd = () => {
                if (onDragEnd) onDragEnd(previusPosition.current);
                initialPosition.current = null;
                currentPosition.current = null;
                previusPosition.current = null;
                deltaXAccumulator.current = 0;
                deltaYAccumulator.current = 0;
            };

            document.addEventListener("mousemove", handleMove, true);
            document.addEventListener("mouseup", handleEnd, true);

            document.addEventListener("touchmove", handleMove, true);
            document.addEventListener("touchend", handleEnd, true);
            return () => {
                document.removeEventListener("mousemove", handleMove, true);
                document.removeEventListener("mouseup", handleEnd, true);

                document.removeEventListener("touchmove", handleMove, true);
                document.removeEventListener("touchend", handleEnd, true);
            };
        }, [onDragEnd, preventOverflow]);

        useImperativeHandle(ref, () => draggableRef.current);

        // The position is setted in the component to avoid so many class changes in the styled component
        return (
            <StyledDraggable
                ref={draggableRef}
                position={position}
                style={{
                    transform: `translate(
                    ${position.x}px,
                    ${position.y}px
                )`,
                    ...style,
                }}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
            >
                {children}
            </StyledDraggable>
        );
    })
);

export default Draggable;
