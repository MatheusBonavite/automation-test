import styled from "@emotion/styled";

const StyledForm = styled.form`
    & {
        display: flex;
        width: 25em;
        height: 30em;
        padding: 2em 1em;
        align-items: center;
        border-radius: 25px;
        flex-direction: column;
        justify-content: center;
        border: 1px solid var(--principal-color);
        border-bottom: 2px solid var(--principal-color);
        border-right: 2px solid var(--principal-color);

        div {
            width: 100%;
            margin: 0.5em 0;
        }

        div:nth-of-type(1) {
            margin-bottom: 1em;
            text-align: center;
        }

        input {
            width: 100%;
            border: 0;
            border-bottom: 1px solid var(--secondary-color);
            &:focus {
                outline: none;
                animation-delay: 0.1s;
                animation-duration: 0.25s;
                animation-fill-mode: both;
                animation-name: active-input;
            }
        }

        label,
        .title {
            font-family: Montserrat, sans-serif;
            font-weight: 600;
        }
    }

    @keyframes active-input {
        0% {
            border-bottom: 1px solid var(--secondary-color);
        }
        25% {
            border-bottom: 2px solid var(--secondary-color);
        }
        50% {
            border-bottom: 3px solid var(--secondary-color);
        }
        75% {
            border-bottom: 4px solid var(--secondary-color);
        }
        100% {
            border-bottom: 5px solid var(--secondary-color);
        }
    }
`;

export { StyledForm };
