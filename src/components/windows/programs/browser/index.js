import React, { useCallback, useEffect, useRef, useState } from "react";
import Window from "../../../common/window";
import styled from "styled-components";
import BrowserHeader from "./header";
import { useDispatch } from "react-redux";
import { deleteProgram } from "../../../../store/slices/programs";

const StyledWindowCover = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

const StyledBrowser = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const StyledIframe = styled.iframe`
    user-select: none;
    border: none;
`;

const HOME_URL = "https://www.google.com/search?igu=1";

const Browser = (props) => {
    const { src = HOME_URL, ...rest } = props;

    const [history, setHistory] = useState([src]);
    const [pointer, setPointer] = useState(0);

    const dispatch = useDispatch();

    const iframeRef = useRef(null);
    const headerRef = useRef(null);

    const { instanceId, focusLevel, maxFocusLevel } = rest;

    const onBack = useCallback(() => {
        const newPointer = pointer - 1;
        setPointer(newPointer);

        redirectToPage(history[newPointer]);
    },[pointer, history]);

    const onForward = () => {
        const newPointer = pointer + 1;
        setPointer(newPointer);

        redirectToPage(history[newPointer]);
    };

    const onReload = () => {
        redirectToPage(history[pointer]);
    };

    const onGoHome = () => {
        updateHistory(HOME_URL);
        redirectToPage(HOME_URL);
    };

    const onSearch = (url) => {
        updateHistory(url);
        redirectToPage(url);
    };

    const updateHistory = (url) => {
        if (url === history.at(-1)) return;
        const currentHistory = history.slice(0, pointer + 1);
        const newHistory = [...currentHistory, url];
        setHistory(newHistory);
        setPointer(newHistory.length - 1);
    };

    const redirectToPage = (url) => {
        iframeRef.current.src = url;
        headerRef.current.setSearchUrl(url);
    };

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.code === "shutDown") {
                dispatch(deleteProgram(instanceId));
            }
        };

        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [dispatch, instanceId]);

    return (
        <Window {...rest}>
            <StyledBrowser>
                <BrowserHeader
                    canGoBack={pointer > 0}
                    canGoForward={history.length - 1 > pointer}
                    onBack={onBack}
                    onForward={onForward}
                    onReload={onReload}
                    onGoHome={onGoHome}
                    onSearch={onSearch}
                    initPage={history[0]}
                    ref={headerRef}
                />
                <StyledIframe
                    ref={iframeRef}
                    id={instanceId}
                    width="100%"
                    height="100%"
                    src={src}
                    title="Browser"
                    allow="autoplay"
                />
            </StyledBrowser>
            {maxFocusLevel !== focusLevel && <StyledWindowCover />}
        </Window>
    );
};

export default Browser;
