import React from "react";
import Window from "../../../common/window";
import Sliders from "../../../common/sliders";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import ReactLogo from "../../../../assets/images/welcome/React_Logo.png";
import ReduxLogo from "../../../../assets/images/welcome/Redux_Logo.png";
import FontawesomeLogo from "../../../../assets/images/welcome/Fontawesome_Logo.png";
import responsiveImage from "../../../../assets/images/welcome/Responsive-Design-Image.png";
import programsImage from "../../../../assets/images/welcome/Programs-Image.png";

const StyledSliders = styled.div`
    width: 100%;
    height: 100%;

    font-size: 30px;
    @media (max-width: 768px) {
        font-size: 20px;
    }

    .slide-00 {
        font-size: 40px !important;
    }

    .slide-00,
    .slide-01,
    .slide-02 {
        align-items: center;
        span {
            text-align: center;
        }
    }

    .slide-01 {
        img {
            margin-top: 25px;
            width: 280px;
            height: 280px;

            @media (max-width: 768px) {
                width: 180px;
                height: 180px;
            }
        }
    }

    .slide-02 {
        img {
            margin-top: 25px;
            width: 330px;
            height: 280px;

            @media (max-width: 768px) {
                width: 210px;
                height: 180px;
            }
        }
    }

    .slide-03 {
        ul {
            text-align: left;
            margin: 10px 0 0 0;
        }

        li {
            margin: 5px 0;
        }
    }

    .slide-04 {
        a {
            color: var(--windows-color);
            text-decoration: none;

            :visited {
                color: var(--windows-color);
            }
        }
    }
`;

const StyledSlide = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--windows-text-color);
    padding: 5%;
    box-sizing: border-box;
    user-select: none;
    cursor: default;
`;

const StyledWindowsLogo = styled.div`
    color: #0693e3;
    filter: drop-shadow(2px 2px 2px #12121280);

    font-size: 320px;

    @media (max-width: 768px) {
        font-size: 230px;
    }
`;

const StyledListTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    span {
        text-align: center;
        font-size: 40px;
        @media (max-width: 768px) {
            font-size: 30px;
        }
    }
    img {
        width: 310px;
        height: 270px;

        @media (max-width: 768px) {
            width: 210px;
            height: 180px;
        }
    }
`;

const StyledListItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    img {
        display: inline;
        width: 30px;
        height: 30px;
    }
`;

const WINDOW_MOBILE_MIN_SIZE = {
    width: 320,
    height: 570,
};

const WINDOW_MIN_SIZE =
    "ontouchstart" in window ? WINDOW_MOBILE_MIN_SIZE : undefined;

const Welcome = (props) => {
    const { focusLevel, maxFocusLevel } = props;

    const handleCloseWindow = () => {
        localStorage.setItem("sawWelcomeMessage", "1");
    };

    return (
        <Window {...props} minSize={WINDOW_MIN_SIZE} onClose={handleCloseWindow}>
            <StyledSliders>
                <Sliders
                    canSlide={focusLevel === maxFocusLevel}
                    axis={"ontouchstart" in window ? "y" : "x"}
                >
                    <StyledSlide className="slide-00">
                        <span>
                            Welcome to this Windows OS Frontend Project!
                        </span>
                        <StyledWindowsLogo>
                            <FontAwesomeIcon icon={faWindows} />
                        </StyledWindowsLogo>
                    </StyledSlide>
                    <StyledSlide className="slide-01">
                        <span>
                            This project features multiple programs that can be
                            opened in windows, these have the same
                            functionalities as in Windows OS. You can easily
                            navigate through different programs with this
                            responsive user-friendly interface.
                        </span>
                        <img src={responsiveImage} alt="" />
                    </StyledSlide>
                    <StyledSlide className="slide-02">
                        <span>
                            Each program has its own unique features and
                            functionalities, including a web browser, console,
                            configuration tool, resume viewer, email client, and
                            this powerpoint.
                        </span>
                        <img src={programsImage} alt="" />
                    </StyledSlide>
                    <StyledSlide className="slide-03">
                        <StyledListTitle>
                            <span>This project was developed with React</span>
                            <img src={ReactLogo} alt="" />
                        </StyledListTitle>
                        <span>Using the following libraries:</span>
                        <ul>
                            <li>
                                <StyledListItem>
                                    <span>Redux</span>
                                    <img src={ReduxLogo} alt="" />
                                </StyledListItem>
                            </li>
                            <li>
                                <StyledListItem>
                                    <span>Styled Components</span>
                                    <span>
                                        {"<"}💅{">"}
                                    </span>
                                </StyledListItem>
                            </li>
                            <li>
                                <StyledListItem>
                                    <span>Fontawesome Icons</span>
                                    <img src={FontawesomeLogo} alt="" />
                                </StyledListItem>
                            </li>
                        </ul>
                    </StyledSlide>
                    <StyledSlide className="slide-04">
                        <span>
                            I hope you enjoy visiting this project and please
                            don't hesitate to{" "}
                            <a href="mailto:lucianoarchidiacono@gmail.com">
                                contact me
                            </a>{" "}
                            if you have any questions or comments.
                        </span>
                        <br />
                        <span>Thank you for your time!</span>
                    </StyledSlide>
                </Sliders>
            </StyledSliders>
        </Window>
    );
};

export default Welcome;
