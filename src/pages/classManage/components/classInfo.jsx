
import styled from "styled-components";
import { CDN_DOMAIN } from "../../../global/constant.js";
import ReactPlayer from "react-player";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 85vh;
`;

const SectionContainer = styled.div`
    
`;

const SectionTitle = styled.p`
    font-size: 30px;
    padding: 0px 20px;
`;

const ImageBackground = styled.img`
    width: 40%;
    height: auto;
    z-index: -20;
    object-fit: contain;
`;

const ClassVideo = styled(ReactPlayer)`
    align-self: center;
    justify-self: center;
`;


const Content = styled.p`
    font-size: 22px;
    padding: 0px 20px;
    margin: 5px;
`;

const SplitLine = styled.hr`
    border: 10px solid #D3EFBD;
    border-radius: 5px;
    width: 98%;
`;

const CustomHighlighter = styled(SyntaxHighlighter)`
    margin: 10px 25px;
    font-size: 20px;
`;

const MediaContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 40px;
`;


function formatDate(dateString) {
    if ( dateString ) {
        return dateString.slice(0, dateString.lastIndexOf('T'));
    }
    return '';
}

const ClassInfo = ({classData}) => {

    const {
        classImage,
        classVideo,
        className,
        classDesc,
        classStartDate,
        classEndDate,
    } = classData;

    return (
        <MainContainer>
            <MediaContainer>
                <ImageBackground src={`${CDN_DOMAIN + classImage}`}></ImageBackground>
                <ClassVideo controls={true} url={`${CDN_DOMAIN + classVideo}`} width={"40%"} height={"auto"}></ClassVideo>
            </MediaContainer>
            <SplitLine></SplitLine>
            <SectionContainer>
                <SectionTitle>Class Info</SectionTitle>
                <Content>Class Name:</Content>
                <CustomHighlighter language="javascript" style={a11yLight} wrapLongLines={true}>
                    {className}
                </CustomHighlighter>
                <Content>Class Description:</Content>
                <CustomHighlighter language="javascript" style={a11yLight} wrapLongLines={true}>
                    {classDesc}
                </CustomHighlighter>
                <Content>Start date:</Content>
                <CustomHighlighter language="javascript" style={a11yLight} wrapLongLines={true}>
                    {formatDate(classStartDate)}
                </CustomHighlighter>
                <Content>End date:</Content>
                <CustomHighlighter language="javascript" style={a11yLight} wrapLongLines={true}>
                    {formatDate(classEndDate)}
                </CustomHighlighter>
            </SectionContainer>
        </MainContainer>
    )

}

export default ClassInfo;
