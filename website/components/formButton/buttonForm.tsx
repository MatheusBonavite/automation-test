import { FunctionComponent } from "react";
import { ButtonStyled } from "./buttonForm.style";

type FormButtonProps = {
    title?: string;
    type?: "submit" | "button" | "reset" | undefined;
    margin?: string;
    dataTestId?: string;
    onClick?: () => void;
};

const FormButton: FunctionComponent<FormButtonProps> = ({
    title = "Press me!",
    type = "submit",
    margin,
    dataTestId = "login-form-button",
    onClick = () => {},
}) => {
    return (
        <ButtonStyled
            type={type}
            data-testid={dataTestId}
            onClick={onClick}
            margin={margin}>
            {title}
        </ButtonStyled>
    );
};

export { FormButton };
