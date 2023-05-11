
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getClassData } from "../../utils/apis/class.js";
import { CDN_DOMAIN } from "../../global/constant.js";
import ReactPlayer from "react-player";
import Tappay from "./components/tappay.jsx";
import { SyncLoader } from "react-spinners";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 4px solid DarkSeaGreen;
    margin: 100px;
    background-color: white;
    padding: 60px;
    border-radius: 20px;
    width: 80%;
    position: relative;
    left: 50%;
    margin-left: -40%;
`;

const ImageSection = styled.section`
    width: 100%;
`;

const MainImage = styled.img`
    width: 100%;
    object-fit: contain;
`;

const InfoSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 10px solid Beige;
    background-color: Beige;
    border-radius: 20px;
`;

const InfoBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CheckoutBlock = styled.div`
    width: 90%;
    height: ${props => props.showCheckout ? "450px" : "100px"};
    border-radius: 20px;
    transition: 0.3s ease-in-out;
    background-color: AntiqueWhite;
    border: 3px dashed black;
    position: relative;
    left: 50%;
    margin-left: -45%;
    opacity: ${props => props.showCheckout ? "1" : "0.4"};
    transition: 0.25s all ease-in-out;
`;

const CheckoutTitle = styled.p`
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    color: black;
    cursor: pointer;
`;

const ClassTitle = styled.p`
    font-size: 36px;
    text-align: center;
`;

const ClassDescriptionBlock = styled.div`
    text-align: left;
    font-size: 22px;
    padding: 0 20px;
    align-self: flex-start;
    margin: 15px 20px;
`;

const ClassDescription = styled.pre`
    display: inline;
    font-size: 26px;
    font-weight: bolder;
    color: FireBrick;
    padding: 0 20px;
    letter-spacing: 2px;
    width: 100%;
    white-space: pre-wrap;
`;

const ClassVideo = styled(ReactPlayer)`
    position: relative;
    margin: 50px 0px;
`;

const BuyingMask = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(150, 150, 150, 0.5);
`;

const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;


function formatDateString(dateString) {
    return dateString.slice( 0, dateString.lastIndexOf('T') );
}

const ClassDetail = () => {

    const location = useLocation();

    const [ classData, setClassData ] = useState({});
    const [ showCheckout, setShowCheckout ] = useState(false);
    const [ classId, setClassId ] = useState('');
    const [ isLogin, setIsLogin ] = useState(false);
    const [ isBuying, setIsBuying ] = useState(false);

    const {
        className,
        classImage,
        classDesc,
        classStartDate,
        classEndDate,
        teacherName,
        classVideo,
        classMembers,
        milestones,
        price
    } = classData;


    useEffect(() => {
        const path = location.pathname
        const classId = path.slice( path.lastIndexOf('/') + 1 );
        getClassData(classId)
            .then(response => {
                if ( response && response.response.statusCode === 200 ) {
                    setClassData(response)
                    setClassId(classId)
                }
            })

    }, [location.pathname])

    useEffect(() => {
        const jwt = window.localStorage.getItem("jwt");
        if ( jwt ) {
            setIsLogin(true);
        }
    }, [])

    return (
        <MainContainer>
            <ImageSection>
                { classImage ? <MainImage alt={className} src={`${CDN_DOMAIN + classImage}`}></MainImage> : '' }
            </ImageSection>
            <InfoSection>
                <CheckoutBlock showCheckout={showCheckout}>
                    { isBuying ? 
                        <BuyingMask>
                            <LoaderContainer>
                                <p style={{textAlign: "center", fontSize: "20px", marginTop: "10px"}}>付款中</p>
                                <SyncLoader size={10}></SyncLoader>
                            </LoaderContainer>
                        </BuyingMask> : <CheckoutTitle onClick={() => {
                            if ( isLogin ) {
                                setShowCheckout(!showCheckout)
                            }
                        }}>{ isLogin ? "點擊購課" : "登入購課" }</CheckoutTitle>
                    }
                    {
                        showCheckout ? 
                            <>
                                <hr style={{width: "50%", border: "1px solid black"}}></hr>
                                <Tappay classId={classId} setIsBuying={setIsBuying} setShowCheckout={setShowCheckout}/>
                            </>
                            : ''
                    }
                </CheckoutBlock>
                <InfoBlock>
                    <ClassTitle>{className}</ClassTitle>
                    <ClassDescription style={{color: "MenuText", fontWeight: "normal"}}>{classDesc}</ClassDescription>
                    { classVideo ? <ClassVideo width={"90%"} height={"auto"} controls={true} url={`${CDN_DOMAIN + classVideo}`}></ClassVideo> : '' }
                    <ClassDescriptionBlock>Teacher | 
                        <ClassDescription>{teacherName}</ClassDescription>
                        
                    </ClassDescriptionBlock>
                    <ClassDescriptionBlock>Price | 
                        <ClassDescription>{ price ? price : ''}</ClassDescription>TWD
                    </ClassDescriptionBlock>
                    <ClassDescriptionBlock>Totally 
                        <ClassDescription>{ milestones ? milestones.length : ''}</ClassDescription> milestones
                        <ol style={{margin: "5px 0"}}>
                            { milestones ? 
                                milestones.map((milestone, idx) => {
                                    return (
                                        <li key={milestone.milestone + idx} style={{margin: "5px 0"}}>{milestone.milestone}</li>
                                    )
                                })
                                : ""
                            }
                        </ol>
                    </ClassDescriptionBlock>
                    <ClassDescriptionBlock>From 
                        <ClassDescription>{ classStartDate ? formatDateString(classStartDate) : ''}</ClassDescription> to 
                        <ClassDescription>{ classEndDate ? formatDateString(classEndDate) : ''}</ClassDescription>
                    </ClassDescriptionBlock>
                    <ClassDescriptionBlock>Student numbers: 
                        <ClassDescription>{ classMembers ? classMembers.length : ''}</ClassDescription>
                    </ClassDescriptionBlock>
                </InfoBlock>
            </InfoSection>
        </MainContainer>
    )
}

export default ClassDetail;
