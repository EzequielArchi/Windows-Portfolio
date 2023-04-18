import styled from "styled-components";

const ScrollbarContainer = styled.div`
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: #aeaeae;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #949494;
    }
`;

export default ScrollbarContainer;
