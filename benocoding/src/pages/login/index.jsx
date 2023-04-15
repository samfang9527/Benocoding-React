
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
    margin-top: 5%;
`;

const SignInBtn = styled.button`
    width: 25%;
    height: 100px;
    position: relative;
    left: 50%;
    margin-left: -25%;
    border: none;
    background-color: #2F9C95;
    color: white;
    font-size: 34px;
    padding: 0 50px;
    cursor: pointer;
    border-radius: 2px;
`;

const SignUpBtn = styled.button`
    width: 25%;
    height: 100px;
    position: relative;
    left: 50%;
    border: none;
    background-color: #2F9C95;
    color: white;
    font-size: 34px;
    cursor: pointer;
    border-radius: 2px;
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
                        backgroundColor: isSignIn ? "#2F9C95" : "#2F9C95",
                        opacity: isSignIn ? "1" : "0.7"
                    }
                }>Sign-In</SignInBtn>
                <SignUpBtn
                onClick={chooseSignUp}
                style={
                    {
                        backgroundColor: isSignUp ? "#2F9C95" : "#2F9C95",
                        opacity: isSignUp ? "1" : "0.7"
                    }
                }>Sign-Up</SignUpBtn>
                <>{isSignIn ? <SignIn /> : <SignUp />}</>
            </Form>
        </Main>
    )
}

export default Login;