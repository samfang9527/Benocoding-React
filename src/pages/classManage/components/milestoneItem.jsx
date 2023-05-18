
import styled from "styled-components";
import { useState, useRef, useContext } from "react";
import { PRODUCTION_BACKEND_DOMAIN } from "../../../global/constant.js";
import axios from "axios";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { MoonLoader } from "react-spinners";
import { AuthContext } from "../../../global/authContext.jsx";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sublimeInit } from '@uiw/codemirror-theme-sublime';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CustomErrorAlert } from "../../../utils/alert.js";

const Block = styled.div`
    height: 50px;
    width: 95%;
    border: 1px solid black;
    margin: 10px 0 0 0;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    background-color: ${props => props.passed ? 'MediumAquamarine' : ''}; 
    
    :hover {
        background-color: ${props => props.passed ? 'MediumAquamarine' : 'Bisque'}; 
    }
`;

const ContentWrapper = styled.div`
    width: 95%;
    border: 1px solid black;
    height: ${props => props.isShowContent ? '500px' : '0'};
    transition: height 0.3s ease-in-out;
    overflow: scroll;
`;

const ContentContainer = styled.div`
    font-size: 20px;
`;

const BlockTitle = styled.p`
    font-size: 20px;
    padding: 0 20px;
`;

const BlockWrapper = styled.div`
    border: 5px solid rgba(0, 0, 0, 0.2);
    margin: 15px 5px;
    border-radius: 5px;
`;

const Notification = styled.p`
    font-size: 24px;
    padding: 20px 20px 0px 20px;
    margin: 0;
`;

const List = styled.ul`
    margin: 0;
`;

const ListItem = styled.li`
    margin: 5px 0px;
`;

const CustomFIleUpload = styled.input`
    height: 70px;
    width: 400px;
    border-radius: 4px;
    padding: 10px;
    font-size: 20px;
    border: 3px dashed gray;
    cursor: pointer;
    margin: 20px;

    ::file-selector-button {
        cursor: pointer;
        background-color: darkorange;
        border: none;
        border-radius: 6px;
        color: white;
        padding: 5px 5px;
        margin: 5px 20px 0 10px;
        width: 150px;
        letter-spacing: 2px;
    }

    :hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const StartTestBtn = styled.button`
    width: 400px;
    height: 40px;
    margin: 0px 20px 50px 20px;
    background-color: rgba(200, 140, 100, 0.8);
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
    border-radius: 10px;

    :hover {
        background-color: rgba(200, 140, 100, 0.7);
    }
`;

const TestResultContainer = styled.div`
    display: flex;
    margin: 20px;
    flex-wrap: wrap;
`;

const TestResultItem = styled.div`
    height: fit-content;
    padding: 10px;
    border: ${props => props.passed ? '4px solid #43C59E' : '4px solid #E07A5F'};
    margin: 10px;
`;

const TestResultDescription = styled.p`
    font-size: 18px;
    margin: 5px 0;
    white-space: pre;
`;

const CustomLoader = styled(MoonLoader)`
    margin: 0 20px;
`;

const APITestInput = styled.input`
    height: 30px;
    font-size: 22px;
    margin: 0 20px;
    width:  400px;
`;

const NoTestInfo = styled.div`
    width: fit-content;
    letter-spacing: 2px;
    line-height: 2;
    margin: 0 10px;
    border: 5px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 10px;
`;


const MilestoneItem = ({milestone, idx, classId}) => {

    const authContext = useContext(AuthContext);
    const apiInput = useRef(null);
    const testfile = useRef(null);

    const { user } = authContext;
    const {
        passed,
        autoTest,
        functionTest,
        functionName,
        functionTemplate,
        testCases
    } = milestone;

    const [ isShowContent, setIsShowContent ] = useState(false);
    const [ isTesting, setIsTesting ] = useState(false);
    const [ testResults, setTestResults ] = useState([]);
    const [ testPassed, setTestPassed ] = useState(passed);

    function showContent(e) {
        e.preventDefault();
        setIsShowContent(!isShowContent);
    }

    async function handleFunctionTest(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('testfile', testfile);
        formData.append('functionName', functionName);
        formData.append('testCases', JSON.stringify(testCases));
        formData.append('milestoneIdx', idx);
        formData.append('classId', classId);
        formData.append('userId', user.userId);

        // post function test api
        setIsTesting(true);
        try {
            const { data } = await axios.post(
                PRODUCTION_BACKEND_DOMAIN + '/api/1.0/autotest/functiontest',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            const { testResults, err } = data;
            if ( err ) {
                CustomErrorAlert("Failed to test, please check your file format or contact to the teacher");
                return;
            }
            setTestResults(testResults);
    
            let allPassed = true;
            testResults.forEach(element => {
                if ( !element.passed ) {
                    allPassed = false;
                }
            });
            setTestPassed(allPassed);
        } catch (err) {
            CustomErrorAlert("Network error");
        } finally {
            setIsTesting(false);
        }
    }

    async function handleAPITest(e) {
        e.preventDefault();
        const targetUrl = apiInput.current.value;

        // post api test api
        setIsTesting(true);
        try {
            const { data } = await axios.post(
                PRODUCTION_BACKEND_DOMAIN + '/api/1.0/autotest/apitest',
                {
                    classId,
                    userId: user.userId,
                    milestoneIdx: idx,
                    targetUrl,
                    testCases: JSON.stringify(testCases)
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const { testResults, err } = data;
            if ( err ) {
                CustomErrorAlert("Failed to test, please check your url format or contact to the teacher");
                return;
            }
            setTestResults(testResults);

            let allPassed = true;
            testResults.forEach(element => {
                if ( !element.passed ) {
                    allPassed = false;
                }
            });
            setTestPassed(allPassed);
        } catch (err) {
            CustomErrorAlert("Network error");
        } finally {
            setIsTesting(false);
        }
    }

    return (
        <>
            <Block onClick={showContent}>
                <TitleWrapper passed={testPassed}>
                    <MenuOpenIcon sx={{fontSize: "30px", cursor: "pointer"}}></MenuOpenIcon>
                    <BlockTitle>{ testPassed ? milestone.milestone + ' | Passed' : milestone.milestone}</BlockTitle>
                </TitleWrapper>
            </Block>
            <ContentWrapper isShowContent={isShowContent}>
                {
                    isShowContent ? <ContentContainer>
                        <SyntaxHighlighter language="javascript" style={a11yLight} wrapLongLines={true}>
                            {milestone.milestoneDesc}
                        </SyntaxHighlighter>
                        {
                            autoTest ? <>
                                {
                                    functionTest ? <BlockWrapper>
                                        <Notification>Function auto-test</Notification>
                                        <List>
                                            <ListItem>Your function name should be: {functionName}</ListItem>
                                            <ListItem>
                                                Your function should looks like: <br />
                                                <CodeMirror
                                                    value={functionTemplate}
                                                    extensions={[javascript({ jsx: true })]}
                                                    theme={sublimeInit({
                                                        settings: {
                                                            caret: '#c6c6c6',
                                                            fontFamily: 'monospace'
                                                        }
                                                    })}
                                                    style={{margin: "20px -10px", width: "90%"}}
                                                />
                                            </ListItem>
                                        </List>
                                        {
                                            testResults.length > 0 ? <TestResultContainer>
                                                {
                                                    testResults.map((res, idx) => {
                                                        return <TestResultItem passed={res.passed} key={idx + res.case}>
                                                            <TestResultDescription>Case: {res.case}</TestResultDescription>
                                                            <TestResultDescription>Input1: {res.inputs[0]}</TestResultDescription>
                                                            <TestResultDescription>Input2: {res.inputs[1]}</TestResultDescription>
                                                            <TestResultDescription>Expect {res.expectedResult} | Got {res.execResult}</TestResultDescription>
                                                        </TestResultItem>
                                                    })
                                                }
                                            </TestResultContainer> : ''
                                        }
                                        {
                                            isTesting ? <CustomLoader color="Crimson" size={40}></CustomLoader>
                                            : <form encType="multipart/form-data" onSubmit={handleFunctionTest}>
                                                <Notification>File Upload</Notification>
                                                <CustomFIleUpload type="file" name="testfile" ref={testfile} required={true}></CustomFIleUpload><br></br>
                                                <StartTestBtn type="submit">Test!</StartTestBtn>
                                            </form>
                                        }
                                        
                                        
                                    </BlockWrapper> : <>
                                        <Notification>API auto-test</Notification>
                                        <List>
                                            {
                                                isTesting ? <CustomLoader color="Crimson" size={40}></CustomLoader> : 
                                                <ListItem>
                                                    Your url: 
                                                    <APITestInput ref={apiInput} defaultValue="https://api.benocoding.com/test/api"></APITestInput>
                                                </ListItem>
                                            }
                                        </List><br></br>
                                        {
                                            testResults.length > 0 ? <TestResultContainer>
                                                {
                                                    testResults.map((res, idx) => {
                                                        return <TestResultItem passed={res.passed} key={idx + res.case}>
                                                            <TestResultDescription>Case: {res.case}</TestResultDescription>
                                                            <TestResultDescription>Expect status: {res.expectedStatus} | Got {res.execStatus}</TestResultDescription>
                                                            <TestResultDescription>Expect result: {res.expectedData} | Got {res.execData}</TestResultDescription>
                                                        </TestResultItem>
                                                    })
                                                }
                                            </TestResultContainer> : ''
                                        }
                                        <StartTestBtn onClick={handleAPITest}>Test!</StartTestBtn>
                                    </>
                                }
                            </> :  <NoTestInfo>No auto test on this milestone</NoTestInfo>
                        }
                    </ContentContainer> : ''
                }
            </ContentWrapper>
        </>
    )
}

export default MilestoneItem;
