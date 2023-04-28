import {
    faCog,
    faPowerOff,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { addProgram } from "../../../../../store/slices/programs";
import { useDispatch } from "react-redux";
import { toggleWindowsMenu } from "../../../../../store/slices/popups";
import Popup from "../../../../common/popup";
import Options from "../../../../common/inputs/select/options";

const StyledStartMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    width: 50px;
`;

const StyledRelativePowerContainer = styled.div`
    position: relative;
`;

const StyledStartOption = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    font-size: 18px;

    &:hover {
        background-color: #cccccc40;
    }
`;

const StyledPowerOptions = styled.div`
    width: 200px;
`;

const POWER_OPTIONS = [
    {
        id: "restart",
        value: "Restart",
        icon: faRefresh,
    },
    {
        id: "shutDown",
        value: "Shut Down",
        icon: faPowerOff,
    },
];

const StartMenu = () => {
    const [showBootMenu, setShowBootMenu] = useState(false);

    const dispatch = useDispatch();

    const handleSettingsClick = () => {
        dispatch(
            addProgram({
                id: "settings",
            })
        );
        dispatch(toggleWindowsMenu());
    };

    const handlePowerClick = () => {
        setShowBootMenu(!showBootMenu);
    };

    const handlePowerClickAway = (event) => {
        if (event.target.closest("#power-option")) return;
        setShowBootMenu(false);
    };

    const selectPowerOption = (option) => {
        switch (option.id) {
            case "restart":
                window.location.reload();
                break;
            case "shutDown":
                if (window.self !== window.top) {
                    window.top.postMessage({ code: "shutDown" }, "*");
                    return;
                } else if (window.history.length > 1) {
                    window.history.go(-1);
                    setTimeout(
                        () =>
                            console.log(
                                "Sorry mate, i don't want to delete your history so go forward by yourself"
                            ),
                        2500
                    );
                    return;
                }
                window.close("", "_parent", "");
                break;
            default:
                break;
        }
    };

    return (
        <StyledStartMenu>
            <StyledStartOption title="Settings" onClick={handleSettingsClick}>
                <FontAwesomeIcon icon={faCog} />
            </StyledStartOption>
            <StyledRelativePowerContainer>
                <StyledStartOption
                    id="power-option"
                    title="Power"
                    onClick={handlePowerClick}
                >
                    <FontAwesomeIcon icon={faPowerOff} />
                </StyledStartOption>
                <Popup
                    show={showBootMenu}
                    onClickAway={handlePowerClickAway}
                    style={{ bottom: 50, left: 0 }}
                    fadeOrientacion={{ x: 0, y: 0 }}
                >
                    <StyledPowerOptions>
                        <Options
                            options={POWER_OPTIONS}
                            onSelect={selectPowerOption}
                            style={{
                                width: "100%",
                                left: "auto",
                                top: "auto",
                                transform: "none",
                                position: "static",
                                fontSize: "12px",
                            }}
                            optionStyle={{
                                justifyContent: "flex-start",
                                paddingLeft: "10px",
                                boxSizing: "border-box",
                                gap: "10px",
                            }}
                        />
                    </StyledPowerOptions>
                </Popup>
            </StyledRelativePowerContainer>
        </StyledStartMenu>
    );
};

export default StartMenu;
