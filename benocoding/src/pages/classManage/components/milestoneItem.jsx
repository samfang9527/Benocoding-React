
import styled from "styled-components";
import Popup from 'reactjs-popup';
import { useRef } from "react";
import { BACKEND_DOMAIN } from "../../../global/constant.js";
import axios from "axios";

const MilestoneBlock = styled.div`
    height: 100px;
    width: 95%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
    border-radius: 10px;
    background-color: MediumSeaGreen;
`;

const MilestoneNumber = styled.p`
    font-size: 22px;
    margin: 0 20px;
`;

const MilestoneName = styled.p`
    font-size: 22px;
    margin: 0 10px;
    text-align: left;
`;

const MilestoneStatus = styled.p`
    font-size: 22px;
    margin: 0 20px;
`;

const InputBlock = styled.div`
    width: 400px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.4);
`;

const CustomFIleUpload = styled.input`
    height: 100%;
    width: 100%;
    border-radius: 4px;
    padding: 5%;
    font-size: 22px;
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
        background-color: rgba(20, 20, 20, 0.3);
    }
`;

const MilestoneDesc = styled.div`
    min-height: 500px;
    font-size: 22px;
    padding: 10px;
    background-color: rgba(40, 40, 40, 0.9);
    border-bottom: none;
`;

const UploadBtn = styled.button`
    width: 40%;
    height: 50px;
    position: relative;
    left: 50%;
    margin: 20px 0 10px -20%;
    background-color: orange;
    color: white;
    border: none;
    font-size: 22px;
    letter-spacing: 2px;
    cursor: pointer;

    :hover {
        background-color: darkorange;
    }
`;

const MilestoneItem = ({milestone, idx}) => {

    const homeworkInput = useRef(null);

    const contentStyle = {
        backgroundColor: 'white',
        padding: '1em',
        borderRadius: '4px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease-in-out',
    };

    const overlayStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const homework = homeworkInput.current.files[0];
            
            const result = await axios.post(
                `${BACKEND_DOMAIN}/autoTest`,
                { homework: homework },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            console.log(result);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Popup
            trigger={
                <MilestoneBlock>
                    <MilestoneNumber>Milestone: {idx} |</MilestoneNumber>
                    <MilestoneName>Title: {milestone.milestone} |</MilestoneName>
                    <MilestoneStatus>Passed: {`${milestone.passed}`}</MilestoneStatus>
                </MilestoneBlock>
            }
            modal
            contentStyle={contentStyle}
            overlayStyle={overlayStyle}
        >
            {
                <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                    <MilestoneDesc>Description：<br></br>{milestone.milestoneDesc}</MilestoneDesc>
                    <InputBlock>
                        <CustomFIleUpload type={"file"} name={'homework'} ref={homeworkInput}/>
                    </InputBlock>
                    <UploadBtn type="submit">Upload</UploadBtn>
                </form>
            }
        </Popup>
    )
}

export default MilestoneItem;
