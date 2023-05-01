
import styled from "styled-components";
import { useState } from "react";
import { CDN_DOMAIN, PRODUCTION_BACKEND_DOMAIN } from "../../../global/constant.js";
import axios from "axios";
import ReactPlayer from "react-player";
import { updateClassSettings } from "../../../utils/apis/class.js";
import { RiseLoader } from "react-spinners";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    width: 95%;
    margin: 20px;
`;

const Title = styled.p`
    font-size: 28px;
`;

const SingleInput = styled.input`
    height: 50px;
    width: 90%;
    padding: 5px 10px;
    opacity: ${props => props.block ? '0.5' : '1'};
    font-size: 20px;
`;

const TextArea = styled.textarea`
    width: 90%;
    height: 400px;
    overflow: scroll;
    opacity: ${props => props.block ? '0.5' : '1'};
    font-size: 18px;
`;

const EditBtn = styled.button`
    height: 50px;
    width: 50px;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
    background-color: MediumSeaGreen;
    color: white;
    cursor: pointer;

    :hover {
        background-color: YellowGreen;
    }
`;

const ClassImage = styled.img`
    width: 90%;
`;

const CustomFIleUpload = styled.input`
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

const Settings = ({mutableData, classId}) => {

    const MySwal = withReactContent(Swal);

    const [ infoArray, setInfoArray ] = useState(Object.entries(mutableData));
    const [ elementList, setElementList ] = useState(infoArray.map(()=>{return true}));
    const [ changeContent, setChangeContent ] = useState({});
    const [ isUploadingImage, setIsUploadingImage ] = useState(false);
    const [ isUploadingVideo, setIsUploadingVideo ] = useState(false);
    const [ isUpdating, setIsUpdating ] = useState(false);

    async function handleImageUpload(e) {
        e.preventDefault();

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
                
                const idx = e.target.name;

                elementList[idx] = !elementList[idx];
                setElementList(elementList.slice());

                changeContent[infoArray[idx][0]] = fileName;
                setChangeContent({...changeContent});
                
                infoArray[idx][1] = fileName;
                setInfoArray(infoArray.slice());

            } catch (err) {
                console.error(err);
            } finally {
                setIsUploadingImage(false);
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
                
                const idx = e.target.name;

                elementList[idx] = !elementList[idx];
                setElementList(elementList.slice());

                changeContent[infoArray[idx][0]] = fileName;
                setChangeContent({...changeContent});
                
                infoArray[idx][1] = fileName;
                setInfoArray(infoArray.slice());

            } catch (err) {
                console.error(err);
            } finally {
                setIsUploadingVideo(false);
            }
        }
    }

    function renderSimpleInput(value, idx) {
        return (
            <div>
                <SingleInput
                    defaultValue={value}
                    readOnly={elementList[idx]}
                    block={elementList[idx]}
                    id={`input-${idx}`}
                />
                <EditBtn id={idx} onClick={handleEdit}>Edit</EditBtn>
            </div>
        )
    }

    function renderTextArea(value, idx) {
        return (
            <div style={{display: "flex", alignItems: "flex-start"}}>
                <TextArea id={`input-${idx}`} defaultValue={value} readOnly={elementList[idx]} block={elementList[idx]}/>
                <EditBtn id={idx} onClick={handleEdit}>Edit</EditBtn>
            </div>
        )
    }

    function renderDateInput(value, idx) {
        return (
            <div style={{display: "flex", alignItems: "flex-start"}}>
                <SingleInput
                    type={"date"}
                    readOnly={elementList[idx]}
                    block={elementList[idx]}
                    id={`input-${idx}`}
                    defaultValue={value}
                />
                <EditBtn id={idx} onClick={handleEdit}>Edit</EditBtn>
            </div>
        )
    }

    // function renderMilestones(value, idx) {
    //     console.log(value);
    //     return (
    //         <div>
    //             {
    //                 value.map((milestone, milestoneIdx) => {
    //                     console.log(milestone);
    //                     return (
    //                         <MilestoneBlock>
    //                             <SingleInput
    //                                 readOnly={elementList[idx]}
    //                                 block={elementList[idx]}
    //                                 id={`input-${idx}-${milestoneIdx}`}
    //                                 defaultValue={milestone.milestone}
    //                             ></SingleInput>
    //                         </MilestoneBlock>
    //                     )
    //                 })
    //             }
    //             <EditBtn id={idx} onClick={handleEdit}>Edit</EditBtn>
    //         </div>
    //     )
    // }

    function renderImg(key, value, idx) {
        return (
            <div style={{display: "flex", alignItems: "flex-start"}}>
                {
                    elementList[idx] ? 
                    <ClassImage
                        src={`${CDN_DOMAIN + value}`}
                        alt={key}
                        id={`img-${idx}`}
                    ></ClassImage>
                    : 
                    <>
                        <CustomFIleUpload
                            type={"file"}
                            accept="image/*"
                            onChange={handleImageUpload}
                            name={idx}
                            isUploadingImage={isUploadingImage}
                            disabled={isUploadingImage}
                        ></CustomFIleUpload>
                    </>
                }  
                <EditBtn
                    id={idx}
                    onClick={handleFile}
                    disabled={isUploadingImage}
                    style={{
                        cursor: isUploadingImage ? "wait" : "pointer",
                        opacity: isUploadingImage ? "0.3" : "1"
                    }}
                >Edit</EditBtn>
            </div>
        )
    }

    function renderVideo(value, idx) {
        return (
            <div style={{display: "flex", alignItems: "flex-start"}}>
                {
                    elementList[idx] ? 
                    <ClassVideo
                        url={`${CDN_DOMAIN + value}`}
                        id={`video-${idx}`}
                        width={"90%"}
                        height={"auto"}
                        controls={true}
                    ></ClassVideo>
                    : 
                    <>
                        <CustomFIleUpload
                            type={"file"}
                            accept="video/*"
                            onChange={handleVideoUpload}
                            name={idx}
                            isUploadingImage={isUploadingVideo}
                            disabled={isUploadingVideo}
                        ></CustomFIleUpload>
                    </>
                }  
                <EditBtn
                    id={idx}
                    onClick={handleFile}
                    disabled={isUploadingVideo}
                    style={{
                        cursor: isUploadingVideo ? "wait" : "pointer",
                        opacity: isUploadingVideo ? "0.3" : "1"
                    }}
                >Edit</EditBtn>
            </div>
        )
    }

    function handleFile(e) {
        const idx = e.target.id;
        elementList[idx] = !elementList[idx];
        setElementList(elementList.slice());
    }

    function handleEdit(e) {
        const idx = e.target.id;
        elementList[idx] = !elementList[idx];
        setElementList(elementList.slice());
        
        const input = document.getElementById(`input-${idx}`);
        if ( input.value !== infoArray[idx][1] ) {
            changeContent[infoArray[idx][0]] = input.value;
            setChangeContent({...changeContent});
        } else {
            delete changeContent[infoArray[idx][0]];
            setChangeContent({...changeContent});
        }
    }

    function handleUpdate(e) {
        if ( Object.keys(changeContent).length === 0 ) {
            return;
        }
        setIsUpdating(true);
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
                            window.location.reload();
                        }
                    })
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    function handleView(key, value, idx) {
        if ( key === "classDesc" ) {
            return renderTextArea(value, idx);
        
        } else if ( key === "classStartDate" || key === "classEndDate" ) {
            return renderDateInput(value, idx);

        } else if ( key === "classImage" ) {
            return renderImg(key, value, idx);
        
        } else if ( key === "classVideo" ) {
            return renderVideo(value, idx);

        } else {
            return renderSimpleInput(value, idx);
        }
    }

    return (
        <MainContainer>
            {
                infoArray.map((info, idx) => {
                    return (
                        <EachBlock key={info[0] + idx}>
                            <Title>{info[0]}</Title>
                            { handleView(info[0], info[1], idx) }
                        </EachBlock>
                    )
                })
            }
            <UpdateBtn
                isUploadingImage={isUploadingImage}
                isUploadingVideo={isUploadingVideo}
                isUpdating={isUpdating}
                onClick={handleUpdate}
            >{ isUpdating ? <RiseLoader /> : 'Update' }</UpdateBtn>
        </MainContainer>
    )
}

export default Settings;
