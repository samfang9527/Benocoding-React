
import styled from "styled-components";
import { useState, useRef, useContext } from "react";
import { BACKEND_DOMAIN } from "../../../global/constant.js";
import axios from "axios";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { MoonLoader } from "react-spinners";
import { AuthContext } from "../../../global/authContext.jsx";

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

const ContentTitle = styled.p`
    font-size: 30px;
    padding: 0 20px;
    margin: 0;
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
    width: 100px;
    height: 40px;
    margin: 0px 20px;
    background-color: orange;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;

    :hover {
        background-color: darkorange;
    }
`;

const TestResultContainer = styled.div`
    display: flex;
    margin: 20px;
`;

const TestResultItem = styled.div`
    height: fit-content;
    padding: 10px;
    border: ${props => props.passed ? '4px solid #43C59E' : '4px solid #E07A5F'};
`;

const TestResultDescription = styled.p`
    font-size: 18px;
    margin: 5px 0;
`;

const CustomLoader = styled(MoonLoader)`
    margin: 0 20px;
`;


const MilestoneItem = ({milestone, idx, classId}) => {

    const authContext = useContext(AuthContext);
    const apiInput = useRef(null);
    const testfile = useRef(null);

    const [ isShowContent, setIsShowContent ] = useState(false);
    const [ isTesting, setIsTesting ] = useState(false);
    const [ testResults, setTestResults ] = useState([]);

    const { user } = authContext;
    const {
        autoTest,
        functionTest,
        functionName,
        testCases
    } = milestone;

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
        const { data } = await axios.post(
            BACKEND_DOMAIN + '/api/1.0/autotest/functiontest',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        console.log(data.testResults);
        setTestResults(data.testResults);
        setIsTesting(false);
    }

    async function handleAPITest(e) {
        e.preventDefault();
        const targetUrl = apiInput.current.value;

        // post api test api
        setIsTesting(true);
        const { data } = await axios.post(
            BACKEND_DOMAIN + '/api/1.0/autotest/apitest',
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
        console.log(data);
        setTestResults(data);
        setIsTesting(false);

    }

    return (
        <>
            <Block onClick={showContent}>
                <TitleWrapper>
                    <MenuOpenIcon sx={{fontSize: "30px", cursor: "pointer"}}></MenuOpenIcon>
                    <BlockTitle>{milestone.milestone}</BlockTitle>
                </TitleWrapper>
            </Block>
            <ContentWrapper isShowContent={isShowContent}>
                {
                    isShowContent ? <ContentContainer>
                        <ContentTitle># {milestone.milestoneDesc}</ContentTitle>
                        {
                            autoTest ? <>
                                {
                                    functionTest ? <>
                                        <Notification>Function auto-test</Notification>
                                        <List>
                                            <ListItem>Your function name should be: {functionName}</ListItem>
                                        </List>
                                        {
                                            testResults.length > 0 ? <TestResultContainer>
                                                {
                                                    testResults.map((res, idx) => {
                                                        return <TestResultItem passed={res.passed} key={idx + res.case}>
                                                            <TestResultDescription>Case: {res.case}</TestResultDescription>
                                                            <TestResultDescription>Inputs: {res.inputs}</TestResultDescription>
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
                                                <CustomFIleUpload type="file" name="testfile" ref={testfile}></CustomFIleUpload><br></br>
                                                <StartTestBtn type="submit">Submit</StartTestBtn>
                                            </form>
                                        }
                                        
                                        
                                    </> : <>
                                        <Notification>API auto-test</Notification>
                                        <List>
                                            {
                                                isTesting ? <CustomLoader color="Crimson" size={40}></CustomLoader> : 
                                                <ListItem>
                                                    Your url: 
                                                    <input ref={apiInput}></input>
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
                                        <StartTestBtn onClick={handleAPITest}>Submit</StartTestBtn>
                                    </>
                                }
                            </> : <Notification>No auto-test at this milestone</Notification>
                        }
                    </ContentContainer> : ''
                }
            </ContentWrapper>
        </>
    )
}

export default MilestoneItem;
