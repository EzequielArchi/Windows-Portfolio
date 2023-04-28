import React, { useLayoutEffect, useRef, useState } from "react";
import Window from "../../../common/window";
import ScrollbarContainer from "../../../../styles/ScrollbarContainer";
import styled, { css } from "styled-components";
import MailContent from "./mailContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { MAILS_LIST } from "./utils";

const StyledContainerMail = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    .mail-title {
        margin: 5px 0px 20px 15px;
        font-size: 22px;
        font-weight: bold;
    }

    .mobile-options {
        height: auto;
        width: 100%;
    }
`;

const StyledEmailList = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    color: var(--windows-text-color);
    background-color: ${({ theme }) =>
        theme.darkTheme ? "#161616" : "#f0f0f0"};
    box-sizing: border-box;
    user-select: none;
    padding-bottom: 5px;
    border-right: 1px solid
        ${({ theme }) => (theme.darkTheme ? "#000000" : "#cccccc")};
`;

const StyledScrollContainer = styled(ScrollbarContainer)`
    overflow-y: overlay;
`;

const StyledDateLabel = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: ${({ theme }) =>
        theme.darkTheme ? "#060606" : "#f9f9f9"};
    color: #b1b1b1;
    font-weight: bold;
`;

const StyledEmail = styled.button`
    display: flex;
    width: 100%;
    padding-top: 15px;
    gap: 15px;
    padding-right: 30px;

    box-sizing: border-box;
    background-color: ${({ theme }) =>
        theme.darkTheme ? "#101010" : "#e6e6e6"};
        
    cursor: default;
    border: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--windows-text-color);
    font: unset;
    text-align: start;
    
    .icon {
        font-size: 16px;
    }

    :hover {
        background-color: #cccccc60;
    }

    &:focus {
        outline: none;
        border: none;
        background-color: #cccccc60;
    }

    ${({ isSelected }) =>
        isSelected &&
        css`
            box-shadow: inset 5px 0px 0px 0px var(--windows-color);
        `}
`;

const StyledEmailInfo = styled.div`
    overflow: hidden;
    width: 100%;

    .email-info {
        display: block;
        margin-bottom: 10px;
    }

    .email-sender-name {
        font-weight: bold;
    }

    .email-subject {
        color: var(--windows-color);
    }

    .email-content {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }
`;

const StyledProfileImg = styled.img`
    width: 33px;
    height: 33px;
    border-radius: 50%;
    border: 1px solid #000000;
    margin: 3px 0px 0px 15px;
`;

const StyledMailContent = styled(ScrollbarContainer)`
    flex: 1;
    overflow-y: overlay;
    background-color: ${({ theme }) =>
        theme.darkTheme ? "#262626" : theme.lightThemeBackgroundColor};
`;

const StyledEmailIcon = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10rem;
`;

const Mail = (props) => {
    const [emailContent, setEmailContent] = useState(false);

    const emailContainerRef = useRef(null);
    const scrollRef = useRef(null);
    const emailListRef = useRef(null);
    const windowsRef = useRef(null);

    const setMobileStyles = (width) => {
        if (width < 768) {
            emailContainerRef.current.style.cssText += `flex-direction: column`;
            emailListRef.current.style.cssText += `height: auto; width: 100%; border: none;`;
            scrollRef.current.style.cssText += `max-height: 200px;`;
        } else {
            emailContainerRef.current.style.cssText += `flex-direction: row`;
            emailListRef.current.style.cssText += `height: 100%; width: 400px;`;
            scrollRef.current.style.cssText += `max-height: initial;`;
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

    const handleEmailClick = (mail) => {
        if (emailContent && emailContent.id === mail.id) {
            setEmailContent(null);
        } else {
            setEmailContent(mail);
        }
    };

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
            <StyledContainerMail ref={emailContainerRef}>
                <StyledEmailList ref={emailListRef}>
                    <span className="mail-title">Inbox</span>
                    <StyledScrollContainer ref={scrollRef}>
                        <StyledDateLabel>Today</StyledDateLabel>
                        {MAILS_LIST.map((mail) => (
                            <StyledEmail
                                key={mail.id}
                                isSelected={emailContent?.id === mail.id}
                                onClick={() => handleEmailClick(mail)}
                            >
                                <StyledProfileImg src={mail.senderImg} />
                                <StyledEmailInfo>
                                    <span className="email-info email-sender-name">
                                        {mail.senderName}
                                    </span>
                                    <span className="email-info email-subject">
                                        {mail.subject}
                                    </span>
                                    <span className="email-info email-content">
                                        {mail.content}
                                    </span>
                                </StyledEmailInfo>
                            </StyledEmail>
                        ))}
                    </StyledScrollContainer>
                </StyledEmailList>
                <StyledMailContent>
                    {emailContent ? (
                        <MailContent {...emailContent} />
                    ) : (
                        <StyledEmailIcon>
                            <FontAwesomeIcon
                                className="windows-text"
                                icon={faEnvelope}
                            />
                        </StyledEmailIcon>
                    )}
                </StyledMailContent>
            </StyledContainerMail>
        </Window>
    );
};

export default Mail;
