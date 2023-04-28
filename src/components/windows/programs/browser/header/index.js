import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faArrowRightLong,
    faGlobe,
    faHome,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";

const StyledHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 60px;
    padding: 0 20px;
    background-color: ${({ theme }) =>
        theme.darkTheme ? "#242424" : "#efefef"};
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);

    .header-icon {
        color: ${({ theme }) => (theme.darkTheme ? "#ffffff" : "#424242")};
    }
`;

const StyledHeaderButton = styled.button`
    height: 30px;
    width: 30px;
    border: none;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    font-size: 18px;
    border-radius: 50%;
    transition: background-color 0.5s;

    &:not([disabled]):hover {
        background-color: ${({ theme }) =>
            theme.darkTheme ? "#cccccc60" : "#00000020"};
    }
    &:disabled {
        cursor: auto;
        color: #cccccc;
    }

    &:focus {
        outline: none;
        border: none;
        background-color: ${({ theme }) =>
            theme.darkTheme ? "#cccccc60" : "#00000020"};
    }
`;

const StyledInputContainer = styled.div`
    position: relative;
    flex: 1;
    margin-right: 10px;
    padding-inline: 35px 40px;
    border-radius: 15px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.darkTheme && "#424242"};

    .left-icon {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(10px, -50%);
        pointer-events: none;
    }

    .right-icon {
        position: absolute;
        top: 50%;
        right: 0%;
        width: 40px;
        border-radius: 45%;
        transform: translate(0px, -50%);
    }

    &:focus-within {
        box-shadow: 0px 0px 0px 2px var(--windows-color);
    }
`;

const StyledHeaderInput = styled.input`
    width: 100%;
    height: 30px;
    font-size: 14px;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.darkTheme && "#ffffff"};
`;

function isUrl(text) {
    // This regex matches most common URL patterns, but not all possible ones
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(text);
}

const BrowserHeader = forwardRef((props, ref) => {
    const {
        canGoBack,
        canGoForward,
        onBack,
        onForward,
        onReload,
        onGoHome,
        onSearch,
        initPage,
    } = props;
    const [searchValue, setSearchValue] = useState(initPage);

    const getGoogleSearch = (searchQuery) => {
        const encodedQuery = encodeURIComponent(searchQuery);
        return `https://www.google.com/search?q=${encodedQuery}&igu=1`;
    };

    const handleSearch = (query) => {
        if (!query) return;
        if (isUrl(query)) {
            onSearch(query);
        } else {
            onSearch(getGoogleSearch(query));
        }
    };

    useImperativeHandle(ref, () => ({
        setSearchUrl: (url) => setSearchValue(url),
    }));

    return (
        <StyledHeaderContainer>
            <StyledHeaderButton
                className="header-icon"
                onClick={onBack}
                disabled={!canGoBack}
                title="Go to the previous page"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </StyledHeaderButton>

            <StyledHeaderButton
                className="header-icon"
                onClick={onForward}
                disabled={!canGoForward}
                title="Go to the next page"
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </StyledHeaderButton>

            <StyledHeaderButton className="header-icon" onClick={onReload} title="Reload page">
                <FontAwesomeIcon icon={faRefresh} />
            </StyledHeaderButton>

            <StyledHeaderButton className="header-icon" onClick={onGoHome} title="Go to homepage">
                <FontAwesomeIcon icon={faHome} />
            </StyledHeaderButton>

            <StyledInputContainer className="input-container">
                <FontAwesomeIcon
                    className="header-icon left-icon"
                    icon={faGlobe}
                />

                <StyledHeaderButton
                    className="header-icon right-icon"
                    onClick={() => handleSearch(searchValue)}
                    title="Go to page"
                >
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </StyledHeaderButton>

                <StyledHeaderInput
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(searchValue);
                        }
                    }}
                />
            </StyledInputContainer>
        </StyledHeaderContainer>
    );
});

export default BrowserHeader;
