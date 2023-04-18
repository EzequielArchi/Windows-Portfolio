import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledPopup = styled.div`
    transition: transform 0.3s ease-in-out, opacity 0.1s, visibility 0.1s;
    position: absolute;
    opacity: ${({ show }) => !show && 0};
    visibility: ${({ show }) => !show && "hidden"};
    transform: translate(0, ${({ show }) => !show && "100%"});
    z-index: ${({ maxFocusLevel }) => maxFocusLevel + 1};
`;

const Popup = memo((props) => {
    const { style, show, children } = props;

    const maxFocusLevel = useSelector(
        ({ programs }) => Object.keys(programs.currentPrograms).length
    );

    return (
        <StyledPopup maxFocusLevel={maxFocusLevel} show={show} style={style}>
            {children}
        </StyledPopup>
    );
});

export default Popup;
