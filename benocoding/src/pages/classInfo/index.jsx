
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getClassData } from "../../utils/apis/class.js";
import { CDN_DOMAIN } from "../../global/constant.js";
import ReactPlayer from "react-player";
import Tappay from "./components/tappay.jsx";

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
    width: 50%;
    height: ${props => props.showCheckout ? "450px" : "100px"};
    border-radius: 20px;
    transition: 0.3s ease-in-out;
    background-color: AntiqueWhite;
    border: 3px dashed black;
    position: relative;
    left: 50%;
    margin-left: -25%;
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
    margin: 20px;
`;

const ClassDescription = styled.p`
    display: inline;
    font-size: 26px;
    font-weight: bolder;
    color: FireBrick;
    padding: 0 20px;
    letter-spacing: 2px;
`;

const ClassVideo = styled(ReactPlayer)`
    position: relative;
    margin: 50px 0px;
`;


function formatDateString(dateString) {
    return dateString.slice( 0, dateString.lastIndexOf('T') );
}

const ClassDetail = () => {

    const location = useLocation();

    const [ classData, setClassData ] = useState({});
    const [ showCheckout, setShowCheckout ] = useState(false);

    const {
        className,
        classImage,
        classDesc,
        classStartDate,
        classEndDate,
        teacherName,
        classVideo,
        classMembers,
        milestones
    } = classData;
    

    useEffect(() => {
        const path = location.pathname
        const classId = path.slice( path.lastIndexOf('/') + 1 );
        
        getClassData(classId)
            .then(response => {
                if ( response.class ) {
                    setClassData(response.class);
                }
            })
            .catch(err => {console.error(err)})

    }, [location.pathname])

    return (
        <MainContainer>
            <ImageSection>
                { classImage ? <MainImage alt={className} src={`${CDN_DOMAIN + classImage}`}></MainImage> : '' }
            </ImageSection>
            <InfoSection>
                <CheckoutBlock showCheckout={showCheckout}>
                    <CheckoutTitle onClick={() => {setShowCheckout(!showCheckout)}}>點擊購課</CheckoutTitle>
                    {
                        showCheckout ? 
                            <>
                                <hr style={{width: "50%", border: "1px solid black"}}></hr>
                                <Tappay />
                            </>
                            : ''
                    }
                </CheckoutBlock>
                <InfoBlock>
                    <ClassTitle>{className}</ClassTitle>
                    <ClassDescription style={{color: "MenuText", fontWeight: "normal"}}>{classDesc}</ClassDescription>
                    { classVideo ? <ClassVideo width={"80%"} height={"auto"} controls={true} url={`${CDN_DOMAIN + classVideo}`}></ClassVideo> : '' }
                    <ClassDescriptionBlock>Teacher | 
                        <ClassDescription>{teacherName}</ClassDescription>
                    </ClassDescriptionBlock>
                    <ClassDescriptionBlock>Totally 
                        <ClassDescription>{ milestones ? milestones.length : ''}</ClassDescription> milestones
                    </ClassDescriptionBlock>
                    <ClassDescriptionBlock>From 
                        <ClassDescription>{ classStartDate ? formatDateString(classStartDate) : ''}</ClassDescription> to 
                        <ClassDescription>{ classEndDate ? formatDateString(classEndDate) : ''}</ClassDescription>
                    </ClassDescriptionBlock>
                    <ClassDescriptionBlock>Student numbers: 
                        <ClassDescription>{ classMembers ? classMembers.length - 1 : ''}</ClassDescription>
                    </ClassDescriptionBlock>
                </InfoBlock>
            </InfoSection>
        </MainContainer>
    )
}

export default ClassDetail;
