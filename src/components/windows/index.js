import React from "react";
import styled from "styled-components";
import Taskbar from "./taskbar";
import ProgramList from "./programs/ProgramList";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconsList from "./icons/IconsList";
import Calendar from "./poppus/calendar";
import { useSelector } from "react-redux";
import BSOD from "./bsod";
import { NAVBAR_HEIGHT } from "../../util/globalConstans";
import Menu from "./poppus/menu";

const StyledWindowsHome = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        -90deg,
        var(--background-color),
        var(--background-color-transparent)
    );
    .windows-section {
        background-color: var(--windows-section-color);
    }
    .windows-text {
        color: var(--windows-text-color);
    }
`;

const StyledWindowsLogo = styled.div`
    position: absolute;
    top: 45%;
    left: 70%;
    transform: translate(-50%, -50%);
    color: #ffffffaa;
    font-size: 18vw;
    filter: drop-shadow(2px 2px 2px #12121280);

    @media (max-width: 768px) {
        font-size: 40vw;
    }
`;

const StyledDesktopContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - ${NAVBAR_HEIGHT}px);
`;

const Windows = () => {
    const fatalError = useSelector(({ programs }) => programs.fatalError);

    if (fatalError) {
        return <BSOD />;
    }

    return (
        <StyledWindowsHome>
            <StyledWindowsLogo>
                <FontAwesomeIcon icon={faWindows} />
            </StyledWindowsLogo>
            <StyledDesktopContainer>
                <IconsList />
                <ProgramList />
                <Menu />
                <Calendar />
            </StyledDesktopContainer>
            <Taskbar />
        </StyledWindowsHome>
    );
};

export default Windows;
