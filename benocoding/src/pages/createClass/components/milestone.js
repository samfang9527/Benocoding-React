
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

import { Box, LinearProgress } from "@mui/material";

const MilestoneWrapper = styled.div`
    width: 90%;
    height: 100%;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const Title = styled.p`
    padding: 5px;
    font-size: 30px;
`;

const SingleLineQuestion = styled.input`
    height: 50px;
    width: 80%;
    border: 2px solid white;
    border-radius: 4px;
    padding: 10px;
    font-size: 24px;
    cursor: text;
`;

const MultiLineQuestion = styled.textarea`
    height: 200px;
    width: 80%;
    border: 2px solid white;
    border-radius: 4px;
    padding: 10px;
    font-size: 24px;
    cursor: text;
`;

const CustomFIleUpload = styled.input`
    height: 70px;
    width: 80%;
    border-radius: 4px;
    padding: 10px;
    font-size: 22px;
    border: 2px dashed white;
    cursor: pointer;

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
        background-color: rgba(20, 20, 20, 95%);
    }
`;

const UploadBlock = styled.div`
    height: 90px;
    width: 350px;
    margin: 25px 0 0 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: black;
    border-radius: 12px;
    flex-wrap: wrap;
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

const Milestone = ({id}) => {

    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [uploadFilePercent, setUploadFilePercent] = useState(0);
    const [uploadFileCancel, setUploadFileCancel] = useState(null);

    function showUpload(isUploading, uploadPercent) {
        if ( isUploading ) {
            return (
                <UploadBlock>
                    <UploadProgress>Uploading: {uploadPercent}%</UploadProgress>
                    <UploadCancelBtn onClick={cancelUpload}>Cancel</UploadCancelBtn>
                    <br></br>
                    <Box sx={{ width: '90%' }}>
                        <LinearProgress variant="determinate" value={uploadPercent} />
                    </Box>
                </UploadBlock>
            )
        } else {
            return;
        }
    }

    function cancelUpload(e) {
        e.preventDefault();
        
        uploadFileCancel.cancel("Upload canceled by user");
        setIsUploadingFile(false);
        setUploadFilePercent(0);
    }

    async function handleFileUpload(e) {
        e.preventDefault();

        const file = e.target.files[0];
        if ( file ) {
            try {
                const originalName = file.name;
                const fileExtension = originalName.slice(originalName.lastIndexOf('.'));
                const type = file.type;

                // get presigned URL
                const url = await axios.post('http://localhost:8080/fileUpload', {fileExtension});

                // cancel token
                const source = axios.CancelToken.source();
                setUploadFileCancel(source);
                
                // uploading file
                const res = await axios.put(url.data, file, {
                    headers: {
                        "Content-Type": type
                    },
                    onUploadProgress: progressEvent => {
                        setIsUploadingFile(true);
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                        // 在前端顯示上傳進度
                        setUploadFilePercent(percentCompleted);

                    },
                    cancelToken: source.token
                })

                const fileUrl = url.data.split('?')[0];
                const fileName = fileUrl.slice(fileUrl.lastIndexOf('/') + 1);

                const fileSpan = document.getElementById(`milestone-file-${id}`);
                fileSpan.value = fileName;

            } catch (err) {
                console.error(err);
            } finally {
                setIsUploadingFile(false);
                setUploadFilePercent(0);
            }
        }
    }

    return (
        <MilestoneWrapper id={`milestone-${id}`}>
            <Title>{`Milestone ${id}`}</Title>
            <SingleLineQuestion className="milestone-name" placeholder="milestone title" required/>
            <Title>Milestone description</Title>
            <MultiLineQuestion className="milestone-desc" placeholder="milestone description" required/>
            <Title>Upload auto-test file</Title>
            <CustomFIleUpload type="file" accept=".js" onChange={handleFileUpload}/>   
            <span id={`milestone-file-${id}`} className="milestone-file" hidden></span>      
            <div>{showUpload(isUploadingFile, uploadFilePercent)}</div>
            <Title></Title>
        </MilestoneWrapper>
    )
    
}

export default Milestone;