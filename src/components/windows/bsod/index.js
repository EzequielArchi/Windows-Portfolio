import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import QRCode from "../../../assets/images/bsod/QR-Code.png";

const StyledBSODContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    cursor: default;
    user-select: none;
`;

const StyledError = styled.div`
    width: 100%;
    height: 100%;
    background-color: #0078d7;
    display: flex;
    flex-direction: column;
    padding: 5% 15%;
    box-sizing: border-box;
    gap: 40px;
    color: #ffffff;

    @media (max-width: 768px) {
        padding: 15% 5%;
    }
`;

const StyledSadSmile = styled.span`
    font-size: 160px;

    @media (max-width: 768px) {
        font-size: 80px;
    }
`;
const StyledErrorText = styled.span`
    width: 100%;
    font-size: 30px;
    white-space: break-spaces;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const StyledErrorInformation = styled.span`
    display: flex;
    width: 100%;
    gap: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const StyledQRCode = styled.img`
    width: 95px;
    height: 95px;
    padding: 10px;
    background-color: #ffffff;
`;

const StyledContact = styled.span`
    font-size: 12px;
    opacity: 0.9;
    flex: 1;
    span {
        display: block;
        margin-bottom: 15px;
    }
`;

const BSOD = () => {
    const porcentageRef = useRef(null);

    useEffect(() => {
        const setPorcentage = (porcentage, time) => {
            if (!porcentageRef.current) return;
            
            setTimeout(() => {
                porcentageRef.current.innerText = `${porcentage}% complete`;
            }, time);
        }
        
        setPorcentage(25, 1500);

        setPorcentage(40, 2000);

        setPorcentage(69, 2250);

        setPorcentage(100, 2500);

        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }, []);

    return (
        <StyledBSODContainer>
            <StyledError>
                <StyledSadSmile>:(</StyledSadSmile>

                <StyledErrorText>
                    Your PC ran into a problem and needs to refresh the window.
                    We're just collecting some error info (I don't promise we're
                    going to do much with it), and then we'll reflesh for you.
                </StyledErrorText>

                <StyledErrorText
                    ref={porcentageRef}
                    className="notranslate"
                >
                    0% complete
                </StyledErrorText>

                <StyledErrorInformation>
                    <StyledQRCode src={QRCode}/>
                    <StyledContact>
                        <span>
                            If you call a support person, give them this info:
                        </span>
                        <span>Stop code: <b className="notranslate">SOMETHING_WENT_WRONG</b></span>
                    </StyledContact>
                </StyledErrorInformation>
            </StyledError>
        </StyledBSODContainer>
    );
};

export default BSOD;
