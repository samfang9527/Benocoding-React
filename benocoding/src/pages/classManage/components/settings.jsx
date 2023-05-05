
import styled from "styled-components";
import { useState, createContext } from "react";
import { CDN_DOMAIN, PRODUCTION_BACKEND_DOMAIN } from "../../../global/constant.js";
import axios from "axios";
import ReactPlayer from "react-player";
import { updateClassSettings } from "../../../utils/apis/class.js";
import { RiseLoader } from "react-spinners";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SettingMilestone from "./settingMilestones.jsx";

const MainContainer = styled.div`
    border: 5px solid black;
    border-radius: 20px;
    background-color: snow;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    position: relative;
    left: 50%;
    margin: 50px 20px 50px -40%;
`;

const EachBlock = styled.div`
    width: 100%;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.p`
    font-size: 28px;
`;

const SingleInput = styled.input`
    height: 50px;
    width: 90%;
    padding: 5px 10px;
    font-size: 20px;
`;

const TextArea = styled.textarea`
    width: 90%;
    height: 400px;
    overflow: scroll;
    font-size: 18px;
`;

const ClassImage = styled.img`
    width: 90%;
`;

const CustomFIleUpload = styled.input`
    margin: 10px 0;
    height: 70px;
    width: 90%;
    border-radius: 4px;
    padding: 10px;
    font-size: 22px;
    border: 2px dashed black;
    cursor: ${props => props.isUploadingImage ? "wait" : "pointer"};
    opacity: ${props => props.isUploadingImage ? "0.2" : "1"};

    ::file-selector-button {
        cursor: ${props => props.isUploadingImage ? "wait" : "pointer"};
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
        background-color: rgba(20, 20, 20, 0.2);
    }
`;

const ClassVideo = styled(ReactPlayer)`
    
`;

const UpdateBtn = styled.button`
    width: 100%;
    height: 80px;
    border: none;
    color: white;
    font-weight: bolder;
    font-size: 30px;
    background-color: orange;
    border-radius: 0 0 16px 16px;
    margin-top: 100px;
    cursor: ${props => props.isUploadingImage || props.isUploadingVideo || props.isUpdating ? "wait" : "pointer"};
    opacity: ${props => props.isUploadingImage || props.isUploadingVideo || props.isUpdating ? "0.2" : "1"};

    :hover {
        background-color: darkorange;
    }
`;

export const MilestoneContext = createContext({
    changedMilestones: {},
    setChangedMilestones: () => {}
})

const Settings = ({mutableData, classId}) => {

    const {
        className,
        classDesc,
        classStartDate,
        classEndDate,
        classImage,
        classVideo,
        milestones
    } = mutableData;

    const MySwal = withReactContent(Swal);
    const millisecondDay = 24 * 60 * 60 * 1000;
    const minStartDate = new Date( new Date().getTime() + millisecondDay );

    const [ changeContent, setChangeContent ] = useState({});
    const [ isUploadingImage, setIsUploadingImage ] = useState(false);
    const [ isUploadingVideo, setIsUploadingVideo ] = useState(false);
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ minEndDate, setMinEndDate ] = useState(getMinEndDate(new Date(classStartDate)));
    const [ imageSrc, setImageSrc ] = useState(`${CDN_DOMAIN + classImage}`);
    const [ videoUrl, setVideoUrl ] = useState(`${CDN_DOMAIN + classVideo}`);
    const [ changedMilestones, setChangedMilestones ] = useState(JSON.parse(JSON.stringify(milestones)))

    async function handleImageUpload(e) {
        e.preventDefault();

        const name = e.target.name;
        const file = e.target.files[0];
        if ( file ) {
            try {
                const originalName = file.name;
                const fileExtension = originalName.slice(originalName.lastIndexOf('.'));
                const type = file.type;
                setIsUploadingImage(true);

                // get presigned URL
                const url = await axios.post(`${PRODUCTION_BACKEND_DOMAIN}/fileUpload`, {fileExtension});
                
                // uploading file
                await axios.put(url.data, file, {
                    headers: {
                        "Content-Type": type
                    }
                })

                const fileUrl = url.data.split('?')[0];
                const fileName = fileUrl.slice(fileUrl.lastIndexOf('/') + 1);
                changeContent[name] = fileName;
                setImageSrc(`${CDN_DOMAIN + fileName}`);

            } catch (err) {
                console.error(err);
            } finally {
                setIsUploadingImage(false);
            }
        } else {
            delete changeContent[name];
            setImageSrc(`${CDN_DOMAIN + classImage}`);
        }
    }

    async function handleVideoUpload(e) {
        e.preventDefault();

        const name = e.target.name;
        const file = e.target.files[0];
        if ( file ) {
            try {
                const originalName = file.name;
                const fileExtension = originalName.slice(originalName.lastIndexOf('.'));
                const type = file.type;
                setIsUploadingVideo(true);

                // get presigned URL
                const url = await axios.post(`${PRODUCTION_BACKEND_DOMAIN}/fileUpload`, {fileExtension});
                
                // uploading file
                await axios.put(url.data, file, {
                    headers: {
                        "Content-Type": type
                    }
                })

                const fileUrl = url.data.split('?')[0];
                const fileName = fileUrl.slice(fileUrl.lastIndexOf('/') + 1);
                changeContent[name] = fileName;
                setVideoUrl(`${CDN_DOMAIN + fileName}`);

            } catch (err) {
                console.error(err);
            } finally {
                setIsUploadingVideo(false);
            }
        } else {
            delete changeContent[name];
            setVideoUrl(`${CDN_DOMAIN + classVideo}`);
        }
    }

    function handleSimpleInputUpdate(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        changeContent[name] = value;
        console.log(changeContent);
    }

    function handleUpdate(e) {
        // setIsUpdating(true);
        changeContent.milestones = changedMilestones;
        updateClassSettings(changeContent, classId)
            .then(res => {
                const { response } = res.updateClass;
                if ( response.statusCode === 200 ) {
                    MySwal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Updated!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    .then(result => {
                        if ( result.isConfirmed || result.isDismissed ) {
                            setIsUpdating(false);
                            setChangeContent({});
                            setChangedMilestones(JSON.parse(JSON.stringify(milestones)))
                            window.location.reload();
                        }
                    })
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    function getMinEndDate(startDate) {
        const millisecondDay = 86400000;
        return new Date(startDate.getTime() + millisecondDay).toISOString().slice(0, 10);
    }

    return (
        <MilestoneContext.Provider value={{
            changedMilestones,
            setChangedMilestones
        }}>
        <MainContainer>
            {className && ( 
                <EachBlock>
                    <Title>class name</Title>
                    <SingleInput
                        name="className"
                        defaultValue={className}
                        onChange={handleSimpleInputUpdate}
                    />
                </EachBlock> )}
            { classDesc && (
                <EachBlock>
                    <Title>class description</Title>
                    <TextArea
                        name="classDesc"
                        defaultValue={classDesc}
                        onChange={handleSimpleInputUpdate}
                    />
                </EachBlock> )}
            { classStartDate && ( 
                <EachBlock>
                    <Title>class start date</Title>
                    <SingleInput
                        type={"date"}
                        name="classStartDate"
                        defaultValue={classStartDate}
                        min={minStartDate.toISOString().slice(0, 10)}
                        onChange={(e) => {
                            const name = e.target.name;
                            const value = e.target.value;
                            setMinEndDate(getMinEndDate(new Date(value)));
                            changeContent[name] = value;
                        }}
                    />
                </EachBlock> )}
            { classEndDate && (
                <EachBlock>
                    <Title>class end date</Title>
                    <SingleInput
                        type={"date"}
                        name="classEndDate"
                        min={minEndDate}
                        onChange={handleSimpleInputUpdate}
                    />
                </EachBlock> )}
            { classImage && (
                <EachBlock>
                    <Title>class image</Title>
                    {
                        <>
                            <ClassImage
                                src={imageSrc}
                                alt={"class image"}
                            ></ClassImage>
                            <CustomFIleUpload
                                type={"file"}
                                accept="image/*"
                                name="classImage"
                                onChange={handleImageUpload}
                                isUploadingImage={isUploadingImage}
                                disabled={isUploadingImage}
                            ></CustomFIleUpload>
                        </>
                    }  
                </EachBlock> )}
            { classVideo && (
                <EachBlock>
                    <Title>class video</Title>
                    {
                        <>
                            <ClassVideo
                                url={videoUrl}
                                width={"90%"}
                                height={"auto"}
                                controls={true}
                            ></ClassVideo>
                            <CustomFIleUpload
                                type={"file"}
                                accept="video/*"
                                name="classVideo"
                                onChange={handleVideoUpload}
                                isUploadingImage={isUploadingVideo}
                                disabled={isUploadingVideo}
                            ></CustomFIleUpload>
                        </>
                    }
                </EachBlock> )}
            { milestones && (
                <EachBlock>
                    <Title>class milestones</Title>
                    <SettingMilestone milestones={milestones} changedMilestones={changedMilestones} setChangedMilestones={setChangedMilestones}/>
                </EachBlock>
            )}
            <UpdateBtn
                isUploadingImage={isUploadingImage}
                isUploadingVideo={isUploadingVideo}
                isUpdating={isUpdating}
                onClick={handleUpdate}
            >{ isUpdating ? <RiseLoader /> : 'Update' }</UpdateBtn>
        </MainContainer>
        </MilestoneContext.Provider>
    )
}

export default Settings;
