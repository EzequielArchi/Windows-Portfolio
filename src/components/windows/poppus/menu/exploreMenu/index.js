import React from "react";
import styled, { css } from "styled-components";
import ScrollbarContainer from "../../../../../styles/ScrollbarContainer";
import { shadeColor } from "../../../../../common/colorCommonFunctions";
import LinkedinLogo from "../../../../../assets/images/startMenu/LinkedIn-Logo.png";
import GithubLogo from "../../../../../assets/images/startMenu/GitHub-Logo.png";

const StyledExploreMenu = styled.div`
    width: 316px;
    height: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: auto;
    }
`;

const StyledTitle = styled.span`
    display: block;
    font-size: 14px;
    margin-bottom: 20px;
`;

const StyledExploreOptions = styled(ScrollbarContainer)`
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    height: 100%;
    gap: 3px;
    overflow-y: overlay;
    padding-bottom: 20px;
    box-sizing: border-box;

    ::-webkit-scrollbar {
        width: 2px;
    }

    @media (max-width: 768px) {
        padding-right: 15px;
        flex-wrap: nowrap;
        flex-direction: column;
    }
`;

const StyledExploreOption = styled.a`
    all: unset;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    flex-shrink: 0;

    --windows-explore-option: ${({ theme }) =>
        theme.darkTheme ? "#242424" : "#efefef"};

    background-color: ${({ theme }) =>
        theme.startAndTaskbar
            ? shadeColor(theme.windowsColor, -10)
            : css`var(--windows-explore-option)`};

    &:hover {
        box-shadow: inset 0px 0px 0px 1px
            ${({ theme }) =>
                theme.startAndTaskbar
                    ? "#ffffff"
                    : css`var(--windows-section-inverted-color)`};
    }
`;

const StyledExploreOptionImg = styled.img`
    border-radius: 50%;
    background-color: #ffffff;
`;

const StyledExploreOptionTitle = styled.span`
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(5px, -5px);
    font-size: 12px;
`;

const ExploreMenu = () => {
    return (
        <StyledExploreMenu>
            <StyledTitle>Explore</StyledTitle>
            <StyledExploreOptions>
                <StyledExploreOption
                    href="https://www.linkedin.com/in/luciano-archidiacono"
                    target="_blank"
                >
                    <StyledExploreOptionImg
                        style={{ width: "38px" }}
                        alt=""
                        src={LinkedinLogo}
                    />
                    <StyledExploreOptionTitle>
                        Linkedin
                    </StyledExploreOptionTitle>
                </StyledExploreOption>
                <StyledExploreOption
                    href="https://github.com/EzequielArchi/Windows-Portfolio"
                    target="_blank"
                >
                    <StyledExploreOptionImg
                        style={{ width: "30px", padding: "5px" }}
                        alt=""
                        src={GithubLogo}
                    />
                    <StyledExploreOptionTitle>GitHub</StyledExploreOptionTitle>
                </StyledExploreOption>
            </StyledExploreOptions>
        </StyledExploreMenu>
    );
};

export default ExploreMenu;
