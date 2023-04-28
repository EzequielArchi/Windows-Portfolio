import React from "react";
import Popup from "../../../common/popup";
import { useDispatch, useSelector } from "react-redux";
import { toggleWindowsMenu } from "../../../../store/slices/popups";
import styled, { css } from "styled-components";
import { shadeColor } from "../../../../common/colorCommonFunctions";
import StartMenu from "./startMenu";
import StartProgramList from "./programList";
import ExploreMenu from "./exploreMenu";

const StyledWindowsMenu = styled.div`
    height: 500px;
    display: flex;
    font-family: "Segoe UI", "Roboto", sans-serif;
    user-select: none;
    padding-top: 10px;
    gap: 10px;

    background-color: ${({ theme }) =>
        theme.startAndTaskbar
            ? shadeColor(theme.windowsColor, -30)
            : css`var(--windows-section-color)`};

    color: ${({ theme }) =>
        theme.startAndTaskbar ? `#f5f5f5` : css`var(--windows-text-color)`};
`;

const Menu = () => {
    const showWindowsMenu = useSelector(({ popups }) => popups.showWindowsMenu);

    const dispatch = useDispatch();

    const handleClickAway = (event) => {
        if (event.target.closest("#windows-option-taskbar")) return;
        if (showWindowsMenu) dispatch(toggleWindowsMenu());
    };

    return (
        <Popup
            show={showWindowsMenu}
            style={{ bottom: 0, left: 0 }}
            onClickAway={handleClickAway}
        >
            <StyledWindowsMenu>
                <StartMenu />
                <StartProgramList />
                <ExploreMenu />
            </StyledWindowsMenu>
        </Popup>
    );
};

export default Menu;
