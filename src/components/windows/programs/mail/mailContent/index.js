import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

const StyledForm = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: Segoe UI, Tahoma, sans-serif;
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
`;

const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid var(--windows-section-inverted-color);
    padding-block: 10px;
`;

const StyledMailOptions = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`;

const StyledMailOption = styled.button`
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: default;
    border: none;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    color: var(--windows-text-color);
    font: unset;
    
    &:hover {
        background-color: ${({ theme }) =>
            theme.darkTheme ? "#cccccc60" : "#00000020"};
    }

    &:focus {
        outline: none;
        border: none;
        background-color: ${({ theme }) =>
            theme.darkTheme ? "#cccccc60" : "#00000020"};
    }

    ${({ disabled }) =>
        disabled &&
        css`
            pointer-events: none;
            opacity: 0.7;
        `}
`;

const StyledEmailText = styled.span`
    font-size: 16px;
    margin-right: 10px;
`;

const StyledEmailContent = styled.pre`
    flex: 1;
    width: 100%;
    padding-top: 10px;
    font-family: Segoe UI, Tahoma, sans-serif;
    white-space: pre-wrap;
`;

const MailContent = (props) => {
    const { senderName, from, content, subject, disabledReply } = props;
    const onClickReply = () => {
        const encodedSubject = encodeURIComponent(subject);
        const encodedContent = encodeURIComponent(
            "\n".repeat(5) + `${senderName} wrote:\n\n${content}\n\n`
        );

        window.open(
            `mailto:${from}?subject=Re%20-%20${encodedSubject}&body=${encodedContent}`
        );
    };

    return (
        <StyledForm className="windows-text">
            <StyledMailOptions>
                <StyledMailOption
                    disabled={disabledReply}
                    onClick={onClickReply}
                >
                    <FontAwesomeIcon icon={faReply} />
                    <span>Reply</span>
                </StyledMailOption>
            </StyledMailOptions>

            <StyledInputContainer>
                <StyledEmailText>From:</StyledEmailText>
                <StyledEmailText>{from}</StyledEmailText>
            </StyledInputContainer>

            <StyledInputContainer>
                <StyledEmailText>Subject:</StyledEmailText>
                <StyledEmailText>{subject}</StyledEmailText>
            </StyledInputContainer>

            <StyledEmailContent>{content}</StyledEmailContent>
        </StyledForm>
    );
};

export default MailContent;
