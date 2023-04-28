import React, {
    forwardRef,
    memo,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import styled from "styled-components";
import useRequestAnimationFrame from "../../../hooks/useRequestAnimationFrame";
import { getCoordinatesOfDomEvent } from "../../../common/eventsCommonFunctions";
import { OPPOSITE_SIDE, RESIZER_PROPERTIES } from "./utils";

const StyledResizerContainer = styled.div`
    position: relative;

    .top {
        width: calc(100% - 12px);
        height: 4px;
        left: 6px;
        top: -4px;
        cursor: ${({ disabled }) => !disabled && "n-resize"};

        @media (max-width: 768px) {
            top: -10px;
            height: 11px;
        }
    }

    .top-right {
        width: 10px;
        height: 10px;
        right: -4px;
        top: -4px;
        cursor: ${({ disabled }) => !disabled && "ne-resize"};

        @media (max-width: 768px) {
            right: -10px;
            top: -10px;
            width: 16px;
            height: 16px;
        }
    }

    .right {
        width: 4px;
        height: calc(100% - 12px);
        right: -4px;
        top: 6px;
        cursor: ${({ disabled }) => !disabled && "e-resize"};

        @media (max-width: 768px) {
            right: -10px;
            width: 11px;
        }
    }

    .bottom-right {
        width: 10px;
        height: 10px;
        right: -4px;
        bottom: -4px;
        cursor: ${({ disabled }) => !disabled && "se-resize"};

        @media (max-width: 768px) {
            right: -10px;
            bottom: -10px;
            width: 16px;
            height: 16px;
        }
    }

    .bottom {
        width: calc(100% - 12px);
        height: 4px;
        left: 6px;
        bottom: -4px;
        cursor: ${({ disabled }) => !disabled && "ns-resize"};

        @media (max-width: 768px) {
            bottom: -10px;
            height: 11px;
        }
    }

    .bottom-left {
        width: 10px;
        height: 10px;
        left: -4px;
        bottom: -4px;
        cursor: ${({ disabled }) => !disabled && "sw-resize"};

        @media (max-width: 768px) {
            left: -10px;
            bottom: -10px;
            width: 16px;
            height: 16px;
        }
    }

    .left {
        width: 4px;
        height: calc(100% - 12px);
        left: -4px;
        top: 6px;
        cursor: ${({ disabled }) => !disabled && "ew-resize"};

        @media (max-width: 768px) {
            left: -10px;
            width: 11px;
        }
    }

    .top-left {
        width: 10px;
        height: 10px;
        left: -4px;
        top: -4px;
        cursor: ${({ disabled }) => !disabled && "nw-resize"};

        @media (max-width: 768px) {
            left: -10px;
            top: -10px;
            width: 16px;
            height: 16px;
        }
    }
`;

const StyledResizer = styled.div`
    position: absolute;
    z-index: 1;
`;

const Resizer = memo(
    forwardRef((props, ref) => {
        const {
            children,
            size,
            minSize,
            onResizingStart,
            onResizing,
            onResizingEnd,
            containerRef,
            disabled,
        } = props;

        const previusPosition = useRef(null);
        const deltaSize = useRef({ x: 0, y: 0 });
        const mousePosition = useRef(null);
        const resizerSide = useRef(null);
        const reziserRef = useRef(null);

        useImperativeHandle(ref, () => ({
            ...reziserRef,
            updateSize: ({ width, height }) => {
                if (minSize.width <= width && minSize.height <= height) {
                    reziserRef.current.style.cssText += `
                    width: ${width}px;
                    height: ${height}px;
                    `;
                }
            },
            getCurrentSize: () => {
                const { width, height } =
                    reziserRef.current.getBoundingClientRect();

                return { width, height };
            },
        }));

        const handleStart = (event, side, cursor) => {
            event.preventDefault();
            event.stopPropagation();
            if (disabled) return;
            document.body.style.cursor = cursor;

            const domResizer = reziserRef.current;

            const domContainer = containerRef.current;
            const containerRect = domContainer.getBoundingClientRect();

            const resizerRect = domResizer.getBoundingClientRect();
            const domContainerParent = domContainer.offsetParent;
            const containerParentRect =
                domContainerParent.getBoundingClientRect();

            RESIZER_PROPERTIES[side].forEach(
                ({ anchorSide, axis, dimension }) => {
                    if (["left", "top"].includes(anchorSide)) {
                        containerRef.current.style[anchorSide] = `${0}px`;
                    } else {
                        containerRef.current.style[anchorSide] = `${
                            containerParentRect[dimension] -
                            (containerRect[anchorSide] - containerRect[axis])
                        }px`;
                    }
                }
            );

            const parentOffsetLeft = domResizer.offsetLeft;
            const parentOffsetTop = domResizer.offsetTop;

            const { x: eventX, y: eventY } = getCoordinatesOfDomEvent(event);

            const x = eventX - parentOffsetLeft;
            const y = eventY - parentOffsetTop;

            resizerSide.current = side;
            previusPosition.current = {
                x,
                y,
            };
            if (onResizingStart)
                onResizingStart({
                    width: resizerRect.width,
                    height: resizerRect.height,
                });
        };

        useEffect(() => {
            const domResizer = reziserRef.current;

            const parentOffsetLeft = domResizer.offsetLeft;
            const parentOffsetTop = domResizer.offsetTop;

            const domContainer = containerRef.current;

            const handleMove = (event) => {
                if (previusPosition.current) {
                    let { x: eventX, y: eventY } =
                        getCoordinatesOfDomEvent(event);

                    const x = eventX - parentOffsetLeft;
                    const y = eventY - parentOffsetTop;

                    deltaSize.current.x += previusPosition.current.x - x;
                    deltaSize.current.y += previusPosition.current.y - y;

                    previusPosition.current = { x, y };
                    mousePosition.current = { x, y };
                }
            };

            const handleEnd = (event) => {
                if (previusPosition.current) {
                    const containerRect = domContainer.getBoundingClientRect();
                    const resizerRect = domResizer.getBoundingClientRect();

                    RESIZER_PROPERTIES[resizerSide.current].forEach(
                        ({ anchorSide }) => {
                            domContainer.style[anchorSide] = "";
                        }
                    );

                    domContainer.style.transform = `translate(${containerRect.x}px, ${containerRect.y}px)`;

                    document.body.style.cursor = "auto";

                    resizerSide.current = null;
                    previusPosition.current = null;
                    deltaSize.current = {
                        x: 0,
                        y: 0,
                    };
                    mousePosition.current = null;
                    if (onResizingEnd)
                        onResizingEnd({
                            width: resizerRect.width,
                            height: resizerRect.height,
                        });
                }
            };

            document.addEventListener("mousemove", handleMove);
            document.addEventListener("mouseup", handleEnd);

            document.addEventListener("touchmove", handleMove);
            document.addEventListener("touchend", handleEnd);
            return () => {
                document.removeEventListener("mousemove", handleMove);
                document.removeEventListener("mouseup", handleEnd);

                document.removeEventListener("touchmove", handleMove);
                document.removeEventListener("touchend", handleEnd);
            };
        }, [containerRef, onResizingEnd]);

        useRequestAnimationFrame(() => {
            if (deltaSize.current.x !== 0 || deltaSize.current.y !== 0) {
                const domResizer = reziserRef.current;

                let resizerRect = domResizer.getBoundingClientRect();

                RESIZER_PROPERTIES[resizerSide.current].forEach(
                    ({ orientation, axis, dimension, anchorSide }) => {
                        if (
                            deltaSize.current[axis] * orientation > 0 &&
                            mousePosition.current[axis] * orientation >
                                resizerRect[OPPOSITE_SIDE[anchorSide]] *
                                    orientation
                        ) {
                            return;
                        }
                        resizerRect[dimension] +=
                            deltaSize.current[axis] * orientation;
                    }
                );

                if (onResizing)
                    onResizing({
                        width: resizerRect.width,
                        height: resizerRect.height,
                    });

                deltaSize.current = {
                    x: 0,
                    y: 0,
                };
                mousePosition.current = null;
            }
        }, [onResizing]);

        // The size is setted in the component to avoid so many class changes in the styled component
        return (
            <StyledResizerContainer
                ref={reziserRef}
                style={{
                    minHeight: minSize.height,
                    minWidth: minSize.width,
                    width: size.width,
                    height: size.height,
                }}
                disabled={disabled}
            >
                <StyledResizer
                    className="no-drag top"
                    onMouseDown={(e) => handleStart(e, "top", "n-resize")}
                    onTouchStart={(e) => handleStart(e, "top", "n-resize")}
                />
                <StyledResizer
                    className="no-drag top-right"
                    onMouseDown={(e) =>
                        handleStart(e, "top-right", "ne-resize")
                    }
                    onTouchStart={(e) =>
                        handleStart(e, "top-right", "ne-resize")
                    }
                />
                <StyledResizer
                    className="no-drag right"
                    onMouseDown={(e) => handleStart(e, "right", "e-resize")}
                    onTouchStart={(e) => handleStart(e, "right", "e-resize")}
                />
                <StyledResizer
                    className="no-drag bottom-right"
                    onMouseDown={(e) =>
                        handleStart(e, "bottom-right", "se-resize")
                    }
                    onTouchStart={(e) =>
                        handleStart(e, "bottom-right", "se-resize")
                    }
                />
                <StyledResizer
                    className="no-drag bottom"
                    onMouseDown={(e) => handleStart(e, "bottom", "ns-resize")}
                    onTouchStart={(e) => handleStart(e, "bottom", "ns-resize")}
                />
                <StyledResizer
                    className="no-drag bottom-left"
                    onMouseDown={(e) =>
                        handleStart(e, "bottom-left", "sw-resize")
                    }
                    onTouchStart={(e) =>
                        handleStart(e, "bottom-left", "sw-resize")
                    }
                />
                <StyledResizer
                    className="no-drag left"
                    onMouseDown={(e) => handleStart(e, "left", "ew-resize")}
                    onTouchStart={(e) => handleStart(e, "left", "ew-resize")}
                />
                <StyledResizer
                    className="no-drag top-left"
                    onMouseDown={(e) => handleStart(e, "top-left", "nw-resize")}
                    onTouchStart={(e) =>
                        handleStart(e, "top-left", "nw-resize")
                    }
                />
                {children}
            </StyledResizerContainer>
        );
    })
);

export default Resizer;
