import { FunctionComponent } from "react";
import { ButtonStyled } from "./buttonForm.style";

type FormButtonProps = {
    title?: string;
    type?: "submit" | "button" | "reset" | undefined;
    margin?: string;
    onClick?: () => void;
};

const FormButton: FunctionComponent<FormButtonProps> = ({
    title = "Press me!",
    type = "submit",
    margin,
    onClick = () => {},
}) => {
    return (
        <ButtonStyled
            type={type}
            data-testid="login-form-button"
            onClick={onClick}
            margin={margin}>
            {title}
        </ButtonStyled>
    );
};

export { FormButton };
