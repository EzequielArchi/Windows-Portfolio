import React, { useEffect, useRef } from "react";

const ClickAwayListener = (props) => {
    const { children, onClickAway } = props;
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickAway(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                onClickAway && onClickAway(event);
            }
        }
        window.addEventListener("mousedown", handleClickAway, true);
        window.addEventListener("touchstart", handleClickAway, {passive: true});
        return () => {
            window.removeEventListener("mousedown", handleClickAway, true);
            window.removeEventListener("touchstart", handleClickAway, {passive: true});
        };
    }, [onClickAway]);

    return <div ref={containerRef}>{children}</div>;
};

export default ClickAwayListener;
