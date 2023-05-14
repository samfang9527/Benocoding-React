
import styled from "styled-components";
import { useState } from "react";
import SignIn from "./components/signin";
import SignUp from "./components/signup";

const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 700px;
`;

const Form = styled.form`
    width: 80%;
    margin-top: 5%;
    border-radius: 20px;
`;

const Title = styled.div`
    text-align: center;
    font-size: 40px;
    margin: 20px;
`;

const Login = () => {

    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <Main>
            <Form>
                <Title>{ isSignIn ? "Login" : "Signup" }</Title>
                <>{isSignIn ? <SignIn isSignIn={isSignIn} setIsSignIn={setIsSignIn}/> : <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>}</>
            </Form>
        </Main>
    )
}

export default Login;