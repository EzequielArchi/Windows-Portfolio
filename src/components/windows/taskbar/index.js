import React, { useLayoutEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AVAILABLE_ICONS } from "../icons/utils";
import {
    defocusProgram,
    focusProgram,
    toggleMinimizeProgram,
} from "../../../store/slices/programs";
import {
    toggleCalendar,
    toggleWindowsMenu,
} from "../../../store/slices/popups";
import { shadeColor } from "../../../common/colorCommonFunctions";

const StyledTaskbar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background-color: var(--windows-section-color);
    background-color: ${({ theme }) =>
        theme.startAndTaskbar
            ? shadeColor(theme.windowsColor, -50)
            : css`var(--windows-section-color)`};
    display: flex;
    justify-content: space-between;
    z-index: ${({ maxFocusLevel }) => maxFocusLevel + 1};

    color: ${({ theme }) =>
        theme.startAndTaskbar ? `#f5f5f5` : css`var(--windows-text-color)`};
`;

const StyledProgramOptions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    flex: 1;
    gap: 15px;

    .program-icon {
        box-shadow: inset 0px -3px 0px 0px var(--windows-color);
    }
`;

const StyledOption = styled.div`
    height: 100%;
    flex: 0 1 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon-option {
        font-size: 18px;
    }

    .image-option {
        height: auto;
        width: 60%;
    }

    &:hover {
        background-color: #cccccc40;
        .icon-option {
            color: ${({ theme }) => shadeColor(theme.windowsColor, 60)};
        }
    }
    
    &:focus {
        outline: none;
        border: none;
        background-color: #cccccc40;
    }

    ${({ selected }) =>
        selected &&
        css`
            background-color: #cccccc40;
        `}
`;

const StyledWindowsDateTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 15px;
    padding-inline: 5px;
    font-size: 12px;
    user-select: none;

    :hover {
        background-color: #cccccc40;
    }

    :focus {
        outline: none;
        border: none;
        background-color: #cccccc40;
    }
`;

const Taskbar = () => {
    const timeRef = useRef(null);
    const dateRef = useRef(null);

    const currentPrograms = useSelector(
        ({ programs }) => programs.currentPrograms,
        shallowEqual
    );

    const currentProgramArray = Object.keys(currentPrograms);
    const maxFocusLevel = currentProgramArray.length;

    const dispatch = useDispatch();

    const onClickProgramOption = (instanceId) => {
        const program = currentPrograms[instanceId];
        if (program.isMinimized || program.focusLevel === maxFocusLevel) {
            dispatch(toggleMinimizeProgram(instanceId));

            if (!program.isMinimized) {
                dispatch(defocusProgram(instanceId));
                return;
            }
        }

        dispatch(focusProgram(instanceId));
    };

    const handleDateTimeClick = () => {
        dispatch(toggleCalendar());
    };

    const handleWindowsClick = () => {
        dispatch(toggleWindowsMenu());
    };

    useLayoutEffect(() => {
        const checkNumberFormat = (number) => {
            return number.padStart(2, "0");
        };

        const updateDateTime = () => {
            if (!timeRef.current || !dateRef.current) return;
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            let day = currentDate.getDate();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();

            month = month.toString();
            day = day.toString();
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = checkNumberFormat(minutes.toString());

            timeRef.current.innerText = `${hours}:${minutes} ${ampm}`;
            dateRef.current.innerText = `${month}/${day}/${year}`;

            setTimeout(() => updateDateTime(), 500);
        };
        updateDateTime();
    }, []);

    const programLength = Object.keys(AVAILABLE_ICONS).length;

    return (
        <StyledTaskbar maxFocusLevel={maxFocusLevel}>
            <StyledOption
                id="windows-option-taskbar"
                style={{ marginRight: "15px" }}
                onClick={handleWindowsClick}
                tabIndex={programLength + 1}
            >
                <FontAwesomeIcon icon={faWindows} className="icon-option" />
            </StyledOption>
            <StyledProgramOptions>
                {currentProgramArray.map((instanceId) => {
                    const { focusLevel, id, isMinimized } =
                        currentPrograms[instanceId];
                    const programImage = AVAILABLE_ICONS[id].image;
                    return (
                        <StyledOption
                            key={instanceId}
                            selected={
                                !isMinimized && focusLevel === maxFocusLevel
                            }
                            className="program-icon"
                            onClick={() => onClickProgramOption(instanceId)}
                        >
                            <img
                                className="image-option"
                                src={programImage}
                                alt=""
                            />
                        </StyledOption>
                    );
                })}
            </StyledProgramOptions>
            <StyledWindowsDateTime tabIndex={programLength + 2}
                onClick={handleDateTimeClick}
                id="date-time-taskbar"
                className="notranslate"
            >
                <span ref={timeRef}></span>
                <span ref={dateRef}></span>
            </StyledWindowsDateTime>
        </StyledTaskbar>
    );
};

export default Taskbar;
