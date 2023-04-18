import React, { forwardRef, memo, useContext } from "react";
import styled, { ThemeContext, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

const StyledWindowHeader = styled.div`
    height: 34px;
    width: 100%;
    --generic-bar-color: ${({ theme }) =>
        theme.darkTheme ? `#424242` : `#cccccc`};

    background-color: ${({ theme, isFocused }) =>
        isFocused && theme.barsAndBorders
            ? theme.windowsColor
            : css`var(--generic-bar-color)`};

    display: flex;
    justify-content: flex-end;
`;

const StyledWindowOptions = styled.div`
    height: 100%;
    display: flex;
    align-items: flex-start;
`;

const StyledWindowOption = styled.div`
    width: 40px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
    font-size: ${({ fontSize }) => fontSize};
    color: #ffffff;
    cursor: default;

    :hover {
        background-color: ${({ hoverBackground }) => hoverBackground};
    }
`;

const WindowHeader = memo(
    forwardRef((props, ref) => {
        const themeContext = useContext(ThemeContext);

        const hoverBackgroundOption = !themeContext.barsAndBorders
            ? `${themeContext.windowsColor}80`
            : "#ffffff50";

        const { onMinimize, onMaximize, onClose, isFocused } = props;
        return (
            <StyledWindowHeader
                ref={ref}
                onDoubleClick={onMaximize}
                isFocused={isFocused}
            >
                <StyledWindowOptions>
                    <StyledWindowOption
                        className="no-drag"
                        id="minimize-window"
                        onClick={onMinimize}
                        fontSize="35px"
                        hoverBackground={hoverBackgroundOption}
                    >
                        -
                    </StyledWindowOption>
                    <StyledWindowOption
                        className="no-drag"
                        id="miximize-window"
                        onClick={onMaximize}
                        fontSize="14px"
                        hoverBackground={hoverBackgroundOption}
                    >
                        <FontAwesomeIcon
                            icon={faSquare}
                            style={{ pointerEvents: "none" }}
                        />
                    </StyledWindowOption>
                    <StyledWindowOption
                        className="no-drag"
                        id="close-window"
                        onClick={onClose}
                        fontSize="16px"
                        hoverBackground="#ff000080"
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            style={{ pointerEvents: "none" }}
                        />
                    </StyledWindowOption>
                </StyledWindowOptions>
            </StyledWindowHeader>
        );
    })
);

export default WindowHeader;
