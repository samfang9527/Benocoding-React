
import styled from "styled-components";
import { useState } from "react";

const Title = styled.div`
    height: 30%;
    width: 90%;
`;

const TitleUl = styled.ul`
    list-style: none;
    font-size: 20px;
    letter-spacing: 2px;
    text-align: left;
    padding: 0 0 0 15px;
`;

const TitleLi = styled.li`
    
`;


const ViewClassInfo = ({viewData}) => {
    
    const [className, setClassName] = useState(viewData.className);
    const [classDesc, setClassDesc] = useState(viewData.classDesc);

    return (
        <Title>
            <TitleUl>
                <li>Class: {className}</li>
                <li>Class Description:</li>
                <li>{classDesc}</li>
            </TitleUl>
        </Title>
    )
}

export default ViewClassInfo;