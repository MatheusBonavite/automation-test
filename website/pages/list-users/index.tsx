import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormButton } from "../../components/formButton/buttonForm";
import { UserTable } from "../../components/userTable/userTable";

type ListUsersPage = {
    users: any;
};

const Home: NextPage<ListUsersPage> = ({ users }) => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [needToAdd, setneedToAdd] = useState(false);

    useEffect(() => {
        if (document) {
            if (!document?.cookie?.includes("user=")) {
                router.push("/");
            }
        }
    }, [router]);
    console.log(username, password);
    return (
        <div
            className="form-wrapper"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column",
            }}>
            <div>
                <UserTable users={users} />
            </div>
            <div>
                <FormButton
                    title="Choose Function"
                    onClick={() => router.push("/choose-function")}
                    margin="0"
                    dataTestId="go-back-choose-function"
                />
                <FormButton
                    title="Logout"
                    onClick={() => {
                        expireCookie(`user=logout`);
                        router.push("/");
                    }}
                    dataTestId="logout-from-list-users"
                    margin="0 0 0 1em"
                />
                <FormButton
                    title="Add User"
                    margin="0 0 0 1em"
                    dataTestId="add-user-button"
                    onClick={() => setneedToAdd(true)}
                />
            </div>
            <div
                id="add-wrapper"
                className="add-wrapper"
                style={{
                    marginTop: "5em",
                    display: `${needToAdd ? "flex" : "none"}`,
                }}>
                <div>
                    <label htmlFor="add-username">Username: </label>
                    <br />
                    <input
                        id="add-username"
                        name="add-username"
                        type="text"
                        data-testid="add-username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div style={{ marginLeft: "1em" }}>
                    <label htmlFor="add-username">Password: </label>
                    <br />
                    <input
                        id="add-password"
                        name="add-password"
                        type="password"
                        data-testid="add-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ marginLeft: "1em" }}>
                    <FormButton
                        title="Add"
                        margin="0 0 0 1em"
                        dataTestId="add-user-button"
                    />
                </div>
            </div>
            <div
                style={{
                    marginTop: "5em",
                    display: `${needToAdd ? "block" : "none"}`,
                }}>
                <span>Rules:</span>
                <br />
                <ul>
                    <li>Username: Allowed values: A-Z, a-z, 0-9</li>
                    <li>Username: Should have 5-10 characters</li>
                    <li>Password: Allowed values: a-z</li>
                    <li>Password: Should have 6 characters</li>
                </ul>
            </div>
        </div>
    );
};

function expireCookie(expression: string) {
    let d = new Date();
    if (!document?.cookie?.includes(expression))
        document.cookie = `${expression}; expires=${d.toUTCString()}`;
}

export async function getServerSideProps() {
    const data = await fetch(`http://localhost:3000/api/getUsers`)
        .then((response) => response?.json() || "")
        .then((data) => data);
    return { props: { users: data } };
}
export default Home;
