
import { useContext, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { PRODUCTION_BACKEND_API_URL, GITHUB_CLIENT_ID } from "../../../global/constant.js";
import { Divider } from "@mui/material";
import { BsGithub } from "react-icons/bs";
import { AuthContext } from "../../../global/authContext.jsx";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CustomErrorAlert, ServerErrorAlert } from "../../../utils/alert.js";
import validator from 'validator';

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
    margin-bottom: 5px;
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
        outline: none;
        border: ${props => props.isValid ? '3px solid YellowGreen' : '3px solid red'};
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

const PWDFormatBlock = styled.div`
    align-self: flex-start;
    margin: 8px 4px 0 4px;
`;

const PWDFormatRuleList = styled.ul`
    padding-left: 0px;
    margin: 4px 0;
`;

const PWDFormatRule = styled.li`
    list-style-type: none;
    font-size: 14px;
    color: ${props => props.isValid ? 'black' : 'red'};

    ::before {
        content: "☞";
        margin-right: 0.5em;
    }
`;

const EmailFormatDesc = styled.label`
    margin: 8px 4px 0 4px;
    align-self: flex-start;
    font-size: 14px;
    color: ${props => props.isValid ? 'black' : 'red'};

    ::before {
        content: "${props => props.isValid ? '' : '✖'}";
        margin-right: 0.5em;
    }
`;

const NameFormatDesc = styled.label`
    margin: 8px 4px 0 4px;
    align-self: flex-start;
    font-size: 14px;
    color: ${props => props.isValid ? 'black' : 'red'};

    ::before {
        content: "${props => props.isValid ? '' : '✖'}";
        margin-right: 0.5em;
    }
`;


const SignUp = ({isSignIn, setIsSignIn}) => {

    const MySwal = withReactContent(Swal);
    const authContext = useContext(AuthContext);

    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const pwdInput = useRef(null);

    const [ isFirst, setIsFirst ] = useState(true);
    const [ isNameValid, setIsNameValid ] = useState(false);
    const [ isEmailValid, setIsEmailValid ] = useState(false);
    const [ isPWDLengthValid, setIsPWDLengthValid ] = useState(false);
    const [ isPWDCombinationValid, setIsPWDCombinationValid ] = useState(false);

    function handleSignUp(e) {
        e.preventDefault();

        if ( !isEmailValid || !isNameValid || !isPWDCombinationValid || !isPWDLengthValid ) {
            CustomErrorAlert( "Please check your input" );
            return;
        }

        const username = nameInput.current.value;
        const email = emailInput.current.value;
        const password = pwdInput.current.value;

        signUp(username, email, password)
            .then(response => {
                const { signup } = response.data;
                if ( signup.statusCode !== 200 ) {
                    CustomErrorAlert( signup.responseMessage );
                    return;
                }

                MySwal.fire({
                    icon: 'success',
                    title: 'Welcome!'
                }).then(result => {
                    if ( result.isConfirmed || result.isDismissed ) {
                        // put jwt at localstorage
                        window.localStorage.setItem("jwt", signup.jwt);
                        authContext.login(signup.jwt);
                        window.location.assign('/');
                    }
                })
            })
            .catch(err => {
                console.error(err);
                ServerErrorAlert();
            })
    }

    async function handleGitHubSignUp(e) {
        e.preventDefault();
        window.open(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`, "_blank");
    }

    function validatePWD(pwd) {

        if ( !pwd || pwd.length < 8 ) {
            setIsPWDLengthValid(false);
        } else {
            setIsPWDLengthValid(true);
        }
        
        const isValidPassword = validator.isStrongPassword(pwd, 
            {
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0,
            }
        )
        if ( !isValidPassword ) {
            setIsPWDCombinationValid(false);
        } else {
            setIsPWDCombinationValid(true);
        }
        
        if ( isPWDCombinationValid && isPWDLengthValid ) {
            return true;
        }
        return false;
    }

    function validateInput(e) {
        e.preventDefault();
        setIsFirst(false);

        const username = nameInput.current.value;
        const email = emailInput.current.value;
        const pwd = pwdInput.current.value;

        if ( !validator.isLength(username, { min: 2, max: 16 }) ) {
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        }

        if ( !validator.isEmail(email) ) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }

        validatePWD(pwd);
    }

    return (
        <SignUpContainer isSignIn={isSignIn}>
            <InputBlock>
                <TextInput
                    type="text"
                    name="username-input"
                    placeholder="Username"
                    ref={nameInput}
                    onChange={validateInput}
                    isValid={isFirst ? true : isNameValid}
                ></TextInput>
                <NameFormatDesc isValid={isFirst ? true : isNameValid}>
                    { isFirst ? "" :
                        <>
                            { isNameValid ? "Valid username" : "Username needs to be 2-16 characters" }
                        </>
                    }
                </NameFormatDesc>
            </InputBlock>
            <InputBlock>
                <TextInput
                    type="email"
                    name="email-input"
                    placeholder="Email"
                    ref={emailInput}
                    onChange={validateInput}
                    isValid={isFirst ? true : isEmailValid}
                ></TextInput>
                <EmailFormatDesc isValid={isFirst ? true : isEmailValid}>
                    { isFirst ? "" :
                        <>
                            { isEmailValid ? "✔︎ Valid email" : "Wrong email format" }
                        </>
                    }
                </EmailFormatDesc>
            </InputBlock>
            <InputBlock>
                <TextInput
                    type="password"
                    name="password-input"
                    placeholder="Password"
                    ref={pwdInput}
                    onChange={validateInput}
                    isValid={isFirst ? true : isPWDCombinationValid && isPWDLengthValid}
                ></TextInput>
                <PWDFormatBlock>
                    <label>Your password needs</label>
                    <PWDFormatRuleList>
                        {
                            isFirst ? 
                            <>
                                <PWDFormatRule isValid={true}>At least 8 characters</PWDFormatRule> 
                                <PWDFormatRule isValid={true}>At least 1 upper and lowercase letter and number</PWDFormatRule> 
                            </> : 
                            <>
                                <PWDFormatRule isValid={isPWDLengthValid}>At least 8 characters</PWDFormatRule> 
                                <PWDFormatRule isValid={isPWDCombinationValid}>At least 1 upper and lowercase letter and number</PWDFormatRule> 
                            </>
                        }
                    </PWDFormatRuleList>
                </PWDFormatBlock>
            </InputBlock>
            <SignUpBtn onClick={handleSignUp}>Signup</SignUpBtn>
            <CustomDivider>or</CustomDivider>
            <SignUpBtn onClick={handleGitHubSignUp} style={{marginBottom: "20px"}}><BsGithub size={22} style={{margin: "0 5px 0 0"}}/>Signup with github</SignUpBtn>
            <CustomDivider></CustomDivider>
            <SignInBtn onClick={() => setIsSignIn(true)}>← back to login</SignInBtn>
        </SignUpContainer>
    )
}

export default SignUp;