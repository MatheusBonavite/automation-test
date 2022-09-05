import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormButton } from "../../components/formButton/buttonForm";
import { UserTable } from "../../components/userTable/userTable";

type ListUsersPage = {
    users: any;
};

const Home: NextPage<ListUsersPage> = ({ users }) => {
    const router = useRouter();
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
                />
                <FormButton
                    title="Logout"
                    onClick={() => router.push("/")}
                    margin="0 0 0 1em"
                />
                <FormButton title="Add User" margin="0 0 0 1em" />
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const data = await fetch(`http://localhost:3000/api/getUsers`)
        .then((response) => response?.json() || "")
        .then((data) => data);
    return { props: { users: data } };
}
export default Home;
