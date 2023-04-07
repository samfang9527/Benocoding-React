
import styled from "styled-components";

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

const SignIn = () => {

    function handleSignIn(e) {
        e.preventDefault();

    }

    return (
        <SignInContainer>
            <InputBlock>
                <Label for="email-input">Email</Label>
                <TextInput type="text" id="email-input" name="email"></TextInput>    
            </InputBlock>
            <InputBlock>
                <Label for="pwd-input">Password</Label>
                <TextInput type="password" id="pwd-input" name="password"></TextInput>    
            </InputBlock>
            <SignInBtn onClick={handleSignIn}>Submit</SignInBtn>
        </SignInContainer>
    )
}

export default SignIn;