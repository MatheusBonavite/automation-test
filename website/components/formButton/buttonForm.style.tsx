import styled from "@emotion/styled";

const ButtonStyled = styled.button<{
    margin?: string;
}>`
    & {
        margin: ${(props) => (props?.margin ? props.margin : "1em 0 0 0")};
        width: 13.24em;
        height: 4em;
        border-radius: 11.76em;
        background-color: var(--secondary-color);
        cursor: pointer;
        border: 0;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        color: var(--white);

        &:hover {
            background: 0 0;
            border: 2px solid var(--secondary-color);
            color: var(--secondary-color);
        }
    }
`;

export { ButtonStyled };
