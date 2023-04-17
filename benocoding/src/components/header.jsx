
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../global/authContext.jsx";

const HeaderWrapper = styled.header`
    height: 5%;
    border-bottom: 1px solid white;
    background-color: #38686A;
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
`;

const LogoStyle = styled.h1`
    font-size: 40px;
    font-family: 'pacifico';
    margin-left: 50px;
    display: inline-block;
    color: white;
    cursor: pointer;
`;

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0px 40px 0px 0px;
`;

const LoginBtn = styled.button`
    height: 50px;
    width: fit-content;
    margin: auto 10px;
    background-color: orange;
    border-radius: 6px;
    right: 5%;
    top: 50px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    border: none;
    padding: 5px 20px;

    :hover {
        background-color: darkorange;
    }
`;

const LearnerBtn = styled.button`
    height: 50px;
    width: fit-content;
    margin: auto 10px;
    background-color: SandyBrown;
    border-radius: 6px;
    right: 5%;
    top: 50px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    border: none;
    padding: 5px 20px;

    :hover {
        background-color: Tan;
    }
`;

const CreaterBtn = styled.button`
    height: 50px;
    width: fit-content;
    margin: auto 10px;
    background-color: SandyBrown;
    border-radius: 6px;
    right: 5%;
    top: 50px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    border: none;
    padding: 5px 20px;

    :hover {
        background-color: Tan;
    }
`;

const CreateClassBtn = styled.button`
    height: 50px;
    width: fit-content;
    margin: auto 10px;
    background-color: CornflowerBlue;
    border-radius: 6px;
    right: 5%;
    top: 50px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    border: none;
    padding: 5px 20px;

    :hover {
        background-color: DeepSkyBlue;
    }
`;


const Header = () => {

    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const [ isLogin, setIsLogin ] = useState(false);

    useEffect(() => {
        if ( !authContext.isLoading ) {
            const { user } = authContext;
            if ( user ) {
                setIsLogin(true);
            }
        }
    }, [authContext])

    return (
        <HeaderWrapper>
            <LogoStyle  onClick={() => {window.location.assign('/')}}>Benocoding</LogoStyle>
            <NavWrapper>
                <CreateClassBtn onClick={() => {window.location.assign('/create')}}>建立新課程</CreateClassBtn>
                <LearnerBtn onClick={() => {window.location.assign('/learner')}}>我的學習</LearnerBtn>
                <CreaterBtn onClick={() => {window.location.assign('/creater')}}>我建立的課程</CreaterBtn>
                <LoginBtn onClick={() => {window.location.assign('/login')}}>
                    {
                        isLogin ? `Hi ${user.username}` : 'Sign-in / Sign-up'
                    }
                </LoginBtn>
            </NavWrapper>
        </HeaderWrapper>
    )
}

export default Header;