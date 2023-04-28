import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import ClickAwayListener from "../clickAwayListener";

const StyledPopup = styled.div`
    transition: transform 0.3s ease-in-out, opacity 0.1s, visibility 0.1s;
    position: absolute;
    opacity: ${({ show }) => !show && 0};
    visibility: ${({ show }) => !show && "hidden"};
    ${({ show, fadeOrientacion }) =>
        show
            ? css`
                  transform: translate(0, 0);
              `
            : css`
                  transform: translate(
                      ${fadeOrientacion.x * 100}%,
                      ${fadeOrientacion.y * 100}%
                  );
              `}
    z-index: ${({ maxFocusLevel }) => maxFocusLevel + 1};
`;

const Popup = memo((props) => {
    const {
        style,
        fadeOrientacion = { x: 0, y: 1 },
        onClickAway,
        show,
        children,
    } = props;

    const maxFocusLevel = useSelector(
        ({ programs }) => Object.keys(programs.currentPrograms).length
    );

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <StyledPopup
                fadeOrientacion={fadeOrientacion}
                maxFocusLevel={maxFocusLevel}
                show={show}
                style={style}
            >
                {children}
            </StyledPopup>
        </ClickAwayListener>
    );
});

export default Popup;
