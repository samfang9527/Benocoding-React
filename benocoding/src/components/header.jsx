
import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../global/authContext.jsx";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    display: ${props => props.show ? 'flex' : 'none'};
    align-items: center;
`;

const OptionBtn = styled.button`
    background-color: Moccasin;
    border: 0 solid #E5E7EB;
    box-sizing: border-box;
    color: #000000;
    display: flex;
    font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 14px;
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
    height: 50px;
    width: 130px;
    margin: 10px;
    opacity: ${props => props.show ? '1' : '0'};
    animation: ${props => props.show ? fadeIn : fadeOut} 0.3s ease-in-out;

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

const Header = () => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const [ isLogin, setIsLogin ] = useState(false);
    const [ isShowingOptions, setIsShowingOptions ] = useState(false);

    const MySwal = withReactContent(Swal);

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

    function handleLogOut(e) {
        e.preventDefault();
        MySwal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Goodbye!',
                'hope to see you soon.',
                'success'
              ).then(result => {
                if ( result.isConfirmed || result.isDismissed ) {
                    window.localStorage.removeItem('jwt');
                    window.location.assign('/');
                }
              })
            }
        })
    }

    return (
        <HeaderWrapper>
            <LogoStyle  onClick={() => {navigate('/')}}>Benocoding</LogoStyle>
            <NavWrapper>
                {
                    isLogin && isShowingOptions ? <OptionContainer show={isShowingOptions} className={isShowingOptions ? '' : 'hide'}>
                        <OptionBtn
                            show={isShowingOptions}
                            onClick={() => navigate('/learner')}
                        >我的學習</OptionBtn>
                        <OptionBtn
                            show={isShowingOptions}
                            onClick={() => navigate('/creater')}
                        >我的課程</OptionBtn>
                        <OptionBtn
                            show={isShowingOptions}
                            onClick={() => navigate('/create')}
                        >建立新課程</OptionBtn>
                        <OptionBtn
                            show={isShowingOptions}
                            onClick={handleLogOut}
                            style={{backgroundColor: "LightCoral"}}
                        >登出</OptionBtn>
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