
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../global/authContext.jsx";
import { getPullRequestDetail } from "../../../utils/apis/class.js";
import { PulseLoader } from "react-spinners";
import { generateGPTCodeReview, listenGPTCodeReviewResult } from "../../../utils/socket/socket.js";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Block = styled.div`
    height: fit-content;
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
    padding: 0px 20px;
    line-height: 1.5;
    margin: 10px 0px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    border-top: 4px solid Gray;
    height: ${props => props.isShowContent ? '600px' : '0'};
    transition: height 0.3s ease-in-out;
    overflow: scroll;
    background-color: WhiteSmoke;
    border-radius: 4px;
`;

const ContentContainer = styled.div`
    font-size: 20px;
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

const CustomHighlighter = styled(SyntaxHighlighter)`
    margin: 10px 25px;
    font-size: 20px;
    line-height: 1;
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
            generateGPTCodeReview(detailData.diffData, data.number);
        }
        
    }

    useEffect(() => {
        if ( !authContext.isLoading ) {
            const { user } = authContext;
            getPullRequestDetail(user.userId, classId, data.number)
                .then(response => {
                    const { getPRDetail } = response;
                    if ( getPRDetail.response && getPRDetail.response.statusCode === 200 ) {
                        setDetailData(getPRDetail);
                    }
                })
                .catch(err => {})
            const codeReview = window.localStorage.getItem(`${classId}/${data.number}`);
            if ( codeReview ) {
                setCodeReview(codeReview);
            }
        }
    }, [authContext, classId, data.number])

    useEffect(() => {
        function onCodeReviewEvent(result, number) {
            if ( number === data.number ) {
                window.localStorage.setItem(`${classId}/${data.number}`, result);
                setCodeReview(result);
                setIsGeneratingCodeReview(false);
            }
            
        }

        listenGPTCodeReviewResult( onCodeReviewEvent, true );

        return () => {
            listenGPTCodeReviewResult( onCodeReviewEvent, false );
        };

    }, [data.number, classId])

    const styles = {
        lineHeight: '1.5',
    };

    return (
        <Block>
            <TitleWrapper onClick={showContent}>
                <div>
                    <BlockTitle style={{fontWeight: "bold", fontSize: "24px"}}>#{data.number} | {data.title}</BlockTitle>
                    <BlockTitle>{`( ${data.head} => ${data.base} )`}</BlockTitle>
                </div>
            </TitleWrapper>
            <ContentWrapper isShowContent={isShowContent}>
                {
                    isShowContent ? <ContentContainer>
                        <CustomHighlighter
                            language="markdown"
                            style={a11yLight}
                            wrapLongLines={true}
                            customStyle={styles}
                        >{body}</CustomHighlighter>
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
                            : 
                            <CustomHighlighter
                                language="markdown"
                                style={a11yLight}
                                wrapLongLines={true}
                                customStyle={styles}
                            >{codeReview}</CustomHighlighter>
                        }  
                    </ContentContainer> : ''
                }
            </ContentWrapper>
        </Block>
    )
}

export default PullRequestItem;
