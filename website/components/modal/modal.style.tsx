import styled from "@emotion/styled";

const ModalStyle = styled.div`
    & {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
    }
`;

export { ModalStyle };
