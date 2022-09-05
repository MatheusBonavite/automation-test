import styled from "@emotion/styled";

const StyledTable = styled.table`
    & {
        td,
        th {
            border: 1px solid #999;
            padding: 0.5em;
            width: 20em;
        }
        td:nth-of-type(3n) {
            width: auto;
            color: var(--error-color);
            font-weight: bold;
            border: none;
            cursor: pointer;
        }
        margin: 2em;
    }
`;

export { StyledTable };
