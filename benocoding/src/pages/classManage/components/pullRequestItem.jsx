
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../global/authContext.jsx";
import { getPullRequestDetail } from "../../../utils/apis/class.js";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { socket } from "../../../utils/socket/socket.js";
import { PulseLoader } from "react-spinners";

const Block = styled.div`
    height: 50px;
    width: 95%;
    border: 4px solid Gray;
    margin: 10px 0 0 0;
    border-radius: 8px;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    background-color: Honeydew;
    cursor: pointer;

    :hover {
        background-color: bisque;
    }
`;

const BlockTitle = styled.p`
    font-size: 20px;
    padding: 0 20px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    border: 4px solid Gray;
    height: ${props => props.isShowContent ? '600px' : '0'};
    transition: height 0.3s ease-in-out;
    overflow: scroll;
    background-color: WhiteSmoke;
    border-radius: 4px;
`;

const ContentContainer = styled.div`
    font-size: 20px;
`;

const ContentTitle = styled.p`
    font-size: 32px;
    padding: 20px;
    margin: 0;
`;

const ContentDescription = styled.p`
    font-size: 22px;
    margin: 10px;
    padding: 0 20px;
    padding: 10px;
    white-space: pre-line;
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
    opacity: ${props => props.isGeneratingCodeReview ? '0.4' : '0.8'};
    border-radius: 4px;
    cursor: ${props => props.isGeneratingCodeReview ? 'wait' : 'pointer'};

    :hover {
        opacity: ${props => props.isGeneratingCodeReview ? '0.4' : '1'};
    }
`;


const PullRequestItem = ({data, classId}) => {

    const authContext = useContext(AuthContext);

    const [ isShowContent, setIsShowContent ] = useState(false);
    const [ detailData, setDetailData ] = useState({});
    const [ isGeneratingCodeReview, setIsGeneratingCodeReview ] = useState(false);
    const [ codeReview, setCodeReview ] = useState('');

    const {
        commits,
        additions,
        deletions,
        html_url,
        body
    } = detailData;

    function showContent(e) {
        e.preventDefault();
        setIsShowContent(!isShowContent);
    }

    function handleGPTCodeReview(e) {
        e.preventDefault();

        // Generate GPT code review
        if ( !isGeneratingCodeReview && codeReview === '' ) {
            setIsGeneratingCodeReview(true);
            socket.emit('codeReview', detailData.diffData);
        }
        
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
            const codeReview = window.localStorage.getItem(`${classId}/${data.number}`);
            if ( codeReview ) {
                setCodeReview(codeReview);
            }
        }
    }, [authContext, classId, data.number])

    useEffect(() => {
        function onCodeReviewEvent(result) {
            window.localStorage.setItem(`${classId}/${data.number}`, result);
            setCodeReview(result);
            setIsGeneratingCodeReview(false);
        }

        socket.on('codeReviewResult', onCodeReviewEvent);
        return () => {
            socket.off('codeReviewResult', onCodeReviewEvent);
        };

    }, [data.number, classId])


    return (
        <Block>
            <TitleWrapper onClick={showContent}>
                <MenuOpenIcon sx={{fontSize: "30px", cursor: "pointer"}}></MenuOpenIcon>
                <BlockTitle>#{data.number} | {data.title} | {`( ${data.head} => ${data.base} )`}</BlockTitle>
            </TitleWrapper>
            <ContentWrapper isShowContent={isShowContent}>
                {
                    isShowContent ? <ContentContainer>
                        <ContentTitle>{body}</ContentTitle>
                        <ContentDescription>Commits: {commits} | Additions: {additions} | Deletions: {deletions}</ContentDescription>
                        <ContentDescription>Pull request url: <a href={`${html_url}`}>{html_url}</a></ContentDescription>
                        {
                            codeReview === '' ? 
                            <ChatGPTContainer onClick={handleGPTCodeReview} isGeneratingCodeReview={isGeneratingCodeReview}>
                                <ChatGPTLogo src="/ChatGPT_logo.png" alt="chatGPT_logo"></ChatGPTLogo>
                                <ContentDescription>Generate Code Review</ContentDescription>
                                {
                                    isGeneratingCodeReview ? <PulseLoader></PulseLoader> : ''
                                } 
                            </ChatGPTContainer>
                            : <ContentDescription>{codeReview}</ContentDescription>
                        }  
                    </ContentContainer> : ''
                }
            </ContentWrapper>
        </Block>
    )
}

export default PullRequestItem;
