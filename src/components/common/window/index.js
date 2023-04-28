import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import Draggable from "../draggable";
import Resizer from "../resizer";
import WindowBody from "./body";
import WindowHeader, { WINDOW_HEADER_HEIGHT } from "./header";
import { useDispatch } from "react-redux";
import {
    defocusProgram,
    deleteProgram,
    focusProgram,
    toggleMinimizeProgram,
} from "../../../store/slices/programs";
import { NAVBAR_HEIGHT } from "../../../util/globalConstans";

const StyledWindowContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    z-index: ${({ focusLevel }) => focusLevel};
`;

const StyledWindow = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const MIN_SIZE = {
    width: 260,
    height: 300,
};

const getInitialSize = () => {
    return {
        width: Math.min(window.innerWidth - 20, 1000),
        height: Math.min(window.innerHeight / 1.33, 800),
    };
};

const getInitialPosition = () => {
    const initialSize = getInitialSize();
    return window.innerWidth < 768
        ? {
              x: 10,
              y: 50,
          }
        : {
              x: window.innerWidth / 2 - initialSize.width / 2,
              y:
                  window.innerHeight / 2 -
                  initialSize.height / 2 -
                  NAVBAR_HEIGHT,
          };
};

const isWindowMaximazed = (position, size) => {
    const { x, y } = position;
    const { width, height } = size;
    const { innerWidth, innerHeight } = window;

    return x === 0 && y === 0 && width === innerWidth && height === innerHeight;
};

const Window = forwardRef((props, ref) => {
    const {
        instanceId,
        children,
        initialSize = getInitialSize(),
        initialPosition = getInitialPosition(),
        minSize = MIN_SIZE,
        disabledResize,
        options,
        focusLevel = 0,
        maxFocusLevel,
        isMinimized,
        onDragStart,
        onDrag,
        onDragEnd,
        onResizingStart,
        onResizing,
        onResizingEnd,
        onMinimize,
        onMaximize,
        onClose,
    } = props;

    const dispatch = useDispatch();
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [allowMouseEvents, setAllowMouseEvents] = useState(true);
    const isFocused = focusLevel === maxFocusLevel;
    const windowRef = useRef(null);
    const headerRef = useRef(null);
    const bodyRef = useRef(null);

    const resizerRef = useRef(null);
    const draggableRef = useRef(null);

    const isMaximazed = useRef(isWindowMaximazed(initialPosition, initialSize));
    const lastSize = useRef(initialSize);
    const lastPosition = useRef(initialPosition);
    const initialDragMaximized = useRef(false);

    const handleMaximize = useCallback(() => {
        if (isMaximazed.current) {
            setPosition(lastPosition.current);
            setSize(lastSize.current);
            resizerRef.current.updateSize(lastSize.current);
            isMaximazed.current = false;
        } else {
            lastSize.current = resizerRef.current.getCurrentSize();
            lastPosition.current = position;
            isMaximazed.current = true;

            setPosition({ x: 0, y: 0 });

            const maximizedSize = {
                width: window.innerWidth,
                height: draggableRef.current.parentElement.clientHeight,
            };
            setSize(maximizedSize);
            resizerRef.current.updateSize(maximizedSize);
        }

        if (onMaximize) onMaximize();
    }, [position, onMaximize]);

    const handleMinimize = useCallback(
        (event) => {
            dispatch(toggleMinimizeProgram(instanceId));
            dispatch(defocusProgram(instanceId));

            if (onMinimize) onMinimize();
        },
        [dispatch, instanceId, onMinimize]
    );

    const handleClose = useCallback(
        (event) => {
            dispatch(deleteProgram(instanceId));
            if (onClose) onClose();
        },
        [dispatch, onClose, instanceId]
    );

    const handleWindowMouseDown = (event) => {
        if (["close-window", "minimize-window"].includes(event.target.id))
            return;
        window.focus();
        dispatch(focusProgram(instanceId));
    };

    const disabledPointerEvents = () => {
        setAllowMouseEvents(false);
    };

    const enabledPointerEvents = () => {
        setAllowMouseEvents(true);
    };

    const handleDrag = useCallback(
        (newPosition) => {
            if (isMaximazed.current) {
                isMaximazed.current = false;
            }

            const { x, y } = newPosition;

            setPosition({ x, y });
            if (onDrag) onDrag(newPosition);
        },
        [onDrag]
    );

    const handleResizing = useCallback(
        (newSize) => {
            if (isMaximazed.current) {
                isMaximazed.current = false;
            }

            setSize(newSize);
            if (onResizing) onResizing(newSize);
        },
        [onResizing]
    );

    const handleDragStart = useCallback(
        (initialPosition) => {
            window.focus();
            disabledPointerEvents();
            initialDragMaximized.current = isMaximazed.current;
            if (onDragStart) onDragStart(initialPosition);
        },
        [onDragStart]
    );

    const handleDragEnd = useCallback(
        (endPosition, overflow) => {
            enabledPointerEvents();

            if (overflow) {
                const { x, y } = endPosition;
                setPosition({ x, y });

                if (initialDragMaximized.current && "ontouchstart" in window) {
                    isMaximazed.current = true;
                }
            }

            if (onDragEnd) onDragEnd(endPosition);
        },
        [onDragEnd]
    );

    const handleResizingStart = useCallback(
        (initialSize) => {
            window.focus();
            disabledPointerEvents();
            dispatch(focusProgram(instanceId));

            if (onResizingStart) onResizingStart(initialSize);
        },
        [dispatch, instanceId, onResizingStart]
    );

    const handleResizingEnd = useCallback(
        (endSize) => {
            enabledPointerEvents();

            const { x, y } = draggableRef.current.getBoundingClientRect();

            setPosition({ x, y });

            if (onResizingEnd) onResizingEnd(endSize);

            draggableRef.current.checkOverflow();
        },
        [onResizingEnd]
    );

    const draggableStyle = useMemo(
        () => ({
            zIndex: focusLevel,
            visibility: isMinimized && "hidden",
            opacity: isMinimized && "0",
            transition: "visibility 0.1s, opacity 0.1s",
        }),
        [focusLevel, isMinimized]
    );

    useImperativeHandle(ref, () => ({
        ...windowRef,
        headerRef,
        bodyRef,
    }));

    const memorizedWindow = useMemo(
        () => (
            <StyledWindow ref={windowRef}>
                <WindowHeader
                    ref={headerRef}
                    onMinimize={handleMinimize}
                    onMaximize={handleMaximize}
                    onClose={handleClose}
                    options={options}
                    isFocused={isFocused}
                />
                <WindowBody
                    ref={bodyRef}
                    isFocused={isFocused}
                    style={{ pointerEvents: !allowMouseEvents && "none" }}
                >
                    {children}
                </WindowBody>
            </StyledWindow>
        ),
        [
            allowMouseEvents,
            handleMaximize,
            handleClose,
            windowRef,
            children,
            options,
            handleMinimize,
            isFocused,
        ]
    );

    useLayoutEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27 && isFocused) {
                handleClose();
            } 
        };

        const handleWindowResize = () => {
            if (isMaximazed.current) {
                setPosition({ x: 0, y: 0 });

                const maximizedSize = {
                    width: window.innerWidth,
                    height: draggableRef.current.parentElement.clientHeight,
                };
                setSize(maximizedSize);
                resizerRef.current.updateSize(maximizedSize);

                if (onMaximize) onMaximize();
            } else {
                draggableRef.current.checkOverflow();
            }
        };

        window.addEventListener("resize", handleWindowResize, false);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("resize", handleWindowResize, false);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onMaximize, isFocused, handleClose]);

    const overflowOffsetMobile = {
        top: size.height,
        right: size.width,
        bottom: size.height,
        left: size.width,
    };

    const overflowOffsetWeb = {
        top: size.height,
        right: 50,
        bottom: WINDOW_HEADER_HEIGHT,
        left: 130,
    };

    const overflowOffset =
        "ontouchstart" in window ? overflowOffsetMobile : overflowOffsetWeb;

    return (
        <Draggable
            ref={draggableRef}
            position={position}
            onDrag={handleDrag}
            cancel={".no-drag"}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={draggableStyle}
            preventOverflow={true}
            overflowOffset={overflowOffset}
        >
            <StyledWindowContainer onMouseDown={handleWindowMouseDown}>
                <Resizer
                    size={size}
                    minSize={minSize}
                    ref={resizerRef}
                    containerRef={draggableRef}
                    onResizingStart={handleResizingStart}
                    onResizing={handleResizing}
                    onResizingEnd={handleResizingEnd}
                    disabled={disabledResize}
                >
                    {memorizedWindow}
                </Resizer>
            </StyledWindowContainer>
        </Draggable>
    );
});

export default Window;
