import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormButton } from "../../components/formButton/buttonForm";

const Home: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (document) {
            if (!document?.cookie?.includes("user=")) {
                router.push("/");
            }
        }
    }, [router]);

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
                dataTestId="list-users-button"
            />
            <FormButton
                title="Logout"
                onClick={() => {
                    expireCookie(`user=logout`);
                    router.push("/");
                }}
                dataTestId="logout-from-choose-function"
            />
        </div>
    );
};

function expireCookie(expression: string) {
    let d = new Date();
    if (!document?.cookie?.includes(expression))
        document.cookie = `${expression}; expires=${d.toUTCString()}`;
}

export default Home;
