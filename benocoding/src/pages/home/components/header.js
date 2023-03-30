
import styled from "styled-components";

const HeaderWrapper = styled.div`
    height: 150px;
`;

const LogoStyle = styled.h1`
    font-size: 40px;
    font-family: 'pacifico';
    margin-left: 50px;
    display: inline-block;
`;

const SigninStyle = styled.button`
    height: 30px;
    width: 100px;
    margin: auto 10px;
    background-color: orange;
    border-radius: 6px;
    position: absolute;
    right: 180px;
    top: 50px;
`;

const SignupStyle = styled.button`
    height: 30px;
    width: 100px;
    margin: auto 10px;
    background-color: orange;
    border-radius: 6px;
    position: absolute;
    right: 50px;
    top: 50px;
`;


const Header = () => {
    return (
        <HeaderWrapper>
            <LogoStyle>Benocoding</LogoStyle>
            <SigninStyle>Sign-in</SigninStyle>
            <SignupStyle>Sign-up</SignupStyle>
        </HeaderWrapper>
    )
}

export default Header;