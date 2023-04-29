import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useLayoutEffect, useState } from "react";
import styled, { css } from "styled-components";
import Clock from "./clock";
import { useDispatch, useSelector } from "react-redux";
import { toggleCalendar } from "../../../../store/slices/popups";
import Popup from "../../../common/popup";
import { shadeColor } from "../../../../common/colorCommonFunctions";

const StyledCalendar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Segoe UI", "Roboto", sans-serif;
    user-select: none;
    width: 350px;
    padding: 10px 10px 40px 10px;
    -webkit-tap-highlight-color: transparent;

    background-color: ${({ theme }) =>
        theme.startAndTaskbar
            ? shadeColor(theme.windowsColor, -60)
            : css`var(--windows-section-color)`};

    color: ${({ theme }) =>
        theme.startAndTaskbar ? `#f5f5f5` : css`var(--windows-text-color)`};

    @media (max-width: 480px) {
        width: 294px;
    }
`;

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 16px 0;
    box-sizing: border-box;
    padding-inline: 10px 16px;

    @media (max-width: 480px) {
        padding-inline: 5px 10px;
    }
`;

const StyledMonth = styled.div`
    font-size: 14px;
`;

const StyledArrow = styled.div`
    display: inline;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 0.75;
    }

    &:active {
        transform: scale(0.9);
    }

    :last-child {
        margin-left: 30px;
    }

    @media (max-width: 480px) {
        :last-child {
            margin-left: 26px;
        }
    }
`;

const StyledWeekdays = styled.div`
    display: flex;
    width: 100%;
`;

const StyledWeekday = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
`;

const StyledDays = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 10px;
`;

const StyledDay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    font-size: 16px;
    cursor: default;
    transition: box-shadow 0.2s ease-in-out;

    @media (max-width: 480px) {
        width: 42px;
        height: 42px;
    }

    &:hover {
        box-shadow: 0px 0px 0px 1px
            ${({ theme }) =>
                theme.startAndTaskbar
                    ? "#ffffff"
                    : css`var(--windows-section-inverted-color)`};
    }

    &.disabled {
        opacity: 0.5;
    }

    &.today {
        background-color: #0078d7;
        color: #ffffff;
        font-weight: bold;
    }
`;

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

const isSameDate = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getYear() === date2.getYear()
    );
};

const Calendar = (props) => {
    const [date, setDate] = useState(new Date());
    const [isTodayDate, setIsTodayDate] = useState(true);

    const dateDay = date.getDate();

    const dispatch = useDispatch();

    const showCalendar = useSelector(({ popups }) => popups.showCalendar);

    const handlePrevMonthClick = () => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() - 1);
        setIsTodayDate(isSameDate(new Date(), newDate));
        setDate(newDate);
    };

    const handleNextMonthClick = () => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + 1);
        setIsTodayDate(isSameDate(new Date(), newDate));
        setDate(newDate);
    };

    const getMonthDays = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayIndex = () => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        return firstDay.getDay();
    };

    const handleDateClick = () => {
        setDate(new Date());
        setIsTodayDate(true);
    };

    const renderDays = () => {
        const totalDays = getMonthDays(date.getMonth(), date.getFullYear());
        const prevMonthDays = getMonthDays(
            date.getMonth() - 1,
            date.getFullYear()
        );
        const days = [];

        for (let i = getFirstDayIndex(); i > 0; i--) {
            days.push(
                <StyledDay key={`prev${i}`} className="disabled">
                    {prevMonthDays - i + 1}
                </StyledDay>
            );
        }

        for (let i = 1; i <= totalDays; i++) {
            const currentDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                i
            );
            const today = new Date();

            days.push(
                <StyledDay
                    key={`current${i}`}
                    className={`${
                        currentDate.toDateString() === today.toDateString()
                            ? "today"
                            : ""
                    }`}
                >
                    {i}
                </StyledDay>
            );
        }

        for (let i = 1; days.length < 42; i++) {
            days.push(
                <StyledDay key={`next${i}`} className="disabled">
                    {i}
                </StyledDay>
            );
        }

        return days;
    };

    const handleClickAway = (event) => {
        if (event.target.closest("#date-time-taskbar")) return;
        if (showCalendar) dispatch(toggleCalendar());
    };

    useLayoutEffect(() => {
        const updateDate = () => {
            const today = new Date();
            if (isTodayDate && today.getDate() !== dateDay) {
                setDate(today);
            }
            setTimeout(() => updateDate(), 100);
        };

        updateDate();
    }, [dateDay, isTodayDate]);

    return (
        <Popup
            show={showCalendar}
            style={{ bottom: 0, right: 0 }}
            onClickAway={handleClickAway}
        >
            <StyledCalendar className="notranslate">
                <Clock onDateClick={handleDateClick} />
                <StyledHeader>
                    <StyledMonth>
                        {months[date.getMonth()]} {date.getFullYear()}
                    </StyledMonth>
                    <div>
                        <StyledArrow
                            onClick={handlePrevMonthClick}
                            title="Previous month"
                        >
                            <FontAwesomeIcon icon={faChevronUp} />
                        </StyledArrow>
                        <StyledArrow
                            onClick={handleNextMonthClick}
                            title="Next month"
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </StyledArrow>
                    </div>
                </StyledHeader>
                <StyledWeekdays>
                    {weekdays.map((weekday) => (
                        <StyledWeekday key={weekday}>{weekday}</StyledWeekday>
                    ))}
                </StyledWeekdays>
                <StyledDays>{renderDays()}</StyledDays>
            </StyledCalendar>
        </Popup>
    );
};

export default Calendar;
