
import styled from "styled-components";
import { useState } from "react";
import ViewClassInfoItem from "./viewClassInfoItem";

const Title = styled.div`
    height: 30%;
    width: 98%;
    display: flex;
    flex-direction: column;
`;

const BlockUl = styled.ul`
    list-style: none;
    font-size: 20px;
    letter-spacing: 2px;
    text-align: left;
    padding: 0 0 0 15px;
    margin-top: 0;
`;

const TitleLi = styled.li`
    margin: 10px 0;
    padding: 5px 10px 10px 10px;
`;

const SplitLine = styled.hr`
    border: thin solid khaki;
    width: 98%;
`;


const ViewClassInfo = ({viewData}) => {
    
    const [id, setId] = useState(viewData._id)
    const [className, setClassName] = useState(viewData.className);
    const [classDesc, setClassDesc] = useState(viewData.classDesc);
    const [maxStudentNums, setMaxStudentNums] = useState(viewData.maxStudentsNumber);
    const [minStudentNums, setMinStudentNums] = useState(viewData.minStudentsNumber);
    const [startDate, setStartDate] = useState(viewData.classStartDate);
    const [endDate, setEndDate] = useState(viewData.classEndDate);
    const [milestones, setMilestones] = useState(viewData.classMilestones);

    return (
        <Title>
            <BlockUl>
                <TitleLi>Class: {className}</TitleLi>
                <TitleLi>Class Description:</TitleLi>
                <TitleLi>{classDesc}</TitleLi>
            </BlockUl>
            <SplitLine></SplitLine>
            <BlockUl>
                <TitleLi>Min number of students: {minStudentNums}</TitleLi>
                <TitleLi>Max number of students: {maxStudentNums}</TitleLi>
                <TitleLi>Start date:<br></br>{startDate}</TitleLi>
                <TitleLi>End date:<br></br>{endDate}</TitleLi>
            </BlockUl>
            <SplitLine></SplitLine>
            <BlockUl>
                {
                    milestones.map((ele) => {
                        return (
                            <ViewClassInfoItem
                                key={ele.milestone}
                                milestoneData={ele}
                            />
                        )
                    })
                }
            </BlockUl>
        </Title>
    )
}

export default ViewClassInfo;