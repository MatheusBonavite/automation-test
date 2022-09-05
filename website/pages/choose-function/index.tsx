import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormButton } from "../../components/formButton/buttonForm";

const Home: NextPage = () => {
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
            <FormButton
                title="List Users"
                onClick={() => router.push("/list-users")}
            />
            <FormButton title="Logout" onClick={() => router.push("/")} />
        </div>
    );
};

export default Home;
