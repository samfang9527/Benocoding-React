
import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../global/authContext.jsx";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.header`
    max-height: 5%;
    border-bottom: 1px solid white;
    background-color: #38686A;
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
`;

const LogoStyle = styled.h1`
    font-size: 30px;
    font-family: 'pacifico';
    margin-left: 50px;
    display: inline-block;
    color: white;
    cursor: pointer;
`;

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0px 5% 0px 0px;
`;

const UserBtn = styled.button`
    background-color: #3DD1E7;
    border: 0 solid #E5E7EB;
    box-sizing: border-box;
    color: #000000;
    display: flex;
    font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 1rem;
    font-weight: 700;
    justify-content: center;
    line-height: 1rem;
    padding: .75rem 1.65rem;
    position: relative;
    text-align: center;
    text-decoration: none #000000 solid;
    text-decoration-thickness: auto;
    width: 100%;
    max-width: 200px;
    height: 40px;
    position: relative;
    cursor: pointer;
    transform: rotate(-2deg);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    position: relative;
    top: 50%;
    margin-top: -25px;

    :focus {
    outline: 0;
    }

    :after {
    content: '';
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
    }

    :hover:after {
    bottom: 2px;
    left: 2px;
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const OptionContainer = styled.div`
    display: flex;
    align-items: center;
`;

const OptionBtn = styled.button`
    align-self: center;
    background-color: #fff;
    background-image: none;
    background-position: 0 90%;
    background-repeat: repeat no-repeat;
    background-size: 4px 3px;
    border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
    border-style: solid;
    border-width: 2px;
    box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
    box-sizing: border-box;
    color: #41403e;
    cursor: pointer;
    display: inline-block;
    font-family: Neucha, sans-serif;
    font-size: 1rem;
    line-height: 23px;
    outline: none;
    padding: .75rem;
    text-decoration: none;
    transition: all 235ms ease-in-out;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    height: 50px;
    width: 130px;
    margin-right: 5px;

    :hover {
        box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
        transform: translate3d(0, 2px, 0);
    }

    :focus {
        box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
    }

    opacity: ${props => props.show ? '1' : '0'};
    animation: ${props => props.show ? fadeIn : fadeOut} 0.3s ease-in-out;
`;


const Header = () => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const [ isLogin, setIsLogin ] = useState(false);
    const [ isShowingOptions, setIsShowingOptions ] = useState(false);

    useEffect(() => {
        if ( !authContext.isLoading ) {
            const { user } = authContext;
            if ( user.userId ) {
                setIsLogin(true);
            }
        }
    }, [authContext])

    function handleUserBtnClick(e) {
        e.preventDefault();
        if ( !isLogin ) {
            navigate('/login')
        }

        setIsShowingOptions(!isShowingOptions)
    }

    return (
        <HeaderWrapper>
            <LogoStyle  onClick={() => {window.location.assign('/')}}>Benocoding</LogoStyle>
            <NavWrapper>
                {
                    isLogin ? <OptionContainer show={isShowingOptions} className={isShowingOptions ? '' : 'hide'}>
                        <OptionBtn show={isShowingOptions}>我的學習</OptionBtn>
                        <OptionBtn show={isShowingOptions}>我的課程</OptionBtn>
                        <OptionBtn show={isShowingOptions}>建立新課程</OptionBtn>
                    </OptionContainer> : ''
                }
                { !isShowingOptions && isLogin ? 
                    <KeyboardArrowRightIcon
                        onClick={() => setIsShowingOptions(!isShowingOptions)}
                        sx={{
                            width: "30px",
                            height: "30px",
                            position: "relative",
                            top: "50%",
                            marginTop: "-15px",
                            color: "orange",
                            cursor: "pointer",
                            ":hover": {
                                color: "darkorange"
                            }
                        }}
                    />
                    : <KeyboardArrowLeftIcon 
                        onClick={() => setIsShowingOptions(!isShowingOptions)}
                        sx={{
                            width: "30px",
                            height: "30px",
                            position: "relative",
                            top: "50%",
                            marginTop: "-15px",
                            color: "orange",
                            cursor: "pointer",
                            ":hover": {
                                color: "darkorange"
                            }
                        }}
                    /> 
                }
                <UserBtn onClick={handleUserBtnClick}>
                    { isLogin ? `Hi ${user.username}` : 'Sign-in / Sign-up' }
                </UserBtn>
            </NavWrapper>
        </HeaderWrapper>
    )
}

export default Header;