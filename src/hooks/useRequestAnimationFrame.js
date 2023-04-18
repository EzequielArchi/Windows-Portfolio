import { useLayoutEffect, useRef } from "react";

//Calls a callback to update an animation before the next repaint
const useRequestAnimationFrame = (callback, dependencyArray = []) => {
    const requestRef = useRef();

    useLayoutEffect(() => {
        const animate = () => {
            if (callback) callback();
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [callback, ...dependencyArray]);
};

export default useRequestAnimationFrame;