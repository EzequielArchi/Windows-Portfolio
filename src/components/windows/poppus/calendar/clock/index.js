import React, { useLayoutEffect, useRef } from "react";
import styled, { css } from "styled-components";

const StyledClock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 20px 0;
    padding-left: 26px;
    border-bottom: 1px solid ${({ theme }) =>
        theme.startAndTaskbar ? `#f5f5f5` : css`var(--windows-section-inverted-color)`};
    box-sizing: border-box;
`;

const StyledTime = styled.span`
    font-size: 40px;
    width: fit-content;
`;

const StyledDate = styled.span`
    width: fit-content;
    font-size: 14px;
    color: var(--windows-color);
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    :hover {
        opacity: 0.75;
    }
`;

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Clock = (props) => {
    const { onDateClick } = props;

    const timeRef = useRef(null);
    const dateRef = useRef(null);

    useLayoutEffect(() => {
        const checkNumberFormat = (number) => {
            return number.padStart(2, "0");
        };

        const updateDateTime = () => {
            if (!timeRef.current || !dateRef.current) return;
            const currentDate = new Date();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();

            hours = checkNumberFormat(hours.toString());
            minutes = checkNumberFormat(minutes.toString());
            seconds = checkNumberFormat(seconds.toString());

            const dayName = weekdays[currentDate.getDay()];
            const dayNumber = currentDate.getDate();
            const monthName = months[currentDate.getMonth()];
            const year = currentDate.getFullYear();

            timeRef.current.innerText = `${hours}:${minutes}:${seconds}`;
            dateRef.current.innerText = `${dayName}, ${monthName} ${dayNumber} ${year}`;

            setTimeout(() => updateDateTime(), 100);
        };
        updateDateTime();
    }, []);

    return (
        <StyledClock>
            <StyledTime ref={timeRef} />
            <StyledDate onClick={onDateClick} ref={dateRef} />
        </StyledClock>
    );
};

export default Clock;
