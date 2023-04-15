
import styled from "styled-components";
import { CDN_DOMAIN } from "../../../global/constant.js";

const Block = styled.li`
    width: 400px;
    height: 400px;
    margin: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 10px;

    :hover {
        background-color: AntiqueWhite;
    }
`;

const ClassImage = styled.img`
    width: 400px;
    height: 150px;
    object-fit: cover;
`;

const ClassTitle = styled.p`
    padding: 0 10px;
    font-size: 30px;
    margin: 10px 0;
`;

const ClassDescription = styled.p`
    padding: 0 10px;
    font-size: 18px;
    margin: 10px 0;
    overflow: hidden;
`;


const UserClassItem = ({classData}) => {

    const startDate = classData.classStartDate.slice(0, classData.classStartDate.lastIndexOf('T'));

    function toClassManagePage() {
        window.location.assign(`/userclass/${classData.id}`);
    }

    return (
        <Block onClick={toClassManagePage}>
            <ClassImage src={`${CDN_DOMAIN + classData.classImage}`}/>
            <ClassTitle>{classData.className}</ClassTitle>
            <ClassDescription>Creater: {classData.teacherName}</ClassDescription>
            <ClassDescription>Start date: {startDate}</ClassDescription>
        </Block>
    )

}

export default UserClassItem;
