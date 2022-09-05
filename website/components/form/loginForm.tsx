import {
    passwordInRange,
    passwordOnlyAllowedValues,
    usernameInRange,
    usernameOnlyAllowedValues,
    validatePassword,
    validateUserName,
} from "@functions";
import { NextRouter, useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { FormButton } from "../formButton/buttonForm";
import { Modal } from "../modal/modal";
import { StyledForm } from "./loginForm.style";

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

    const [rememberUser, setRememberUser] = useState(false);

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

    useEffect(() => {
        if (document?.cookie && document?.cookie?.includes("remember=")) {
            setRememberUser(true);
        }
    }, []);
    return (
        <StyledForm id="login-form" data-testid="login-form">
            <div className="title">{title}</div>
            <div
                className="username-wrapper"
                style={{ display: `${rememberUser ? "none" : "block"}` }}>
                <label htmlFor="login-form-username">User Name: </label>
                <br />
                <input
                    id="login-form-username"
                    name="login-form-username"
                    type="text"
                    data-testid="login-form-username"
                    required={!rememberUser}
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
            <div
                className="password-wrapper"
                style={{ display: `${rememberUser ? "none" : "block"}` }}>
                {/* style={{display: "none"}} */}
                <label htmlFor="login-form-password">Password: </label>
                <br />
                <input
                    id="login-form-password"
                    name="login-form-password"
                    type="password"
                    data-testid="login-form-password"
                    required={!rememberUser}
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
            <div>
                <input
                    id="remember-me"
                    type="checkbox"
                    name="remember-me"
                    value="remember-me"
                    data-testid="remember-me"
                    style={{ width: "auto", cursor: "pointer" }}
                />
                <label htmlFor="remember-me">Remember me? </label>
            </div>
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
                    addCookie(`user=${data.user_name}`);
                    if (
                        (
                            document?.getElementById(
                                "remember-me"
                            ) as HTMLInputElement
                        )?.checked
                    ) {
                        addCookie(`remember=${data.user_name}`);
                    }
                    router.push("/choose-function");
                }
            })
            .catch((err) => {
                setModalOpen(String(err));
                console.log("err >>> ", err);
            });
    } else {
        console.log("ahhh >>> ", document?.cookie);
        if (document?.cookie && document?.cookie?.includes("remember=")) {
            const name = getCookie("remember");
            console.log("name >>> ", name);
            if (name) {
                if (
                    !(
                        document?.getElementById(
                            "remember-me"
                        ) as HTMLInputElement
                    )?.checked
                ) {
                    console.log("SHOULD EXPIRE!");
                    expireCookie("remember=matheus", 1);
                }
                addCookie(`user=${name}`);
                router.push("/choose-function");
            } else {
                expireCookie("remember=matheus", 1);
                window.location.href = "/";
            }
        } else {
            setModalOpen("Make input corrections, based on the tip!");
        }
    }
}

function addCookie(expression: string) {
    const PERSIST_IN_DAYS = 20 * 24 * 60;
    let d = new Date();
    d.setMinutes(d.getMinutes() + PERSIST_IN_DAYS);
    if (!document?.cookie?.includes(expression))
        document.cookie = `${expression}; expires=${d.toUTCString()}`;
}

function expireCookie(expression: string, seconds: number = 0) {
    let d = new Date();
    d.setSeconds(d.getSeconds() + seconds);
    if (document?.cookie?.includes(expression))
        document.cookie = `${expression}; expires=${d.toUTCString()}`;
}

function getCookie(cookieName: string) {
    const pattern = new RegExp(`(?<=${cookieName}=).*`, "gm");
    console.log("pattern ::: ", pattern);
    console.log("pattern match ::: ", document?.cookie?.match(pattern));
    return document?.cookie?.match(pattern)?.[0]?.split(";")?.[0];
}

export { LoginForm };
