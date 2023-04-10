
import styled from "styled-components";
import Popup from 'reactjs-popup';
import Dropzone from 'react-dropzone'
import { useState } from "react";

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

const DropzoneBlock = styled.div`
    width: 400px;
    height: 100px;
    text-align: center;
    font-size: 26px;
    letter-spacing: 2px;
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    padding: 5px;
    overflow: scroll;

    :hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const MilestoneDesc = styled.div`
    min-height: 500px;
    font-size: 22px;
    padding: 10px;
    background-color: rgba(40, 40, 40, 0.9);
    border-bottom: none;
`;

const ViewMilestoneItem = ({milestone, idx}) => {

    const handleOpen = () => {
        
    };

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

    return (
        <Popup
            trigger={
                <MilestoneBlock onClick={handleOpen}>
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
                <>
                    <MilestoneDesc>Description：<br></br>{milestone.milestoneDesc}</MilestoneDesc>
                    <Dropzone
                        onDrop={acceptedFiles => console.log(acceptedFiles)}
                    >
                        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                            <DropzoneBlock>
                                <div {...getRootProps()}>
                                    <input type={"file"} {...getInputProps()} />
                                    <p>拖放或點擊上傳檔案</p>
                                </div>
                            </DropzoneBlock>
                        )}
                    </Dropzone>
                </>
            }
        </Popup>
    )
}

export default ViewMilestoneItem;
