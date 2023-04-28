import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { getCoordinatesOfDomEvent } from "../../../common/eventsCommonFunctions";
import useRequestAnimationFrame from "../../../hooks/useRequestAnimationFrame";

const StyledSlideContainer = styled.div`
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const StyledSlideItem = styled.div`
    flex: 0 0 100%;
`;

const StyledSlide = styled.div`
    width: 100%;
    height: 100%;
`;

const StyledArrowContainer = styled.button`
    position: absolute;
    top: ${({ top }) => top};
    left: ${({ left }) => left};
    transform: ${({ axisTranslate }) => `${axisTranslate}(-50%)`};
    background-color: transparent;
    border: none;
    color: var(--windows-text-color);
    font-size: 18px;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        transform: ${({ axisTranslate }) => `${axisTranslate}(-50%)`} scale(1.1);
    }
    
    &:focus {
        transform: ${({ axisTranslate }) => `${axisTranslate}(-50%)`} scale(1.1);
    }

    ${({ direction, startDirection, endDirection }) =>
        direction === "start"
            ? `${startDirection}: 5px;`
            : `${endDirection}: 5px;`}

    ${({ disabled }) =>
        disabled &&
        css`
            pointer-events: none;
            opacity: 0.5;
        `}
`;

const Sliders = (props) => {
    const {
        children,
        axis = "x",
        slideSpeed = 0.001,
        slideOffsetMax = 50,
        canSlide = true,
    } = props;

    const childrenArray = React.Children.toArray(children);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideOffset, setSlideOffset] = useState(0);
    const [allowAnimation, setAllowAnimation] = useState(true);

    const slideRef = useRef(null);

    const slidingStartPosition = useRef(null);
    const movementOffset = useRef(null);
    const hasSlipped = useRef(false);

    const goToPrevSlide = useCallback(() => {
        if (currentSlide > 0 && canSlide) {
            setCurrentSlide(currentSlide - 1);
        }
    }, [currentSlide, canSlide]);

    const goToNextSlide = useCallback(() => {
        if (currentSlide < childrenArray.length - 1 && canSlide) {
            setCurrentSlide(currentSlide + 1);
        }
    }, [currentSlide, childrenArray.length, canSlide]);

    const handleSlidingStart = (event) => {
        const coordinates = getCoordinatesOfDomEvent(event);
        slidingStartPosition.current = coordinates;
        setAllowAnimation(false);
    };

    const handleSliding = useCallback(
        (event) => {
            event.preventDefault();
            if (slidingStartPosition.current) {
                const coordinates = getCoordinatesOfDomEvent(event);
                const newOffset =
                    slidingStartPosition.current[axis] - coordinates[axis];
                if (
                    (newOffset < 0 && currentSlide !== 0) ||
                    (newOffset > 0 && currentSlide !== childrenArray.length - 1)
                ) {
                    movementOffset.current = newOffset;
                    return;
                }

                slidingStartPosition.current = coordinates;
            }
        },
        [axis, currentSlide, childrenArray.length]
    );

    const handleSlidingEnd = useCallback((event) => {
        slidingStartPosition.current = null;
        hasSlipped.current = null;
        movementOffset.current = null;
        setAllowAnimation(true);
        setSlideOffset(0);
    }, []);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.keyCode === 37 && axis === "x") {
                goToPrevSlide();
            } else if (event.keyCode === 38 && axis === "y") {
                goToPrevSlide();
            } else if (event.keyCode === 39 && axis === "x") {
                goToNextSlide();
            } else if (event.keyCode === 40 && axis === "y") {
                goToNextSlide();
            }
        },
        [goToPrevSlide, goToNextSlide, axis]
    );

    useRequestAnimationFrame(() => {
        if (!hasSlipped.current && movementOffset.current !== null) {
            let newSlideOffet = movementOffset.current * slideSpeed;
            if (Math.abs(movementOffset.current) > slideOffsetMax) {
                hasSlipped.current = true;
                newSlideOffet = 0;
                setAllowAnimation(true);
                if (movementOffset.current < 0) {
                    goToPrevSlide();
                } else {
                    goToNextSlide();
                }
            }

            setSlideOffset(newSlideOffet);
            movementOffset.current = null;
        }
    }, [slideSpeed, slideOffsetMax, goToPrevSlide, goToNextSlide]);

    useEffect(() => {
        document.addEventListener("mousemove", handleSliding);
        document.addEventListener("mouseup", handleSlidingEnd);

        document.addEventListener("touchmove", handleSliding);
        document.addEventListener("touchend", handleSlidingEnd);

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousemove", handleSliding);
            document.removeEventListener("mouseup", handleSlidingEnd);

            document.removeEventListener("touchmove", handleSliding);
            document.removeEventListener("touchend", handleSlidingEnd);

            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleSliding, handleSlidingEnd, handleKeyDown]);

    const axisTranslate = `translate${axis.toUpperCase()}`;
    const invertAxis = axis === "x" ? "y" : "x";
    const invertAxisTranslate = `translate${invertAxis.toUpperCase()}`;

    return (
        <StyledSlideContainer
            onTouchStart={handleSlidingStart}
            onMouseDown={handleSlidingStart}
            style={{ flexDirection: axis === "x" ? "row" : "column" }}
            ref={slideRef}
        >
            {childrenArray.map((component, index) => (
                <StyledSlideItem
                    key={index}
                    style={{
                        transform: `${axisTranslate}(-${
                            (currentSlide + slideOffset) * 100
                        }%)`,
                        transition: allowAnimation && "all 0.5s ease-in-out",
                    }}
                >
                    <StyledSlide>{component}</StyledSlide>
                </StyledSlideItem>
            ))}
            <StyledArrowContainer
                disabled={currentSlide === 0}
                axisTranslate={invertAxisTranslate}
                top={axis === "x" ? "50%" : "auto"}
                left={axis === "y" ? "50%" : "auto"}
                direction="start"
                startDirection={axis === "x" ? "left" : "top"}
                onClick={goToPrevSlide}
            >
                <FontAwesomeIcon
                    icon={axis === "x" ? faChevronLeft : faChevronUp}
                />
            </StyledArrowContainer>
            <StyledArrowContainer
                disabled={
                    childrenArray.length === 0 ||
                    currentSlide === childrenArray.length - 1
                }
                axisTranslate={invertAxisTranslate}
                top={axis === "x" ? "50%" : "auto"}
                left={axis === "y" ? "50%" : "auto"}
                direction="end"
                endDirection={axis === "x" ? "right" : "bottom"}
                onClick={goToNextSlide}
            >
                <FontAwesomeIcon
                    icon={axis === "x" ? faChevronRight : faChevronDown}
                />
            </StyledArrowContainer>
        </StyledSlideContainer>
    );
};

export default Sliders;
