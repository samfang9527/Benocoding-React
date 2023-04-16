
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../global/authContext.jsx";
import { getPullRequestDetail } from "../../../utils/apis/class.js";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Block = styled.div`
    height: 50px;
    width: 95%;
    border: 1px solid black;
    margin: 10px 0 0 0;
    cursor: pointer;
    
    :hover {
        background-color: bisque;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const BlockTitle = styled.p`
    font-size: 20px;
    padding: 0 20px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    border: 1px solid black;
    height: ${props => props.isShowContent ? '300px' : '0'};
    transition: height 0.3s ease-in-out;
    overflow: scroll;
`;

const ContentContainer = styled.div`
    font-size: 20px;
`;

const ContentTitle = styled.p`
    font-size: 30px;
    padding: 0 20px;
    margin: 0;
`;

const ContentDescription = styled.p`
    font-size: 20px;
    margin: 10px;
    padding: 0 20px;
    padding: 10px;
`;

const ChatGPTLogo = styled.img`
    width: 60px;
    height: 60px;
    display: inline;
    margin: 5px;
`;

const ChatGPTContainer = styled.div`
    display: flex;
    margin: 0 20px;
    border: 2px solid #E0E2DB;
    width: fit-content;
    align-items: center;
    justify-content: space-around;
    background-color: #E0E2DB;
    opacity: 0.8;
    border-radius: 4px;

    :hover {
        opacity: 1;
    }
`;


const PullRequestItem = ({data, classId}) => {

    const authContext = useContext(AuthContext);

    const [ isShowContent, setIsShowContent ] = useState(false);
    const [ detailData, setDetailData ] = useState({});

    const {
        commits,
        additions,
        deletions,
        html_url
    } = detailData;

    function showContent(e) {
        e.preventDefault();
        setIsShowContent(!isShowContent);
    }

    function handleGPTCodeReview(e) {
        e.preventDefault();
        // Generate GPT code review

    }

    useEffect(() => {
        if ( !authContext.isLoading ) {
            const { user } = authContext;
            getPullRequestDetail(user.userId, classId, data.number)
                .then(response => {
                    const { getPRDetail } = response;
                    setDetailData(getPRDetail);
                })
                .catch(err => {console.error(err)})
        }
    }, [authContext, classId, data.number])


    return (
        <Block>
            <TitleWrapper onClick={showContent}>
                <MenuOpenIcon sx={{fontSize: "30px", cursor: "pointer"}}></MenuOpenIcon>
                <BlockTitle>#{data.number} | {data.title} | {`( ${data.head} => ${data.base} )`}</BlockTitle>
            </TitleWrapper>
            <ContentWrapper isShowContent={isShowContent}>
                {
                    isShowContent ? <ContentContainer>
                        <ContentTitle>#PR Detail</ContentTitle>
                        <ContentDescription>Commits: {commits} | Additions: {additions} | Deletions: {deletions}</ContentDescription>
                        <ContentDescription>Pull request url: <a href={`${html_url}`}>{html_url}</a></ContentDescription>
                        <ChatGPTContainer onClick={handleGPTCodeReview}>
                            <ChatGPTLogo src="/ChatGPT_logo.png" alt="chatGPT_logo"></ChatGPTLogo>
                            <ContentDescription>Generate Code Review</ContentDescription>
                        </ChatGPTContainer>
                    </ContentContainer> : ''
                }
            </ContentWrapper>
        </Block>
    )
}

export default PullRequestItem;
