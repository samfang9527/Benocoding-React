
import styled from "styled-components";
import { useState, useRef } from "react";
import { BACKEND_DOMAIN } from "../../../global/constant.js";
import axios from "axios";
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

const ContentWrapper = styled.div`
    width: 95%;
    border: 1px solid black;
    height: ${props => props.isShowContent ? '400px' : '0'};
    transition: height 0.3s ease-in-out;
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

const UploadProgress = styled.div`
    font-size: 24px;
    color: white;
    margin: 5px 10px;
`;

const UploadCancelBtn = styled.button`
    width: 80px;
    height: 40px;
    font-size: 20px;
    background-color: orange;
    color: white;
    cursor: pointer;
    :hover {
        background-color: darkorange;
    }
    border: none;
`;


const MilestoneItem = ({milestone, idx}) => {

    const apiInput = useRef(null);
    const testfile = useRef(null);

    const [ isShowContent, setIsShowContent ] = useState(false);
    const [ isUploading, setIsUploading ] = useState(false);

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

        // post function test api
        const { data } = await axios.post(
            BACKEND_DOMAIN + '/api/1.0/autotest/functiontest',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        console.log(data);

    }

    function handleAPITest(e) {
        e.preventDefault();
        // post api test api

    }

    return (
        <>
            <Block onClick={showContent}>
                <TitleWrapper>
                    <MenuOpenIcon sx={{fontSize: "50px", cursor: "pointer"}}></MenuOpenIcon>
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
                                        <form encType="multipart/form-data" onSubmit={handleFunctionTest}>
                                            <Notification>File Upload</Notification>
                                            <CustomFIleUpload type="file" name="testfile" ref={testfile}></CustomFIleUpload><br></br>
                                            <StartTestBtn type="submit">Submit</StartTestBtn>
                                        </form>
                                    </> : <>
                                        <Notification>API auto-test</Notification>
                                        <List>
                                            <ListItem>
                                                Your url: 
                                                <input ref={apiInput}></input>
                                            </ListItem>
                                        </List><br></br>
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
