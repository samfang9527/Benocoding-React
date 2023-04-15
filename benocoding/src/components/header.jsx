
import styled from "styled-components";

const HeaderWrapper = styled.header`
    height: 10%;
    border-bottom: 1px solid white;
    background-color: #38686A;
    position: sticky;
    top: 0;
    z-index: 100;
`;

const LogoStyle = styled.h1`
    font-size: 40px;
    font-family: 'pacifico';
    margin-left: 50px;
    display: inline-block;
    color: white;
`;

const Btn = styled.button`
    height: 50px;
    width: 180px;
    margin: auto 10px;
    background-color: orange;
    border-radius: 6px;
    position: absolute;
    right: 5%;
    top: 50px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    border: none;

    :hover {
        background-color: darkorange;
    }
`;


const Header = () => {

    function toLoginPage() {
        window.location.assign('/login');
    }

    return (
        <HeaderWrapper>
            <LogoStyle>Benocoding</LogoStyle>
            <Btn onClick={toLoginPage}>Sign-in / Sign-up</Btn>
        </HeaderWrapper>
    )
}

export default Header;