import React from "react";
import styled, { css } from "styled-components";
import ScrollbarContainer from "../../../../../styles/ScrollbarContainer";
import { shadeColor } from "../../../../../common/colorCommonFunctions";
import LinkedinLogo from "../../../../../assets/images/startMenu/LinkedIn-Logo.png";
import GithubLogo from "../../../../../assets/images/startMenu/GitHub-Logo.png";

const StyledExploreMenu = styled.div`
    width: 306px;

    @media (max-width: 768px) {
        width: 120px;
    }
`;

const StyledTitle = styled.span`
    display: block;
    font-size: 14px;
    margin-bottom: 20px;
`;

const StyledExploreOptions = styled(ScrollbarContainer)`
    display: flex;
    gap: 3px;
    flex-wrap: wrap;

    ::-webkit-scrollbar {
        width: 3px;
    }

    @media (max-width: 768px) {
        width: 160px;
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

    --windows-explore-option: ${({ theme }) =>
        theme.darkTheme ? "#242424" : "#efefef"};

    background-color: ${({ theme }) =>
        theme.startAndTaskbar
            ? shadeColor(theme.windowsColor, -10)
            : css`var(--windows-explore-option)`};

    &:hover {
        box-shadow: 0px 0px 0px 1px
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
