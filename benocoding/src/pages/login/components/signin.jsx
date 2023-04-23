
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { PRODUCTION_BACKEND_API_URL, GITHUB_CLIENT_ID } from "../../../global/constant.js";
import { useState, useContext } from "react";
import Alert from '@mui/material/Alert';
import { AuthContext } from "../../../global/authContext.jsx";
import Divider from '@mui/material/Divider';
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

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(10%);
    opacity: 0;
  }
`;

const SignInContainer = styled.div`
    width: 50%;
    position: relative;
    left: 50%;
    margin-left: -25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${props => props.isSignIn ? slideInFromRight : slideOutToRight} 0.5s ease-in-out;
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

const SignInBtn = styled.button`
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

const SignUpBtn = styled.button`
    width: 100%;
    height: 50px;
    background-color: DarkSalmon;
    color: white;
    border: none;
    cursor: pointer;
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

const SignUpContainer = styled.div`
    width: 95%;
`;

const SignUpQuestion = styled.p`
    margin: 10px 5px;
    text-align: left;
    color: blue;
`;


async function signIn(email, password) {

    const graphqlMutation = {
        query: `
            mutation($data: UserData!) {
                signin(data: $data) {
                    statusCode,
                    responseMessage,
                    jwt
                }
            }
        `,
        variables: {
            data: {
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


const SignIn = ({isSignIn, setIsSignIn}) => {

    const [ signinFail, setSignInFail ] = useState(false);
    const [ signinSuccess, setSignInSucess ] = useState(false);
    const [ message, setMessage ] = useState('');
    const authContext = useContext(AuthContext);

    function handleSignIn(e) {
        e.preventDefault();

        const email = document.getElementById('email-input').value;
        const password = document.getElementById('pwd-input').value;

        signIn(email, password)
            .then(response => {
                const { signin } = response.data;

                if ( signin.statusCode !== 200 ) {
                    setSignInFail(true);
                    setSignInSucess(false);
                    setMessage(signin.responseMessage);
                    return;
                }

                // put jwt at localstorage
                window.localStorage.setItem("jwt", signin.jwt);
                authContext.login(signin.jwt);
                setSignInFail(false);
                setSignInSucess(true);
                setTimeout(() => {
                    window.location.assign('/');
                }, 1000)
            })
            .catch(err => {
                console.error(err);
                setSignInFail(true);
                setSignInSucess(false);
                setMessage('System error, please try again later');
            }) 
    }

    async function handleGitHubSignIn(e) {
        e.preventDefault();
        window.open(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`, "_blank");
    }

    return (
        <SignInContainer isSignIn={isSignIn}>
            <InputBlock>
                <TextInput type="text" id="email-input" name="email" placeholder="Email"></TextInput>    
            </InputBlock>
            <InputBlock>
                <TextInput type="password" id="pwd-input" name="password" placeholder="Password"></TextInput>    
            </InputBlock>
            {signinFail ? <Alert severity="error" sx={{
                width: "95%"
            }}>{message}</Alert> : ''}
            {signinSuccess ? <Alert severity="success" sx={{
                width: "95%"
            }}>Successfully sign in 🍀</Alert> : ''}
            <SignInBtn onClick={handleSignIn}>Login</SignInBtn>
            <CustomDivider>or</CustomDivider>
            <SignInBtn onClick={handleGitHubSignIn} style={{marginBottom: "20px"}}><BsGithub size={22} style={{margin: "0 5px 0 0"}}/>Login with github</SignInBtn>
            <CustomDivider />
            <SignUpContainer>
                <SignUpQuestion>Don't have an account yet?</SignUpQuestion>
                <SignUpBtn onClick={() => setIsSignIn(false)}>Register one</SignUpBtn>
            </SignUpContainer>
        </SignInContainer>
    )
}

export default SignIn;