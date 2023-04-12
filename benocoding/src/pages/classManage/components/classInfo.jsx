
import styled from "styled-components";
import { CDN_DOMAIN } from "../../../global/constant.js";
import ReactPlayer from "react-player";

const MainContainer = styled.div`
    
`;

const SectionTitle = styled.p`
    font-size: 40px;
    padding: 10px 30px;
`;

const ImageBackground = styled.img`
    width: 100%;
    height: 40vh;
    object-fit: cover
    z-index: -20;
`;

const ClassVideo = styled(ReactPlayer)`
    position: relative;
    left: 30px;
    margin-bottom: 30px;
`;


const Content = styled.p`
    font-size: 22px;
    padding: 10px 30px;
`;

const SplitLine = styled.hr`
    border: 10px solid khaki;
    border-radius: 5px;
    width: 100%;
`;


function formatDate(dateString) {
    if ( dateString ) {
        return dateString.slice(0, dateString.lastIndexOf('T'));
    }
    return '';
}

const ClassInfo = ({data}) => {

    console.log(data);
    const {
        classImage,
        classVideo,
        className,
        classDesc,
        classStartDate,
        classEndDate,
    } = data;

    return (
        <MainContainer>
            <ImageBackground src={`${CDN_DOMAIN + classImage}`}></ImageBackground>
            <SplitLine></SplitLine>
            <SectionTitle>Class Video</SectionTitle>
            <ClassVideo controls={true} url={`${CDN_DOMAIN + classVideo}`}></ClassVideo>
            <SplitLine></SplitLine>
            <SectionTitle>Class Info</SectionTitle>
            <Content>Class Name: {className}</Content>
            <Content>Start date:<br></br>{formatDate(classStartDate)}</Content>
            <Content>End date:<br></br>{formatDate(classEndDate)}</Content>
            <Content>Class Description:</Content>
            <Content>{classDesc}</Content>
        </MainContainer>
    )

}

export default ClassInfo;
