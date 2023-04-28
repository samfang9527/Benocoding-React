
import styled from "styled-components";
import { useState, useRef, useEffect, useContext } from "react";
import { getClassList, getRandomClasses } from "../../utils/apis/class.js";
import ClassItem from "./components/classItem.jsx";
import Pagination from "@mui/material/Pagination";
import { PRODUCTION_DOMAIN, CDN_DOMAIN } from "../../global/constant.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../../global/authContext.jsx";
import { useNavigate } from "react-router-dom";


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CampaignSection = styled.section`
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 50px;
`;

const InputBlock = styled.div`
    width: 30%;
    height: 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    left: 5%;
`;

const SearchDescription = styled.p`
    font-size: 40px;
    flex-grow: 1;
    margin: 0px 20px;
    letter-spacing: 2px;
    font-weight: bold;
`;

const SearchInput = styled.input`
    height: 50px;
    width: 100%;
    font-size: 24px;
    padding: 0 20px;
    border-radius: 25px;
    border: 3px solid FireBrick;
`;

const ClassSection = styled.section`
    width: 85%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 0px 50px 50px 50px;
    border-radius: 20px;
    background-color: White;
`;

const CampaignBlock = styled.div`
    width: 50%;
`;

const ImgBlock = styled.div`
    padding: 10px 30px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
`;

const CampaignImage = styled.img`
    height: 30rem;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    opacity: 0.8;
`;

const CampaignLabel = styled.div`
    position: absolute;
    bottom: 0%;
    height: fit-content;
    z-index: 10;
    width: 10%;
    padding: 20px;
    margin: 0 0 30px 50px;
    background-color: rgb(180, 180, 180);
    border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
    box-shadow: 20px 20px rgba(0,0,0,.15);
    transition: all .4s ease;
    cursor: pointer;
    opacity: 0.9;

    :hover {
        background-color: rgb(200, 200, 200);
        border-radius: 0% 0% 50% 50% / 0% 0% 10% 10% ;
        box-shadow: 10px 10px rgba(0,0,0,.25);
    }
`;

const ClassName = styled.div`
    font-size: 26px;
    margin: 5px 0 20px 0;
    color: black;
`;

const CampaignPromotion = styled.div`
    font-family: Microsoft JhengHei;
    font-size: 26px;
    width: 100%;
    color: Yellow;
    letter-spacing: 2px;
`;

const Home = () => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const searchInput = useRef(null);

    const [ classList, setClassList ] = useState([]);
    const [ campaignList, setCampaignList ] = useState([]);
    const [ maxPageNum, setMaxPageNum ] = useState(0);
    const [ pageNum, setPageNum ] = useState(0);
    const [ keyword, setKeyword ] = useState('');

    function handlePageChange(e, value) {
        setPageNum(value-1);
    }

    function handleSearch(e) {
        if ( e.keyCode === 13 ) {
            const params = new URLSearchParams(window.location.search);
            params.set("keyword", searchInput.current.value);
            const newSearch = params.toString();
            const newUrl = `${PRODUCTION_DOMAIN}?${newSearch}`
            window.history.pushState(null, '', newUrl);
            setKeyword(searchInput.current.value);
            setPageNum(0);
        }
    }

    useEffect(() => {
        getClassList(Number(pageNum), keyword)
            .then(response => {
                if ( response && response.response.statusCode === 200 ) {
                    const { classList } = response;
                    const allPageNum = response.maxPageNum;
                    if ( classList ) {
                        setClassList(classList);
                    }

                    if ( allPageNum ) {
                        setMaxPageNum(allPageNum);
                    } else {
                        setMaxPageNum(0);
                    }
                    
                }
            })
            .catch(err => {console.error(err)})

    }, [pageNum, keyword])

    useEffect(() => {
        // campaign list
        getRandomClasses()
            .then(response => {
                const { classList } = response;
                setCampaignList(classList);
            })
            .catch(err => {console.error(err)})
    }, [])

    useEffect(() => {
        // check if github login with jwt cookie
        const cookies = document.cookie.split(';');
        
        for ( let i = 0; i < cookies.length; i++ ) {
            const cookie = cookies[i].split('=');
            if ( cookie[0].trim() === 'jwt' ) {
                authContext.login(cookie[1]);
                window.localStorage.setItem('jwt', cookie[1]);
                document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=benocoding.com;";
                return;
            }
        }
        
    }, [authContext])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <MainContainer>
            <CampaignSection>
                <InputBlock>
                    <SearchDescription>Learn to Code</SearchDescription>
                    <SearchInput type="text" placeholder="Search a class, e.g. Javascript" ref={searchInput} onKeyUp={handleSearch}></SearchInput>
                </InputBlock>
                <CampaignBlock>
                    <Slider {...settings}>
                        {
                            campaignList.map((campaign, idx) => {
                                return (
                                    <div key={campaign.id + idx}>
                                        <CampaignLabel onClick={() => {navigate(`/class/${campaignList[idx].id}`)}}>
                                            <ClassName>{campaign.className}</ClassName>
                                            <CampaignPromotion>課程熱賣中！現在買即享 <span style={{fontSize: "50px"}}>65</span> 折</CampaignPromotion>
                                        </CampaignLabel>
                                        <ImgBlock>
                                            <CampaignImage
                                                src={`${CDN_DOMAIN + campaignList[idx].classImage}`}
                                                alt={campaignList[idx].className}
                                                onClick={() => {navigate(`/class/${campaignList[idx].id}`)}}
                                            ></CampaignImage>
                                        </ImgBlock>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </CampaignBlock>
            </CampaignSection>
            <Pagination
                page={pageNum+1}
                count={maxPageNum}
                size="large"
                style={{marginTop: "40px"}}
                onChange={handlePageChange}>
            </Pagination>
            <ClassSection>
                {
                    classList.map((class_) => {
                        return (
                            <ClassItem key={class_.id} class_={class_}></ClassItem>
                        )
                    })
                }
            </ClassSection>
        </MainContainer>
    )
}

export default Home;