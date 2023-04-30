import React, { useLayoutEffect, useRef } from "react";
import Window from "../../../common/window";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpRightFromSquare,
    faDownload,
} from "@fortawesome/free-solid-svg-icons";

const StyledResume = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const StyledHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 40px;
    padding: 0 20px;
    background-color: ${({ theme }) =>
        theme.darkTheme ? "#242424" : "#efefef"};
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => (theme.darkTheme ? "#ffffff" : "#424242")};
`;

const StyledHeaderButton = styled.a`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    border-radius: 50%;
    transition: background-color 0.5s;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;

    &:not([disabled]):hover {
        background-color: ${({ theme }) =>
            theme.darkTheme ? "#cccccc60" : "#00000020"};
    }
`;

const StyledIframe = styled.iframe`
    user-select: none;
    border: none;
`;

const Resume = (props) => {
    const windowRef = useRef(null);

    useLayoutEffect(() => {
        const { bodyRef } = windowRef.current;
        bodyRef.current.style.overflow = "hidden";
    }, []);

    return (
        <Window ref={windowRef} {...props}>
            <StyledResume>
                <StyledHeaderContainer>
                    <StyledHeaderButton
                        title="Download"
                        href="https://drive.google.com/uc?id=1JsKJC657UiBqF_YM1QBSdH5tIc_AyWx4&export=download"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faDownload} />
                    </StyledHeaderButton>
                    <StyledHeaderButton
                        title="Open in new Window"
                        href="https://drive.google.com/file/d/1JsKJC657UiBqF_YM1QBSdH5tIc_AyWx4/view"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </StyledHeaderButton>
                </StyledHeaderContainer>
                <StyledIframe
                    width="100%"
                    height="100%"
                    src="https://drive.google.com/file/d/1JsKJC657UiBqF_YM1QBSdH5tIc_AyWx4/preview"
                    title="Resume"
                />
            </StyledResume>
        </Window>
    );
};

export default Resume;
