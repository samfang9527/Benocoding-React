
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { PRODUCTION_BACKEND_API_URL, GITHUB_CLIENT_ID } from "../../../global/constant.js";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../global/authContext.jsx";
import Divider from '@mui/material/Divider';
import { BsGithub } from "react-icons/bs";
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
    background-color: Gainsboro;
    border: none;

    :focus {
        outline: none;
        border: ${props => props.isValid ? '3px solid YellowGreen' : '3px solid red'};
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

    const authContext = useContext(AuthContext);
    const MySwal = withReactContent(Swal);

    const emailInput = useRef(null);
    const pwdInput = useRef(null);

    const [ isFirst, setIsFirst ] = useState(true);
    const [ isEmailValid, setIsEmailValid ] = useState(false);
    const [ isPWDLengthValid, setIsPWDLengthValid ] = useState(false);
    const [ isPWDCombinationValid, setIsPWDCombinationValid ] = useState(false);

    function handleSignIn(e) {
        e.preventDefault();
        
        // if ( !isEmailValid || !isPWDCombinationValid || !isPWDLengthValid ) {
        if ( !isEmailValid || !isPWDLengthValid ) {
            CustomErrorAlert( "Please check your input" )
            return;
        }

        const email = emailInput.current.value;
        const password = pwdInput.current.value;

        signIn(email, password)
            .then(response => {
                const { signin } = response.data;

                if ( signin.statusCode !== 200 ) {
                    CustomErrorAlert( signin.responseMessage );
                    return;
                }

                MySwal.fire({
                    icon: 'success',
                    title: 'Welcome back!'
                }).then(result => {
                    if ( result.isConfirmed || result.isDismissed ) {
                        // put jwt at localstorage
                        window.localStorage.setItem("jwt", signin.jwt);
                        authContext.login(signin.jwt);
                        window.location.assign('/');
                    }
                })
            })
            .catch(err => {
                ServerErrorAlert();
            }) 
    }

    async function handleGitHubSignIn(e) {
        e.preventDefault();
        window.open(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`, "_blank");
    }

    function validatePWD(pwd) {

        if ( !pwd || pwd.length < 8 || pwd.length > 16 ) {
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
    }

    function validateInput(e) {
        e.preventDefault();
        setIsFirst(false);
        const email = emailInput.current.value;
        const pwd = pwdInput.current.value;

        if ( !validator.isEmail(email) ) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }

        validatePWD(pwd);
    }

    return (
        <SignInContainer isSignIn={isSignIn}>
            <InputBlock>
                <TextInput
                    type="email"
                    name="email-input"
                    placeholder="Email"
                    ref={emailInput}
                    onChange={validateInput}
                    isValid={isFirst ? true : isEmailValid}
                ></TextInput>
                <EmailFormatDesc isValid={isFirst ? true : isEmailValid }>
                    { !isFirst ? 
                        <>
                            { isEmailValid ? "✔︎ valid email" : "invalid email" }
                        </> : ""
                    }
                </EmailFormatDesc>
            </InputBlock>
            <InputBlock>
                <TextInput
                    type="password"
                    name="pwd-input"
                    placeholder="Password"
                    ref={pwdInput}
                    onChange={validateInput}
                    isValid={isFirst ? true : isPWDLengthValid}
                    // isValid={isFirst ? true : isPWDLengthValid && isPWDCombinationValid}
                ></TextInput>
                <PWDFormatBlock>
                    <label>Your password needs</label>
                    <PWDFormatRuleList>
                        {
                            isFirst ? 
                            <>
                                <PWDFormatRule isValid={true}>Between 8-16 characters</PWDFormatRule> 
                                {/* <PWDFormatRule isValid={true}>At least 1 upper and lowercase letter and number</PWDFormatRule>  */}
                            </> : 
                            <>
                                <PWDFormatRule isValid={isPWDLengthValid}>Between 8-16 characters</PWDFormatRule> 
                                {/* <PWDFormatRule isValid={isPWDCombinationValid}>At least 1 upper and lowercase letter and number</PWDFormatRule>  */}
                            </>
                        }
                    </PWDFormatRuleList>
                </PWDFormatBlock>
            </InputBlock>
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