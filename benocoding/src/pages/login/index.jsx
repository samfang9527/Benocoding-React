
import styled from "styled-components";
import { useState } from "react";
import SignIn from "./components/signin";
import SignUp from "./components/signup";

const Main = styled.main`
    width: 90%;
    height: 80%;
    position: relative;
    left: 50%;
    margin-left: -45%;
`;

const Form = styled.form`
    width: 100%;
    margin-top: 10%;
`;

const SignInBtn = styled.button`
    width: 25%;
    height: 100px;
    position: relative;
    left: 50%;
    margin-left: -25%;
    border: none;
    background-color: MediumSeaGreen;
    color: white;
    font-size: 34px;
    padding: 0 50px;
    cursor: pointer;
`;

const SignUpBtn = styled.button`
    width: 25%;
    height: 100px;
    position: relative;
    left: 50%;
    border: none;
    background-color: #434343ff;
    color: white;
    font-size: 34px;
    cursor: pointer;
`;

const Login = () => {

    const [isSignIn, setIsSignIn] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);

    function chooseSignIn(e) {
        e.preventDefault();
        setIsSignIn(true);
        setIsSignUp(false);
    }

    function chooseSignUp(e) {
        e.preventDefault();
        setIsSignIn(false);
        setIsSignUp(true);
    }

    return (
        <Main>
            <Form>
                <SignInBtn
                onClick={chooseSignIn}
                style={
                    {
                        backgroundColor: isSignIn ? "MediumSeaGreen" : "#434343ff",
                    }
                }>Sign-In</SignInBtn>
                <SignUpBtn
                onClick={chooseSignUp}
                style={
                    {
                        backgroundColor: isSignUp ? "MediumSeaGreen" : "#434343ff",
                    }
                }>Sign-Up</SignUpBtn>
                <>{isSignIn ? <SignIn /> : <SignUp />}</>
            </Form>
        </Main>
    )
}

export default Login;