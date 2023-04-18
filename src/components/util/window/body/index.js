import React, { forwardRef, memo } from "react";
import styled, { css } from "styled-components";
import ScrollbarContainer from "../../../../styles/ScrollbarContainer";

const StyledWindowBody = styled((ScrollbarContainer))`
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: overlay;
    box-sizing: border-box;

    --generic-border-color: ${({ theme }) =>
        theme.darkTheme ? `#424242` : `#dddddd`};

    border: 1px solid
        ${({ theme, isFocused }) =>
            isFocused && theme.barsAndBorders
                ? theme.windowsColor
                : css`var(--generic-border-color)`};
`;

const WindowBody = memo(
    forwardRef((props, ref) => {
        const { children, style, isFocused } = props;
        return (
            <StyledWindowBody
                ref={ref}
                className="no-drag windows-section"
                style={style}
                isFocused={isFocused}
            >
                {children}
            </StyledWindowBody>
        );
    })
);

export default WindowBody;
