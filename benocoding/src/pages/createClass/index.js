
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

import { LinearProgress, Box } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { cyan, amber } from '@mui/material/colors';

import Milestone from "./components/milestone";
import Tags from "./components/tags";

const Wrapper = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;
    overflow: scroll;
    background-color: rgba(40, 40, 40, 50%);
    justify-content: space-between;
`;

const Block = styled.div`
    display: flex;
    font-size: 22px;
    color: white;
    margin: 25px 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;
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

const SubmitBtn = styled.button`
    width: 200px;
    height: 70px;
    background-color: orange;
    color: white;
    font-size: 26px;
    margin: 20px 0 40px 0;
    cursor: pointer;

    :hover {
        background-color: darkorange;
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

const MilestoneBtnContainer = styled.div`
    width: 150px;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const AddMilestoneBtn = styled.button`
    width: 50px;
    height: 50px;
    border: none;
    font-size: 30px;
    background-color: orange;
    color: white;
    cursor: pointer;
    :hover {
        background-color: darkorange;
    }
`;

const RemoveMilestoneBtn = styled.button`
    width: 50px;
    height: 50px;
    border: none;
    font-size: 30px;
    background-color: orange;
    color: white;
    cursor: pointer;
    :hover {
        background-color: darkorange;
    }
`;


const CreateClass = () => {

    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [uploadImagePercent, setUploadImagePercent] = useState(0);
    const [uploadVideoPercent, setUploadVideoPercent] = useState(0);
    const [uploadImageCancel, setUploadImageCancel] = useState(null);
    const [uploadVideoCancel, setUploadVideoCancel] = useState(null);
    const [milestones, setMilestones] = useState([0]);

    async function handleImageUpload(e) {
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
                setUploadImageCancel(source);
                
                // uploading file
                const res = await axios.put(url.data, file, {
                    headers: {
                        "Content-Type": type
                    },
                    onUploadProgress: progressEvent => {
                        setIsUploadingImage(true);
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        
                        // 在前端顯示上傳進度
                        setUploadImagePercent(percentCompleted);

                    },
                    cancelToken: source.token
                })

                const fileUrl = url.data.split('?')[0];
                
                // store image url in span
                const imageSpan = document.getElementById('image-url');
                imageSpan.value = fileUrl;

            } catch (err) {
                console.error(err);
            } finally {
                setIsUploadingImage(false);
                setUploadImagePercent(0);
            }
        }
    }

    async function handleVideoUpload(e) {
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
                setUploadVideoCancel(source);
                
                // uploading file
                const res = await axios.put(url.data, file, {
                    headers: {
                        "Content-Type": type
                    },
                    onUploadProgress: progressEvent => {
                        setIsUploadingVideo(true);
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                        // 在前端顯示上傳進度
                        setUploadVideoPercent(percentCompleted);

                    },
                    cancelToken: source.token
                })

                const fileUrl = url.data.split('?')[0];
                file.name = fileUrl;

                // store video url in span
                const videoSpan = document.getElementById('video-url');
                videoSpan.value = fileUrl;

            } catch (err) {
                console.error(err);
            } finally {
                setIsUploadingVideo(false);
                setUploadVideoPercent(0);
            }
        }
    }

    function showUpload(type, isUploading, uploadPercent) {
        if ( isUploading ) {
            return (
                <UploadBlock>
                    <UploadProgress>Uploading: {uploadPercent}%</UploadProgress>
                    <UploadCancelBtn id={type} onClick={cancelUpload}>Cancel</UploadCancelBtn>
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
        
        const type = e.target.id;
        
        if ( type === "image" ) {
            uploadImageCancel.cancel("Upload canceled by user");
            setIsUploadingImage(false);
            setUploadImagePercent(0);
        }

        if ( type === "video" ) {
            uploadVideoCancel.cancel("Upload canceled by user");
            setIsUploadingVideo(false);
            setUploadVideoPercent(0);
        }

        const uploadBlock = document.getElementById(`upload-${type}`)
        uploadBlock.value = '';
    }

    function showRemoveBtn() {
        if ( milestones.length > 1 ) {
            return (
                <RemoveMilestoneBtn onClick={removeMilestone}>-</RemoveMilestoneBtn>
            )
        }
    }

    function addMilestone() {
        setMilestones([...milestones, milestones.length]);
    }

    function removeMilestone() {
        setMilestones(milestones.slice(0, milestones.length-1));
    }

    async function createClass(e) {
        e.preventDefault();

        // graphql mutaion => add classInfo

        const ownerId = "642bfa7de0cb3322463c877c";
        const className = document.getElementById('class-name').value;
        const classDesc = document.getElementById('class-desc').value;
        const teacherName = "tester001";
        const classStartDate = document.getElementById('start-date').value;
        const classEndDate = document.getElementById('end-date').value;
        const classImage = document.getElementById('image-url').value;
        const classVideo = document.getElementById('video-url').value;
        const classTags = [];
        const tagsElements = document.getElementsByClassName('class-tags');
        for ( const tag of tagsElements ) {
            const input = tag.firstChild.firstChild.checked;
            if ( input ) {
                classTags.push(tag.lastChild.textContent);
            }   
        }
        const classMilestones = milestones.map((ele) => {
            const milestoneData = document.getElementById(`milestone-${ele}`);
            const milestone = milestoneData.getElementsByClassName('milestone-name')[0].value;
            const milestoneDesc = milestoneData.getElementsByClassName('milestone-desc')[0].value;
            const autoTest = milestoneData.getElementsByClassName('milestone-file')[0].value;
            return {
                milestone,
                milestoneDesc,
                autoTest
            }
        })

        const data = {
            ownerId,
            className,
            classDesc,
            teacherName,
            classStartDate,
            classEndDate,
            classImage,
            classVideo,
            classTags,
            milestones: classMilestones
        }

        const graphqlMutation = {
            operationName: "createClass",
            query: `
                mutation createClass($data: InputData!) {
                    createClass(data: $data) {
                        className,
                        teacherName,
                        classImage,
                        classTags
                    }
                }
            `,
            variables: {
                data: data
            }
        }

        try {
            const { data } = await axios({
                method: "POST",
                url: "http://localhost:8080/graphql",
                headers: {
                    "Content-Type": "application/json"
                },
                data: graphqlMutation
            })

            console.log(data);

            

        } catch (err) {
            console.error(err);
        }
        
    }

    return (
        <Wrapper>
            <Form onSubmit={createClass}>
                <Block>
                    <Title>課程名稱</Title>
                    <SingleLineQuestion id="class-name" name="className" placeholder="課程名稱" required/>
                </Block>
                <Block>
                    <Title>課程簡介</Title>
                    <MultiLineQuestion id="class-desc" name="classDesc" placeholder="課程簡介" required/>
                </Block>
                <Block>
                    <Title>課程開始日期</Title>
                    <SingleLineQuestion id="start-date" type="date" required/>
                </Block>
                <Block>
                    <Title>課程結束日期</Title>
                    <SingleLineQuestion id="end-date" type="date" required/>
                </Block>
                <Block>
                    <Title>課程封面</Title>
                    <CustomFIleUpload id="upload-image" type="file" accept="image/*" onChange={handleImageUpload} required/>
                    <span id="image-url" hidden></span>
                    <div>{showUpload("image", isUploadingImage, uploadImagePercent)}</div>
                </Block>
                <Block>
                    <Title>課程影片</Title>
                    <CustomFIleUpload type="file" accept="video/*" onChange={handleVideoUpload}/>    
                    <span id="video-url" hidden></span>     
                    <div>{showUpload("video", isUploadingVideo, uploadVideoPercent)}</div>
                </Block>
                <Block>
                    <Title>課程標籤</Title>
                    <Tags />
                </Block>
                <Block>
                    <Title>課程安排</Title>
                    {
                        milestones.map((ele, idx) => {
                            return (
                                <Milestone key={idx} id={idx}/>
                            )
                        })
                    }
                    <MilestoneBtnContainer>
                        <AddMilestoneBtn onClick={addMilestone}>+</AddMilestoneBtn>
                        {showRemoveBtn()}
                    </MilestoneBtnContainer>
                    
                </Block>
                <Block>
                    <SubmitBtn>建立課程</SubmitBtn>
                </Block>
            </Form>
        </Wrapper>
    )
}

export default CreateClass;