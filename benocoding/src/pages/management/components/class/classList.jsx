

import styled from "styled-components";
import ClassItem from "./classItem";

const ClassListContainer = styled.div`
    height: 80%;
    width: 200px;
    text-align: center;
    padding: 0 10px;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;

const Heading = styled.h2`
    height: 55px;
    position: sticky;
    top: 10px;
    background-color: rgba(10, 170, 120, 95%);
    margin: 10px;
    padding: 10px 0;
    border-radius: 10px;
`;

const ClassList = ({classInfos, chooseClass, setViewData}) => {

    const noClasses = 'No classes';

    return (
        <ClassListContainer>
            <Heading>你的課程</Heading>
            {
                classInfos.map((data)=> {
                    return <ClassItem 
                    className={data.className} 
                    key={data.classId} 
                    chooseClass={chooseClass}
                    classId={data.classId}
                    setViewData={setViewData}
                    />
                })
            }
            <div style={{fontSize: '24px'}}>{classInfos.length === 0 ? noClasses : ''}</div>
        </ClassListContainer>
    )
}

export default ClassList;