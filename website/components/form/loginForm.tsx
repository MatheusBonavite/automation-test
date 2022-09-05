import { NextRouter, useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { FormButton } from "../formButton/buttonForm";
import { Modal } from "../modal/modal";
import { StyledForm } from "./loginForm.style";
import {
    passwordInRange,
    passwordOnlyAllowedValues,
    usernameInRange,
    usernameOnlyAllowedValues,
    validatePassword,
    validateUserName,
} from "./loginForm.utils";

type LoginFormProps = {
    title?: string;
};

const LoginForm: FunctionComponent<LoginFormProps> = ({ title = "Login" }) => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayUsernameTip, setDisplayUsernameTip] = useState(false);
    const [displayPasswordTip, setDisplayPasswordTip] = useState(false);
    const [modalOpen, setModalOpen] = useState("");

    useEffect(() => {
        if (username) {
            setDisplayUsernameTip(!validateUserName(username));
        } else {
            setDisplayUsernameTip(false);
        }
    }, [username]);

    useEffect(() => {
        if (password) {
            setDisplayPasswordTip(!validatePassword(password));
        } else {
            setDisplayPasswordTip(false);
        }
    }, [password]);

    useEffect(() => {
        if (document) {
            const form = document.getElementById("login-form");
            form?.addEventListener("submit", (e) =>
                submitEvent(e, setModalOpen, router)
            );
            return () => {
                form?.removeEventListener("submit", (e) =>
                    submitEvent(e, setModalOpen, router)
                );
            };
        }
    }, [router]);

    return (
        <StyledForm id="login-form" data-testid="login-form">
            <div className="title">{title}</div>
            <div className="username-wrapper">
                <label htmlFor="login-form-username">User Name: </label>
                <br />
                <input
                    id="login-form-username"
                    name="login-form-username"
                    type="text"
                    data-testid="login-form-username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                {displayUsernameTip && (
                    <div>
                        <span
                            style={{
                                color: `${
                                    usernameOnlyAllowedValues(username)
                                        ? "var(--success-color)"
                                        : "var(--error-color)"
                                }`,
                            }}>
                            Allowed values: A-Z, a-z, 0-9
                        </span>
                        <br />
                        <span
                            style={{
                                color: `${
                                    usernameInRange(username)
                                        ? "var(--success-color)"
                                        : "var(--error-color)"
                                }`,
                            }}>
                            Should have 5-10 characters
                        </span>
                    </div>
                )}
            </div>
            <div className="password-wrapper">
                <label htmlFor="login-form-password">Password: </label>
                <br />
                <input
                    id="login-form-password"
                    name="login-form-password"
                    type="password"
                    data-testid="login-form-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                {displayPasswordTip && (
                    <div>
                        <span
                            style={{
                                color: `${
                                    passwordOnlyAllowedValues(password)
                                        ? "var(--success-color)"
                                        : "var(--error-color)"
                                }`,
                            }}>
                            Allowed values: a-z
                        </span>
                        <br />
                        <span
                            style={{
                                color: `${
                                    passwordInRange(password)
                                        ? "var(--success-color)"
                                        : "var(--error-color)"
                                }`,
                            }}>
                            Should have 6 characters
                        </span>
                    </div>
                )}
            </div>
            <FormButton />
            <Modal open={modalOpen} openStateHandler={setModalOpen} />
        </StyledForm>
    );
};

function submitEvent(
    e: Event,
    setModalOpen: (setState: string) => void,
    router: NextRouter
) {
    e.preventDefault();
    const form = document.getElementById("login-form");
    const data = new FormData(form as HTMLFormElement);
    const formname = data?.get("login-form-username") as string;
    const formpassword = data?.get("login-form-password") as string;

    if (
        formname &&
        validateUserName(formname) &&
        formpassword &&
        validatePassword(formpassword)
    ) {
        fetch(`http://localhost:3000/api/getUsers?name=${formname}`)
            .then((response) => response?.json() || "")
            .then((data) => {
                if (!data || !data?.user_id || data?.user_name !== formname) {
                    setModalOpen("User not found!");
                } else if (
                    data?.user_id &&
                    data?.user_password !== formpassword
                ) {
                    setModalOpen("Password does not match!");
                } else {
                    router.push("/choose-function");
                }
            })
            .catch((err) => {
                setModalOpen(String(err));
                console.log("err >>> ", err);
            });
    } else {
        setModalOpen("Make input corrections, based on the tip!");
    }
}

export { LoginForm };
