
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef, createContext } from "react";
import { LinearProgress, Box} from "@mui/material";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Milestone from "./components/milestone";
import Tags from "./components/tags";
import { PRODUCTION_BACKEND_API_URL, PRODUCTION_BACKEND_DOMAIN } from "../../global/constant.js";
import { useNavigate } from "react-router"; 
import { CustomErrorAlert, ServerErrorAlert } from "../../utils/alert.js";

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;
    overflow: scroll;
    background-color: DimGrey;
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

const LoadingPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 50%;
    height: 60%;
    background-color: rgba(0, 0, 0, 90%);
    border-radius: 30px;
    z-index: 100;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 3px;
    top: 50%;
    margin-top: -25%;
`;

const GtiHubInfoLabel = styled.label`
    text-align: left;
    margin: 10px;
    width: 80%;
`;

export const MilestoneContext = createContext({
    milestones: [],
    setMilestones: ()=>{},
})

const CreateClass = () => {

    const millisecondDay = 24 * 60 * 60 * 1000;
    const minStartDate = new Date( new Date().getTime() + millisecondDay );

    const navigate = useNavigate();

    // Ref
    const className = useRef(null);
    const classDesc = useRef(null);
    const classStartDate = useRef(null);
    const classEndDate = useRef(null);
    const classImage = useRef(null);
    const classVideo = useRef(null);
    const githubRepo = useRef(null);
    const githubAccount = useRef(null);
    const githubAccessToken = useRef(null);
    const price = useRef(null);

    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [uploadImagePercent, setUploadImagePercent] = useState(0);
    const [uploadVideoPercent, setUploadVideoPercent] = useState(0);
    const [uploadImageCancel, setUploadImageCancel] = useState(null);
    const [uploadVideoCancel, setUploadVideoCancel] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [minEndDate, setMinEndDate] = useState(new Date( minStartDate + millisecondDay ).toISOString().slice(0, 10));

    // for milestones
    const [milestones, setMilestones] = useState([
        {
            milestone: '',
            milestoneDesc: '',
            autoTest: false,
            functionTest: false,
            functionName: '',
            functionTemplate: '',
            testCases: [],
            passed: false
        }
    ]);

    async function handleImageUpload(e) {
        e.preventDefault();

        const file = e.target.files[0];
        if ( file ) {
            try {
                const fileSizeInMB = file.size / (1024 * 1024);
                if (fileSizeInMB > 2) {
                    CustomErrorAlert("Image size should under 2MB")
                        .finally(() => {
                            e.target.value = null; // clear the input field
                        })
                    return;
                }

                const originalName = file.name;
                const fileExtension = originalName.slice(originalName.lastIndexOf('.'));
                const type = file.type;

                // get presigned URL
                const url = await axios.post(`${PRODUCTION_BACKEND_DOMAIN}/fileUpload`, {fileExtension});

                // cancel token
                const source = axios.CancelToken.source();
                setUploadImageCancel(source);
                
                // uploading file
                await axios.put(url.data, file, {
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
                const fileName = fileUrl.slice(fileUrl.lastIndexOf('/') + 1);
                
                // store image url in span
                const imageSpan = document.getElementById('image-url');
                imageSpan.value = fileName;

            } catch (err) {
                CustomErrorAlert("File upload failed")
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
                const fileSizeInMB = file.size / (1024 * 1024);
                if (fileSizeInMB > 100) {
                    CustomErrorAlert("Video size should under 100MB")
                        .finally(() => {
                            e.target.value = null; // clear the input field
                        })
                    return;
                }

                const originalName = file.name;
                const fileExtension = originalName.slice(originalName.lastIndexOf('.'));
                const type = file.type;

                // get presigned URL
                const url = await axios.post(`${PRODUCTION_BACKEND_DOMAIN}/fileUpload`, {fileExtension});

                // cancel token
                const source = axios.CancelToken.source();
                setUploadVideoCancel(source);
                
                // uploading file
                await axios.put(url.data, file, {
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
                const fileName = fileUrl.slice(fileUrl.lastIndexOf('/') + 1);

                // store video url in span
                const videoSpan = document.getElementById('video-url');
                videoSpan.value = fileName;

            } catch (err) {
                CustomErrorAlert("File upload failed")
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
        uploadBlock.value = null;
    }

    function showRemoveBtn() {
        if ( milestones.length > 1 ) {
            return (
                <RemoveMilestoneBtn onClick={removeMilestone}>-</RemoveMilestoneBtn>
            )
        }
    }

    function addMilestone(e) {
        e.preventDefault();
        const newMilestone = {
            milestone: '',
            milestoneDesc: '',
            autoTest: false,
            functionTest: false,
            functionName: '',
            functionTemplate: '',
            testCases: [],
            passed: false
        }
        setMilestones([...milestones, newMilestone]);
    }

    function removeMilestone(e) {
        e.preventDefault();
        setMilestones(milestones.slice(0, milestones.length-1));
    }

    async function createClass(e) {
        e.preventDefault();

        // check test cases format
        for ( let i = 0; i < milestones.length; i++ ) {
            const { autoTest, functionTest, functionName, testCases } = milestones[i];

            if ( !autoTest && !functionTest ) { continue };
            if ( testCases.length === 0 ) {
                CustomErrorAlert(`No test case on milestone${i}`);
                return;
            }

            if ( autoTest && functionTest ) {
                // check functionName, result
                if ( functionName.length === 0 ) {
                    CustomErrorAlert(`Function name is required on milestone ${i}`);
                    return;
                }

                for ( let j = 0; j < testCases.length; j++ ) {
                    const { result } = testCases[j];
                    if ( result.length === 0 ) {
                        CustomErrorAlert(`Test result is required on milestone${i}`);
                        return;
                    }
                }
            }

            if ( autoTest && !functionTest ) {
                // checkt method, statusCode, result
                for ( let j = 0; j < testCases.length; j++ ) {
                    const { method, statusCode, result } = testCases[j];
                    if ( method.length === 0 ) {
                        CustomErrorAlert(`Method is required on milestone${i}`);
                        return;
                    }

                    if ( statusCode.length === 0 ) {
                        CustomErrorAlert(`Status code is required on milestone${i}`);
                        return;
                    }

                    if ( result.length === 0 ) {
                        CustomErrorAlert(`Test result is required on milestone${i}`);
                        return;
                    }
                }
            }
        }

        const ownerId = userInfo.userId;
        const classTags = [];
        const tagsElements = document.getElementsByClassName('class-tags');
        for ( const tag of tagsElements ) {
            const input = tag.firstChild.firstChild.checked;
            if ( input ) {
                classTags.push(tag.lastChild.textContent);
            }   
        }

        const postData = {
            ownerId,
            className: className.current.value,
            classDesc: classDesc.current.value,
            classStartDate: classStartDate.current.value,
            classEndDate: classEndDate.current.value,
            classImage: classImage.current.value,
            classVideo: classVideo.current.value,
            classTags,
            milestones,
            price: Number(price.current.value),
            gitHub: {
                repo: githubRepo.current.value,
                owner: githubAccount.current.value,
                accessToken: githubAccessToken.current.value
            }
        }

        const graphqlMutation = {
            operationName: "createClass",
            query: `
                mutation createClass($data: InputData!) {
                    createClass(data: $data) {
                        response {
                            statusCode,
                            responseMessage
                        },
                        className,
                        teacherName,
                        classImage,
                        classTags
                    }
                }
            `,
            variables: {
                data: postData
            }
        }

        try {
            setIsSubmitting(true);
            await axios({
                method: "POST",
                url: PRODUCTION_BACKEND_API_URL,
                headers: {
                    "Content-Type": "application/json",
                    "token": window.localStorage.getItem("jwt")
                },
                data: graphqlMutation
            })
            setTimeout(() => {
                setIsSubmitting(false);
                navigate('/creater');
            }, 1000);
            
        } catch (err) {
            CustomErrorAlert("Class create failed")
        }
    }

    function showLoading() {
        return (
            <LoadingPage>
                <p style={{
                    marginBottom: '50px',
                    color: "white"
                }}>課程建立中</p>
                <ClimbingBoxLoader
                    color="darkorange"
                    size={40}
                    loading={isSubmitting}
                ></ClimbingBoxLoader>
            </LoadingPage>
        )
    }

    async function jwtValidation(jwt) { 
      try {
        const data = await axios({
          url: PRODUCTION_BACKEND_API_URL,
          headers: {
            "Content-Type": "application/json",
            "token": jwt
          },
          method: "POST",
          data: {
            query: `
              query {
                jwtValidate {
                  userId,
                  username
                }
              }
            `
          }
        })
        return data;
      } catch (err) {
        
      }
    }

    useEffect(() => {
        const jwt = window.localStorage.getItem('jwt');
        if ( !jwt ) {
            CustomErrorAlert( 'Please sign in to continue' )
            .then(result => {
                if ( result.isConfirmed || result.isDismissed ) {
                    navigate('/login');
                }
            })
        }
        
        jwtValidation(jwt)
            .then(result => {
                if ( !result ) {
                    CustomErrorAlert( 'Authorization failed, please sign in again' )
                    .then(result => {
                        if ( result.isConfirmed || result.isDismissed ) {
                            navigate('/login');
                        }
                    })
                } else {
                    setUserInfo(result.data.data.jwtValidate);
                }
            })
            .catch(err => {
                ServerErrorAlert()
                .then(result => {
                    if ( result.isConfirmed || result.isDismissed ) {
                        navigate('/');
                    }
                })
            })
    }, [ navigate ]);

    return (
        <MilestoneContext.Provider value={{
            milestones,
            setMilestones
        }}>
            <Wrapper>
                {isSubmitting ? showLoading() : ''}
                <Form onSubmit={createClass}>
                    <Block style={{
                        position: "sticky",
                        top: "0",
                        margin: "0"
                    }}>
                        <Title style={{
                            backgroundColor: "#27AE60",
                            width: "100%",
                            height: "100px",
                            textAlign: "center",
                            fontSize: "40px",
                            padding: "20px 0",
                            margin: "0 0 30px 0"
                        }}>開始建立課程</Title>
                    </Block>
                    <Block>
                        <Title>課程名稱</Title>
                        <SingleLineQuestion id="class-name" name="className" placeholder="課程名稱" ref={className} required/>
                    </Block>
                    <Block>
                        <Title>課程簡介</Title>
                        <MultiLineQuestion id="class-desc" name="classDesc" placeholder="課程簡介" ref={classDesc} required/>
                    </Block>
                    <Block>
                        <Title>課程開始日期</Title>
                        <SingleLineQuestion id="start-date" type="date" ref={classStartDate} required
                            min={minStartDate.toISOString().slice(0, 10)}
                            onChange={(e) => {
                                const newMinEndDate = new Date( new Date(e.target.value).getTime() + millisecondDay).toISOString().slice(0, 10);
                                setMinEndDate(newMinEndDate);
                                if ( newMinEndDate > classEndDate.current.value ) {
                                    classEndDate.current.value = newMinEndDate;
                                }
                            }}/>
                    </Block>
                    <Block>
                        <Title>課程結束日期</Title>
                        <SingleLineQuestion id="end-date" type="date" ref={classEndDate} required min={minEndDate}/>
                    </Block>
                    <Block>
                        <Title>課程封面</Title>
                        <CustomFIleUpload id="upload-image" type="file" accept="image/*" onChange={handleImageUpload} required/>
                        <span id="image-url" hidden ref={classImage}></span>
                        <div>{showUpload("image", isUploadingImage, uploadImagePercent)}</div>
                    </Block>
                    <Block>
                        <Title>課程影片</Title>
                        <CustomFIleUpload id="upload-video" type="file" accept="video/*" onChange={handleVideoUpload} required/>    
                        <span id="video-url" hidden ref={classVideo}></span>     
                        <div>{showUpload("video", isUploadingVideo, uploadVideoPercent)}</div>
                    </Block>
                    <Block>
                        <Title>課程標籤</Title>
                        <Tags />
                    </Block>
                    <Block>
                        <Title>課程價格</Title>
                        <SingleLineQuestion id="price" ref={price} max={10000} min={0} required type="number"></SingleLineQuestion>
                    </Block>
                    <Block>
                        <Title>GitHub Info</Title>
                        <GtiHubInfoLabel htmlFor="repo">Repo name</GtiHubInfoLabel>
                        <SingleLineQuestion id="repo" ref={githubRepo}></SingleLineQuestion>
                        <GtiHubInfoLabel htmlFor="account">GitHub account</GtiHubInfoLabel>
                        <SingleLineQuestion id="account" ref={githubAccount}></SingleLineQuestion>
                        <GtiHubInfoLabel htmlFor="token">GitHub access token</GtiHubInfoLabel>
                        <SingleLineQuestion id="token" ref={githubAccessToken}></SingleLineQuestion>
                    </Block>
                    <Block>
                        <Title>課程安排</Title>
                        {
                            milestones.map((ele, idx) => {
                                return (
                                    <Milestone
                                        key={idx}
                                        idx={idx}
                                    />
                                )
                            })
                        }
                        <MilestoneBtnContainer>
                            {showRemoveBtn()}
                            <AddMilestoneBtn onClick={addMilestone}>+</AddMilestoneBtn>
                        </MilestoneBtnContainer>
                    </Block>
                    <Block>
                        <SubmitBtn>建立課程</SubmitBtn>
                    </Block>
                </Form>
            </Wrapper>
        </MilestoneContext.Provider>
    )
}

export default CreateClass;