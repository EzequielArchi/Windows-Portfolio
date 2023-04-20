import React, { useLayoutEffect, useRef, useState } from "react";
import Window from "../../../common/window";
import ScrollbarContainer from "../../../../styles/ScrollbarContainer";
import styled, { css } from "styled-components";
import { CONFIGURATION_OPTIONS, OPTIONS_TYPES } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledConfiguration = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    .configuration-title {
        margin: 5px 0px 20px 5px;
    }

    .mobile-options {
        height: auto;
        width: 100%;
    }
`;

const StyledOptions = styled.div`
    display: flex;
    flex-direction: column;
    width: 320px;
    color: var(--windows-text-color);
    background-color: ${({ theme }) =>
        theme.darkTheme ? "#1f1f1f" : "#e6e6e6"};
`;

const StyledOption = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: default;

    .icon {
        font-size: 16px;
    }

    :hover {
        background-color: #cccccc80;
    }
`;

const StyledSelectedOption = styled.div`
    width: 5px;
    height: 50%;
    background-color: ${({ isSelected }) =>
        isSelected && css`var(--windows-color)`};
`;

const StyledMenu = styled(ScrollbarContainer)`
    flex: 1;
    overflow-y: overlay;
`;

const Configuration = (props) => {
    const [currentMenu, setCurrentMenu] = useState(OPTIONS_TYPES.color);

    const optionsArray = Object.keys(CONFIGURATION_OPTIONS);

    const configurationRef = useRef(null);
    const optionsRef = useRef(null);
    const windowsRef = useRef(null);

    const setMobileStyles = (width) => {
        if (width < 768) {
            configurationRef.current.style.cssText += `flex-direction: column`;
            optionsRef.current.style.cssText += `height: auto; width: 100%;`;
        } else {
            configurationRef.current.style.cssText += `flex-direction: row`;
            optionsRef.current.style.cssText += `height: 100%; width: 320px`;
        }
    };

    const handleResizingWindow = (newSize) => {
        setMobileStyles(newSize.width);
    };

    const handleMaximizeWindow = () => {
        const { width: windowHeight } =
            windowsRef.current.current.getBoundingClientRect();
        setMobileStyles(windowHeight);
    };

    const handleOptionClick = (optionId) => {
        setCurrentMenu(optionId);
    };

    const MenuComponent = CONFIGURATION_OPTIONS[currentMenu].component;

    useLayoutEffect(() => {
        const { width: windowHeight } =
            windowsRef.current.current.getBoundingClientRect();
        setMobileStyles(windowHeight);
    }, []);

    return (
        <Window
            onResizing={handleResizingWindow}
            onMaximize={handleMaximizeWindow}
            ref={windowsRef}
            {...props}
        >
            <StyledConfiguration ref={configurationRef}>
                <StyledOptions ref={optionsRef}>
                    <span className="configuration-title">Settings</span>
                    {optionsArray.map((optionId) => {
                        const option = CONFIGURATION_OPTIONS[optionId];

                        return (
                            <StyledOption
                                key={optionId}
                                onClick={() => handleOptionClick(optionId)}
                            >
                                <StyledSelectedOption
                                    isSelected={currentMenu === optionId}
                                />
                                <FontAwesomeIcon
                                    className={"icon"}
                                    icon={option.icon}
                                />
                                <span>{option.label}</span>
                            </StyledOption>
                        );
                    })}
                </StyledOptions>
                <StyledMenu>
                    <MenuComponent />
                </StyledMenu>
            </StyledConfiguration>
        </Window>
    );
};

export default Configuration;
