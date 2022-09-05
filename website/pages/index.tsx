import type { NextPage } from "next"
import { LoginForm } from "../components/form/loginForm"

const Home: NextPage = () => {
    return (
        <div
            className="form-wrapper"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
            <LoginForm />
        </div>
    )
}

export default Home
