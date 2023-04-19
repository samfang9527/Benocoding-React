
import styled from "styled-components";
import axios from "axios";
import { PRODUCTION_BACKEND_API_URL } from "../../../global/constant.js";
import { useState } from "react";
import Alert from '@mui/material/Alert';

const SignUpContainer = styled.div`
    width: 50%;
    position: relative;
    left: 50%;
    margin-left: -25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #81B29A;
    border-top: 5px solid Honeydew;
    color: white;
`;

const InputBlock = styled.div`
    width: 95%;
    margin: 40px 0 20px 0;
`;

const Label = styled.label`
    font-size: 24px;
    align-self: flex-start;
`;

const TextInput = styled.input`
    width: 100%;
    height: 50px;
    margin-top: 10px;
    font-size: 20px;
    padding: 10px;
`;

const SignUpBtn = styled.button`
    width: 150px;
    height: 50px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
    margin: 30px 0 50px 0;
    font-size: 24px;

    :hover {
        background-color: darkgreen;
    }
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


const SignUp = () => {

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

    return (
        <SignUpContainer>
            <InputBlock>
                <Label htmlFor="name-input">Username</Label>
                <TextInput type="text" id="name-input" name="username" minLength={2} maxLength={16}></TextInput>    
            </InputBlock>
            <InputBlock>
                <Label htmlFor="email-input">Email</Label>
                <TextInput type="email" id="email-input" name="email"></TextInput>    
            </InputBlock>
            <InputBlock>
                <Label htmlFor="pwd-input">Password</Label>
                <TextInput type="password" id="pwd-input" name="password" minLength={8} maxLength={20}></TextInput>    
            </InputBlock>
            {signUpFail ? <Alert severity="error" sx={{
                width: "95%"
            }}>{message}</Alert> : ''}
            {signUpSuccess ? <Alert severity="success" sx={{
                width: "95%"
            }}>Successfully sign up 🍀</Alert> : ''}
            <SignUpBtn onClick={handleSignUp}>Submit</SignUpBtn>
        </SignUpContainer>
    )
}

export default SignUp;