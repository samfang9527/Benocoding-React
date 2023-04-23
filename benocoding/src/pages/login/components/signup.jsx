
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { PRODUCTION_BACKEND_API_URL, GITHUB_CLIENT_ID } from "../../../global/constant.js";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import { Divider } from "@mui/material";
import { BsGithub } from "react-icons/bs";

const slideInFromRight = keyframes`
  from {
    transform: translateX(10%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SignUpContainer = styled.div`
    width: 50%;
    position: relative;
    left: 50%;
    margin-left: -25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${props => props.isSignIn ? '' : slideInFromRight} 0.3s ease-in-out;
`;

const InputBlock = styled.div`
    width: 95%;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextInput = styled.input`
    width: 100%;
    height: 50px;
    margin-top: 10px;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: Gainsboro;

    :focus {
        width: 110%;
        height: 60px;
        transition: ease-in-out, width .2s ease-in-out;
    }
`;

const SignUpBtn = styled.button`
    width: 95%;
    height: 50px;
    background-color: DarkSlateGray;
    color: white;
    border: none;
    cursor: pointer;
    margin: 10px 0;
    font-size: 18px;
    border-radius: 10px;

    :hover {
        background-color: black;
    }
`;

const SignInBtn = styled.button`
    width: 95%;
    height: 50px;
    background-color: DarkSalmon;
    color: white;
    border: none;
    cursor: pointer;
    margin: 20px 0 10px 0;
    font-size: 18px;
    border-radius: 10px;

    :hover {
        background-color: Salmon;
    }
`;

const CustomDivider = styled(Divider)`
    width: 95%;
    margin: 30px 0px;
    font-size: 16px;
    font-family: robot;
    color: gray;
`;

async function signUp(username, email, password) {

    const graphqlMutation = {
        query: `
            mutation($data: UserData!) {
                signup(data: $data) {
                    statusCode,
                    responseMessage,
                    jwt
                }
            }
        `,
        variables: {
            data: {
                username: username,
                email: email,
                password: password
            }
        }
    }

    try {
        const { data } = await axios({
            url: PRODUCTION_BACKEND_API_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: graphqlMutation        
        })
        return data;

    } catch(err) {
        throw new Error(err);
    }
}


const SignUp = ({isSignIn, setIsSignIn}) => {

    const [ signUpFail, setSignUpFail ] = useState(false);
    const [ signUpSuccess, setSignUpSucess ] = useState(false);
    const [ message, setMessage ] = useState('');

    function handleSignUp(e) {
        e.preventDefault();

        const username = document.getElementById('name-input').value;
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('pwd-input').value;

        signUp(username, email, password)
            .then(response => {
                const { signup } = response.data;
                if ( signup.statusCode !== 200 ) {
                    setSignUpFail(true);
                    setSignUpSucess(false);
                    setMessage(signup.responseMessage);
                    return;
                }

                // put jwt at localstorage
                window.localStorage.setItem("jwt", signup.jwt);
                setSignUpFail(false);
                setSignUpSucess(true);
                setTimeout(() => {
                    window.location.assign('/');
                }, 1000)
            })
            .catch(err => {
                setSignUpFail(true);
                setSignUpSucess(false);
                setMessage('System error, please try again later');
            })
    }

    async function handleGitHubSignUp(e) {
        e.preventDefault();
        window.open(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`, "_blank");
    }

    return (
        <SignUpContainer isSignIn={isSignIn}>
            <InputBlock>
                <TextInput type="text" id="name-input" name="username" minLength={2} maxLength={16} placeholder="Username"></TextInput>    
            </InputBlock>
            <InputBlock>
                <TextInput type="email" id="email-input" name="email" placeholder="Email"></TextInput>    
            </InputBlock>
            <InputBlock>
                <TextInput type="password" id="pwd-input" name="password" minLength={8} maxLength={20} placeholder="Password"></TextInput>    
            </InputBlock>
            {signUpFail ? <Alert severity="error" sx={{
                width: "95%"
            }}>{message}</Alert> : ''}
            {signUpSuccess ? <Alert severity="success" sx={{
                width: "95%"
            }}>Successfully sign up 🍀</Alert> : ''}
            <SignUpBtn onClick={handleSignUp}>Signup</SignUpBtn>
            <CustomDivider>or</CustomDivider>
            <SignUpBtn onClick={handleGitHubSignUp} style={{marginBottom: "20px"}}><BsGithub size={22} style={{margin: "0 5px 0 0"}}/>Signup with github</SignUpBtn>
            <CustomDivider></CustomDivider>
            <SignInBtn onClick={() => setIsSignIn(true)}>← back to login</SignInBtn>
        </SignUpContainer>
    )
}

export default SignUp;