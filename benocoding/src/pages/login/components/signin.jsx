
import styled from "styled-components";
import axios from "axios";
import { BACKEND_API_URL } from "../../../global/constant.js";
import { useState, useContext } from "react";
import Alert from '@mui/material/Alert';
import { AuthContext } from "../../../global/authContext.jsx";

const SignInContainer = styled.div`
    width: 50%;
    position: relative;
    left: 50%;
    margin-left: -25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: MediumSeaGreen;
    border-top: 5px solid Honeydew;
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

const SignInBtn = styled.button`
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


async function signIn(email, password) {

    const graphqlMutation = {
        query: `
            mutation($data: UserData!) {
                signin(data: $data) {
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
            url: BACKEND_API_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: graphqlMutation        
        })

        return data;

    } catch(err) {
        console.error(err);
    }
}


const SignIn = () => {

    const [signinFail, setSignInFail] = useState(false);
    const [signinSuccess, setSignInSucess] = useState(false);
    const authContext = useContext(AuthContext);

    async function handleSignIn(e) {
        e.preventDefault();

        const email = document.getElementById('email-input').value;
        const password = document.getElementById('pwd-input').value;

        const result = await signIn(email, password);
        const { signin } = result.data;

        if ( !signin ) {
            setSignInFail(true);
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
    }

    return (
        <SignInContainer>
            <InputBlock>
                <Label htmlFor="email-input">Email</Label>
                <TextInput type="text" id="email-input" name="email"></TextInput>    
            </InputBlock>
            <InputBlock>
                <Label htmlFor="pwd-input">Password</Label>
                <TextInput type="password" id="pwd-input" name="password"></TextInput>    
            </InputBlock>
            {signinFail ? <Alert severity="error" sx={{
                width: "95%"
            }}>Wrong email or password</Alert> : ''}
            {signinSuccess ? <Alert severity="success" sx={{
                width: "95%"
            }}>Successfully sign in 🍀</Alert> : ''}
            <SignInBtn onClick={handleSignIn}>Submit</SignInBtn>
        </SignInContainer>
    )
}

export default SignIn;