import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import Draggable from "../draggable";
import Resizer from "../resizer";
import WindowBody from "./body";
import WindowHeader from "./header";
import { useDispatch } from "react-redux";
import {
    defocusProgram,
    deleteProgram,
    focusProgram,
    toggleMinimizeProgram,
} from "../../../store/slices/programs";
import { NAVBAR_HEIGHT } from "../../../utils/globalConstans";

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

const INITIAL_SIZE = {
    width: Math.min(window.innerWidth - 20, 1000),
    height: Math.min(window.innerHeight / 1.33, 800),
};

const INITIAL_POSITION =
    window.innerWidth < 768
        ? {
              x: 10,
              y: 50,
          }
        : {
              x: window.innerWidth / 2 - INITIAL_SIZE.width / 2,
              y:
                  window.innerHeight / 2 -
                  INITIAL_SIZE.height / 2 -
                  NAVBAR_HEIGHT,
          };

const getIfIsMaximazed = (position, size) => {
    const { x, y } = position;
    const { width, height } = size;
    const { innerWidth, innerHeight } = window;

    return x === 0 && y === 0 && width === innerWidth && height === innerHeight;
};

const Window = forwardRef((props, ref) => {
    const {
        instanceId,
        children,
        initialPosition = INITIAL_POSITION,
        size = INITIAL_SIZE,
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
        onMaximize
    } = props;

    const dispatch = useDispatch();
    const [position, setPosition] = useState(initialPosition);
    const [allowMouseEvents, setAllowMouseEvents] = useState(true);

    const isFocused = focusLevel === maxFocusLevel;
    const windowRef = useRef(null);
    const headerRef = useRef(null);
    const bodyRef = useRef(null);

    const resizerRef = useRef(null);
    const draggableRef = useRef(null);

    const isMaximazed = useRef(getIfIsMaximazed(initialPosition, minSize));
    const lastSize = useRef(minSize);
    const lastPosition = useRef(initialPosition);

    const handleMaximize = useCallback(() => {
        if (isMaximazed.current) {
            setPosition(lastPosition.current);
            resizerRef.current.updateSize(lastSize.current);
            isMaximazed.current = false;
        } else {
            lastSize.current = resizerRef.current.getCurrentSize();
            lastPosition.current = position;
            isMaximazed.current = true;
            setPosition({ x: 0, y: 0 });
            resizerRef.current.updateSize({
                width: window.innerWidth,
                height: draggableRef.current.parentElement.clientHeight,
            });
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
        },
        [dispatch, instanceId]
    );

    const handleWindowMouseDown = (event) => {
        if (["close-window", "minimize-window"].includes(event.target.id)) return;
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
            if (isMaximazed.current) return;
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

            if (onResizing) onResizing(newSize);
        },
        [onResizing]
    );

    const handleDragStart = useCallback(
        (initialPosition) => {
            disabledPointerEvents();
            if (onDragStart) onDragStart(initialPosition);
        },
        [onDragStart]
    );

    const handleDragEnd = useCallback(
        (endPosition) => {
            enabledPointerEvents();

            if (onDragEnd) onDragEnd(endPosition);
        },
        [onDragEnd]
    );

    const handleResizingStart = useCallback(
        (initialSize) => {
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

    return (
        <Draggable
            ref={draggableRef}
            position={position}
            onDrag={handleDrag}
            cancel={".no-drag"}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={draggableStyle}
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
