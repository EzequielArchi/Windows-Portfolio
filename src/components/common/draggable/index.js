import React, {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import styled from "styled-components";
import useRequestAnimationFrame from "../../../hooks/useRequestAnimationFrame";
import { getCoordinatesOfDomEvent } from "../../../common/eventsCommonFunctions";

const StyledDraggable = styled.div`
    position: absolute;
`;

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
            overflowOffset = { top: 0, right: 0, bottom: 0, left: 0 },
        } = props;

        const draggableRef = useRef(null);
        const initialPosition = useRef(null);
        const previousPosition = useRef(null);
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

            const { x: eventX, y: eventY } = getCoordinatesOfDomEvent(event);

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
            previousPosition.current = initialPosition.current;

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

                previousPosition.current = currentPosition.current;
                currentPosition.current = null;
                deltaXAccumulator.current = 0;
                deltaYAccumulator.current = 0;
            }
        }, [onDrag]);

        const checkOverflow = useCallback(() => {
            let overflow = false;

            const draggableDOM = draggableRef.current;
            const containerDOM = draggableDOM.offsetParent;

            const { x: initialX, y: initialY } =
                draggableDOM.getBoundingClientRect();

            let x = initialX;
            let y = initialY;

            if (
                initialX + (draggableDOM.offsetWidth - overflowOffset.left) <
                containerDOM.offsetLeft
            ) {
                overflow = true;
                x =
                    containerDOM.offsetLeft -
                    draggableDOM.offsetWidth +
                    overflowOffset.left;
            } else if (
                initialX + overflowOffset.right >
                containerDOM.offsetLeft + containerDOM.offsetWidth
            ) {
                overflow = true;
                x =
                    containerDOM.offsetLeft +
                    (containerDOM.offsetWidth - overflowOffset.right);
            }

            if (
                initialY + (draggableDOM.offsetHeight - overflowOffset.top) <
                containerDOM.offsetTop
            ) {
                overflow = true;
                y =
                    containerDOM.offsetTop -
                    draggableDOM.offsetHeight +
                    overflowOffset.top;
            } else if (
                initialY + overflowOffset.bottom >
                containerDOM.offsetTop + containerDOM.offsetHeight
            ) {
                overflow = true;
                y =
                    containerDOM.offsetTop +
                    (containerDOM.offsetHeight - overflowOffset.bottom);
            }

            return { initialX, initialY, x, y, overflow };
        }, [overflowOffset]);

        useEffect(() => {
            const handleMove = (event) => {
                if (initialPosition.current) {
                    const draggableDOM = draggableRef.current;

                    const parentOffsetLeft =
                        draggableDOM.offsetParent.offsetLeft;
                    const parentOffsetTop = draggableDOM.offsetParent.offsetTop;

                    const { x: eventX, y: eventY } =
                        getCoordinatesOfDomEvent(event);

                    let x =
                        eventX -
                        parentOffsetLeft -
                        initialPosition.current.offsetX;
                    let y =
                        eventY -
                        parentOffsetTop -
                        initialPosition.current.offsetY;

                    deltaXAccumulator.current += x - previousPosition.current.x;
                    deltaYAccumulator.current += y - previousPosition.current.y;

                    currentPosition.current = {
                        x,
                        y,
                    };
                }
            };

            const handleEnd = () => {
                const draggableDOM = draggableRef.current;
                const { x: initialX, y: initialY } = draggableDOM.getBoundingClientRect();
                
                let finalPosition = { x: initialX, y: initialY };
                let overflow = false;

                if (preventOverflow && previousPosition.current) {
                    const { x, y, overflow: overflowFlag } = checkOverflow();

                    finalPosition = { x, y };
                    overflow = overflowFlag;
                }

                if (onDragEnd) onDragEnd(finalPosition, overflow);

                initialPosition.current = null;
                currentPosition.current = null;
                previousPosition.current = null;
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
        }, [onDrag, onDragEnd, preventOverflow, checkOverflow]);

        useImperativeHandle(ref, () => {
            draggableRef.current.checkOverflow = () => {
                const {
                    initialX,
                    initialY,
                    x,
                    y,
                    overflow: overflowFlag,
                } = checkOverflow();

                if (overflowFlag) {
                    onDrag({
                        x,
                        y,
                        deltaX: x - initialX,
                        deltaY: y - initialY,
                    });
                }
            };

            return draggableRef.current;
        });

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
